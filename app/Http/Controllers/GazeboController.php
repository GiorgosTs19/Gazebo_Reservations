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

    /**
     * Store a newly created resource in storage.
     */
    public static function checkAvailability($Gazebos,$type,$Disabled_Days,$Disabled_Tables): array {
        date_default_timezone_set("Europe/Athens");
        $startDate = date("Y-m-d"); // Get today's date
        $currentDate = $startDate;
        $Last_Day = $type === 'Dinner' ? DinnerSetting::first()->Ending_Date : BedSetting::first()->Ending_Date ;
        $Availability = [];
        $Reservations_of_Type = Reservation::where('Type',$type)->where('Date', '>=', $startDate)->get();
        $Disabled_Tables_Of_Type = $Disabled_Tables->filter(function ($entry) use($type)  {
           return $entry->Type === $type;
        });
        while ($currentDate <= $Last_Day) {
            $Available_Tables = [];
            $current_date_reservations = $Reservations_of_Type->filter(function ($item) use ($currentDate) {
                return  date("Y-m-d", strtotime($item->Date)) === $currentDate;
            });
            $Disabled_Tables_Of_Type_Of_Date = $Disabled_Tables_Of_Type->filter(function ($item) use ($currentDate) {
               return $item->Date === $currentDate;
            });
            $current_reservations_count = $current_date_reservations->count();
            $is_current_date_disabled = $Disabled_Days->first(function ($item) use ($currentDate, $type) {
                return $item->Date == $currentDate && $item->Type == $type;
            });

//            if($current_reservations_count === 0 ) {
//                    $current_date_availability = ['Date'=>$currentDate,'Available'=>'All','Disabled'=>$is_current_date_disabled];
//                    $Availability[] = $current_date_availability;
//            }
//            else {
                foreach ($Gazebos as $Gazebo) {
                    $gazebo_is_available = !$current_date_reservations->contains('gazebo_id',$Gazebo->id) && !$Disabled_Tables_Of_Type_Of_Date->contains('gazebo_id',$Gazebo->id);
//                    if($gazebo_is_available === true)
                        $Available_Tables[] = [(''.$Gazebo->id)=>$gazebo_is_available];
                }
                $Availability[] = ['Date'=>$currentDate,'Available'=>$Available_Tables,'Disabled'=>$is_current_date_disabled];
//            }
            $currentDate = date("Y-m-d", strtotime($currentDate . " +1 day"));
        }
        return $Availability;
    }

    public static function getAdminReservations($type, $Disabled_Days, $settings, $Disabled_Tables): array {
        date_default_timezone_set("Europe/Athens");
        $startDate = date("Y-m-d"); // Get today's date
        $currentDate = $startDate;
        $Last_Day = $settings->Ending_Date;
        $Reservations = [];
        $Reservations_of_Type = Reservation::type($type)->where('Date', '>=', $startDate)->get();
        $Date_Conflicts = [];
        $Table_Conflicts = [];
        while ($currentDate <= $Last_Day) {
            $Disabled_Day = $Disabled_Days->first(function ($item) use ($currentDate, $type) {
                return $item->Date == $currentDate && $item->Type == $type;
            });
            $is_current_date_disabled = $Disabled_Day !== null;
            if($is_current_date_disabled)
                $allows_existing_reservations = $Disabled_Day->Allow_Existing_Reservations;
            else
                $allows_existing_reservations = 1;

            $Disabled_Tables_Of_Day = $Disabled_Tables->filter(function ($table) use ($currentDate) {
               return $table->Date === $currentDate;
            });

            $currentDate_Reservations = $Reservations_of_Type->filter(function ($item) use ($currentDate) {
                return  date("Y-m-d", strtotime($item->Date)) === $currentDate;
            });

            // If the date is disabled and the date doesn't allow any reservations to be fulfilled, then add those reservations
            // to the Date conflicts array.
            if(!$allows_existing_reservations && !$currentDate_Reservations->isEmpty()) {
                $Date_Conflicts = [...$Date_Conflicts,...$currentDate_Reservations->toArray()];
            }
            // Gets all the disabled tables for the current date and checks if any of those have an active reservation,
            // if yes, add it to Table conflicts array.
            foreach ($Disabled_Tables_Of_Day as $table) {
                $Reservation_Found = $currentDate_Reservations->first(function ($reservation) use ($table) {
                        return $reservation->gazebo_id === $table->gazebo_id;});
                if($Reservation_Found  !== null )
                    $Table_Conflicts = [...$Table_Conflicts,$Reservation_Found];
            }

            // Add a new row to the reservations table, include the current date, the Reservations taking place at the current date,
            // the available tables on that date, a boolean to indicate if the current date is disabled by an admin, and a boolean to
            // indicate ( if the date is disabled by an admin ) whether any existing reservation on that date are allowed.
            $Reservations[] = ['Date'=>$currentDate,'Reservations'=>ReservationResource::collection($currentDate_Reservations),
                'Disabled'=>$is_current_date_disabled, 'Existing_Reservations_Allowed'=>$allows_existing_reservations];

            $currentDate = date("Y-m-d", strtotime($currentDate . " +1 day"));
        }

        return [$Reservations, $Date_Conflicts, $Table_Conflicts];
    }

    /**
     * Display the specified resource.
     */
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
        $Disabled_Days = DisabledDay::where('Date', '>=', date("Y-m-d"))->get();
        $Gazebos = GazeboResource::collection(Gazebo::all());
        $Bed_Menus = MenuResource::collection(Menu::where('Type','Bed')->get());
        $Disabled_Tables = DisabledTable::all();
        $Dinner_Menus = ['Mains'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Main')->get()),
            'Desserts'=>MenuResource::collection(Menu::where('Type','Dinner')->where('Category','Dessert')->get())];
        $Availability = ['Dinner' => self::checkAvailability($Gazebos,'Dinner',$Disabled_Days,$Disabled_Tables),
            'Morning' => self::checkAvailability($Gazebos,'Bed',$Disabled_Days,$Disabled_Tables)];
        $Dinner_Settings = DinnerSetting::first();
        $Bed_Settings = BedSetting::first();
        return Inertia::render('Reservations/Gazebo',
            ['Gazebos'=>$Gazebos,'Menu'=>['Morning'=>$Bed_Menus,'Dinner'=>$Dinner_Menus],'Availability'=>$Availability,'Settings'=>['Dinner'=>$Dinner_Settings,
                'Bed'=>$Bed_Settings],'SelectedDate'=>$selectedDate, 'SelectedType' => $selectedType, 'SelectedPeople' => $selectedPeople]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function getAvailabilityForDate(Request $request) {
        $input = $request->only(['date','get_reservations','type']);
        $getReservations = false;
        if($request->has('get_reservations'))
            $getReservations = $input['get_reservations'];
        $Availability = [];
        $Gazebos = Gazebo::all();
        $Reservations = Reservation::date($input['date'])->get();
        $Disabled_Tables_Of_Day = DisabledTable::date($input['date'])->type($input['type'])->get()->pluck('gazebo_id');
        if(!$getReservations)
            $Reservations = $Reservations->pluck('gazebo_id');

        foreach ($Gazebos as $gazebo) {
            $Availability[] = ['id' => $gazebo->id, 'isAvailable' => self::getBoolean($Reservations,$gazebo,$Disabled_Tables_Of_Day)];
        }
        return Redirect::back()->with(['availability_for_date'=> $getReservations ? $Reservations : $Availability]);
    }

    protected  function getBoolean($Reservations,$gazebo,$Disabled_Tables_Of_Day) {
            if($Reservations->contains($gazebo->id))
                return false;
            if($Disabled_Tables_Of_Day->contains($gazebo->id))
                return false;
            return true;
    }

    public function getAvailabilityForDates(Request $request) {
        $input = $request->only(['date_start','date_end','type']);
        $Reservations = Reservation::date($input['date_start'],$input['date_end'])->type($input['type'])->orderBy('Date', 'asc')->get();
        return Redirect::back()->with(['availability_for_date_range'=>$Reservations]);
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
