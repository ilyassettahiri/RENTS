<?php

namespace App\Http\Controllers\Api\V2\Front\ServiceC;

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



use App\Models\Listing;

use App\Models\User;


use App\Models\Favorite;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Billiard;
use App\Models\Service;




class ServiceController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {



        $services = Service::orderBy('created_at', 'desc')->get();


        $authuser = Auth::user();


        if ($authuser) {


            $favorites = Favorite::where('user_id', $authuser->id)->get();





            $favoriteIds = array_filter($favorites->pluck('service_id')->toArray());


        }










        $servicesData = $services->map(function ($service) {
            $user = User::where('id', $service->user_id)->first();

            return [
                'type' => 'services',
                'id' => $service->id,
                'attributes' => [
                    'title' => $service->title,
                    'price' => $service->price,
                    'city' => $service->city,
                    'phone' => $service->phone,

                    'id' => $service->id,



                    'category' => 'services',
                    'url' => $service->url,
                    'created_at' => $service->created_at,
                    'picture' => $service->picture,

                    'images' => Servicesimg::where('service_id', $service->id)->get()->map(function ($image) {
                        return $image->picture;
                    }),

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
            'data' => $servicesData,
        ];

        // Conditionally add 'favorites' key if user is authenticated
        if (isset($favoriteIds)) {
            $responseData['favorites'] = $favoriteIds;
        }

        return response()->json($responseData);





    }

}
