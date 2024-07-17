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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();


            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();

            $table->string('like')->nullable();

            $table->decimal('rating');

            $table->string('category')->nullable();
            $table->string('listings_thumb')->nullable();
            $table->string('listings_title')->nullable();
            $table->string('listings_price')->nullable();
            $table->string('url')->nullable();
            $table->string('listings_description')->nullable();



            $table->string('status')->nullable();

            $table->foreignId('user_id');
            $table->foreignId('onlinestore_id');

            $table->foreignId('billiard_id')->nullable();


            $table->foreignId('boxing_id')->nullable();
            $table->foreignId('diving_id')->nullable();
            $table->foreignId('football_id')->nullable();
            $table->foreignId('golf_id')->nullable();
            $table->foreignId('hunting_id')->nullable();
            $table->foreignId('musculation_id')->nullable();
            $table->foreignId('surf_id')->nullable();
            $table->foreignId('tennis_id')->nullable();

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
        Schema::dropIfExists('reviews');
    }
};
