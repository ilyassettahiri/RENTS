<?php

namespace App\Http\Controllers\Api\V2\Admin\CurrentlyHostingC;

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



use App\Models\Reservation;

use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class CurrentlyHostingController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $reservations = Reservation::where('user_id', $user->id)
                           ->where('status', 'active')
                           ->get();

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $reservations->map(function ($reservation) use ($user) {
                return [
                    'type' => 'reservations',
                    'id' => $reservation->id,
                    'attributes' => [

                        'name' => $reservation->name,

                        'email' => $reservation->email,
                        'picture' => $reservation->listings_thumb,

                        'phone' => $reservation->phone,

                        'title' => $reservation->listings_title,
                        'price' => $reservation->listings_price,
                        'status' => $reservation->status,

                        'id' => $reservation->id,
                        'created_at' => $reservation->created_at,

                    ],
                    'relationships' => [
                        'user' => [
                            'data' => [
                                'type' => 'users',
                                'id' => $user->id,
                            ],
                        ],
                    ],
                ];
            }),
        ]);
    }














}
