<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model {
    use HasFactory, HasUuids;

    protected $fillable = [
        'gazebo_id',
        'First_Name',
        'Last_Name',
        'Date',
        'Email',
        'Phone_Number',
        'Notes',
        'Confirmation_Number'
    ];

    protected $hidden = [
        'updated_at',
    ];

    public function Attendees(): \Illuminate\Database\Eloquent\Relations\HasMany {
        return $this->hasMany(ReservationAttendee::class);
    }

    public function Rooms(): \Illuminate\Database\Eloquent\Relations\HasMany {
        return $this->hasMany(ReservationRoom::class);
    }

    public function Menus(): \Illuminate\Database\Eloquent\Relations\HasMany {
        return $this->hasMany(MenuSelection::class);
    }

//    public function Gazebo(): \Illuminate\Database\Eloquent\Relations\HasOne {
//        return Ga;
//    }
}
