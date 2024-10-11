<?php

namespace App\Http\Controllers\Api\V2\Front\JobC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Core\Document\Error;
use LaravelJsonApi\Core\Responses\ErrorResponse;
use LaravelJsonApi\Core\Responses\DataResponse;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use Illuminate\Support\Facades\Storage;
use App\Enums\ItemStatus;
use App\Models\Servicesimg;

use App\Models\Onlinestore;


use App\Models\Listing;

use App\Models\User;


use App\Models\Favorite;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Billiard;
use App\Models\Service;




class JobController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {



        $services = Service::orderBy('created_at', 'desc')->get();


        $authuser = Auth::user();
        $favoriteIds = [];


        if ($authuser) {
            $favorites = Favorite::where('user_id', $authuser->id)->get();

            // Create an array of objects containing the category 'services' and the corresponding service IDs
            $favoriteIds = $favorites->pluck('service_id')->filter()->map(function ($serviceId) {
                return [
                    'category' => 'services', // Hardcode 'services' as the category
                    'id' => $serviceId,       // The ID of the service
                ];
            })->values()->toArray(); // Use values() to reindex the array correctly
        }









        $servicesData = $services->map(function ($service) {
            $user = User::where('id', $service->user_id)->first();
            $userStore = Onlinestore::where('user_id', $user->id)->first();

            $reviews = $service->review()->orderBy('created_at')->get();
            $totalReviews = $reviews->count();
            $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 0;

            return [
                'type' => 'services',
                'id' => $service->id,
                'attributes' => [
                    'title' => $service->title,
                    'price' => $service->price,
                    'city' => $service->city,
                    'phone' => $service->phone,

                    'id' => $service->id,

                    'averageRating' => $averageRating, // Include average rating


                    'category' => 'services',
                    'url' => $service->url,
                    'created_at' => $service->created_at,
                    'picture' => $service->picture,

                    'images' => $service->servicesimg->map(function ($image) {
                        return [

                            'picturesmall' => $image->picturesmall,
                            'alttext' => $image->alttext,
                        ];
                    }),

                    'seller' => [
                        'name' => $userStore ? $userStore->name : $user->name,
                        'id' => $user->id,

                        'profile_image' => $userStore ? $userStore->profile_picture : $user->profile_image,

                        'created_at' => $user->created_at->toIso8601String(),

                    ],

                ],
            ];
        });







        // Ensure JSON:API compliance
        $responseData = [
            'data' => $servicesData,
        ];

        // Conditionally add 'favorites' key if user is authenticated
        if (isset($favoriteIds)) {
            $responseData['favorites'] = $favoriteIds;
        }

        return response()->json($responseData);





    }

}
