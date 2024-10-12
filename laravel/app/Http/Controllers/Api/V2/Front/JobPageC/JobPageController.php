<?php

namespace App\Http\Controllers\Api\V2\Front\JobPageC;

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


use App\Models\Onlinestore;

use App\Models\Listing;

use App\Models\User;


use App\Models\Favorite;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Job  ;
use App\Models\Jobsimg  ;






use App\Models\Billiard;
use App\Models\Boxing;
use App\Models\Diving  ;
use App\Models\Football  ;
use App\Models\Golf  ;
use App\Models\Hunting  ;
use App\Models\Musculation  ;
use App\Models\Surf  ;
use App\Models\Tennis  ;



use App\Models\Audio  ;
use App\Models\Camera  ;
use App\Models\Charger  ;
use App\Models\Drone  ;
use App\Models\Gaming  ;
use App\Models\Laptop  ;
use App\Models\Lighting  ;
use App\Models\Printer  ;
use App\Models\Router  ;
use App\Models\Tablette  ;


use App\Models\Eclairage  ;
use App\Models\Mobilier  ;
use App\Models\Photographie  ;
use App\Models\Sonorisation  ;
use App\Models\Tente  ;


use App\Models\Clothes  ;
use App\Models\Jewelry  ;


use App\Models\Apartment  ;
use App\Models\Bureaux  ;
use App\Models\Magasin  ;
use App\Models\Maison  ;
use App\Models\Riad  ;
use App\Models\Terrain  ;
use App\Models\Villa  ;


use App\Models\Activity  ;
use App\Models\Livre  ;
use App\Models\Musical  ;


use App\Models\Furniture  ;
use App\Models\Houseappliance  ;


use App\Models\Electricaltool  ;
use App\Models\Ladder  ;
use App\Models\Mechanicaltool  ;
use App\Models\Powertool  ;
use App\Models\Pressurewasher  ;



use App\Models\Service  ;



use App\Models\Boat  ;
use App\Models\Camion  ;
use App\Models\Caravan  ;
use App\Models\Car  ;
use App\Models\Engin  ;
use App\Models\Moto  ;
use App\Models\Scooter  ;
use App\Models\Taxiaeroport  ;
use App\Models\Transportation  ;
use App\Models\Velo  ;




use App\Models\Billiardsimg;
use App\Models\Boxingsimg;
use App\Models\Divingsimg;
use App\Models\Footballsimg;
use App\Models\Golfsimg;
use App\Models\Huntingsimg;
use App\Models\Musculationsimg;
use App\Models\Surfsimg;
use App\Models\Tennisimg;

use App\Models\Audiosimg;
use App\Models\Camerasimg;
use App\Models\Chargersimg;
use App\Models\Dronesimg;
use App\Models\Gamingsimg;
use App\Models\Laptopsimg;
use App\Models\Lightingsimg;
use App\Models\Printersimg;
use App\Models\Routersimg;
use App\Models\Tablettesimg;

use App\Models\Eclairagesimg;
use App\Models\Mobiliersimg;
use App\Models\Photographiesimg;
use App\Models\Sonorisationsimg;
use App\Models\Tentesimg;

use App\Models\Clothesimg;
use App\Models\Jewelrysimg;

use App\Models\Apartmentsimg;
use App\Models\Bureauxsimg;
use App\Models\Magasinsimg;
use App\Models\Maisonsimg;
use App\Models\Riadsimg;
use App\Models\Terrainsimg;
use App\Models\Villasimg;

use App\Models\Activitiesimg;
use App\Models\Livresimg;
use App\Models\Musicalsimg;

use App\Models\Furnituresimg;
use App\Models\Houseappliancesimg;

use App\Models\Electricaltoolsimg;
use App\Models\Laddersimg;
use App\Models\Mechanicaltoolsimg;
use App\Models\Powertoolsimg;
use App\Models\Pressurewashersimg;

use App\Models\Servicesimg;

use App\Models\Boatsimg;
use App\Models\Camionsimg;
use App\Models\Caravansimg;
use App\Models\Carsimg;
use App\Models\Enginsimg;
use App\Models\Motosimg;
use App\Models\Scootersimg;
use App\Models\Taxiaeroportsimg;
use App\Models\Transportationsimg;
use App\Models\Velosimg;







class JobPageController extends JsonApiController
{


    public function getJob(Request $request, $url)
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
            $job_ids = array_filter($favorites->pluck('job_id')->toArray());

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
                $job_ids,

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




        $service = Job::where('url', $url)->first();

        $reservations = $service->reservation()->orderBy('reservationstart')->get();
        $reviewslistings = $service->review()->orderBy('created_at')->get();
        $user = User::where('id', $service->user_id)->first();

        $sellerlistings = $user->listing()
        ->where('category', 'jobs') // Filter by category 'services'
        ->orderBy('created_at', 'desc')  // Order by newest
        ->take(20)                       // Limit to 20 results
        ->get();


        $userStore = Onlinestore::where('user_id', $user->id)->first();

