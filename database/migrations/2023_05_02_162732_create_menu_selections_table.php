<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void  {
        Schema::create('menu_selections', function (Blueprint $table) {
            $table->uuid('id');
            $table->foreignUuid('reservation_id');
//                ->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('reservation_room_id');
//                ->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('Main_Dish');
            $table->foreignUuid('Dessert');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void    {
        Schema::dropIfExists('menu_selections');
    }
};
