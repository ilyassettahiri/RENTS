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



use App\Models\Listing;
use App\Models\Onlinestore;

use App\Models\Apartment  ;
use App\Models\Apartmentsimg  ;

use App\Models\Favorite;
use App\Models\User;
use App\Models\Velosimg;
use App\Models\Velo;

use App\Models\Carsimg;
use App\Models\Car;
use App\Models\Article;




class HomeController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {


        $velos = Velo::orderBy('created_at', 'desc')->take(8)->get();

        $apartments = Apartment::orderBy('created_at', 'desc')->take(8)->get();


        $billiards = Car::orderBy('created_at', 'desc')->take(8)->get();






        // Fetch 5 recent articles with their authors and tags
        $recentarticles = Article::orderBy('created_at', 'desc')->take(5)->with('author', 'blogtags')->get();



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








        $apartmentsData = $apartments->map(function ($apartment) {

            $user = User::where('id', $apartment->user_id)->first();

            $reviews = $apartment->review()->orderBy('created_at')->get();
            $totalReviews = $reviews->count();
            $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 0;
            $userStore = Onlinestore::where('user_id', $user->id)->first();


            return [
                'type' => 'apartments',
                'id' => $apartment->id,
                'attributes' => [
                    'title' => $apartment->title,
                    'price' => $apartment->price,
                    'currency' => $apartment->currency,
                    'per' => $apartment->typea,
                    'city' => $apartment->city,
                    'id' => $apartment->id,

                    'phone' => $apartment->phone,




                    'category' => 'apartments',
                    'url' => $apartment->url,
                    'created_at' => $apartment->created_at,
                    'picture' => $apartment->picture,

                    'images' => $apartment->servicesimg->map(function ($image) {
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

                    'averageRating' => $averageRating, // Include average rating



                ],
            ];
        });


        $billiardsData = $billiards->map(function ($billiard) {

            $user = User::where('id', $billiard->user_id)->first();
            $reviews = $billiard->review()->orderBy('created_at')->get();
            $totalReviews = $reviews->count();
            $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 0;
            $userStore = Onlinestore::where('user_id', $user->id)->first();

            return [
                'type' => 'billiards',
                'id' => $billiard->id,
                'attributes' => [
                    'title' => $billiard->title,
                    'price' => $billiard->price,
                    'currency' => $billiard->currency,
                    'per' => $billiard->typea,
                    'city' => $billiard->city,
                    'id' => $billiard->id,

                    'phone' => $billiard->phone,




                    'category' => 'cars',
                    'url' => $billiard->url,
                    'created_at' => $billiard->created_at,
                    'picture' => $billiard->picture,

                    'images' => $billiard->servicesimg->map(function ($image) {
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


                    'averageRating' => $averageRating, // Include average rating


                ],
            ];
        });

        $velosData = $velos->map(function ($velo) {

            $user = User::where('id', $velo->user_id)->first();
            $userStore = Onlinestore::where('user_id', $user->id)->first();

            $reviews = $velo->review()->orderBy('created_at')->get();
            $totalReviews = $reviews->count();
            $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 0;

            return [
                'type' => 'velos',
                'id' => $velo->id,
                'attributes' => [
                    'title' => $velo->title,
                    'price' => $velo->price,
                    'currency' => $velo->currency,
                    'per' => $velo->typea,
                    'city' => $velo->city,
                    'id' => $velo->id,
                    'phone' => $velo->phone,


                    'images' => $velo->servicesimg->map(function ($image) {
                        return [

                            'picturesmall' => $image->picturesmall,
                            'alttext' => $image->alttext,
                        ];
                    }),





                    'category' => 'bicycles',
                    'url' => $velo->url,
                    'created_at' => $velo->created_at,
                    'picture' => $velo->picture,


                    'seller' => [
                        'name' => $userStore ? $userStore->name : $user->name,
                        'id' => $user->id,

                        'profile_image' => $userStore ? $userStore->profile_picture : $user->profile_image,

                        'created_at' => $user->created_at->toIso8601String(),

                    ],

                    'averageRating' => $averageRating, // Include average rating



                ],
            ];
        });





            // Format recent articles data
            $recentarticlesData = $recentarticles->map(function ($recentarticle) {
                return [
                    'type' => 'articles',
                    'id' => $recentarticle->id,
                    'attributes' => [

                        'title' => $recentarticle->title,
                        'actor' => $recentarticle->actor,
                        'category' => $recentarticle->category,
                        'tag' => $recentarticle->blogtags->pluck('name'), // Assuming you have a name attribute in the Tag model
                        'thumb' => $recentarticle->thumb,
                        'content' => $recentarticle->content,
                        'created_at' => $recentarticle->created_at,
                        'updated_at' => $recentarticle->updated_at,
                        'blogcategory_id' => $recentarticle->blogcategory_id,
                        'url' => $recentarticle->url,
                        'author' => [
                            'name' => $recentarticle->author->name,
                            'bio' => $recentarticle->author->bio,
                            'picture' => $recentarticle->author->picture, // Assuming you have a profile_picture attribute in the Author model
                        ],
                    ],
                ];
            });



        $mergedData = $billiardsData->merge($velosData)->merge($apartmentsData);



        // Ensure JSON:API compliance
        $responseData = [
            'data' => $mergedData,
            'recentarticles' => $recentarticlesData,

        ];

        // Conditionally add 'favorites' key if user is authenticated
        if (isset($favoriteCategories)) {
            $responseData['favorites'] = $favoriteCategories;
        }

        return response()->json($responseData);






    }

}
