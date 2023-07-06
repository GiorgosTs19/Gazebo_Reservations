<?php

namespace App\Http\Resources;

use App\Models\Menu;
use App\Models\ReservationRoom;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuSelectionResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $Main_Menu = Menu::find($this->Main_Dish);
        if($Main_Menu->Items()->count() > 1)
            $Main = $Main_Menu->Name;
        else
            $Main = $Main_Menu->Items()[0]->Name;
        $Dessert_Menu = Menu::find($this->Dessert);
        if($Dessert_Menu->Items()->count() > 1)
            $Dessert = $Dessert_Menu->Name;
        else
            $Dessert = $Dessert_Menu->Items()[0]->Name;
        $Room = ReservationRoom::find($this->reservation_room_id)->Room_Number;
        return [
            'id'=>$this->id,
            'Main'=>$Main ,
            'Dessert'=>$Dessert,
            'Room' => $Room,
        ];
    }
}
