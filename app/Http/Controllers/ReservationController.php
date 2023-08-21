<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\DisabledDay;
use App\Models\DisabledTable;
use App\Models\MenuSelection;
use App\Models\Reservation;
use App\Models\ReservationAttendee;
use App\Models\ReservationRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use JetBrains\PhpStorm\ArrayShape;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function generateConfirmationNumber() {
        $uniqueString = Str::random(7);

        while (Reservation::where('Confirmation_Number', $uniqueString)->exists()) {
            $uniqueString = Str::random(7);
        }

        return $uniqueString;
    }

    /**
     * Create and store a newly Created Reservation.
     */
    public function create(Request $request) {
        $input = $request->only([
            'date',
            'table',
            'number_of_people',
            'more_rooms',
            'first_name',
            'last_name',
            'email',
            'phone_number',
            'primary_room',
            'secondary_room',
            'attendees',
            'primary_menu',
            'secondary_menu',
            'notes',
            'type',
        ]);

        $Reservation = new Reservation;
        $Reservation->gazebo_id = $input['table'];
        $Reservation->Date = $input['date'];
        $Reservation->Email = $input['email'];
        $Reservation->Phone_Number = $input['phone_number'];
        $Reservation->First_Name = $input['first_name'];
        $Reservation->Last_Name = $input['last_name'];
        $Reservation->Notes = $input['notes'];
        $Reservation->Confirmation_Number = $this->generateConfirmationNumber();
        $Reservation->Type = $input['type'];
        $Reservation->save();

        if(is_array($input['attendees']))
            foreach($input['attendees'] as $attendee) {
                $Attendee = new ReservationAttendee;
                $Attendee->Name = $attendee;
                $Attendee->reservation_id = $Reservation->id;
                $Attendee->save();
            }

        $Primary_Room = new ReservationRoom;
        $Primary_Room->reservation_id = $Reservation->id;
        $Primary_Room->Room_Number = $input['primary_room'];
        $Primary_Room->save();

        $Primary_Menu = new MenuSelection;
        $Primary_Menu->reservation_id = $Reservation->id;
        $Primary_Menu->reservation_room_id = $Primary_Room->id;
        $Primary_Menu->Main_Dish = $input['primary_menu']['Main'];
        $Primary_Menu->Dessert = $input['primary_menu']['Dessert'];
        $Primary_Menu->save();

        if($input['more_rooms'] === true && $input['secondary_room'] !== '') {
            $Secondary_Room = new ReservationRoom;
            $Secondary_Room->reservation_id = $Reservation->id;
            $Secondary_Room->Room_Number = $input['secondary_room'];
            $Secondary_Room->save();

            $Secondary_Menu = new MenuSelection;
            $Secondary_Menu->reservation_id = $Reservation->id;
            $Secondary_Menu->reservation_room_id = $Secondary_Room->id;
            $Secondary_Menu->Main_Dish = $input['secondary_menu']['Main'];
            $Secondary_Menu->Dessert = $input['secondary_menu']['Dessert'];
            $Secondary_Menu->save();
        }
        return Redirect::route('ShowAdminPanel');
    }

    /**
     * Changes the status of the Reservation from Pending to either Confirmed or Cancelled.
     */
    public function changeReservationStatus(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['reservation_id','status']);
        $Reservation = Reservation::find($input['reservation_id']);
        if($Reservation) {
            $Reservation->Status = $input['status'];
            $Reservation->save();
        }
        return Redirect::back()->with(['activeReservation'=>$Reservation->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Reservation $reservation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function changeReservationDate(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Reservation_id','Date','Table_id']);
        $Reservation = Reservation::find($input['Reservation_id']);
        if($Reservation->Date !== $input['Date'])
            $Reservation->Date =$input['Date'];
        if($Reservation->gazebo_id !== $input['Table_id'])
            $Reservation->gazebo_id = $input['Table_id'];
        $Reservation->save();
        return Redirect::back()->with(['activeReservation'=>$Reservation->id]);
    }


    public function changeReservationTable(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Reservation_id','Table_id']);
        $Reservation = Reservation::find($input['Reservation_id']);
        if($Reservation->gazebo_id !== $input['Table_id'])
            $Reservation->gazebo_id = $input['Table_id'];
        $Reservation->save();
        return Redirect::back()->with(['activeReservation'=>$Reservation->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function Search(Request $request) {
        $input = $request->only(['conf_number','email','phone_number','room_number','type']);
        $result = ReservationResource::collection(Reservation::confirmationNumber($input['conf_number'])->
        phone($input['phone_number'])->email($input['email'])->type($input['type'])->afterToday()->get());
        return Redirect::back()->with(['search_result'=>$result]);
    }


}
//    /**
//     * Looks for reservations in disabled_days that do not allow them to be fulfilled.
//     * Also looks for reservations whose tables are disabled for the given date.
//     */
//    #[ArrayShape(['Disabled_Dates_Reservations' => "array", 'Disabled_Table_Reservations' => "array"])] public static function getConflicts($Reservations): array {
////        // Retrieve all the disabled days ( only the date ) after today that do not allow existing reservations to be fulfilled.
////        $Dates_Not_Allowing_Existing_Reservations = DisabledDay::allowReservations(0)->afterToday()->order()->pluck('Date');
////        // Initialize an empty array to store any reservations
////        $Reservations_Of_Disabled_Dates = [];
////        // Loop through the disabled Dates to check if any of them have any reservations.
////        foreach ($Dates_Not_Allowing_Existing_Reservations as $date) {
////            $Reservations_Found = ReservationResource::collection(Reservation::date($date)->get());
////            // If not continue to the next day.
////            if($Reservations_Found->isEmpty())
////                continue;
////            // Else push the reservations to the $Reservations_Of_Disabled_Dates array;
////            $Reservations_Of_Disabled_Dates[] = $Reservations_Found;
////        }
//        // Retrieve all the disabled tables ( only the date and their ids ) after today.
//        $Disabled_Tables = DisabledTable::afterToday()->order()->pluck('gazebo_id','Date');
//        // Initialize an empty array to store any reservations
//        $Reservations_Of_Disabled_Tables = [];
//        // Loop through the disabled Tables to check if any of them have any reservations on the date that they are disabled.
//        foreach ($Disabled_Tables->keys()->all() as $date) {
//            $Reservations_Found = ReservationResource::collection(Reservation::table($Disabled_Tables[$date])->date($date)->get());
//            // If not continue to the next table.
//            if($Reservations_Found->isEmpty())
//                continue;
//            // Else push the reservations to the $Reservations_Of_Disabled_Tables array;
//            $Reservations_Of_Disabled_Tables[] = $Reservations_Found;
//        }
//        return ['Disabled_Table_Reservations'=>$Reservations_Of_Disabled_Tables];
//    }
////'Disabled_Dates_Reservations'=>$Reservations_Of_Disabled_Dates,
