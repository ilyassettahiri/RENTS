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
        Schema::create('engins', function (Blueprint $table) {
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


            $table->string('type')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('serial')->nullable();
            $table->string('hp')->nullable();
            $table->string('mechanical_condition')->nullable();
            $table->string('hyd_remotes')->nullable();
            $table->string('rear_weights')->nullable();
            $table->string('wheel_weights')->nullable();
            $table->string('seats')->nullable();
            $table->string('transmission')->nullable();
            $table->string('cab')->nullable();
            $table->string('monitor')->nullable();
            $table->string('pto')->nullable();
            $table->string('tire')->nullable();
            $table->string('cab_condition')->nullable();
            $table->string('year')->nullable();
            $table->string('auto_guidance')->nullable();
            $table->string('diff_lock')->nullable();
            $table->string('coupler')->nullable();
            $table->string('track')->nullable();
            $table->string('hydraulics')->nullable();
            $table->string('warranty_remaining')->nullable();
            $table->string('tires_loader')->nullable();
            $table->string('bucket_size')->nullable();
            $table->string('more_details')->nullable();





            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('engins');
    }
};
