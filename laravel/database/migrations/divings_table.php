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
        Schema::create('divings', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id');
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->string('typea')->nullable();


            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);


            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();

            $table->string('brand_name')->nullable();
            $table->string('material')->nullable();
            $table->string('hoods')->nullable();
            $table->string('socks_boots')->nullable();
            $table->string('wetsuits')->nullable();
            $table->string('gloves')->nullable();
            $table->string('rash_guards')->nullable();
            $table->string('bags')->nullable();
            $table->string('shorties')->nullable();
            $table->string('masks')->nullable();
            $table->string('vests')->nullable();
            $table->string('dive_lights')->nullable();
            $table->string('diving_fins')->nullable();
            $table->string('diving_snorkels')->nullable();
            $table->string('diving_regulators')->nullable();

            $table->string('other_equipment')->nullable();


            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('divings');
    }
};