            // Calculate total reviews and average rating
            $totalReviews = $reviewslistings->count();
            $averageRating = $totalReviews > 0 ? $reviewslistings->avg('rating') : 0;





            $listingsData = [


                'type' => $service,
                'id' => $service->id,
                'attributes' => [
                    'title' => $service->title,
                    'description' => $service->description,

                    'address' => $service->address,
                    'city' => $service->city,

                    'phone' => $service->phone,

                    'picture' => $service->picture,

                    'id' => $service->id,

                    'category' => "jobs",




                    'country' => $service->country,
                    'zip' => $service->zip,
                    'url' => $url,


                    'created_at' => $service->created_at,


                    'specifications' => [
                        'languages' => $service->language,
                        'experience' => $service->experience_level,
                        'skills' => $service->skills,
                        'employment_type' => $service->employment_type,
                        'salary' => $service->salary,
                        'requirements' => $service->requirements,
                        'responsibilities' => $service->responsibilities,
                        'benefits' => $service->benefits,

                        'more_details' => $service->more_details,
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




                    'images' => Jobsimg::where('job_id', $service->id)->get()->map(function ($image) {
                        return $image->picture;
                    }),

                    'seller' => [
                        'name' => $userStore ? $userStore->name : $user->name,
                        'id' => $user->id,

                        'profile_image' => $userStore ? $userStore->profile_picture : $user->profile_image,

                        'created_at' => $user->created_at->toIso8601String(),
                        'url' => $userStore ? $userStore->url : null,  // Add the store URL here

                    ],


                    'total_reviews' => $totalReviews,
                    'average_rating' => round($averageRating, 1), // Rounded to one decimal place



                    'sellerlistings' => $sellerlistings->map(function ($listing) {


                        $images = $listing->listingsimg->map(function ($image) {
                            return [
                                'picturesmall' => $image->picturesmall,
                                'alttext' => $image->alttext,
                            ];
                        });

                            $reviews = $listing->review()->orderBy('created_at')->get(); // Adjust this to use the appropriate relationship
                            $totalReviews = $reviews->count();
                            $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 5; // Set default to 5 if no reviews

                            $user = User::where('id', $listing->user_id)->first();

                            $userStore = Onlinestore::where('user_id', $user->id)->first();


                            $getIdOnly = function ($listing) {
                                $result = ['id' => null]; // Initialize the result with default value

                                switch ($listing->category) {





                                    case 'jobs':
                                        $service = Job::where('url', $listing->url)->first();
                                        if ($service) {
                                            $listing->job_id = $service->id;
                                            $result['id'] = $service->id;
                                        }
                                        break;


                                    default:
                                        $result['id'] = null; // Return null if no match
                                }

                                return $result; // Return the result containing id only
                            };

                            $idResult = $getIdOnly($listing);

                        return [

                            'type' => 'listings',

                            'id' => $listing->id, // Ensure id is included

                            'attributes' => [
                                'category' => $listing->category,
                                'title' => $listing->title,
                                'price' => $listing->price,
                                'url' => $listing->url,

                                'created_at' => $listing->created_at,
                                'city' => $listing->city,

                                'id' => $idResult['id'],

                                'images' => $images,

                                'status' => $listing->status,
                                'picture' => $listing->picture,
                                'user_id' => $listing->user_id,

                                'averageRating' => $averageRating,
                                'totalReviews' => $totalReviews,

                                'seller' => [
                                    'name' => $userStore ? $userStore->name : $user->name,
                                    'id' => $user->id,

                                    'profile_image' => $userStore ? $userStore->profile_picture : $user->profile_image,

                                    'created_at' => $user->created_at->toIso8601String(),
                                    'url' => $userStore ? $userStore->url : null,  // Add the store URL here

                                ],

                            ],


                        ];
                    }),



                    'recentlistings' => Job::orderBy('created_at', 'desc')->take(10)->get()->map(function ($recentlisting) {

                        $user = User::where('id', $recentlisting->user_id)->first();

                        $userStore = Onlinestore::where('user_id', $user->id)->first();

                        return [

                            'attributes' => [

                            'title' => $recentlisting->title,
                            'price' => $recentlisting->price,
                            'city' => $recentlisting->city,
                            'id' => $recentlisting->id,
                            'category' => 'jobs',
                            'url' => $recentlisting->url,
                            'created_at' => $recentlisting->created_at->toIso8601String(),
                            'picture' => $recentlisting->picture,
                            'phone' => $recentlisting->phone,

                            'images' => $recentlisting->servicesimg->map(function ($image) {
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
                    }),







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


    public function getJobpic(Request $request, $url)
    {

        $listingCategory = Job::where('url', $url)->first();

        $images = $listingCategory->servicesimg->map(function ($image) {


            return $image->picturesxlarge;
        });


        if ($listingCategory) {
            return response()->json([


                'images' => $images,
            ]);
        } else {
            return response()->json(['message' => 'Invalid category or no listing found'], 404);
        }


    }
}
