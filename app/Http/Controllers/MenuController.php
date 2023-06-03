<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MenuController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        $input = $request->only('Menu_Name','Menu_Items');
        $Name = $input['Menu_Name'];
        $Items = $input['Menu_Items'];
        $Menu = new Menu;
        $Menu->Name = $Name;
        $Menu->save();
        if(is_array($Items))
            foreach($Items as $item){
                $Menu_Item = new MenuItem;
                $Menu_Item->Name = $item;
                $Menu_Item->Menu_ID = $Menu->id;
                $Menu_Item->save();
            }
        return redirect()->route('ShowAdminMenuPage');
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
    public function show(Menu $menu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Menu $menu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Menu $menu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request) {
        $id = $request->header('X-Menu_ID');
        $Menu = Menu::find($id);
        if($Menu)
            $Menu->delete();
        return redirect()->route('ShowAdminMenuPage');
    }
}
