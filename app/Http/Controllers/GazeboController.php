<?php

namespace App\Http\Controllers;

use App\Http\Resources\GazeboResource;
use App\Http\Resources\MenuResource;
use App\Http\Resources\ReservationResource;
use App\Models\DisabledDay;
use App\Models\Gazebo;
use App\Models\Menu;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GazeboController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $Gazepo1 = new Gazebo;
            $Gazepo1->number = 1;
            $Gazepo1->save();
        $Gazepo2 = new Gazebo;
            $Gazepo2->number = 2;
            $Gazepo2->save();
        $Gazepo3 = new Gazebo;
            $Gazepo3->number = 3;
            $Gazepo3->save();
        $Gazepo4 = new Gazebo;
            $Gazepo4->number = 4;
            $Gazepo4->save();
        $Gazepo5 = new Gazebo;
            $Gazepo5->number = 5;
            $Gazepo5->save();
        $Gazepo6 = new Gazebo;
            $Gazepo6->number = 6;
            $Gazepo6->save();
    }

    /**
     * Store a newly created resource in storage.
     */
    public static function checkAvailability($type='Dinner',$getReservations = false,$getReservationsOnly=false) {
        $Gazebos = Gazebo::all();
        date_default_timezone_set("Europe/Athens");
        $startDate = date("Y-m-d"); // Get today's date
        $currentDate = $startDate;
        $Last_Day = '2023-11-10';
        $Availability = [];
        if($getReservationsOnly)
            $getReservations = true;

        if($getReservations)
            $Reservations = [];
        while ($currentDate <= $Last_Day) {
            $Available_Tables = [];
            $current_reservations_count = Reservation::where('Date',$currentDate)->where('Type',$type)->count();
            $is_current_date_disabled = DisabledDay::where('Date',$currentDate)->exists();

            if($current_reservations_count === 0 ) {
                if(!$getReservationsOnly){
                    $current_date_availibility = ['Date'=>$currentDate,'Available'=>'All','Disabled'=>$is_current_date_disabled];
                    $Availability[] = $current_date_availibility;
                }
                if($getReservations) {
                    $current_date_reservations = ['Date'=>$currentDate,'Reservations'=>'None','Disabled'=>$is_current_date_disabled];
                    $Reservations[] = $current_date_reservations;
                }
            }
            else {
                foreach ($Gazebos as $Gazepo) {
                    if(!$getReservationsOnly){
                        $gazebo_is_available = !Reservation::where('Date',$currentDate)
                            ->where('gazebo_id',$Gazepo->id)->where('Type',$type)->exists();
                        if($gazebo_is_available === true)
                            $Available_Tables[] = [(''.$Gazepo->id)=>$gazebo_is_available];
                    }
                }
                $Availability[] = ['Date'=>$currentDate,'Available'=>$Available_Tables,'Disabled'=>$is_current_date_disabled];
                if($getReservations)
                    $Reservations[] = ['Date'=>$currentDate,'Reservations'=>ReservationResource::collection(
                        Reservation::where('Date',$currentDate)->where('Type',$type)->get()),'Disabled'=>$is_current_date_disabled];
            }
            $currentDate = date("Y-m-d", strtotime($currentDate . " +1 day"));
        }
        if($getReservationsOnly)
            return $Reservations;

        if($getReservations)
            return [$Availability,$Reservations];

        return $Availability;
    }

    /**
     * Display the specified resource.
     */
    public function show(Gazebo $gazebo) {
        $Gazebos = GazeboResource::collection(Gazebo::all());
        $Bed_Menus = MenuResource::collection(Menu::where('Type','Bed')->get());
        $Dinner_Menus = ['Mains'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Main')->get()),
            'Desserts'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Dessert')->get())];
        $Availability = ['Dinner' => self::checkAvailability(), 'Morning' => self::checkAvailability('Bed')];
        return Inertia::render('Reservations/Gazebo',
            ['Gazebos'=>$Gazebos,'Menu'=>['Morning'=>$Bed_Menus,'Dinner'=>$Dinner_Menus],'Availability'=>$Availability]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gazebo $gazebo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gazebo $gazebo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gazebo $gazebo)
    {
        //
    }
}
