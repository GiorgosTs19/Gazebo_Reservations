<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReservationAttendee extends Model {
    use HasFactory,HasUuids;

    protected $fillable = [
        'reservation_id',
        'Name',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'id'
    ];

    public function Reservation(): \Illuminate\Database\Eloquent\Relations\BelongsTo {
        return $this->belongsTo(Reservation::class);
    }
}
