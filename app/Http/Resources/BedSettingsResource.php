<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BedSettingsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'Arrival_Start' => $this->Arrival_Time ?: '',
//            'Departure' => $this->Departure_Time ?: '',
            'First_Day' => $this->Starting_Date ?: '',
            'Last_Day' => $this->Ending_Date ?: '',
            'Arrival_Message' => $this->Date_Notes ?: '',
        ];
    }
}
