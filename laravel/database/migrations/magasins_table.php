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
        Schema::create('magasins', function (Blueprint $table) {
            $table->id();




            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();

            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('property_type')->nullable();
            $table->string('surface_area')->nullable();
            $table->string('capacity')->nullable();
            $table->string('dock_high')->nullable();
            $table->string('offices_number')->nullable();
            $table->string('storage_space')->nullable();
            $table->string('sales_area')->nullable();
            $table->string('individual_offices')->nullable();
            $table->string('ground_doors')->nullable();
            $table->string('ceiling_height')->nullable();
            $table->string('floors')->nullable();
            $table->string('rollup_door')->nullable();
            $table->string('elevator')->nullable();
            $table->string('garage')->nullable();
            $table->string('furniture')->nullable();
            $table->string('heating')->nullable();
            $table->string('air_conditioning')->nullable();
            $table->string('office_space')->nullable();
            $table->string('internet')->nullable();
            $table->string('water_and_drains')->nullable();
            $table->string('security_camera')->nullable();
            $table->string('speciality_power')->nullable();
            $table->string('overnight_parking')->nullable();
            $table->string('approved_uses')->nullable();
            $table->string('open_space')->nullable();
            $table->string('racked_space')->nullable();
            $table->string('certifications')->nullable();
            $table->string('facilities')->nullable();
            $table->string('operating_days')->nullable();
            $table->string('operating_hours')->nullable();
            $table->string('on_the_road')->nullable();
            $table->string('reception')->nullable();
            $table->string('telephone_wiring')->nullable();
            $table->string('lighting')->nullable();
            $table->string('transports')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('more_details')->nullable();
            $table->string('amenities')->nullable();

            $table->string('facility_size')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('magasins');
    }
};
