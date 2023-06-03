<?php

namespace App\Http\Controllers;

use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller {
    public function showMenuAdminPage() {
        $Menus = MenuResource::collection(Menu::with('Items')->get());
        return Inertia::render('Admin/Menu/MenuAdministrationPage',['Menus'=>$Menus]);
    }
}
