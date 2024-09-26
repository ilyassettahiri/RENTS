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
        Schema::create('mobiliers', function (Blueprint $table) {
            $table->id();

            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->string('typea')->nullable();


            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();


            $table->string('others')->nullable();
            $table->string('bench')->nullable();
            $table->string('festive_decorations')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('size')->nullable();
            $table->string('shape')->nullable();
            $table->string('material')->nullable();
            $table->string('theme')->nullable();
            $table->string('weight')->nullable();
            $table->string('table')->nullable();
            $table->string('chairs')->nullable();
            $table->string('sofa')->nullable();
            $table->string('rug')->nullable();
            $table->string('curtains')->nullable();
            $table->string('cushions')->nullable();
            $table->string('plant_decorations')->nullable();
            $table->string('light_decorations')->nullable();
            $table->string('table_decorations')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mobiliers');
    }
};
