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
        $Dinner_Menus_DB = Menu::where('Type','Dinner')->get();
        $Dinner_Menus = ['Mains'=>MenuResource::collection($Dinner_Menus_DB->filter(function ($item) {
            return  $item->Category == 'Main';
        })),
            'Desserts'=>MenuResource::collection($Dinner_Menus_DB->filter(function ($item) {
                return  $item->Category == 'Dessert';
            }))];
        $Bed_Menus = MenuResource::collection(Menu::where('Type','Bed')->get());
        $Menus = ['Dinner'=>$Dinner_Menus,'Bed'=>$Bed_Menus];
        $Gazebos = Gazebo::all();
        $Disabled_Days = DisabledDay::where('Date', '>=', date("Y-m-d"))->get();
        $Dinner_Reservations = GazeboController::getAdminReservations($Gazebos,'Dinner',$Disabled_Days->filter(function ($item) {
            return  $item->Type == 'Dinner';
        }));
        $Bed_Reservations = GazeboController::getAdminReservations($Gazebos,'Bed',$Disabled_Days->filter(function ($item) {
            return  $item->Type == 'Bed';
        }));
        $Dinner_Settings = new DinnerSettingsResource(DinnerSetting::first());
        $Bed_Settings = new BedSettingsResource(BedSetting::first());
        $activeReservation = null;
        $availability_for_date = [];
        $availability_for_date_range = [];
        $search_result = [];
        if($request->session()->exists('activeReservation'))
            $activeReservation = new ReservationResource(Reservation::find($request->session()->get('activeReservation')));
        if($request->session()->exists('availability_for_date'))
            $availability_for_date = $request->session()->get('availability_for_date');
        if($request->session()->exists('search_result'))
            $search_result = $request->session()->get('search_result');
        if($request->session()->exists('availability_for_date_range'))
            $availability_for_date_range = $request->session()->get('availability_for_date_range');

        return Inertia::render('Admin/AdminPanel',['Menus'=>$Menus,'Dinner_Reservations'=> fn () =>$Dinner_Reservations,
            'Bed_Reservations'=> fn () => $Bed_Reservations,'Gazebos'=>GazeboResource::collection($Gazebos),
            'Dinner_Settings' => fn () => $Dinner_Settings,'Bed_Settings'=> fn () =>$Bed_Settings,'ActiveTab'=>$Active_Key ?: 'Reservations',
            'activeReservation'=>Inertia::lazy(fn()=>$activeReservation),'availability_for_date'=>Inertia::lazy(fn()=>$availability_for_date),
            'search_result'=>Inertia::lazy(fn()=>$search_result),'availability_for_date_range'=>Inertia::lazy(fn()=>$availability_for_date_range)]);
    }
}
