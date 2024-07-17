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
        Schema::create('terrains', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();

            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('property_type')->nullable();
            $table->string('property_subtype')->nullable();
            $table->string('total_lot_size')->nullable();
            $table->string('batch_number')->nullable();
            $table->string('land_valuation')->nullable();
            $table->string('total_rating')->nullable();
            $table->string('property_number')->nullable();
            $table->string('size')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('road_access')->nullable();
            $table->string('slope_description')->nullable();
            $table->string('zoning')->nullable();
            $table->string('zoning_code')->nullable();
            $table->string('nearby_usage')->nullable();
            $table->string('property_usage')->nullable();
            $table->string('annual_taxes')->nullable();
            $table->string('legal_description')->nullable();
            $table->string('deeded_acres')->nullable();
            $table->string('leased_acres')->nullable();
            $table->string('total_acres')->nullable();
            $table->string('elevation')->nullable();
            $table->string('topography')->nullable();
            $table->string('vegetation')->nullable();
            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('terrains');
    }
};
