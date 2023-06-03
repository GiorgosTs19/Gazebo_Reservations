<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model {
    use HasFactory, HasUuids;

    protected $fillable = [
        'Name',
        'Menu_ID',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'Menu_ID'
    ];

    public function Menu() {
        return $this->belongsTo(Menu::class);
    }
}
