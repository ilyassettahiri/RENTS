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
        Schema::create('services', function (Blueprint $table) {
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


            $table->string('type_service',50)->nullable();

            $table->string('languages')->nullable();
            $table->text('service_description')->nullable();
            $table->string('experience')->nullable();
            $table->string('response_time')->nullable();
            $table->string('last_delivery')->nullable();
            $table->string('package')->nullable();
            $table->string('delivery_time')->nullable();
            $table->string('skills')->nullable();
            $table->string('revisions')->nullable();
            $table->string('certification')->nullable();
            $table->string('cv')->nullable();
            $table->string('level')->nullable();
            $table->string('orders_queue')->nullable();
            $table->string('jobs_completed')->nullable();
            $table->string('repeat_hire_rate')->nullable();
            $table->string('portfolio')->nullable();
            $table->string('education')->nullable();
            $table->string('verifications')->nullable();
            $table->string('on_time')->nullable();
            $table->string('recommendations')->nullable();
            $table->string('preferred_freelancer')->nullable();
            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};