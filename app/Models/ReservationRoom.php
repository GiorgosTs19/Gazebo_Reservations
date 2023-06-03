<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationRoom extends Model {
    use HasFactory,HasUuids;

    protected $fillable = [
        'reservation_id',
        'Room_Number',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
