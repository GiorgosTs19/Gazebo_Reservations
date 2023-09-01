<?php

use App\Models\Gazebo;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */

    public function create() {
        $Gazepo1 = new Gazebo;
        $Gazepo1->number = 1;
        $Gazepo1->save();
        $Gazepo2 = new Gazebo;
        $Gazepo2->number = 2;
        $Gazepo2->save();
        $Gazepo3 = new Gazebo;
        $Gazepo3->number = 3;
        $Gazepo3->save();
        $Gazepo4 = new Gazebo;
        $Gazepo4->number = 4;
        $Gazepo4->save();
        $Gazepo5 = new Gazebo;
        $Gazepo5->number = 5;
        $Gazepo5->save();
        $Gazepo6 = new Gazebo;
        $Gazepo6->number = 6;
        $Gazepo6->save();
    }

    public function up(): void  {
        Schema::create('gazebos', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->integer('Number');
            $table->timestamps();
        });
        $this->create();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void    {
        Schema::dropIfExists('gazebos');
    }
};
