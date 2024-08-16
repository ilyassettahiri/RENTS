<?php

namespace App\Http\Controllers\Api\V2\Front\StoreC;

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
use App\Models\Billiardsimg;

use App\Models\Review;

use App\Models\Reviewreply;

use App\Models\Favorite;




use App\Models\Listing;
use App\Models\User;

use App\Models\Onlinestore;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Billiard;
use App\Models\Boxing;

use App\Models\Reservation;





class StoreController extends JsonApiController
{




    public function getStore(Request $request, $url)
    {


            $authuser = Auth::user();




            if ($authuser) {


                $favorites = Favorite::where('user_id', $authuser->id)->get();







                $billiard_ids = array_filter($favorites->pluck('billiard_id')->toArray());
                $boxing_ids = array_filter($favorites->pluck('boxing_id')->toArray());
                $diving_ids = array_filter($favorites->pluck('diving_id')->toArray());
                $football_ids = array_filter($favorites->pluck('football_id')->toArray());
                $golf_ids = array_filter($favorites->pluck('golf_id')->toArray());
                $hunting_ids = array_filter($favorites->pluck('hunting_id')->toArray());
                $musculation_ids = array_filter($favorites->pluck('musculation_id')->toArray());
                $surf_ids = array_filter($favorites->pluck('surf_id')->toArray());
                $tennis_ids = array_filter($favorites->pluck('tennis_id')->toArray());
                $audio_ids = array_filter($favorites->pluck('audio_id')->toArray());
                $camera_ids = array_filter($favorites->pluck('camera_id')->toArray());
                $charger_ids = array_filter($favorites->pluck('charger_id')->toArray());
                $drone_ids = array_filter($favorites->pluck('drone_id')->toArray());
                $gaming_ids = array_filter($favorites->pluck('gaming_id')->toArray());
                $laptop_ids = array_filter($favorites->pluck('laptop_id')->toArray());
                $lighting_ids = array_filter($favorites->pluck('lighting_id')->toArray());
                $printer_ids = array_filter($favorites->pluck('printer_id')->toArray());
                $router_ids = array_filter($favorites->pluck('router_id')->toArray());
                $tablette_ids = array_filter($favorites->pluck('tablette_id')->toArray());
                $eclairage_ids = array_filter($favorites->pluck('eclairage_id')->toArray());
                $mobilier_ids = array_filter($favorites->pluck('mobilier_id')->toArray());
                $photographie_ids = array_filter($favorites->pluck('photographie_id')->toArray());
                $sonorisation_ids = array_filter($favorites->pluck('sonorisation_id')->toArray());
                $tente_ids = array_filter($favorites->pluck('tente_id')->toArray());
                $clothes_ids = array_filter($favorites->pluck('clothes_id')->toArray());
                $jewelry_ids = array_filter($favorites->pluck('jewelry_id')->toArray());
                $apartment_ids = array_filter($favorites->pluck('apartment_id')->toArray());
                $bureaux_ids = array_filter($favorites->pluck('bureaux_id')->toArray());
                $magasin_ids = array_filter($favorites->pluck('magasin_id')->toArray());
                $maison_ids = array_filter($favorites->pluck('maison_id')->toArray());
                $riad_ids = array_filter($favorites->pluck('riad_id')->toArray());
                $terrain_ids = array_filter($favorites->pluck('terrain_id')->toArray());
                $villa_ids = array_filter($favorites->pluck('villa_id')->toArray());
                $activity_ids = array_filter($favorites->pluck('activity_id')->toArray());
                $livre_ids = array_filter($favorites->pluck('livre_id')->toArray());
                $musical_ids = array_filter($favorites->pluck('musical_id')->toArray());
                $furniture_ids = array_filter($favorites->pluck('furniture_id')->toArray());
                $houseappliance_ids = array_filter($favorites->pluck('houseappliance_id')->toArray());
                $electricaltool_ids = array_filter($favorites->pluck('electricaltool_id')->toArray());
                $ladder_ids = array_filter($favorites->pluck('ladder_id')->toArray());
                $mechanicaltool_ids = array_filter($favorites->pluck('mechanicaltool_id')->toArray());
                $powertool_ids = array_filter($favorites->pluck('powertool_id')->toArray());
                $pressurewasher_ids = array_filter($favorites->pluck('pressurewasher_id')->toArray());
                $service_ids = array_filter($favorites->pluck('service_id')->toArray());
                $boat_ids = array_filter($favorites->pluck('boat_id')->toArray());
                $camion_ids = array_filter($favorites->pluck('camion_id')->toArray());
                $caravan_ids = array_filter($favorites->pluck('caravan_id')->toArray());
                $car_ids = array_filter($favorites->pluck('car_id')->toArray());
                $engin_ids = array_filter($favorites->pluck('engin_id')->toArray());
                $moto_ids = array_filter($favorites->pluck('moto_id')->toArray());
                $scooter_ids = array_filter($favorites->pluck('scooter_id')->toArray());
                $taxiaeroport_ids = array_filter($favorites->pluck('taxiaeroport_id')->toArray());
                $transportation_ids = array_filter($favorites->pluck('transportation_id')->toArray());
                $velo_ids = array_filter($favorites->pluck('velo_id')->toArray());




                $favoriteIds = array_merge(
                    $billiard_ids,
                    $boxing_ids,
                    $diving_ids,
                    $football_ids,
                    $golf_ids,
                    $hunting_ids,
                    $musculation_ids,
                    $surf_ids,
                    $tennis_ids,
                    $audio_ids,
                    $camera_ids,
                    $charger_ids,
                    $drone_ids,
                    $gaming_ids,
                    $laptop_ids,
                    $lighting_ids,
                    $printer_ids,
                    $router_ids,
                    $tablette_ids,
                    $eclairage_ids,
                    $mobilier_ids,
                    $photographie_ids,
                    $sonorisation_ids,
                    $tente_ids,
                    $clothes_ids,
                    $jewelry_ids,
                    $apartment_ids,
                    $bureaux_ids,
                    $magasin_ids,
                    $maison_ids,
                    $riad_ids,
                    $terrain_ids,
                    $villa_ids,
                    $activity_ids,
                    $livre_ids,
                    $musical_ids,
                    $furniture_ids,
                    $houseappliance_ids,
                    $electricaltool_ids,
                    $ladder_ids,
                    $mechanicaltool_ids,
                    $powertool_ids,
                    $pressurewasher_ids,
                    $service_ids,
                    $boat_ids,
                    $camion_ids,
                    $caravan_ids,
                    $car_ids,
                    $engin_ids,
                    $moto_ids,
                    $scooter_ids,
                    $taxiaeroport_ids,
                    $transportation_ids,
                    $velo_ids
                );


            }






            $store = Onlinestore::where('url', $url)->first();
            $reservations = $store->reservation()->get();
            $storereviews = $store->review()->orderBy('created_at')->get();
            $listings = $store->listing()->get();

            //Log::info('Listings:', $listings->toArray());



        // Calculate total reviews and average rating
        $totalReviews = $storereviews->count();
        $averageRating = $totalReviews > 0 ? $storereviews->avg('rating') : 0;



            $listingsData = [


                    'type' => $store,
                    'id' => $store->id,
                    'attributes' => [
                        'name' => $store->name,
                        'description' => $store->description,

                        'address' => $store->address,
                        'city' => $store->city,


                        'picture' => $store->picture,

                        'profile' => $store->profile_picture,






                        'country' => $store->country,
                        'zip' => $store->zip,
                        'url' => $url,


                        'created_at' => $store->created_at,
                        'reservations' => $reservations->map(function ($reservation) {
                            return [
                                'start' => $reservation->reservationstart,
                                'end' => $reservation->reservationsend,
                            ];
                        }),

                        'storereviews' => $storereviews->map(function ($review) {
                            return [
                                'id' => $review->id, // Ensure id is included

                                'name' => $review->name,
                                'rating' => $review->rating,
                                'message' => $review->description,
                                'helpful' => $review->like,

                                'created_at' => $review->created_at->toIso8601String(),





                            ];
                        }),



                        'listings' => $listings->map(function ($listing) {
                            return [

                                'type' => 'listings',

                                'id' => $listing->id, // Ensure id is included

                                'attributes' => [
                                    'category' => $listing->category,
                                    'title' => $listing->title,
                                    'price' => $listing->price,
                                    'url' => $listing->url,
                                    'id' => $listing->id,
                                    'created_at' => $listing->created_at,
                                    //'listing_city' => $listing->city,


                                    'status' => $listing->status,
                                    'picture' => $listing->picture,
                                    'user_id' => $listing->user_id,


                                ],


                            ];
                        }),





                        'total_reviews' => $totalReviews,
                        'average_rating' => round($averageRating, 1), // Rounded to one decimal place



                    ],

            ];



            // Build the response data
            $responseData = [
                'data' => $listingsData,
            ];

            // Conditionally add 'favorites' if the user is authenticated
            if (isset($favoriteIds)) {
                $responseData['favorites'] = $favoriteIds;
            }

            // Return the JSON response
            return response()->json($responseData);


    }
}
