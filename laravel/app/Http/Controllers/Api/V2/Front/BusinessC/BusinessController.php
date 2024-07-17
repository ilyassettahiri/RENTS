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



use App\Models\Onlinestore;

use App\Models\Favorite;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Billiard;
use App\Models\Service;




class BusinessController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {



        $businesslist = Onlinestore::all();


        $authuser = Auth::user();






        $businessData = $businesslist->map(function ($business) {
            return [
                'type' => 'business',
                'id' => $business->id,
                'attributes' => [
                    'name' => $business->name,
                    'description' => $business->description,
                    'city' => $business->city,
                    'id' => $business->id,



                    'url' => $business->url,
                    'created_at' => $business->created_at,
                    'picture' => $business->profile_picture,



                ],
            ];
        });




        // Ensure JSON:API compliance
        return response()->json([
            'data' => $businessData,

        ]);








    }

}
