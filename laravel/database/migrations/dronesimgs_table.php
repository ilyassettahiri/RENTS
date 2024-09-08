<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dronesimgs', function (Blueprint $table) {
            $table->id();


            $table->foreignId('drone_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();
                        $table->string('alttext')->nullable();
            $table->string('picturesmall')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dronesimgs');
    }
};
