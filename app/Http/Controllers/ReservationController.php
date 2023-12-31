<?php

namespace App\Http\Controllers;

use App\Http\Requests\NewReservationRequest;
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
        $shouldBeResource = $request->exists(['shouldBeResource']) ?filter_var($request->only(['shouldBeResource'])['shouldBeResource'], FILTER_VALIDATE_BOOLEAN) : true;
        $reservation_id = $request->only(['reservation_id'])['reservation_id'];

        return Redirect::back()->with(['activeReservation'=>$reservation_id, 'shouldBeResource'=>$shouldBeResource]);
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
    public function create(NewReservationRequest $request) {
        $validatedData = $request->validated();
        DB::beginTransaction();
        try {
            $Reservation = new Reservation;
            $Reservation->gazebo_id = $validatedData['table'];
            $Reservation->Date = $validatedData['date'];
            $Reservation->Email = $validatedData['email'];
            $Reservation->Phone_Number = $validatedData['phone_number'];
            $Reservation->First_Name = $validatedData['first_name'];
            $Reservation->Last_Name = $validatedData['last_name'];
            $Reservation->Notes = $validatedData['notes'];
            $Reservation->Confirmation_Number = $this->generateConfirmationNumber();
            $Reservation->Type = $validatedData['type'];
            $Reservation->save();

            $this->create_attendees($Reservation,$validatedData);
            $this->createRoomsAndMenus($Reservation,$validatedData);

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

        if(is_null($input['date_end']) && strtotime($input['date_start']) === strtotime(date('y-m-d'))) {
            return redirect()->action([GazeboController::class, 'getCurrenDayReservations'],
                ['type'=>$Reservation->Type, 'activeReservation'=>$Reservation->id]);
        }

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
