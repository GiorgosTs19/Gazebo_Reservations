<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('dinner_settings', function (Blueprint $table) {
            $table->id();
            $table->date('Starting_Date');
            $table->date('Ending_Date');
            $table->string('Arrival_Time_Start');
            $table->string('Arrival_Time_End')->nullable();
            $table->string('Departure_Time')->nullable();
            $table->tinyText('Date_Notes')->nullable();
            $table->tinyText('Finalization_Notes')->nullable();
            $table->timestamps();
        });
        Schema::create('bed_settings', function (Blueprint $table) {
            $table->id();
            $table->date('Starting_Date');
            $table->date('Ending_Date');
            $table->string('Arrival_Time')->nullable();
            $table->string('Departure_Time')->nullable();
            $table->tinyText('Date_Notes')->nullable();
            $table->tinyText('Finalization_Notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('dinner_settings');
        Schema::dropIfExists('bed_settings');
    }
};
