<?php

namespace App\Http\Controllers;

use App\Models\DinnerSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class SettingsController extends Controller {

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
    public function show(){
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function saveDinnerSettings(Request $request): \Illuminate\Http\RedirectResponse
    {
        $input = $request->only(['Arrival_Start','Arrival_End','Departure',
            'First_Day','Last_Day','Arrival_Message']);
        $Settings = DinnerSetting::first();
        $Arrival_Start = $input['Arrival_Start'];
        $Arrival_End = $input['Arrival_End'];
//        $Departure = $input['Departure'];
        $First_Day = $input['First_Day'];
        $Last_Day = $input['Last_Day'];
        $Arrival_Message = $input['Arrival_Message'];
        if($Settings) {
            // Check if the Arrival_Time_Start of reservations changed and if yes change it.
            if($Settings->Arrival_Time_Start !== $Arrival_Start)
              $Settings->Arrival_Time_Start = $Arrival_Start;
            // Check if the Arrival_Time_End of reservations changed and if yes change it.
            if($Settings->Arrival_Time_End !== $Arrival_End)
              $Settings->Arrival_Time_End = $Arrival_End;
            // Check if the Departure Time of reservations changed and if yes change it.
//            if($Settings->Departure_Time !== $Departure)
//            $Settings->Departure_Time = $Departure;
            // Check if the first day of reservations changed and if yes change it.
            if($Settings->Starting_Date !== $First_Day)
              $Settings->Starting_Date = $First_Day;
            // Check if the last day of reservations changed and if yes change it.
            if($Settings->Ending_Date !== $Last_Day)
              $Settings->Ending_Date = $Last_Day;
            if($Settings->Date_Notes !== $Arrival_Message)
                $Settings->Date_Notes = $Arrival_Message;
        }
        else {
            $Settings = new DinnerSetting;
            $Settings->Arrival_Time_Start = $Arrival_Start;
            $Settings->Arrival_Time_End = $Arrival_End;
//            $Settings->Departure_Time = $Departure;
            $Settings->Starting_Date = $First_Day;
            $Settings->Ending_Date = $Last_Day;
            $Settings->Date_Notes = $Arrival_Message;
        }
        $Settings->save();
        return Redirect::back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(c $c)
    {
        //
    }
}
