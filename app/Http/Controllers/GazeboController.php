<?php

namespace App\Http\Controllers;

use App\Http\Resources\GazeboResource;
use App\Http\Resources\MenuResource;
use App\Http\Resources\ReservationResource;
use App\Models\BedSetting;
use App\Models\DinnerSetting;
use App\Models\DisabledDay;
use App\Models\DisabledTable;
use App\Models\Gazebo;
use App\Models\Menu;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GazeboController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    public static function checkRangeAvailability(Request $request) {
        $input = $request->only(['date_start', 'date_end', 'type', 'withDisabledTables']);
        $withDisabledTables = $request->exists('withDisabledTables') ? $input['withDisabledTables'] : true;
        $Reservations = Reservation::date($input['date_start'],
            $input['date_end'])->type($input['type'])->orderBy('Date', 'asc')->
        status('Cancelled', true)->get(['Date','gazebo_id']);
        if(filter_var($withDisabledTables, FILTER_VALIDATE_BOOLEAN)) {
            $Disabled_Tables = DisabledTable::date($input['date_start'],
                $input['date_end'])->type($input['type'])->get(['Date','gazebo_id']);
        }
        return Redirect::back()->with(['availability_for_date_range'=>[...$Reservations, ...$Disabled_Tables ?? []]]);

    }

    public function show(Request $request) {
        $selectedDate = '';
        $selectedType = '';
        $selectedPeople = 0;
        if($request->exists('selectedDate'))
            $selectedDate = $request->only(['selectedDate'])['selectedDate'];
        if($request->exists('selectedDate'))
            $selectedType = $request->only(['selectedType'])['selectedType'];
        if($request->exists('selectedPeople'))
            $selectedPeople = $request->only(['selectedPeople'])['selectedPeople'];
        $Dinner_Settings = DinnerSetting::first();
        $Bed_Settings = BedSetting::first();
        // Retrieve all the days that were disabled by the admins, regardless of type
        $Disabled_Days = DisabledDay::afterToday()->order()->get(['Date','Type']);
        $Gazebos = GazeboResource::collection(Gazebo::all());
        $Bed_Menus = MenuResource::collection(Menu::where('Type','Bed')->get());
        $Dinner_Menus = ['Mains'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Main')->get()),
            'Desserts'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Dessert')->get())];

        return Inertia::render('Reservations/Gazebo',
            ['Gazebos'=>$Gazebos,
            'Menu'=>['Morning'=>$Bed_Menus, 'Dinner'=>$Dinner_Menus],
            'availability_for_date_range' => fn () => $this->getSessionAvailabilityForRange($request),
            'availability_for_date' => fn () => $this->getSessionAvailabilityForDate($request),
            'Settings'=>['Dinner'=>$Dinner_Settings, 'Bed'=>$Bed_Settings],
            'SelectedDate'=>$selectedDate, 'SelectedType' => $selectedType, 'SelectedPeople' => $selectedPeople,
            'Disabled_Days'=>$Disabled_Days,
            'Menu_Items'=>Inertia::lazy(fn () => $this->getMenuItems($request))]);
    }

    protected function getSessionAvailabilityForRange(Request $request) {
        if($request->session()->exists('availability_for_date_range'))
            return $request->session()->get('availability_for_date_range');
    }

    protected function getSessionAvailabilityForDate(Request $request) {
        if($request->session()->exists('availability_for_date'))
            return $request->session()->get('availability_for_date');
    }

    protected function getMenuItems($request) {
        if($request->session()->exists('Menu_Items'))
            return $request->session()->get('Menu_Items');
    }

    public function getAvailabilityForDate(Request $request) {
        $input = $request->only(['date','type', 'exceptCancelled']);
        $Availability = [];

        $Gazebos = Gazebo::all();

        $Reservations = Reservation::date($input['date'])->type($input['type'])->when($request->exists('exceptCancelled'), function ($query) use ($input) {
            return $query->status('Cancelled', $input['exceptCancelled']);
        })->get();

        $Disabled_Tables_Of_Day = DisabledTable::date($input['date'])->type($input['type'])->get('gazebo_id');

        foreach ($Gazebos as $gazebo) {
            $Availability[] = ['id' => $gazebo->id, 'isAvailable' => self::getBoolean($Reservations,$gazebo,$Disabled_Tables_Of_Day)];
        }

        return Redirect::back()->with(['availability_for_date'=>$Availability]);
    }

    protected  function getBoolean($Reservations,$gazebo,$Disabled_Tables_Of_Day) {
            if($Reservations->contains('gazebo_id',$gazebo->id))
                return false;
            if($Disabled_Tables_Of_Day->contains('gazebo_id',$gazebo->id))
                return false;
            return true;
    }

    public function getReservationsForDates(Request $request) {
        $input = $request->only(['date_start', 'date_end', 'type', 'activeReservation', 'exceptCancelled']);
        $Reservations = Reservation::date($input['date_start'],$input['date_end'])->type($input['type'])->orderBy('Date', 'asc')
            ->status('Cancelled',true)->with(['Rooms'])->get();
        return Redirect::back()->with(['availability_for_date_range'=>$Reservations, 'activeReservation'=>$request->exists('activeReservation') ? $input['activeReservation'] : '']);
    }

    public function getCancelledReservations (Request $request) {
        $type = $request->exists('type') ? $request->only('type')['type'] : 'Dinner';
        $Reservations = Reservation::type($type)->status('Cancelled')->afterToday()->with(['Rooms'])->get();
        return Redirect::back()->with(['cancelled_reservations'=>$Reservations]);
    }

    public function getReservationsForDate(Request $request) {
        $input = $request->only(['date', 'type', 'activeReservation', 'exceptCancelled']);
        $Reservations = Reservation::date($input['date'])->type($input['type'])
            ->when($request->exists('exceptCancelled'), function ($query) use ($input) {
            return $query->status('Cancelled', $input['exceptCancelled']);
        })->with(['Rooms'])->get();
        return Redirect::back()->with(['availability_for_date' => $Reservations,
            'activeReservation'=>$request->exists('activeReservation') ? $input['activeReservation'] : '']);
    }

    protected function getCurrenDayReservations(Request $request) {
        $request->session()->keep(['errors']);
        $type = $request->only('type')['type'];
        return Redirect::back()->with(['current_day_reservations' => Reservation::date(date('y-m-d'))->type($type)->with(['Rooms'])->get()]);
    }

    /**
     * Returns all the reservations of the specified table, within the date range set in the settings starting from today.
     * Can also return the days when the table is disabled by the admins, by passing the get_disabled_days prop as true.
     */
    public function getReservationsForTable(Request $request) {
        $input = $request->only(['gazebo_id','reservation_type','get_disabled_days']);
        $get_disabled_days = false;
        if($request->has('get_disabled_days'))
            $get_disabled_days = $input['get_disabled_days'];
        $Settings = $input['reservation_type'] === 'Dinner' ? DinnerSetting::first() : BedSetting::first();
        $reservations_to_return = Reservation::type($input['reservation_type'])->date(date("Y-m-d"),$Settings->Ending_Date)->table($input['gazebo_id'])->order()
            ->distinct()->pluck('Date');
        $disabled_days = DisabledTable::table($input['gazebo_id'])->type($input['reservation_type'])->order()->distinct()->pluck('Date');
        return Redirect::back()->with(['reservations_of_table'=>$get_disabled_days ?  [$reservations_to_return,$disabled_days] : $reservations_to_return]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gazebo $gazebo) {
        //
    }
}
