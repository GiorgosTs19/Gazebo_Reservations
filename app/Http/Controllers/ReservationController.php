<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\MenuSelection;
use App\Models\Reservation;
use App\Models\ReservationAttendee;
use App\Models\ReservationRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
