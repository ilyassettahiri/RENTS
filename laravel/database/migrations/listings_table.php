<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();


            $table->foreignId('user_id');

            $table->string('category')->nullable();
            $table->string('picture')->nullable();
            $table->string('title')->nullable();
            $table->string('price')->nullable();

            $table->string('city')->nullable();

            $table->integer('zip')->nullable();



            $table->string('url')->nullable();
            $table->string('status')->nullable();
            $table->foreignId('onlinestore_id');








            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listings');
    }
};
