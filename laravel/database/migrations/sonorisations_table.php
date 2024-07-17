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
        Schema::create('sonorisations', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();


            $table->string('size')->nullable();
            $table->string('power_source')->nullable();
            $table->string('output_power')->nullable();
            $table->string('power_watts')->nullable();
            $table->string('power_type')->nullable();
            $table->string('battery')->nullable();
            $table->string('watt')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('connectivity')->nullable();
            $table->string('fastener_type')->nullable();
            $table->string('number_of_channels')->nullable();
            $table->string('compatibility')->nullable();
            $table->string('microphone')->nullable();
            $table->string('mixage_table')->nullable();
            $table->string('amplifier')->nullable();
            $table->string('cables_connectors')->nullable();
            $table->string('speaker')->nullable();
            $table->string('weight')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sonorisations');
    }
};
