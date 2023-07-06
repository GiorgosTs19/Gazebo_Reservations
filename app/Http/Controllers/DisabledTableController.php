<?php

namespace App\Http\Controllers;

use App\Models\DisabledDay;
use App\Models\DisabledTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class DisabledTableController extends Controller {
    public function Disable_Table (Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Date','Gazebo_id']);
        $date_to_disable = $input['Date'];
        $table_to_disable = $input['Gazebo_id'];
        $Disabled_Table = new DisabledTable;
        $Disabled_Table->Date = $date_to_disable;
        $Disabled_Table->gazebo_id = $table_to_disable;
        $Disabled_Table->save();

        return Redirect::back();
    }
}
