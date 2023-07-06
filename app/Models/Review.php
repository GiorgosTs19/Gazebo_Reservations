<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model {
    use HasFactory,HasUuids;

    protected $fillable = [
        'reservation_id',
        'Overall_Rating',
        'Overall_Comments',
        'Food_Rating',
        'Food_Comments',
        'Space_Rating',
        'Space_Comments',
    ];
}
