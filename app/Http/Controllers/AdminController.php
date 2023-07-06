<?php

namespace App\Http\Controllers;

use App\Http\Resources\GazeboResource;
use App\Http\Resources\MenuResource;
use App\Models\Gazebo;
use App\Models\Menu;
use Inertia\Inertia;

class AdminController extends Controller {
    public function showAdminPanel() {
        $Dinner_Menus = ['Mains'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Main')->get()),
            'Desserts'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Dessert')->get())];
        $Bed_Menus = MenuResource::collection(Menu::where('Type','Bed')->get());
        $Menus = ['Dinner'=>$Dinner_Menus,'Bed'=>$Bed_Menus];
        $Dinner_Reservations = GazeboController::checkAvailability('Dinner',true,true);
        $Bed_Reservations = GazeboController::checkAvailability('Bed',true,true);
        $Gazebos = GazeboResource::collection(Gazebo::all());
        return Inertia::render('Admin/AdminPanel',['Menus'=>$Menus,'Dinner_Reservations'=> fn () =>$Dinner_Reservations,
            'Bed_Reservations'=> fn () => $Bed_Reservations,'Gazebos'=>$Gazebos]);
    }
}
