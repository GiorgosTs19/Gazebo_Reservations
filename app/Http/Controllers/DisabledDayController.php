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
        $already_exists = DisabledDay::where('Date',$date_to_disable)->exists();
        if ($already_exists)
            return Redirect::back();
        $Disabled_Day = new DisabledDay;
        $Disabled_Day->Date = $date_to_disable;
        $Disabled_Day->Type = $input['Type'];
        $Disabled_Day->Allow_Existing_Reservations = $should_allow_existing_reservations;
        $Disabled_Day->save();

        return Redirect::back();
    }
    public function Enable_Day(Request $request): \Illuminate\Http\RedirectResponse {
        $date_to_enable = $request->header('X-Date');
        $Disabled_Day = DisabledDay::where('Date',$date_to_enable)->first();
        if($Disabled_Day)
            $Disabled_Day->delete();

        return Redirect::back();
    }
}
