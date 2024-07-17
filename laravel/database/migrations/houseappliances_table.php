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
        Schema::create('houseappliances', function (Blueprint $table) {
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

            $table->string('brand_name')->nullable();
            $table->string('capacity')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('access_location')->nullable();
            $table->string('finish_type')->nullable();
            $table->string('cycle_options')->nullable();
            $table->string('weight')->nullable();
            $table->string('automatic')->nullable();
            $table->string('max_spin_speed')->nullable();
            $table->string('load_capacity')->nullable();
            $table->string('inlet_water')->nullable();
            $table->string('wheels')->nullable();
            $table->string('installation_method')->nullable();
            $table->string('components')->nullable();
            $table->string('control_type')->nullable();
            $table->string('water_consumption')->nullable();
            $table->string('certification')->nullable();
            $table->string('cooling_power')->nullable();
            $table->string('care_instructions')->nullable();
            $table->string('cable_length')->nullable();
            $table->string('heat_output')->nullable();
            $table->string('gpm')->nullable();
            $table->string('btu')->nullable();
            $table->string('wattage')->nullable();

            $table->string('more_details')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('houseappliances');
    }
};
