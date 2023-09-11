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
        'Confirmation_Number',
        'updated_at'
    ];

    protected $hidden = [
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
    // Local scope for phone number ( used for searching ), has to be an exact match.
    public function scopePhone($query,$phone) {
        if($phone !== '')
            return $query->orWhere('Phone_Number',$phone);
        return $query;
    }
    // Local scope for email ( used for searching ), has to be an exact match.
    public function scopeEmail($query,$email) {
        if($email)
            return $query->orWhere('Email',$email);
        return $query;
    }
    // Local scope for first name ( used for searching ), doesn't have to be an exact match.
    public function scopeFirstName($query,$first_name) {
        if($first_name)
            return $query->orWhere('First_Name','LIKE','%'.$first_name.'%');
        return $query;
    }
    // Local scope for last name ( used for searching ), doesn't have to be an exact match.
    public function scopeLastName($query, $last_name) {
        if($last_name)
            return $query->orWhere('Last_Name','LIKE','%'.$last_name.'%');
        return $query;
    }
    // Local scope for confirmation name ( used for searching ), has to be an exact match.
    public function scopeConfirmationNumber($query, $number) {
        if($number)
            return $query->orWhere('Confirmation_Number',$number);
        return $query;
    }
    public function scopeDate($query,$date_start, $date_end = null) {
        if(!$date_end)
            return $query->whereDate('Date',$date_start);

        return $query->where('Date', '>=', $date_start)
            ->where('Date', '<=', $date_end);
    }
    public function scopeTable($query,$table_id) {
        if($table_id)
            return $query->where('gazebo_id',$table_id);

        return $query;
    }
    public function scopeOrder($query,$direction = 'asc') {
        return $query->orderBy('Date',$direction);
    }
    public function scopeStatus($query,$status, $not_in = false) {
        if(!$status)
            return $query;
        if($not_in)
            return $query->whereNot('Status',$status);
        return $query->where('Status',$status);
    }
    public function scopeType($query,$type) {
        if($type === 'All')
            return $query;
        return $query->where('Type',$type);
    }
    public function scopeAfterToday($query) {
        return $query->whereDate('Date','>=',date("Y-m-d"));
    }
}
