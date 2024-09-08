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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();

            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();

            $table->string('profile_image')->nullable();
            $table->string('phone_number')->nullable();
            $table->date('birthday')->nullable();
            $table->string('gender')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();

            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
