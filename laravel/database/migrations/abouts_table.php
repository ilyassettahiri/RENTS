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
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();


            $table->string('large_picture')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->integer('job')->nullable();
            $table->integer('successful_hiring')->nullable();
            $table->integer('partner')->nullable();
            $table->integer('employee')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};



/* Tinker

$about = new App\Models\About;
$about->large_picture = '/images/travel/post_01.jpg';
$about->profile_picture = '/images/travel/post_02.jpg';
$about->title = 'About Us';
$about->content = 'We are a leading company in the industry with a strong commitment to excellence.';
$about->job = 200000;
$about->successful_hiring = 500000;
$about->partner = 300;
$about->employee = 2200;
$about->save();

*/
