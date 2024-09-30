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
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('shipping_id')->nullable();
            $table->foreignId('vat_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();



            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();


            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
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
