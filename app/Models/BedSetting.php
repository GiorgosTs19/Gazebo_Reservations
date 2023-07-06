<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BedSetting extends Model {
    use HasFactory;
    protected $fillable = [
        'Starting_Date',
        'Ending_Date',
        'Arrival_Time',
        'Departure_Time',
        'Date_Notes',
        'Finalization_Notes',
    ];

    protected $hidden = [
        'created_at',
        'id'
    ];
}
