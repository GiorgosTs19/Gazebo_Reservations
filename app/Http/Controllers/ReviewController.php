<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller {
    public function create(Request $request) {
        $input = $request->only(['Reservation_id','Overall_Rating','Overall_Comments',
            'Food_Rating','Food_Comments','Space_Rating','Space_Comments']);

        $Review = new Review;
        $Review->reservation_id = $input['Reservation_id'];
        $Review->Overall_Rating = $input['Overall_Rating'];
        $Review->Overall_Comments = $input['Overall_Comments'];
        $Review->Food_Rating = $input['Food_Rating'];
        $Review->Food_Comments = $input['Food_Comments'];
        $Review->Space_Rating = $input['Space_Rating'];
        $Review->Space_Comments = $input['Space_Comments'];
        $Review->save();
    }

    public function show($confimration_number) {
        $Reservation = Reservation::where('Confirmation_Number',$confimration_number)->first();
        if(!$Reservation)
            return Inertia::render('Reviews/ReservationReview',['Reservation'=>$Reservation])->with(['errors'=>['Reservation'=>'Not_Found']]);
        return Inertia::render('Reviews/ReservationReview',['Reservation'=>new ReservationResource($Reservation)]);
    }
}
