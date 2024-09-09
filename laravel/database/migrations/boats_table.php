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
        Schema::create('boats', function (Blueprint $table) {
            $table->id();




            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();
            $table->string('typea')->nullable();

            $table->string('phone', 15)->nullable();

            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('onlinestore_id');

            $table->string('picture')->nullable();


            $table->string('boat_type')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('year_of_construction')->nullable();
            $table->string('capacity')->nullable();
            $table->string('cabins')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('cruising_time')->nullable();
            $table->string('tank_capacity_l')->nullable();
            $table->string('skippered_charter')->nullable();
            $table->string('length')->nullable();
            $table->string('inside_speaker')->nullable();
            $table->string('security')->nullable();
            $table->string('navigation')->nullable();
            $table->string('kitchen_equipment')->nullable();
            $table->string('berths_in_cabin')->nullable();

            $table->string('more_details')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('boats');
    }
};
