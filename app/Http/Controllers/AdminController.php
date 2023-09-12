<?php

namespace App\Http\Controllers;

use App\Http\Resources\BedSettingsResource;
use App\Http\Resources\DinnerSettingsResource;
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
use Inertia\Inertia;

class AdminController extends Controller {
    public function showAdminPanel(Request $request): \Inertia\Response {
        return Inertia::render('Admin/AdminPanel',['Menus' => fn () => $this->retrieveMenus(),
            'Disabled_Days' => $this->retrieveDisabledDays(),
            'Gazebos' => fn () => $this->retrieveGazebos(),
            'Dinner_Settings' => fn () => $this->retrieveDinnerSettings(),
            'Bed_Settings' => fn () => $this->retrieveBedSettings(),
            'current_day_reservations' => fn () => $this->retrieveCurrentDayReservations($request),
            'Disabled_Dates_Reservations' => fn () => $this->retrieveDateConflicts(),
            'Disabled_Table_Reservations' => fn () => $this->retrieveTableConflicts(),
            'activeReservation' => Inertia::lazy( fn () =>$this->retrieveActiveReservation($request)),
            'availability_for_date' => Inertia::lazy(fn () => $this->retrieveAvailabilityForDate($request)),
            'search_result' => Inertia::lazy(fn ()=>$this->retrieveSearchResult($request)),
            'availability_for_date_range' => Inertia::lazy(fn ()=>$this->retrieveAvailabilityForDateRange($request)),
            'reservations_of_table' => Inertia::lazy(fn () => $this->retrieveTableReservations($request)),
            'disabled_days_for_table' => Inertia::lazy(fn () => $this->retrieveTableDisabledDays($request))]);
    }

    private function retrieveDisabledDays () {
        // Retrieve all the days that were disabled by the admins, regardless of type
        $Disabled_Days = DisabledDay::afterToday()->order()->get();
        $DinnerDisabledDays = $Disabled_Days->filter(function ($item) {return $item->Type == 'Dinner';});
        $BedDisabledDays = $Disabled_Days->filter(function ($item) {return $item->Type == 'Bed';});
        return ['Dinner' => $DinnerDisabledDays,
            'Bed' => $BedDisabledDays];
}
    protected function retrieveGazebos(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection {
        return GazeboResource::collection(Gazebo::all());
    }

    protected function retrieveDinnerSettings(): DinnerSettingsResource {
        return new DinnerSettingsResource(DinnerSetting::first());
    }

    protected function retrieveBedSettings(): BedSettingsResource {
        return new BedSettingsResource(BedSetting::first());
    }

    protected function retrieveMenus() {
        // Retrieve all the menus, regardless of type
        $Dinner_Menus_DB = Menu::where('Type','Dinner')->get();
        // Filter out dinner and sea bed menus respectively.
        $Dinner_Menus = ['Mains'=>MenuResource::collection($Dinner_Menus_DB->filter(function ($item) {
            return  $item->Category == 'Main';
        })),
            'Desserts'=>MenuResource::collection($Dinner_Menus_DB->filter(function ($item) {
                return  $item->Category == 'Dessert';
            }))];
        $Bed_Menus = MenuResource::collection(Menu::where('Type','Bed')->get());

        return ['Dinner'=>$Dinner_Menus,'Bed'=>$Bed_Menus];
    }

    protected function retrieveActiveReservation($request): ?ReservationResource {
        // True when a request that requires the activeReservation of that time to be returned is fired.
        if($request->session()->exists('activeReservation'))
           return new ReservationResource(Reservation::find($request->session()->get('activeReservation')));
        return null;
    }

    protected function retrieveCurrentDayReservations($request) {
        // True when a request that requires the activeReservation of that time to be returned is fired.
        if($request->session()->exists('current_day_reservations'))
           return $request->session()->get('current_day_reservations');
        $type = $request->exists('type') ? $request->only('type')['type'] : 'Dinner';
        return ReservationResource::collection(Reservation::date(date('y-m-d'))->type($type)->get());
    }

    protected function retrieveAvailabilityForDate($request) {
        // True when a request for a specific date's availability is fired.
        if($request->session()->exists('availability_for_date')) {
            return $request->session()->get('availability_for_date');
        }
        return [];
    }

    protected function retrieveAvailabilityForDateRange($request) {
        // True when a request for a specific date range availability is fired.
        if($request->session()->exists('availability_for_date_range'))
            return $request->session()->get('availability_for_date_range');
        return null;
    }

    protected function retrieveSearchResult($request) {
        // True when a search request is fired.
        if($request->session()->exists('search_result'))
            return $request->session()->get('search_result');
        return [];
    }

    protected function retrieveTableReservations($request) {
        // True when a request for a specific table's reservations is fired.
        if($request->session()->exists('reservations_of_table'))
            return $request->session()->get('reservations_of_table');
        return [];
    }

    protected function retrieveTableDisabledDays($request) {
        if($request->session()->exists('Disabled_Days_For_Table'))
            return $request->session()->get('Disabled_Days_For_Table');
        return [];
    }

    protected function retrieveTableConflicts(): array
    {
        // Retrieve all the disabled tables ( only the date and their ids ) after today.
        $Disabled_Tables = DisabledTable::afterToday()->order()->get(['gazebo_id', 'Date', 'Type']);
        $Conflicts = [];
        foreach ($Disabled_Tables as $disabled_Table) {
            $Reservations_Found = Reservation::date($disabled_Table->Date)->table($disabled_Table->gazebo_id)
                ->status('Cancelled', true)->get();
            $Conflicts = [...$Conflicts,...$Reservations_Found];
        }
        return $Conflicts;
    }

    protected function retrieveDateConflicts(): array
    {
        $Disabled_Days = DisabledDay::afterToday()->order()->get();
        $Conflicts = [];
        foreach ($Disabled_Days as $disabled_Day) {
            if(!!$disabled_Day->Allow_Existing_Reservations)
                continue;
            $Reservations_Found = Reservation::date($disabled_Day->Date)->status('Cancelled', true)->get();
            $Conflicts = [...$Conflicts,...$Reservations_Found];
        }
        return $Conflicts;
    }
}
