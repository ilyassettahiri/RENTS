<?php

namespace App\Http\Controllers\Api\V2\Front\ServicePageC;

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

use App\Models\User;

use App\Models\Generaleinfo;






class ServicePageController extends JsonApiController
{


    public function getService(Request $request, $url)
    {


        $service = Service::where('url', $url)->first();

        $reservations = $service->reservation()->orderBy('reservationstart')->get();
        $reviewslistings = $service->review()->orderBy('created_at')->get();
        $seller = User::where('id', $service->user_id)->first();


            // Calculate total reviews and average rating
            $totalReviews = $reviewslistings->count();
            $averageRating = $totalReviews > 0 ? $reviewslistings->avg('rating') : 0;

            $generaleinfo = Generaleinfo::find(1);



        return response()->json([
            'data' => [
                'type' => $service,
                'id' => $service->id,
                'attributes' => [
                    'title' => $service->title,
                    'description' => $service->description,

                    'address' => $service->address,
                    'city' => $service->city,


                    'picture' => $service->picture,





                    'country' => $service->country,
                    'zip' => $service->zip,
                    'url' => $url,


                    'created_ad' => $service->created_ad,


                    'specifications' => [
                        'languages' => $service->languages,
                        'experience' => $service->experience,
                        'response_time' => $service->response_time,
                        'package' => $service->package,
                        'revisions' => $service->revisions,
                        'level' => $service->level,
                        'orders_queue' => $service->orders_queue,
                        'jobs_completed' => $service->jobs_completed,
                        'repeat_hire_rate' => $service->repeat_hire_rate,
                        'education' => $service->education,
                        'on_time' => $service->on_time,
                        'delivery_time' => $service->delivery_time,
                    ],


                    'reservations' => $reservations->map(function ($reservation) {
                        return [
                            'start' => $reservation->reservationstart,
                            'end' => $reservation->reservationsend,
                        ];
                    }),

                    'reviewslistings' => $reviewslistings->map(function ($review) {
                        return [
                            'id' => $review->id, // Ensure id is included

                            'name' => $review->name,
                            'rating' => $review->rating,
                            'message' => $review->description,
                            'helpful' => $review->like,

                            'created_at' => $review->created_at->toIso8601String(),


                            'replies' => $review->reviewreply->map(function ($reply) {
                            return [
                                'id' => $reply->id,
                                'name' => $reply->name,
                                'picture' => $reply->picture,
                                'message' => $reply->message,
                                'created_at' => $reply->created_at->toIso8601String(),
                            ];
                        }),




                        ];
                    }),




                    'images' => Servicesimg::where('service_id', $service->id)->get()->map(function ($image) {
                        return $image->picture;
                    }),

                    'seller' => [
                        'name' => $seller->name,
                        'profile_image' => $seller->profile_image,
                        'created_at' => $seller->created_at->toIso8601String(),

                    ],


                    'total_reviews' => $totalReviews,
                    'average_rating' => round($averageRating, 1), // Rounded to one decimal place




                    'recentlistings' => Service::orderBy('created_at', 'desc')->take(10)->get()->map(function ($recentlisting) {
                        return [

                            'attributes' => [

                            'title' => $recentlisting->title,
                            'price' => $recentlisting->price,
                            'city' => $recentlisting->city,
                            'id' => $recentlisting->id,
                            'category' => 'services',
                            'url' => $recentlisting->url,
                            'created_at' => $recentlisting->created_at->toIso8601String(),
                            'picture' => $recentlisting->picture,
                            ],

                        ];
                    }),


                    'socials' => [
                        'facebook' => $generaleinfo->facebook,
                        'twitter' => $generaleinfo->twitter, // X / Twitter
                        'instagram' => $generaleinfo->instagram,
                        'linkedin' => $generaleinfo->linkedin,
                        'pinterest' => $generaleinfo->pinterest,
                        'telegram' => $generaleinfo->telegram,
                        'tiktok' => $generaleinfo->tiktok,
                        'youtube' => $generaleinfo->youtube,
                ],





                ],
            ],
        ]);








    }

}
