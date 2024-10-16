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



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;

use App\Models\Onlinestore;


use App\Models\Listing;

use App\Models\Favorite;


use App\Models\User;


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






class SearchServiceController extends JsonApiController
{



    public function getSearchServiceListings(Request $request)
    {




        $authuser = Auth::user();

        $favoriteIds = [];




        if ($authuser) {
            $favorites = Favorite::where('user_id', $authuser->id)->get();

            // Create an array of objects containing the category 'services' and the corresponding service IDs
            $favoriteIds = $favorites->pluck('service_id')->filter()->map(function ($serviceId) {
                return [
                    'category' => 'services', // Hardcode 'services' as the category
                    'id' => $serviceId,       // The ID of the service
                ];
            })->values()->toArray(); // Use values() to reindex the array correctly
        }










        if ($request->has('searchCategories')) {

            $category = strtolower($request->input('searchCategories'));




            $query = Service::query();



            // Apply location search if present
            if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {

                $query->where('city', 'like', '%' . $request->input('searchLocation') . '%');
            }


            $query->orderBy('created_at', 'desc');


            $services = $query->get();




            $servicesData = $services->map(function ($service) {
                $user = User::where('id', $service->user_id)->first();
                $userStore = Onlinestore::where('user_id', $user->id)->first();


                $reviews = $service->review()->orderBy('created_at')->get(); // Adjust this to use the appropriate relationship
                $totalReviews = $reviews->count();
                $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 5; // Set default to 5 if no reviews


                return [
                    'type' => 'services',
                    'id' => $service->id,
                    'attributes' => [
                        'title' => $service->title,
                        'price' => $service->price,
                        'city' => $service->city,
                        'id' => $service->id,

                        'phone' => $service->phone,
                        'averageRating' => $averageRating, // Include average rating
                        'jobtype' => $service->type_service,


                        'category' => 'services',
                        'url' => $service->url,
                        'created_at' => $service->created_at,
                        'picture' => $service->picture,

                        'images' => Servicesimg::where('service_id', $service->id)->get()->map(function ($image) {
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





        } else {


            $query = Service::query();

            if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {
                $query->where(function($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->input('searchKeyword') . '%')
                      ->where('city', 'like', '%' . $request->input('searchLocation') . '%');
                });
            } else {
                $query->where('title', 'like', '%' . $request->input('searchKeyword') . '%');
            }


            $query->orderBy('created_at', 'desc');

            $services = $query->get();


            $servicesData = $services->map(function ($service) {

                $user = User::where('id', $service->user_id)->first();

                $userStore = Onlinestore::where('user_id', $user->id)->first();

                $reviews = $service->review()->orderBy('created_at')->get(); // Adjust this to use the appropriate relationship
                $totalReviews = $reviews->count();
                $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 5; // Set default to 5 if no reviews


                return [
                    'type' => 'services',
                    'id' => $service->id,
                    'attributes' => [
                        'title' => $service->title,
                        'price' => $service->price,
                        'city' => $service->city,
                        'id' => $service->id,

                        'phone' => $service->phone,
                        'averageRating' => $averageRating, // Include average rating
                        'jobtype' => $service->type_service,


                        'category' => 'services',
                        'url' => $service->url,
                        'created_at' => $service->created_at,
                        'picture' => $service->picture,

                        'images' => $service->servicesimg->map(function ($image) {
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





}
