<?php

namespace App\Http\Controllers;

use App\Http\Resources\DinnerSettingsResource;
use App\Http\Resources\GazeboResource;
use App\Http\Resources\MenuResource;
use App\Models\BedSetting;
use App\Models\DinnerSetting;
use App\Models\DisabledDay;
use App\Models\Gazebo;
use App\Models\Menu;
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
        $Bed_Settings = BedSetting::first();
        return Inertia::render('Admin/AdminPanel',['Menus'=>$Menus,'Dinner_Reservations'=> fn () =>$Dinner_Reservations,
            'Bed_Reservations'=> fn () => $Bed_Reservations,'Gazebos'=>GazeboResource::collection($Gazebos),
            'Dinner_Settings' => fn () => $Dinner_Settings,'Bed_Settings'=> fn () =>$Bed_Settings,'ActiveTab'=>$Active_Key ?: 'Reservations']);
    }
}
