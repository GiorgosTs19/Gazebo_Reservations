<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return  [
            'id' => $this->id,
            'Name' => $this->Name,
            'is_lactose_free' => $this->is_lactose_free === 1,
            'is_gluten_free' => $this->is_gluten_free === 1,
            'is_wheat_free' => $this->is_wheat_free === 1,
            'is_vegetarian' => $this->is_vegetarian === 1,
            'is_vegan' => $this->is_vegan === 1
        ];
    }
}
