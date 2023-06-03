<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $Attendees = $this->Attendees();
        $Rooms = $this->Rooms();
        $Menus = $this->Menus();
        $Gazepo = $this->Gazepo();
        return [
            'Reservation'=>$this,
            'Rooms' => $Rooms,
            'Attendees' => $Attendees,
            'Menus' => $Menus,
            'Gazepo' => $Gazepo
        ];
    }
}
