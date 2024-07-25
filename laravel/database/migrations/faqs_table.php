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
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();

            $table->string('question')->nullable();
            $table->string('answer')->nullable();
            $table->foreignId('faqsubject_id');




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faqs');
    }
};



/*


// Adding questions and answers for General Questions
$faq1 = new App\Models\Faq;
$faq1->question = 'What is this service about?';
$faq1->answer = 'This service provides various features to help you manage your tasks efficiently.';
$faq1->faqsubject_id = 1;
$faq1->save();

$faq2 = new App\Models\Faq;
$faq2->question = 'How can I create an account?';
$faq2->answer = 'You can create an account by clicking the sign-up button on the homepage and filling out the required information.';
$faq2->faqsubject_id = 1;
$faq2->save();

$faq3 = new App\Models\Faq;
$faq3->question = 'What should I do if I forget my password?';
$faq3->answer = 'If you forget your password, click on the "Forgot Password" link and follow the instructions to reset it.';
$faq3->faqsubject_id = 1;
$faq3->save();

// Adding questions and answers for Account Management
$faq4 = new App\Models\Faq;
$faq4->question = 'How do I update my billing information?';
$faq4->answer = 'You can update your billing information from your account settings under the billing section.';
$faq4->faqsubject_id = 2;
$faq4->save();

$faq5 = new App\Models\Faq;
$faq5->question = 'What payment methods are accepted?';
$faq5->answer = 'We accept various payment methods including credit cards, PayPal, and bank transfers.';
$faq5->faqsubject_id = 2;
$faq5->save();

$faq6 = new App\Models\Faq;
$faq6->question = 'Can I get a refund?';
$faq6->answer = 'Yes, you can request a refund within 30 days of purchase. Please contact our support for assistance.';
$faq6->faqsubject_id = 2;
$faq6->save();

// Adding questions and answers for Billing and Payments
$faq7 = new App\Models\Faq;
$faq7->question = 'How do I report a technical issue?';
$faq7->answer = 'You can report a technical issue through our support center or by contacting our technical support team directly.';
$faq7->faqsubject_id = 3;
$faq7->save();

$faq8 = new App\Models\Faq;
$faq8->question = 'What should I do if I encounter an error?';
$faq8->answer = 'If you encounter an error, try restarting the application. If the issue persists, contact our support team.';
$faq8->faqsubject_id = 3;
$faq8->save();

$faq9 = new App\Models\Faq;
$faq9->question = 'How can I access the user guide?';
$faq9->answer = 'The user guide can be accessed from the help section on our website.';
$faq9->faqsubject_id = 3;
$faq9->save();

// Adding questions and answers for Technical Support
$faq10 = new App\Models\Faq;
$faq10->question = 'Where can I find product specifications?';
$faq10->answer = 'Product specifications are available on the product details page on our website.';
$faq10->faqsubject_id = 4;
$faq10->save();

$faq11 = new App\Models\Faq;
$faq11->question = 'Can I request a product demo?';
$faq11->answer = 'Yes, you can request a product demo by contacting our sales team.';
$faq11->faqsubject_id = 4;
$faq11->save();

$faq12 = new App\Models\Faq;
$faq12->question = 'Are there any discounts available?';
$faq12->answer = 'We offer various discounts throughout the year. Please check our website or subscribe to our newsletter for updates.';
$faq12->faqsubject_id = 4;
$faq12->save();

// Adding questions and answers for Product Information
$faq13 = new App\Models\Faq;
$faq13->question = 'How long does shipping take?';
$faq13->answer = 'Shipping typically takes 5-7 business days depending on your location.';
$faq13->faqsubject_id = 5;
$faq13->save();

$faq14 = new App\Models\Faq;
$faq14->question = 'Can I track my order?';
$faq14->answer = 'Yes, you can track your order using the tracking number provided in your confirmation email.';
$faq14->faqsubject_id = 5;
$faq14->save();

$faq15 = new App\Models\Faq;
$faq15->question = 'What should I do if my order is delayed?';
$faq15->answer = 'If your order is delayed, please contact our customer service for assistance.';
$faq15->faqsubject_id = 5;
$faq15->save();

// Adding questions and answers for Shipping and Delivery
$faq16 = new App\Models\Faq;
$faq16->question = 'How do I return an item?';
$faq16->answer = 'You can return an item by following the return instructions on our website.';
$faq16->faqsubject_id = 6;
$faq16->save();

$faq17 = new App\Models\Faq;
$faq17->question = 'What are the shipping options?';
$faq17->answer = 'We offer various shipping options including standard, expedited, and overnight shipping.';
$faq17->faqsubject_id = 6;
$faq17->save();

$faq18 = new App\Models\Faq;
$faq18->question = 'Can I change my shipping address after placing an order?';
$faq18->answer = 'Yes, you can change your shipping address by contacting our customer service before the order is shipped.';
$faq18->faqsubject_id = 6;
$faq18->save();

*/
