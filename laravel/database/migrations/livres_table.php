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
        Schema::create('livres', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();
            $table->string('typea')->nullable();

            $table->string('phone', 15)->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('livre_title')->nullable();
            $table->string('author')->nullable();
            $table->string('genre')->nullable();
            $table->string('release_year')->nullable();
            $table->string('language')->nullable();
            $table->string('actor')->nullable();
            $table->string('format')->nullable();
            $table->string('pages')->nullable();
            $table->string('duration')->nullable();
            $table->string('type')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livres');
    }
};
