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
        Schema::create('blogtags', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogtags');
    }
};


/* Tinker


$blogtag1 = new App\Models\Blogtag;
$blogtag1->name = 'cars';
$blogtag1->save();

$blogtag2 = new App\Models\Blogtag;
$blogtag2->name = 'apartment';
$blogtag2->save();

$blogtag3 = new App\Models\Blogtag;
$blogtag3->name = 'homes';
$blogtag3->save();


*/
