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
        Schema::create('eclairages', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id');
            $table->string('typea')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();

            $table->string('brand_name')->nullable();
            $table->string('lamps')->nullable();
            $table->string('light_fixtures')->nullable();
            $table->string('projectors')->nullable();
            $table->string('lighting_kit')->nullable();
            $table->string('leds')->nullable();
            $table->string('tripod')->nullable();
            $table->string('light_source')->nullable();
            $table->string('light_color')->nullable();
            $table->string('lighting_method')->nullable();
            $table->string('controller')->nullable();
            $table->string('connectivity')->nullable();
            $table->string('brightness')->nullable();
            $table->string('number_of_blades')->nullable();
            $table->string('fixture_type')->nullable();
            $table->string('size')->nullable();
            $table->string('voltage')->nullable();
            $table->string('chandeliers')->nullable();
            $table->string('power_source')->nullable();
            $table->string('number_of_light_sources')->nullable();
            $table->string('plug_format')->nullable();
            $table->string('fixture_form')->nullable();

            $table->string('other')->nullable();


            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eclairages');
    }
};
