<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuSelection extends Model   {
    use HasFactory, HasUuids;

    protected $fillable = [
        'reservation_room_id',
        'reservation_id',
        'Main_Dish',
        'Desert'
    ];

    public function Reservation(): \Illuminate\Database\Eloquent\Relations\BelongsTo {
        return $this->belongsTo(Reservation::class);
    }
}
