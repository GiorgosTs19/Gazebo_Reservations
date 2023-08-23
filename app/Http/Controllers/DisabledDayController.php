<?php

namespace App\Http\Controllers;

use App\Models\DisabledDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class DisabledDayController extends Controller {
    public function Disable_Day(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Date','Allow_Existing_Reservations','Type']);
        $date_to_disable = $input['Date'];
        $should_allow_existing_reservations = $input['Allow_Existing_Reservations'];
        $already_exists = DisabledDay::date($date_to_disable)->type($input['Type'])->exists();
        if ($already_exists)
            return Redirect::back();
        $Disabled_Day = new DisabledDay;
        $Disabled_Day->Date = $date_to_disable;
        $Disabled_Day->Type = $input['Type'];
        $Disabled_Day->Allow_Existing_Reservations = $should_allow_existing_reservations;
        $Disabled_Day->save();

        return Redirect::back();
    }

    public function Disable_Days(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Date_Start','Date_End','Allow_Existing_Reservations','Type']);
        $dates_to_disable = self::getDatesBetween($input['Date_Start'],$input['Date_End']);
        $should_allow_existing_reservations = $input['Allow_Existing_Reservations'];
        foreach ($dates_to_disable as $date_to_disable) {
            $already_exists = DisabledDay::date($date_to_disable)->type($input['Type'])->exists();
            if ($already_exists){
                continue;
            }
            $Disabled_Day = new DisabledDay;
            $Disabled_Day->Date = $date_to_disable;
            $Disabled_Day->Type = $input['Type'];
            $Disabled_Day->Allow_Existing_Reservations = $should_allow_existing_reservations;
            $Disabled_Day->save();
        }

        return Redirect::back();
    }

    public function Enable_Day(Request $request): \Illuminate\Http\RedirectResponse {
        $date_to_enable = $request->header('X-Date');
        $type_to_enable = $request->header('X-Type');
        $Disabled_Day = DisabledDay::date($date_to_enable)->type($type_to_enable)->first();
        if($Disabled_Day)
            $Disabled_Day->delete();

        return Redirect::back();
    }

    static function getDatesBetween($start_date, $end_date): array {
        $dates = [];
        $current_date = strtotime($start_date);
        $end_timestamp = strtotime($end_date);

        while ($current_date <= $end_timestamp) {
            $dates[] = date("Y-m-d", $current_date);
            $current_date = strtotime("+1 day", $current_date);
        }

        return $dates;
    }
}
