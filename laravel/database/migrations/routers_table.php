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
        Schema::create('routers', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();


            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();

            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('landingpage_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->foreignId('detaillisting_id')->nullable();
            $table->foreignId('featurelisting_id')->nullable();
            $table->foreignId('guarantee_id')->nullable();


            $table->string('secteur')->nullable();
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

            $table->string('phone', 15)->nullable();


            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled','paid', 'completed'])->default('pending');
            $table->enum('admin_status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled','paid', 'completed', 'accepted', 'rejected'])->default('pending');            $table->boolean('featured')->default(false);

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();


            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('gbps_speed')->nullable();
            $table->string('wireless')->nullable();
            $table->string('frequency')->nullable();
            $table->string('connectivity')->nullable();
            $table->string('antennas')->nullable();
            $table->string('condition')->nullable();
            $table->string('compatible')->nullable();
            $table->string('signal_coverage')->nullable();

            $table->string('more_details')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('routers');
    }
};
