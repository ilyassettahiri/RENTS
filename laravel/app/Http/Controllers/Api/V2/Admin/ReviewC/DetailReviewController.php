<?php

namespace App\Http\Controllers\Api\V2\Admin\ReviewC;

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



use App\Models\Review;

use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class DetailReviewController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $reviews = Review::where('user_id', $user->id)->get();

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $reviews->map(function ($review) use ($user) {
                return [
                    'type' => 'reviews',
                    'id' => $review->id,
                    'attributes' => [

                        'name' => $review->name,
                        'rating' => $review->rating,

                        'title' => $review->listings_title,
                        'id' => $review->id,


                        'title' => $review->listings_title,
                        'picture' => $review->listings_thumb,




                        'user_id' => $review->user_id,
                        'created_at' => $review->created_at,
                        'updated_at' => $review->updated_at,
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
