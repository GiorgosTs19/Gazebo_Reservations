<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisabledDay extends Model {
    use HasFactory;

    public function scopeOrder($query,$direction = 'asc') {
        return $query->orderBy('Date',$direction);
    }

    public function scopeType($query,$type) {
        return $query->where('Type',$type);
    }

    public function scopeDate($query,$date_start, $date_end = null) {
        if(!$date_end)
            return $query->where('Date',$date_start);

        return $query->whereBetween('Date',[$date_start,$date_end]);
    }

    public function scopeAllowReservations($query,$allowance=1) {
        return $query->where('Allow_Existing_Reservations',$allowance);
    }
    public function scopeAfterToday($query) {
        return $query->whereDate('Date','>=',date("Y-m-d"));
    }
}
