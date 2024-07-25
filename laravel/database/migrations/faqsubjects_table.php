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
        Schema::create('faqsubjects', function (Blueprint $table) {
            $table->id();


            $table->string('name')->nullable();
            $table->string('picture')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqsubjects');
    }
};


/*

$faq1 = new App\Models\Faqsubject;
$faq1->name = 'General Questions';
$faq1->picture = '/icons/faq/ic_faq_account.svg';
$faq1->save();

$faq2 = new App\Models\Faqsubject;
$faq2->name = 'Account Management';
$faq2->picture = '/icons/faq/ic_faq_assurances.svg';
$faq2->save();

$faq3 = new App\Models\Faqsubject;
$faq3->name = 'Billing and Payments';
$faq3->picture = '/icons/faq/ic_faq_delivery.svg';
$faq3->save();

$faq4 = new App\Models\Faqsubject;
$faq4->name = 'Technical Support';
$faq4->picture = '/icons/faq/ic_faq_package.svg';
$faq4->save();

$faq5 = new App\Models\Faqsubject;
$faq5->name = 'Product Information';
$faq5->picture = '/icons/faq/ic_faq_payment.svg';
$faq5->save();

$faq6 = new App\Models\Faqsubject;
$faq6->name = 'Shipping and Delivery';
$faq6->picture = '/icons/faq/ic_faq_refund.svg';
$faq6->save();


 */
