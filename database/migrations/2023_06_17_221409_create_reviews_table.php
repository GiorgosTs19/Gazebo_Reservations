<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('reviews', function (Blueprint $table) {
            $table->uuid();
            $table->foreignUuid('reservation_id');
            $table->integer('Overall_Rating');
            $table->text('Overall_Comments');
            $table->integer('Food_Rating');
            $table->text('Food_Comments');
            $table->integer('Space_Rating');
            $table->text('Space_Comments');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
