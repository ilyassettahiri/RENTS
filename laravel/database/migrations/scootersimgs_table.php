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
        Schema::create('scootersimgs', function (Blueprint $table) {
            $table->id();


            $table->foreignId('scooter_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();
                        $table->string('alttext')->nullable();
                        $table->string('picturesxlarge')->nullable();
            $table->string('picturesmall')->nullable();
            $table->string('videosmall')->nullable();
            $table->string('videolarge')->nullable();
            $table->string('videoxlarge')->nullable();
            $table->string('victor')->nullable();
            $table->string('victora')->nullable();
            $table->string('victorb')->nullable();


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
        Schema::dropIfExists('scootersimgs');
    }
};
