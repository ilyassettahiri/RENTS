<?php

namespace App\Http\Controllers\Api\V2\Front\HomeC;

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

use App\Models\Listingsimg;


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






class SearchController extends JsonApiController
{


        // Mapping function for category to image model
        private function getImageModel($category)
        {
            $mapping = [
                'billiard' => Billiardsimg::class,
                'boxing' => Boxingsimg::class,
                'diving' => Divingsimg::class,
                'football' => Footballsimg::class,
                'golf' => Golfsimg::class,
                'hunting' => Huntingsimg::class,
                'gym' => Musculationsimg::class,
                'surf' => Surfsimg::class,
                'tennis' => Tennisimg::class,
                'audio' => Audiosimg::class,
                'cameras' => Camerasimg::class,
                'chargers' => Chargersimg::class,
                'drones' => Dronesimg::class,
                'gaming' => Gamingsimg::class,
                'laptops' => Laptopsimg::class,
                'lighting' => Lightingsimg::class,
                'printers' => Printersimg::class,
                'routers' => Routersimg::class,
                'tablets' => Tablettesimg::class,
                'eclairage' => Eclairagesimg::class,
                'mobilier' => Mobiliersimg::class,
                'photography' => Photographiesimg::class,
                'sound-systems' => Sonorisationsimg::class,
                'tents' => Tentesimg::class,
                'clothes' => Clothesimg::class,
                'jewelry' => Jewelrysimg::class,
                'apartments' => Apartmentsimg::class,
                'offices' => Bureauxsimg::class,
                'shops' => Magasinsimg::class,
                'houses' => Maisonsimg::class,
                'riads' => Riadsimg::class,
                'lands' => Terrainsimg::class,
                'villas' => Villasimg::class,
                'activities' => Activitiesimg::class,
                'books' => Livresimg::class,
                'musical' => Musicalsimg::class,
                'furniture' => Furnituresimg::class,
                'home-appliances' => Houseappliancesimg::class,
                'electrical-tools' => Electricaltoolsimg::class,
                'ladders' => Laddersimg::class,
                'mechanical-tools' => Mechanicaltoolsimg::class,
                'power-tools' => Powertoolsimg::class,
                'pressure-washers' => Pressurewashersimg::class,
                'services' => Servicesimg::class,
                'boats' => Boatsimg::class,
                'trucks' => Camionsimg::class,
                'caravans' => Caravansimg::class,
                'cars' => Carsimg::class,
                'engins' => Enginsimg::class,
                'motorcycles' => Motosimg::class,
                'scooters' => Scootersimg::class,
                'airport-taxis' => Taxiaeroportsimg::class,
                'transportation' => Transportationsimg::class,
                'bicycles' => Velosimg::class,
            ];

            return $mapping[$category] ?? null;
        }



