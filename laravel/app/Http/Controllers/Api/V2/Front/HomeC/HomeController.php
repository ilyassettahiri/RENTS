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

use App\Models\Article;
use App\Models\Author;

use App\Models\Articleimg;

use App\Models\Ourclient;



class HomeController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {


        $velos = Velo::orderBy('created_at', 'desc')->get();

        $apartments = Apartment::orderBy('created_at', 'desc')->get();


        $billiards = Car::orderBy('created_at', 'desc')->get();






        // Fetch 5 recent articles with their authors and tags
        $recentarticles = Article::orderBy('created_at', 'desc')->take(5)->with('author', 'blogtags')->get();

        $ourclients = Ourclient::all();


        $authuser = Auth::user();

        if ($authuser) {
            $favorites = Favorite::where('user_id', $authuser->id)->get();

            // Create an associative array of category names and their respective IDs
            $categories = [
                'billiards' => array_filter($favorites->pluck('billiard_id')->toArray()),
                'boxing' => array_filter($favorites->pluck('boxing_id')->toArray()),
                'diving' => array_filter($favorites->pluck('diving_id')->toArray()),
                'football' => array_filter($favorites->pluck('football_id')->toArray()),
                'golf' => array_filter($favorites->pluck('golf_id')->toArray()),
                'hunting' => array_filter($favorites->pluck('hunting_id')->toArray()),
                'musculation' => array_filter($favorites->pluck('musculation_id')->toArray()),
                'surf' => array_filter($favorites->pluck('surf_id')->toArray()),
                'tennis' => array_filter($favorites->pluck('tennis_id')->toArray()),
                'audio' => array_filter($favorites->pluck('audio_id')->toArray()),
                'camera' => array_filter($favorites->pluck('camera_id')->toArray()),
                'charger' => array_filter($favorites->pluck('charger_id')->toArray()),
                'drone' => array_filter($favorites->pluck('drone_id')->toArray()),
                'gaming' => array_filter($favorites->pluck('gaming_id')->toArray()),
                'laptop' => array_filter($favorites->pluck('laptop_id')->toArray()),
                'lighting' => array_filter($favorites->pluck('lighting_id')->toArray()),
                'printer' => array_filter($favorites->pluck('printer_id')->toArray()),
                'router' => array_filter($favorites->pluck('router_id')->toArray()),
                'tablette' => array_filter($favorites->pluck('tablette_id')->toArray()),
                'eclairage' => array_filter($favorites->pluck('eclairage_id')->toArray()),
                'mobilier' => array_filter($favorites->pluck('mobilier_id')->toArray()),
                'photographie' => array_filter($favorites->pluck('photographie_id')->toArray()),
                'sonorisation' => array_filter($favorites->pluck('sonorisation_id')->toArray()),
                'tente' => array_filter($favorites->pluck('tente_id')->toArray()),
                'clothes' => array_filter($favorites->pluck('clothes_id')->toArray()),
                'jewelry' => array_filter($favorites->pluck('jewelry_id')->toArray()),
                'apartment' => array_filter($favorites->pluck('apartment_id')->toArray()),
                'bureaux' => array_filter($favorites->pluck('bureaux_id')->toArray()),
                'magasin' => array_filter($favorites->pluck('magasin_id')->toArray()),
                'maison' => array_filter($favorites->pluck('maison_id')->toArray()),
                'riad' => array_filter($favorites->pluck('riad_id')->toArray()),
                'terrain' => array_filter($favorites->pluck('terrain_id')->toArray()),
                'villa' => array_filter($favorites->pluck('villa_id')->toArray()),
                'activity' => array_filter($favorites->pluck('activity_id')->toArray()),
                'livre' => array_filter($favorites->pluck('livre_id')->toArray()),
                'musical' => array_filter($favorites->pluck('musical_id')->toArray()),
                'furniture' => array_filter($favorites->pluck('furniture_id')->toArray()),
                'houseappliance' => array_filter($favorites->pluck('houseappliance_id')->toArray()),
                'electricaltool' => array_filter($favorites->pluck('electricaltool_id')->toArray()),
                'ladder' => array_filter($favorites->pluck('ladder_id')->toArray()),
                'mechanicaltool' => array_filter($favorites->pluck('mechanicaltool_id')->toArray()),
                'powertool' => array_filter($favorites->pluck('powertool_id')->toArray()),
                'pressurewasher' => array_filter($favorites->pluck('pressurewasher_id')->toArray()),
                'service' => array_filter($favorites->pluck('service_id')->toArray()),
                'boat' => array_filter($favorites->pluck('boat_id')->toArray()),
                'camion' => array_filter($favorites->pluck('camion_id')->toArray()),
                'caravan' => array_filter($favorites->pluck('caravan_id')->toArray()),
                'car' => array_filter($favorites->pluck('car_id')->toArray()),
                'engin' => array_filter($favorites->pluck('engin_id')->toArray()),
                'moto' => array_filter($favorites->pluck('moto_id')->toArray()),
                'scooter' => array_filter($favorites->pluck('scooter_id')->toArray()),
                'taxiaeroport' => array_filter($favorites->pluck('taxiaeroport_id')->toArray()),
                'transportation' => array_filter($favorites->pluck('transportation_id')->toArray()),
                'velo' => array_filter($favorites->pluck('velo_id')->toArray()),
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
                    'city' => $velo->city,
                    'id' => $velo->id,
                    'phone' => $velo->phone,


                    'images' => $velo->servicesimg->map(function ($image) {
                        return [

                            'picturesmall' => $image->picturesmall,
                            'alttext' => $image->alttext,
                        ];
                    }),





                    'category' => 'velos',
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


            // Format our clients data
            $ourclientData = $ourclients->map(function ($ourclient) {
                return [
                    'type' => 'ourclient',
                    'id' => $ourclient->id,
                    'attributes' => [
                        'name' => $ourclient->name,
                        'picture' => $ourclient->picture,
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
            'ourclients' => $ourclientData,
        ];

        // Conditionally add 'favorites' key if user is authenticated
        if (isset($favoriteCategories)) {
            $responseData['favorites'] = $favoriteCategories;
        }

        return response()->json($responseData);






    }

}
