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
            $table->foreignUuid('reservation_id')
                ->constrained('reservations')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('reservation_room_id')
                ->constrained('reservation_rooms')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('Main_Dish')->default('');
            $table->foreignUuid('Dessert')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('menu_selections');
    }
};
