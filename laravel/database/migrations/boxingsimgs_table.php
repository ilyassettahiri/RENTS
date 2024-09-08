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
        Schema::create('boxingsimgs', function (Blueprint $table) {
            $table->id();



            $table->foreignId('boxing_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();
            $table->string('alttext')->nullable();


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
        Schema::dropIfExists('boxingsimgs');
    }
};
