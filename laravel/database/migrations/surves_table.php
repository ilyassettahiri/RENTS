<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('surves', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();

            $table->string('surf_category')->nullable();
            $table->string('surf_board_kite')->nullable();
            $table->string('board_types')->nullable();
            $table->string('board_size')->nullable();
            $table->string('wetsuits')->nullable();
            $table->string('paddleboarding')->nullable();
            $table->string('more_details')->nullable();

            $table->string('surf_other')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surves');
    }
};