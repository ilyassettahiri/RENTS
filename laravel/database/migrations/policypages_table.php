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
        Schema::create('policypages', function (Blueprint $table) {
            $table->id();


            $table->text('privacy')->nullable();

            $table->text('termcondition')->nullable();




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policypages');
    }
};



/* Tinker

$policyPage = new App\Models\Policypage;
$policyPage->privacy = 'This is a demo privacy policy content php artisan tinker php artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinker.';
$policyPage->termcondition = 'These are the demo terms and conditions content php artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinkerphp artisan tinker.';
$policyPage->save();


*/
