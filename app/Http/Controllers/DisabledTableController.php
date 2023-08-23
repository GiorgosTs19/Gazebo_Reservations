<?php

namespace App\Http\Controllers;

use App\Models\DisabledDay;
use App\Models\DisabledTable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class DisabledTableController extends Controller {
    public function Disable_Table (Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Date','Gazebo_id','Reservation_Type']);
        $date_to_disable = $input['Date'];
        $table_to_disable = $input['Gazebo_id'];
        $type_to_disable = $input['Reservation_Type'];
        $already_exists = DisabledTable::table($table_to_disable)->date($date_to_disable)->type($input['Reservation_Type'])->exists();
        if ($already_exists)
            return Redirect::back();
        $Disabled_Table = new DisabledTable;
        $Disabled_Table->Date = $date_to_disable;
        $Disabled_Table->gazebo_id = $table_to_disable;
        $Disabled_Table->Type = $type_to_disable;
        $Disabled_Table->save();

        $disabled_days = DisabledTable::table($table_to_disable)->type($type_to_disable)->order()->distinct()->pluck('Date');
        return Redirect::back()->with(['Disabled_Days_For_Table'=>$disabled_days]);
    }

    public function Disable_Tables (Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Date_Start', 'Date_End', 'Gazebo_id', 'Reservation_Type']);
        $dates_to_disable = DisabledDayController::getDatesBetween($input['Date_Start'],$input['Date_End']);
        $table_to_disable = $input['Gazebo_id'];
        $type_to_disable = $input['Reservation_Type'];
        foreach ($dates_to_disable as $date_to_disable) {
            $already_exists = DisabledTable::table($table_to_disable)->date($date_to_disable)->type($input['Reservation_Type'])->exists();
            if ($already_exists){
                continue;
            }
            $Disabled_Table = new DisabledTable;
            $Disabled_Table->Date = $date_to_disable;
            $Disabled_Table->gazebo_id = $table_to_disable;
            $Disabled_Table->Type = $type_to_disable;
            $Disabled_Table->save();
        }
        $disabled_days = DisabledTable::table($table_to_disable)->type($type_to_disable)->order()->distinct()->pluck('Date');
        return Redirect::back()->with(['Disabled_Days_For_Table'=>$disabled_days]);
    }

    public function Enable_Table(Request $request): \Illuminate\Http\RedirectResponse {
        $date_to_enable = $request->header('X-Date');
        $type_to_enable = $request->header('X-Type');
        $table_to_enable = $request->header('X-Table_id');
        $Disabled_Day = DisabledTable::table($table_to_enable)->date($date_to_enable)->type($type_to_enable)->first();
        if($Disabled_Day)
            $Disabled_Day->delete();
        $disabled_days = DisabledTable::table($table_to_enable)->type($type_to_enable)->order()->distinct()->pluck('Date');
        return Redirect::back()->with(['Disabled_Days_For_Table'=>$disabled_days]);
    }
}
