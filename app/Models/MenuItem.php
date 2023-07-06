<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model {
    use HasFactory, HasUuids;

    protected $fillable = [
        'Name',
        'menu_id',
        'is_lactose_free',
        'is_gluten_free',
        'is_wheat_free',
        'is_vegetarian',
        'is_vegan'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'menu_id'
    ];

    public function Menu() {
        return $this->belongsTo(Menu::class);
    }
}
