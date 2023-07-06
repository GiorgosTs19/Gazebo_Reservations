<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            'id'=>$this->id,
            'Name'=>$this->Name,
            'Type'=>$this->Type,
            'Category'=>$this->Category,
            'Items'=>MenuItemResource::collection($this->Items()),
        ];
    }
}
