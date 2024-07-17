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

use App\Models\Favorite;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Billiard;
use App\Models\Service;




class ServiceController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {



        $services = Service::all();


        $authuser = Auth::user();




        $favorites = Favorite::where('user_id', $authuser->id)->get();





        $favoriteIds = array_filter($favorites->pluck('service_id')->toArray());













        $servicesData = $services->map(function ($service) {
            return [
                'type' => 'services',
                'id' => $service->id,
                'attributes' => [
                    'title' => $service->title,
                    'price' => $service->price,
                    'city' => $service->city,
                    'id' => $service->id,



                    'category' => 'services',
                    'url' => $service->url,
                    'created_at' => $service->created_at,
                    'picture' => $service->picture,



                ],
            ];
        });




        // Ensure JSON:API compliance
        return response()->json([
            'data' => $servicesData,
            'favorites' => $favoriteIds,

        ]);








    }

}
