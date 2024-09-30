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
        Schema::create('bureauxes', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('shipping_id')->nullable();
            $table->foreignId('vat_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();

            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();


            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('property_type')->nullable();
            $table->string('private_offices')->nullable();
            $table->string('elevator')->nullable();
            $table->string('doorkeeper')->nullable();
            $table->string('air_conditioning')->nullable();
            $table->string('heating_system')->nullable();
            $table->string('security')->nullable();
            $table->string('internet')->nullable();
            $table->string('soil_type')->nullable();
            $table->string('floor')->nullable();
            $table->string('telephone_wiring')->nullable();
            $table->string('parking')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('surface')->nullable();
            $table->string('shared_space')->nullable();
            $table->string('private_workspace')->nullable();
            $table->string('furniture')->nullable();
            $table->string('cafeteria')->nullable();
            $table->string('restaurant')->nullable();
            $table->string('conference_room')->nullable();
            $table->string('terrace')->nullable();
            $table->string('reception')->nullable();
            $table->string('smoking_room')->nullable();
            $table->string('metro_subway')->nullable();
            $table->string('bus_line')->nullable();
            $table->string('building_size')->nullable();
            $table->string('year_built')->nullable();
            $table->string('year_renovated')->nullable();
            $table->string('administrative_support')->nullable();
            $table->string('virtual_office')->nullable();
            $table->string('lighting')->nullable();
            $table->string('capacity')->nullable();
            $table->string('bail_type')->nullable();
            $table->string('security_deposit')->nullable();
            $table->string('office_taxes')->nullable();
            $table->string('plan')->nullable();

            $table->string('facilities')->nullable();

            $table->string('amenities')->nullable();

            $table->string('services')->nullable();


            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bureauxes');
    }
};
