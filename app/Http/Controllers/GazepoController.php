<?php

namespace App\Http\Controllers;

use App\Http\Resources\GazepoResource;
use App\Http\Resources\MenuResource;
use App\Models\Gazepo;
use App\Models\Menu;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

class GazepoController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        $Gazepo1 = new Gazepo;
            $Gazepo1->number = 1;
            $Gazepo1->save();
        $Gazepo2 = new Gazepo;
            $Gazepo2->number = 2;
            $Gazepo2->save();
        $Gazepo3 = new Gazepo;
            $Gazepo3->number = 3;
            $Gazepo3->save();
        $Gazepo4 = new Gazepo;
            $Gazepo4->number = 4;
            $Gazepo4->save();
        $Gazepo5 = new Gazepo;
            $Gazepo5->number = 5;
            $Gazepo5->save();
        $Gazepo6 = new Gazepo;
            $Gazepo6->number = 6;
            $Gazepo6->save();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function checkAvailability() {
        $Gazepos = Gazepo::all();
        date_default_timezone_set("Europe/Athens");
        $startDate = date("Y-m-d"); // Get today's date
        $currentDate = $startDate;
        $Last_Day = '2023-11-10';
        $Availability = [];
        while ($currentDate <= $Last_Day) {
            $Available_Tables = [];
            $current_reservations_count = Reservation::where('Date',$currentDate)->count();
            if($current_reservations_count === 0 ) {
                $current_date_availibility = ['Date'=>$currentDate,'Available'=>'All'];
                $Availability[] = $current_date_availibility;
            }
            else {
                foreach ($Gazepos as $Gazepo) {
                    $gazepo_is_available = !Reservation::where('Date',$currentDate)
                        ->where('gazepo_id',$Gazepo->id)->exists();
                    if($gazepo_is_available === true)
                        $Available_Tables[] = [(''.$Gazepo->id)=>$gazepo_is_available];
                }
                $Availability[] = ['Date'=>$currentDate,'Available'=>$Available_Tables];
            }
            $currentDate = date("Y-m-d", strtotime($currentDate . " +1 day"));
        }
        return $Availability;
    }

    /**
     * Display the specified resource.
     */
    public function show(Gazepo $gazepo) {
        $Gazepos = GazepoResource::collection(Gazepo::all());
        $Menus = MenuResource::collection(Menu::all());
        $Availability = $this->checkAvailability();
        return Inertia::render('Reservations/Gazepo',
            ['Gazepos'=>$Gazepos,'Menu'=>$Menus,'Availability'=>$Availability]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Gazepo $gazepo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Gazepo $gazepo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gazepo $gazepo)
    {
        //
    }
}
