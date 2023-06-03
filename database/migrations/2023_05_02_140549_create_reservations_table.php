<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void  {
        Schema::create('reservations', function (Blueprint $table) {
            $table->uuid('id');
            $table->foreignUuid('gazepo_id');
            $table->dateTime('Date');
            $table->string('Email');
            $table->string('Phone_Number');
            $table->tinyText('Notes')->nullable()->default(null);
            $table->string('Confirmation_Number')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void    {
        Schema::dropIfExists('reservations');
    }
};
