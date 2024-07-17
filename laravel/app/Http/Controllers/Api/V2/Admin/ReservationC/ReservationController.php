<?php

namespace App\Http\Controllers\Api\V2\Admin\ReservationC;

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
use Carbon\Carbon;



use App\Models\Reservation;

use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class ReservationController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $reservations = Reservation::where('user_id', $user->id)->get();

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $reservations->map(function ($reservation) use ($user) {
                return [
                    'type' => 'reservations',
                    'id' => $reservation->id,
                    'attributes' => [

                        'name' => $reservation->name,

                        'reservationstart' => Carbon::parse($reservation->reservationstart)->toIso8601String(),
                        'reservationsend' => Carbon::parse($reservation->reservationsend)->toIso8601String(),



                        'name' => $reservation->name,


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




    public function show(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $id = $route->model()->id; // Fetch the ID from the route model
        $reservation = Reservation::where('user_id', $user->id)->findOrFail($id);

        return response()->json([
            'data' => [
                'type' => 'reservations',
                'id' => $reservation->id,
                'attributes' => [
                    'name' => $reservation->name,
                    'picture' => $reservation->listings_thumb,
                    'reservationstart' => Carbon::parse($reservation->reservationstart)->toIso8601String(),
                    'reservationsend' => Carbon::parse($reservation->reservationsend)->toIso8601String(),

                    'title' => $reservation->listings_title,
                    'price' => $reservation->listings_price,
                    'status' => $reservation->status,
                    'created_at' => $reservation->created_at->toIso8601String(),
                ],
                'relationships' => [
                    'user' => [
                        'data' => [
                            'type' => 'users',
                            'id' => $user->id,
                        ],
                    ],
                ],
            ],
        ]);
    }





    public function updateStatus(Request $request, $id)
    {
        $reservation = Reservation::where('user_id', Auth::id())->findOrFail($id);
        $status = $request->input('status');
        if (in_array($status, ['active', 'pending'])) {
            $reservation->status = $status;
            $reservation->save();
        }

        return response()->json([
            'data' => [
                'type' => 'reservations',
                'id' => $reservation->id,
                'attributes' => [
                    'status' => $reservation->status,
                ],
            ],
        ]);
    }








}
