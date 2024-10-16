<?php

namespace App\Http\Controllers\Api\V2\Front\BusinessC;

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


use App\Models\Review;

use App\Models\Onlinestore;

use App\Models\Favoritestore;

use App\Models\User;



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Billiard;
use App\Models\Service;




class BusinessController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {



        $businesslist = Onlinestore::orderBy('created_at', 'desc')->get();


        $authuser = Auth::user();


        $favoriteIds = [];

        if ($authuser) {
            $favorites = Favoritestore::where('user_id', $authuser->id)->get();
            $favoriteIds = $favorites->pluck('onlinestore_id')->toArray();


        }






        $businessData = $businesslist->map(function ($business) {
            $user = User::where('id', $business->user_id)->first();


            $storereviews = $business->review()->orderBy('created_at')->get();

            $totalReviews = $storereviews->count();
            $averageRating = $totalReviews > 0 ? $storereviews->avg('rating') : 0;


            return [
                'type' => 'business',
                'id' => $business->id,
                'attributes' => [
                    'name' => $business->name,
                    'description' => $business->description,
                    'city' => $business->city,
                    'id' => $business->id,
                    'phone' => $business->phone,


                    'totalReviews' => $totalReviews,
                    'averageRating' => round($averageRating, 1),


                    'url' => $business->url,
                    'created_at' => $business->created_at,
                    'picture' => $business->picture,

                    'profile' => $business->profile_picture,

                    'seller' => [
                        'name' => $user->name,
                        'id' => $user->id,

                        'profile_image' => $user->profile_image,
                        'created_at' => $user->created_at->toIso8601String(),

                    ],


                ],
            ];
        });








        // Ensure JSON:API compliance
        $responseData = [
            'data' => $businessData,
        ];

        // Conditionally add 'favorites' key if user is authenticated
        if (isset($favoriteIds)) {
            $responseData['favorites'] = $favoriteIds;
        }

        return response()->json($responseData);






    }

}
