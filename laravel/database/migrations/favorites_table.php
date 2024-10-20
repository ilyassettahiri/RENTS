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
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('seller_id');
            $table->string('category')->nullable();
            $table->string('picture')->nullable();
            $table->string('title')->nullable();

            $table->string('listing_old')->nullable();
            $table->string('city')->nullable();


            $table->decimal('price', 10, 2)->nullable();
            $table->string('url');
            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled','paid', 'completed'])->default('pending');
            $table->enum('admin_status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled','paid', 'completed', 'accepted', 'rejected'])->default('pending');

            $table->foreignId('billiard_id')->nullable();


            $table->foreignId('boxing_id')->nullable();
            $table->foreignId('diving_id')->nullable();
            $table->foreignId('football_id')->nullable();
            $table->foreignId('golf_id')->nullable();
            $table->foreignId('hunting_id')->nullable();
            $table->foreignId('musculation_id')->nullable();
            $table->foreignId('surf_id')->nullable();
            $table->foreignId('tennis_id')->nullable();

            $table->foreignId('job_id')->nullable();


            $table->foreignId('audio_id')->nullable();
            $table->foreignId('camera_id')->nullable();
            $table->foreignId('charger_id')->nullable();
            $table->foreignId('drone_id')->nullable();
            $table->foreignId('gaming_id')->nullable();
            $table->foreignId('laptop_id')->nullable();
            $table->foreignId('lighting_id')->nullable();
            $table->foreignId('printer_id')->nullable();
            $table->foreignId('router_id')->nullable();
            $table->foreignId('tablette_id')->nullable();

            $table->foreignId('eclairage_id')->nullable();
            $table->foreignId('mobilier_id')->nullable();
            $table->foreignId('photographie_id')->nullable();
            $table->foreignId('sonorisation_id')->nullable();
            $table->foreignId('tente_id')->nullable();

            $table->foreignId('clothes_id')->nullable();
            $table->foreignId('jewelry_id')->nullable();

            $table->foreignId('apartment_id')->nullable();
            $table->foreignId('bureaux_id')->nullable();
            $table->foreignId('magasin_id')->nullable();
            $table->foreignId('maison_id')->nullable();
            $table->foreignId('riad_id')->nullable();
            $table->foreignId('terrain_id')->nullable();
            $table->foreignId('villa_id')->nullable();

            $table->foreignId('activity_id')->nullable();
            $table->foreignId('livre_id')->nullable();
            $table->foreignId('musical_id')->nullable();

            $table->foreignId('furniture_id')->nullable();
            $table->foreignId('houseappliance_id')->nullable();

            $table->foreignId('electricaltool_id')->nullable();
            $table->foreignId('ladder_id')->nullable();
            $table->foreignId('mechanicaltool_id')->nullable();
            $table->foreignId('powertool_id')->nullable();
            $table->foreignId('pressurewasher_id')->nullable();

            $table->foreignId('service_id')->nullable();

            $table->foreignId('boat_id')->nullable();
            $table->foreignId('camion_id')->nullable();
            $table->foreignId('caravan_id')->nullable();
            $table->foreignId('car_id')->nullable();
            $table->foreignId('engin_id')->nullable();
            $table->foreignId('moto_id')->nullable();
            $table->foreignId('scooter_id')->nullable();
            $table->foreignId('taxiaeroport_id')->nullable();
            $table->foreignId('transportation_id')->nullable();
            $table->foreignId('velo_id')->nullable();

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
        Schema::dropIfExists('favorites');
    }
};
