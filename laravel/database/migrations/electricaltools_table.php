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
        Schema::create('electricaltools', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('zip')->nullable();
            $table->string('country')->nullable();

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();

            $table->string('tool_type')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('condition')->nullable();
            $table->string('voltage')->nullable();
            $table->string('amperage')->nullable();
            $table->string('cord_length')->nullable();
            $table->string('battery_life')->nullable();
            $table->string('display')->nullable();
            $table->string('range_selection')->nullable();
            $table->string('diode')->nullable();
            $table->string('frequency')->nullable();
            $table->string('temperature')->nullable();
            $table->string('voltage_sensing_ranges')->nullable();
            $table->string('detector')->nullable();
            $table->string('operating_altitude')->nullable();
            $table->string('compatible')->nullable();
            $table->string('bending_angle')->nullable();
            $table->string('accessories')->nullable();
            $table->string('style')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('electricaltools');
    }
};
