<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model {
    use HasUuids;
    protected $fillable = [
        'Name'
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function Items() {
        return $this->hasMany(MenuItem::class)->get();
    }
}
