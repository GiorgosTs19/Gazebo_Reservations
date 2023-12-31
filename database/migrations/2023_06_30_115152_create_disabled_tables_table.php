<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('disabled_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('gazebo_id');
            $table->string('Date');
            $table->string('Type')->default('Dinner');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('disabled_tables');
    }
};
