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
        Schema::create('ourclients', function (Blueprint $table) {
            $table->id();


            $table->string('name')->nullable();;
            $table->string('picture')->nullable();;

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ourclients');
    }
};


/* Tinker


$client1 = new App\Models\Ourclient;
$client1->name = 'netflix';
$client1->picture = '/logo/netflix_original.svg';
$client1->save();

$client2 = new App\Models\Ourclient;
$client2->name = 'slack';
$client2->picture = '/logo/slack_original.svg';
$client2->save();

$client3 = new App\Models\Ourclient;
$client3->name = 'facebook';
$client3->picture = '/logo/facebook_original.svg';
$client3->save();

$client4 = new App\Models\Ourclient;
$client4->name = 'google';
$client4->picture = '/logo/google_original.svg';
$client4->save();

$client5 = new App\Models\Ourclient;
$client5->name = 'heroku';
$client5->picture = '/logo/heroku_original.svg';
$client5->save();

$client6 = new App\Models\Ourclient;
$client6->name = 'microsoft';
$client6->picture = '/logo/microsoft_original.svg';
$client6->save();




*/
