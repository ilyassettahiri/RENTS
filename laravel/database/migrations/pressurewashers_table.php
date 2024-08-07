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
        Schema::create('pressurewashers', function (Blueprint $table) {
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
            $table->string('power_source')->nullable();
            $table->string('power_output')->nullable();
            $table->string('engine_power')->nullable();
            $table->string('hose_length')->nullable();
            $table->string('cord_length')->nullable();
            $table->string('weight')->nullable();
            $table->string('portability')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('pressure')->nullable();
            $table->string('specification_met')->nullable();
            $table->string('inlet_connection_type')->nullable();
            $table->string('outlet_connection_size')->nullable();
            $table->string('max_working_temperature')->nullable();
            $table->string('connection_type')->nullable();

            $table->string('maximum_flow_rate')->nullable();


            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pressurewashers');
    }
};
