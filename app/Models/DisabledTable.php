<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisabledTable extends Model {
    use HasFactory;

    public function scopeTable($query,$table_id) {
        if($table_id)
            return $query->where('gazebo_id',$table_id);

        return $query;
    }

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
}
