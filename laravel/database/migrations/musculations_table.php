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
        Schema::create('musculations', function (Blueprint $table) {
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

            $table->string('brand_name')->nullable();
            $table->string('gym_dimensions')->nullable();
            $table->string('arms')->nullable();
            $table->string('back')->nullable();
            $table->string('shoulders')->nullable();
            $table->string('glutes')->nullable();
            $table->string('legs')->nullable();
            $table->string('chest')->nullable();
            $table->string('abs')->nullable();
            $table->string('cardio_machines')->nullable();
            $table->string('dumbbells')->nullable();
            $table->string('kettlebells')->nullable();
            $table->string('barbell')->nullable();
            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('musculations');
    }
};