        public function getSearchListings(Request $request)
        {



            $authuser = Auth::user();

            if ($authuser) {
                $favorites = Favorite::where('user_id', $authuser->id)->get();

                // Create an associative array of category names and their respective IDs
                $categories = [
                    'billiard' => array_filter($favorites->pluck('billiard_id')->toArray()),
                    'boxing' => array_filter($favorites->pluck('boxing_id')->toArray()),
                    'diving' => array_filter($favorites->pluck('diving_id')->toArray()),
                    'football' => array_filter($favorites->pluck('football_id')->toArray()),
                    'golf' => array_filter($favorites->pluck('golf_id')->toArray()),
                    'hunting' => array_filter($favorites->pluck('hunting_id')->toArray()),
                    'gym' => array_filter($favorites->pluck('musculation_id')->toArray()),
                    'surf' => array_filter($favorites->pluck('surf_id')->toArray()),
                    'tennis' => array_filter($favorites->pluck('tennis_id')->toArray()),
                    'audio' => array_filter($favorites->pluck('audio_id')->toArray()),
                    'cameras' => array_filter($favorites->pluck('camera_id')->toArray()),
                    'chargers' => array_filter($favorites->pluck('charger_id')->toArray()),
                    'drones' => array_filter($favorites->pluck('drone_id')->toArray()),
                    'gaming' => array_filter($favorites->pluck('gaming_id')->toArray()),
                    'laptops' => array_filter($favorites->pluck('laptop_id')->toArray()),
                    'lighting' => array_filter($favorites->pluck('lighting_id')->toArray()),
                    'printers' => array_filter($favorites->pluck('printer_id')->toArray()),
                    'routers' => array_filter($favorites->pluck('router_id')->toArray()),
                    'tablets' => array_filter($favorites->pluck('tablette_id')->toArray()),
                    'eclairage' => array_filter($favorites->pluck('eclairage_id')->toArray()),
                    'mobilier' => array_filter($favorites->pluck('mobilier_id')->toArray()),
                    'photography' => array_filter($favorites->pluck('photographie_id')->toArray()),
                    'sound-systems' => array_filter($favorites->pluck('sonorisation_id')->toArray()),
                    'tents' => array_filter($favorites->pluck('tente_id')->toArray()),
                    'clothes' => array_filter($favorites->pluck('clothes_id')->toArray()),
                    'jewelry' => array_filter($favorites->pluck('jewelry_id')->toArray()),
                    'apartments' => array_filter($favorites->pluck('apartment_id')->toArray()),
                    'offices' => array_filter($favorites->pluck('bureaux_id')->toArray()),
                    'shops' => array_filter($favorites->pluck('magasin_id')->toArray()),
                    'houses' => array_filter($favorites->pluck('maison_id')->toArray()),
                    'riads' => array_filter($favorites->pluck('riad_id')->toArray()),
                    'lands' => array_filter($favorites->pluck('terrain_id')->toArray()),
                    'villas' => array_filter($favorites->pluck('villa_id')->toArray()),
                    'activities' => array_filter($favorites->pluck('activity_id')->toArray()),
                    'books' => array_filter($favorites->pluck('livre_id')->toArray()),
                    'musical' => array_filter($favorites->pluck('musical_id')->toArray()),
                    'furniture' => array_filter($favorites->pluck('furniture_id')->toArray()),
                    'home-appliances' => array_filter($favorites->pluck('houseappliance_id')->toArray()),
                    'electrical-tools' => array_filter($favorites->pluck('electricaltool_id')->toArray()),
                    'ladders' => array_filter($favorites->pluck('ladder_id')->toArray()),
                    'mechanical-tools' => array_filter($favorites->pluck('mechanicaltool_id')->toArray()),
                    'power-tools' => array_filter($favorites->pluck('powertool_id')->toArray()),
                    'pressure-washers' => array_filter($favorites->pluck('pressurewasher_id')->toArray()),
                    'services' => array_filter($favorites->pluck('service_id')->toArray()),
                    'boats' => array_filter($favorites->pluck('boat_id')->toArray()),
                    'camtrucksion' => array_filter($favorites->pluck('camion_id')->toArray()),
                    'caravans' => array_filter($favorites->pluck('caravan_id')->toArray()),
                    'cars' => array_filter($favorites->pluck('car_id')->toArray()),
                    'engins' => array_filter($favorites->pluck('engin_id')->toArray()),
                    'motorcycles' => array_filter($favorites->pluck('moto_id')->toArray()),
                    'scooters' => array_filter($favorites->pluck('scooter_id')->toArray()),
                    'airport-taxis' => array_filter($favorites->pluck('taxiaeroport_id')->toArray()),
                    'transportation' => array_filter($favorites->pluck('transportation_id')->toArray()),
                    'bicycles' => array_filter($favorites->pluck('velo_id')->toArray()),
                ];

                // Flatten the array to return an array of category names and their corresponding listing IDs
                $favoriteCategories = [];
                foreach ($categories as $category => $ids) {
                    foreach ($ids as $id) {
                        $favoriteCategories[] = [
                            'category' => $category,
                            'id' => $id,
                        ];
                    }
                }

            }







            if ($request->has('searchCategories')) {

                $category = strtolower($request->input('searchCategories'));




                $query = match($category) {
                    'billiard' => Billiard::query(),
                    'boxing' => Boxing::query(),
                    'diving' => Diving::query(),
                    'football' => Football::query(),
                    'golf' => Golf::query(),
                    'hunting' => Hunting::query(),
                    'gym' => Musculation::query(),
                    'surf' => Surf::query(),
                    'tennis' => Tennis::query(),
                    'audio' => Audio::query(),
                    'cameras' => Camera::query(),
                    'chargers' => Charger::query(),
                    'drones' => Drone::query(),
                    'gaming' => Gaming::query(),
                    'laptops' => Laptop::query(),
                    'lighting' => Lighting::query(),
                    'printers' => Printer::query(),
                    'routers' => Router::query(),
                    'tablets' => Tablette::query(),
                    'eclairage' => Eclairage::query(),
                    'mobilier' => Mobilier::query(),
                    'photography' => Photographie::query(),
                    'sound-systems' => Sonorisation::query(),
                    'tents' => Tente::query(),
                    'clothes' => Clothes::query(),
                    'jewelry' => Jewelry::query(),
                    'apartments' => Apartment::query(),
                    'offices' => Bureaux::query(),
                    'shops' => Magasin::query(),
                    'houses' => Maison::query(),
                    'riads' => Riad::query(),
                    'lands' => Terrain::query(),
                    'villas' => Villa::query(),
                    'activities' => Activity::query(),
                    'books' => Livre::query(),
                    'musical' => Musical::query(),
                    'furniture' => Furniture::query(),
                    'home-appliances' => Houseappliance::query(),
                    'electrical-tools' => Electricaltool::query(),
                    'ladders' => Ladder::query(),
                    'mechanical-tools' => Mechanicaltool::query(),
                    'power-tools' => Powertool::query(),
                    'pressure-washers' => Pressurewasher::query(),
                    'services' => Service::query(),
                    'boats' => Boat::query(),
                    'trucks' => Camion::query(),
                    'caravans' => Caravan::query(),
                    'cars' => Car::query(),
                    'engins' => Engin::query(),
                    'motorcycles' => Moto::query(),
                    'scooters' => Scooter::query(),
                    'airport-taxis' => Taxiaeroport::query(),
                    'transportation' => Transportation::query(),
                    'bicycles' => Velo::query(),

                };




                // Apply location search if present
                if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {

                    $query->where('city', 'like', '%' . $request->input('searchLocation') . '%');
                }

                $query->orderBy('created_at', 'desc');


                $listings = $query->get();



                $listingsData = $listings->map(function ($listing) use ($category) {

                    $user = User::where('id', $listing->user_id)->first();
                    $userStore = Onlinestore::where('user_id', $user->id)->first();


                    $imageModel = $this->getImageModel($category);


                        // Define a mapping between category names and their foreign key column names
                    $categoryColumnMap = [
                        'billiard' => 'billiard_id',
                        'boxing' => 'boxing_id',
                        'diving' => 'diving_id',
                        'football' => 'football_id',
                        'golf' => 'golf_id',
                        'hunting' => 'hunting_id',
                        'gym' => 'musculation_id',
                        'surf' => 'surf_id',
                        'tennis' => 'tennis_id',
                        'audio' => 'audio_id',
                        'cameras' => 'camera_id',
                        'chargers' => 'charger_id',
                        'drones' => 'drone_id',
                        'gaming' => 'gaming_id',
                        'laptops' => 'laptop_id',
                        'lighting' => 'lighting_id',
                        'printers' => 'printer_id',
                        'routers' => 'router_id',
                        'tablets' => 'tablette_id',
                        'eclairage' => 'eclairage_id',
                        'mobilier' => 'mobilier_id',
                        'photography' => 'photographie_id',
                        'sound-systems' => 'sonorisation_id',
                        'tents' => 'tente_id',
                        'clothes' => 'clothes_id',
                        'jewelry' => 'jewelry_id',
                        'apartments' => 'apartment_id',
                        'offices' => 'bureaux_id',
                        'shops' => 'magasin_id',
                        'houses' => 'maison_id',
                        'riads' => 'riad_id',
                        'lands' => 'terrain_id',
                        'villas' => 'villa_id',
                        'activities' => 'activity_id',
                        'books' => 'livre_id',
                        'musical' => 'musical_id',
                        'furniture' => 'furniture_id',
                        'home-appliances' => 'houseappliance_id',
                        'electrical-tools' => 'electricaltool_id',
                        'ladders' => 'ladder_id',
                        'mechanical-tools' => 'mechanicaltool_id',
                        'power-tools' => 'powertool_id',
                        'pressure-washers' => 'pressurewasher_id',
                        'services' => 'service_id',
                        'boats' => 'boat_id',
                        'trucks' => 'camion_id',
                        'caravans' => 'caravan_id',
                        'cars' => 'car_id',
                        'engins' => 'engin_id',
                        'motorcycles' => 'moto_id',
                        'scooters' => 'scooter_id',
                        'airport-taxis' => 'taxiaeroport_id',
                        'transportation' => 'transportation_id',
                        'bicycles' => 'velo_id',
                    ];

                    // Use the mapped column name
                    $categoryIdColumn = $categoryColumnMap[$category] ?? null;

                    $images = $imageModel && $categoryIdColumn ? $imageModel::where($categoryIdColumn, $listing->id)->get()->map(function ($image) {
                        return [

                            'picturesmall' => $image->picturesmall,
                            'alttext' => $image->alttext,
                        ];
                    }) : [];


                    $reviews = $listing->review()->orderBy('created_at')->get(); // Adjust this to use the appropriate relationship
                    $totalReviews = $reviews->count();
                    $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 5; // Set default to 5 if no reviews


                    return [
                        'type' => 'listings',
                        'id' => $listing->id,
                        'attributes' => [
                            'title' => $listing->title,
                            'price' => $listing->price,
                            'city' => $listing->city,
                            'id' => $listing->id,

                            'phone' => $listing->phone,

                            'averageRating' => $averageRating, // Include average rating

                            'category' => $category,
                            'url' => $listing->url,
                            'created_at' => $listing->created_at,
                            'picture' => $listing->picture,
                            'images' => $images,

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
                        'data' => $listingsData,
                    ];

                    // Conditionally add 'favorites' key if user is authenticated
                    if (isset($favoriteCategories)) {
                        $responseData['favorites'] = $favoriteCategories;
                    }

                    return response()->json($responseData);





            } else {



                $query = Listing::query();

                if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {
                    $query->where(function($q) use ($request) {
                        $q->where('title', 'like', '%' . $request->input('searchKeyword') . '%')
                        ->where('city', 'like', '%' . $request->input('searchLocation') . '%');
                    });
                } else {
                    $query->where('title', 'like', '%' . $request->input('searchKeyword') . '%');
                }

                $query->orderBy('created_at', 'desc');


                $listings = $query->get();

                $listingsData = $listings->map(function ($listing) {

                    $user = User::where('id', $listing->user_id)->first();
                    $userStore = Onlinestore::where('user_id', $user->id)->first();


                    $images = $listing->listingsimg->map(function ($image) {
                        return [
                            'picturesmall' => $image->picturesmall,
                            'alttext' => $image->alttext,
                        ];
                    });

                        $reviews = $listing->review()->orderBy('created_at')->get(); // Adjust this to use the appropriate relationship
                        $totalReviews = $reviews->count();
                        $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 5; // Set default to 5 if no reviews



                    return [
                        'type' => 'listings',
                        'id' => $listing->id,
                        'attributes' => [
                            'title' => $listing->title,
                            'price' => $listing->price,
                            'city' => $listing->city,
                            'id' => $listing->id,

                            'phone' => $listing->phone,


                            'averageRating' => $averageRating, // Include average rating


                            'category' => $listing->category,
                            'url' => $listing->url,
                            'created_at' => $listing->created_at,
                            'picture' => $listing->picture,
                            'images' => $images,

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
                        'data' => $listingsData,
                    ];

                    // Conditionally add 'favorites' key if user is authenticated
                    if (isset($favoriteCategories)) {
                        $responseData['favorites'] = $favoriteCategories;
                    }

                    return response()->json($responseData);


            }






        }


        public function getSearchCity(Request $request, $city)
        {


        }





        public function getSearchCategory(Request $request, $city, $category)
        {


        }




        public function getSearchType(Request $request, $city, $category, $type)
        {


        }





}
