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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('type')->nullable();
            $table->string('equipment')->nullable();
            $table->string('insurance')->nullable();
            $table->string('age_requirement')->nullable();
            $table->string('duration')->nullable();
            $table->string('photo_video')->nullable();
            $table->string('meals_drinks')->nullable();
            $table->string('language')->nullable();
            $table->string('cancellation')->nullable();
            $table->string('weight_allowed')->nullable();
            $table->string('safety_equipment')->nullable();
            $table->string('monitor')->nullable();
            $table->string('more_details')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};