<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        $starting_date = date('Y-m-d');
        $ending_date = date('Y-m-d', strtotime('Dec 31'));
        $arrival_time_start = '21:00';

        Schema::create('dinner_settings', function (Blueprint $table)
        use ($starting_date, $arrival_time_start, $ending_date) {
            $table->id();
            $table->date('Starting_Date')->default($starting_date);
            $table->date('Ending_Date')->default($ending_date);
            $table->string('Arrival_Time_Start')->default($arrival_time_start);
            $table->string('Arrival_Time_End')->nullable();
            $table->string('Departure_Time')->nullable();
            $table->tinyText('Date_Notes')->nullable();
            $table->tinyText('Finalization_Notes')->nullable();
            $table->timestamps();
        });
        Schema::create('bed_settings', function (Blueprint $table)
        use ($starting_date, $arrival_time_start, $ending_date){
            $table->id();
            $table->date('Starting_Date')->default($starting_date);
            $table->date('Ending_Date')->default($ending_date);
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
