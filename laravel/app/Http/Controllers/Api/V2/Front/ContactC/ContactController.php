<?php

namespace App\Http\Controllers\Api\V2\Front\ContactC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\Mime\Part\TextPart;

use LaravelJsonApi\Core\Document\Error;
use LaravelJsonApi\Core\Responses\ErrorResponse;
use LaravelJsonApi\Core\Responses\DataResponse;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use Illuminate\Support\Facades\Storage;
use App\Enums\ItemStatus;



use App\Models\Listing;
use App\Models\Collection;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class ContactController extends JsonApiController
{






    public function store(JsonApiRoute $route, Store $store)
    {
        $request = app('request'); // Retrieve the current request

        $validatedData = $request->validate([
            'data.attributes.fullName' => 'required|string|max:255',
            'data.attributes.email' => 'required|email|max:255',
            'data.attributes.subject' => 'required|string|max:255',
            'data.attributes.message' => 'required|string|max:1000',
        ]);

        // Extract validated attributes
        $attributes = $validatedData['data']['attributes'];



        try {


            // Send email
            Mail::raw(
                "You have received a new contact form submission:\n\n" .
                "Name: {$attributes['fullName']}\n" .
                "Email: {$attributes['email']}\n\n" .
                "Message:\n{$attributes['message']}",
                function ($message) use ($attributes) {
                    $message->to('contact@rents.ma')
                        ->subject($attributes['subject']);
                }
            );



            // Return success response
            return response()->json([
                'message' => 'Your message has been sent successfully!',
            ], 200);
        } catch (\Throwable $e) {
            // Log the error
            Log::error('Failed to send contact email', [
                'error' => $e->getMessage(),
                'attributes' => $attributes,
            ]);

            return response()->json([
                'message' => 'Failed to send your message. Please try again later.',
            ], 500);
        }
    }









}
