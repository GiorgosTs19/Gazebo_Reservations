<?php

namespace App\Http\Resources;

use App\Models\Gazebo;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $this->load('Attendees', 'Rooms', 'Menus');

        return [
            'id'=>$this->id,
            'Gazebo'=>$this->gazebo_id,
            'Name'=>['First'=>$this->First_Name,'Last'=>$this->Last_Name],
            'Date'=>$this->Date,
            'Contact'=>['Email'=>$this->Email,'Phone'=>$this->Phone_Number],
            'Notes'=>$this->Notes,
            'Confirmation_Number'=>$this->Confirmation_Number,
            'Rooms' => $this->Rooms,
            'Attendees' => $this->Attendees,
            'Menus' => MenuSelectionResource::collection($this->Menus),
            'Status' => $this->Status,
            'Type' => $this->Type,
            'Placed_At' => $this->created_at,
            'Updated_At' => $this->updated_at
        ];
    }
}
