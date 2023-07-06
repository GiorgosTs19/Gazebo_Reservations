<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('reservation_rooms', function (Blueprint $table) {
            $table->uuid('id');
            $table->foreignUuid('reservation_id')->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->string('Room_Number');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_rooms');
    }
};
