<?php

namespace App\Http\Controllers;

use App\Http\Resources\BedSettingsResource;
use App\Http\Resources\DinnerSettingsResource;
use App\Http\Resources\GazeboResource;
use App\Http\Resources\MenuResource;
use App\Http\Resources\ReservationResource;
use App\Models\BedSetting;
use App\Models\DinnerSetting;
use App\Models\DisabledDay;
use App\Models\Gazebo;
use App\Models\Menu;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller {
    public function showAdminPanel(Request $request) {
        date_default_timezone_set("Europe/Athens");
        $Active_Key = $request->only(['ActiveTab']);
        // Retrieve all the menus, regardless of type
        $Dinner_Menus_DB = Menu::where('Type','Dinner')->get();
        // Filter out dinner and sea bed menus respectively.
        $Dinner_Menus = ['Mains'=>MenuResource::collection($Dinner_Menus_DB->filter(function ($item) {
            return  $item->Category == 'Main';
        })),
            'Desserts'=>MenuResource::collection($Dinner_Menus_DB->filter(function ($item) {
                return  $item->Category == 'Dessert';
            }))];
        $Bed_Menus = MenuResource::collection(Menu::where('Type','Bed')->get());

        $Menus = ['Dinner'=>$Dinner_Menus,'Bed'=>$Bed_Menus];
        // Retrieve all tables
        $Gazebos = Gazebo::all();
        // Retrieve all the days that were disabled by the admins, regardless of type
        $Disabled_Days = DisabledDay::where('Date', '>=', date("Y-m-d"))->get();

        // Retrieve all Dinner reservations that fall within the range specified by the admins
        $Dinner_Reservations = GazeboController::getAdminReservations($Gazebos,'Dinner',$Disabled_Days->filter(function ($item) {
            return  $item->Type == 'Dinner';
        }));
        // Retrieve all Sea Bed reservations that fall within the range specified by the admins
        $Bed_Reservations = GazeboController::getAdminReservations($Gazebos,'Bed',$Disabled_Days->filter(function ($item) {
            return  $item->Type == 'Bed';
        }));
        // Retrieve the settings of the Dinner and Sea Bed reservations
        $Dinner_Settings = new DinnerSettingsResource(DinnerSetting::first());
        $Bed_Settings = new BedSettingsResource(BedSetting::first());

        // Initialize variables, when specific requests are made in the admin panel, they are returned to this function,
        // and are sent to its response conditionally based on the if's below
        $activeReservation = null;
        $availability_for_date = [];
        $availability_for_date_range = [];
        $search_result = [];
        $reservations_of_table = [];
        $disabled_days_for_table = [];

        // True when a request that requires the activeReservation of that time to be returned is fired.
        if($request->session()->exists('activeReservation'))
            $activeReservation = new ReservationResource(Reservation::find($request->session()->get('activeReservation')));
        // True when a request for a specific date's availability is fired.
        if($request->session()->exists('availability_for_date'))
            $availability_for_date = $request->session()->get('availability_for_date');
        // True when a search request is fired.
        if($request->session()->exists('search_result'))
            $search_result = $request->session()->get('search_result');
        // True when a request for a specific date range availability is fired.
        if($request->session()->exists('availability_for_date_range'))
            $availability_for_date_range = $request->session()->get('availability_for_date_range');
        // True when a request for a specific table's reservations is fired.
        if($request->session()->exists('reservations_of_table'))
            $reservations_of_table = $request->session()->get('reservations_of_table');
        if($request->session()->exists('Disabled_Days_For_Table'))
            $disabled_days_for_table = $request->session()->get('Disabled_Days_For_Table');

        return Inertia::render('Admin/AdminPanel',['Menus'=>$Menus,'Dinner_Reservations'=> fn () =>$Dinner_Reservations,
            'Bed_Reservations'=> fn () => $Bed_Reservations,'Gazebos'=>GazeboResource::collection($Gazebos),
            'Dinner_Settings' => fn () => $Dinner_Settings,'Bed_Settings'=> fn () =>$Bed_Settings,'ActiveTab'=>$Active_Key ?: 'Reservations',
            'activeReservation'=>Inertia::lazy(fn()=>$activeReservation),'availability_for_date'=>Inertia::lazy(fn()=>$availability_for_date),
            'search_result'=>Inertia::lazy(fn()=>$search_result),'availability_for_date_range'=>Inertia::lazy(fn()=>$availability_for_date_range),
            'reservations_of_table'=>Inertia::lazy(fn()=>$reservations_of_table),'disabled_days_for_table'=>Inertia::lazy(fn()=>$disabled_days_for_table)]);
    }
}
