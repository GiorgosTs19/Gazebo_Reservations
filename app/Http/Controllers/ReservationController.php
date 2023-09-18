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
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use JetBrains\PhpStorm\ArrayShape;

class ReservationController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function getReservation(Request $request): \Illuminate\Http\RedirectResponse {
        $reservation_id = $request->only(['reservation_id'])['reservation_id'];

        return Redirect::back()->with(['activeReservation'=>$reservation_id]);
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
        DB::beginTransaction();
        try {
            $input = $request->only([
                'date', 'table',
                'number_of_people', 'more_rooms',
                'first_name', 'last_name', 'email',
                'phone_number', 'primary_room', 'secondary_room',
                'attendees', 'primary_menu', 'secondary_menu',
                'notes', 'type',
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

            $this->create_attendees($Reservation,$input);
            $this->createRoomsAndMenus($Reservation,$input);

            DB::commit();
            return Redirect::route('ShowAdminPanel');
        } catch (\Exception $e) {
            DB::rollback();
            return back()->withInput()->withErrors(['Reservation' => 'An error occurred while processing your reservation.']);
        }
    }

    /**
     * Changes the status of the Reservation from Pending to either Confirmed or Cancelled.
     */
    public function changeReservationStatus(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['reservation_id','status', 'date_start', 'date_end']);
        $Reservation = Reservation::find($input['reservation_id']);
        if($Reservation) {
            $Reservation->Status = $input['status'];
            $Reservation->save();
        }
        return $this->getAction($input, $Reservation);
    }

    /**
     * Display the specified resource.
     */
    protected function create_attendees(Reservation $reservation, $input) {
        if(is_array($input['attendees']))
            foreach($input['attendees'] as $attendee) {
                $Attendee = new ReservationAttendee;
                $Attendee->Name = $attendee;
                $Attendee->reservation_id = $reservation->id;
                $Attendee->save();
            }
    }

    protected function createRoomsAndMenus(Reservation $reservation, $input) {
        $Primary_Room = new ReservationRoom;
        $Primary_Room->reservation_id = $reservation->id;
        $Primary_Room->Room_Number = $input['primary_room'];
        $Primary_Room->save();

        $Primary_Menu = new MenuSelection;
        $Primary_Menu->reservation_id = $reservation->id;
        $Primary_Menu->reservation_room_id = $Primary_Room->id;
        $Primary_Menu->Main_Dish = $input['primary_menu']['Main'] ?? '';
        $Primary_Menu->Dessert = $input['primary_menu']['Dessert'] ?? '';
        $Primary_Menu->save();

        if($input['more_rooms'] === true && $input['secondary_room'] !== '') {
            $Secondary_Room = new ReservationRoom;
            $Secondary_Room->reservation_id = $reservation->id;
            $Secondary_Room->Room_Number = $input['secondary_room'];
            $Secondary_Room->save();

            $Secondary_Menu = new MenuSelection;
            $Secondary_Menu->reservation_id = $reservation->id;
            $Secondary_Menu->reservation_room_id = $Secondary_Room->id;
            $Secondary_Menu->Main_Dish = $input['secondary_menu']['Main'] ?? '';
            $Secondary_Menu->Dessert = $input['secondary_menu']['Dessert'] ?? '';
            $Secondary_Menu->save();
        }
    }

    protected function getAction($input, $Reservation) {
        if(isset($input['active_view']) && $input['active_view'] === 'Monthly')
            return redirect()->action([GazeboController::class, 'checkRangeAvailability'],
                ['date_start'=>$input['date_start'], 'date_end'=>$input['date_end'], 'type'=>$Reservation->Type,
                    'activeReservation'=>$Reservation->id, 'withDisabledTables'=>false]);

        if(is_null($input['date_start']) && is_null($input['date_end']))
            return Redirect::back()->with(['activeReservation'=>$Reservation->id]);

        if(is_null($input['date_end']))
            return redirect()->action([GazeboController::class, 'getReservationsForDate'],
                ['date'=>$input['date_start'], 'type'=>$Reservation->Type, 'activeReservation'=>$Reservation->id]);

        return redirect()->action([GazeboController::class, 'getReservationsForDates'],
            ['date_start'=>$input['date_start'], 'date_end'=>$input['date_end'], 'type'=>$Reservation->Type,
                'activeReservation'=>$Reservation->id]);
    }

    /**
     * Show the form for editing the specified resource.
     * @throws ValidationException
     */
    public function changeReservationDate(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['reservation_id','date','gazebo_id', 'date_start', 'date_end', 'active_view', 'reservation_type']);
        $Reservation = Reservation::find($input['reservation_id']);
//        try {
//            $Reservation_Already_Exists = Reservation::date($input['date'])->type($input['reservation_type'])->table($input['gazebo_id'])->
//            status('Cancelled',true)->exists();
//            if(!$Reservation_Already_Exists)
//                throw new \Exception('Το Gazebo που επιλέξατε για τις '.$input['date'].' φαίνεται πώς είναι ήδη πιασμένο');
//        } catch (\Exception $e) {
//            return back()->withErrors(['date_error'=>'Το Gazebo που επιλέξατε για τις '.$input['date'].' φαίνεται πώς είναι ήδη πιασμένο']);
//        }
        if($Reservation->Date !== $input['date'])
            $Reservation->Date =$input['date'];
        if($Reservation->gazebo_id !== $input['gazebo_id'])
            $Reservation->gazebo_id = $input['gazebo_id'];
        $Reservation->save();
        return $this->getAction($input, $Reservation);
    }


    public function changeReservationTable(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Reservation_id','Table_id', 'date_start', 'date_end']);
        $Reservation = Reservation::find($input['Reservation_id']);
        if($Reservation->gazebo_id !== $input['Table_id'])
            $Reservation->gazebo_id = $input['Table_id'];
        $Reservation->save();
        return $this->getAction($input, $Reservation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function Search(Request $request) {
        $input = $request->only(['conf_number','email','phone_number','room_number','type']);
        $result = Reservation::confirmationNumber($input['conf_number'])->
        phone($input['phone_number'])->email($input['email'])->type($input['type'])->afterToday()->with(['Rooms'])->get();
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
