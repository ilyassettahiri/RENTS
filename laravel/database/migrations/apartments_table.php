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
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->string('garden_view')->nullable();
            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('collection_id')->nullable();

            $table->string('adults_count')->nullable();
            $table->string('children_count')->nullable();

            $table->string('adults_price')->nullable();
            $table->string('children_price')->nullable();
            $table->foreignId('shipping_id')->nullable();
            $table->foreignId('vat_id')->nullable();
            $table->string('policiea')->nullable();
            $table->string('policieb')->nullable();
            $table->string('policiec')->nullable();
            $table->string('policied')->nullable();
            $table->string('detaila')->nullable();
            $table->string('detailb')->nullable();
            $table->string('detailc')->nullable();
            $table->string('answerdetaila')->nullable();
            $table->string('answerdetailb')->nullable();
            $table->string('answerdetailc')->nullable();

            $table->string('questiona')->nullable();
            $table->string('questionb')->nullable();
            $table->string('questionc')->nullable();

            $table->text('answera')->nullable();
            $table->text('answerb')->nullable();
            $table->text('answerc')->nullable();



            $table->string('picture')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();

            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();


            $table->string('phone', 15)->nullable();

            $table->string('elevator')->nullable();
            $table->string('doorkeeper')->nullable();
            $table->string('security_system')->nullable();
            $table->string('equipped_kitchen')->nullable();
            $table->string('wifi')->nullable();
            $table->string('parking')->nullable();
            $table->string('tv')->nullable();
            $table->string('heating')->nullable();
            $table->string('balcony')->nullable();
            $table->string('air_conditioner')->nullable();
            $table->string('washing_machine')->nullable();
            $table->string('pool')->nullable();
            $table->string('rooms')->nullable();
            $table->string('living_rooms')->nullable();
            $table->string('surface')->nullable();
            $table->string('year_construction')->nullable();
            $table->string('bedrooms')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('terrace')->nullable();
            $table->string('housekeeping')->nullable();
            $table->string('dishwasher')->nullable();
            $table->string('refrigerator')->nullable();

            $table->string('service')->nullable();

            $table->string('facilities')->nullable();



            $table->string('more_details')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};
