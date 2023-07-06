<?php

namespace App\Http\Controllers;

use App\Models\DisabledDay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class DisabledDayController extends Controller {
    public function Disable_Day(Request $request): \Illuminate\Http\RedirectResponse {
        $input = $request->only(['Date']);
        $date_to_disable = $input['Date'];
        $Disabled_Day = new DisabledDay;
        $Disabled_Day->Date = $date_to_disable;
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
