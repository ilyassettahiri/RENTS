<?php

namespace App\Http\Controllers\Api\V2\Front\FavoriteC;

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

use App\Models\Reservation;


use App\Models\Review;

use App\Models\Reviewreply;

use App\Models\Favorite;

use App\Models\Listing;
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






class FavoriteController extends JsonApiController
{


    public function getFavorites(JsonApiRoute $route, Store $store )
    {
        $authuser = Auth::user();

        $favorites = Favorite::where('user_id', $authuser->id)->get();

        $favoriteIds = array_filter($favorites->pluck('id')->toArray());



        $favoritelistingsData = $favorites->map(function ($favorite) {
            return [
                'type' => 'favorites',
                'id' => $favorite->id,
                'attributes' => [
                    'title' => $favorite->title,
                    'price' => $favorite->price,
                    'city' => $favorite->city,
                    'id' => $favorite->id,


                    'category' => $favorite->category,
                    'url' => $favorite->url,
                    'created_at' => $favorite->listing_old,
                    'picture' => $favorite->picture,



                ],
            ];
        });


               // Ensure JSON:API compliance
            return response()->json([
                'data' => $favoritelistingsData,
                'favorites' => $favoriteIds,

            ]);


    }




    public function createFavorite($category, $url, $id )
    {


            $authuser = Auth::user();




            $existingFavorite = Favorite::where('user_id', $authuser->id)
                ->where('url', $url)
                ->first();



            if ($existingFavorite) {



                $existingFavorite->delete();

                return response()->json(['favorite' => false]);






            } else {






            switch ($category) {



                    case 'billiards':





                        $listingcategory = Billiard::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'billiard_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);



                        break;





                    case 'boxings':






                        $listingcategory = Boxing::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'boxing_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);






                        break;






                    case 'divings':





                        $listingcategory = Diving::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'diving_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'footballs':






                        $listingcategory = Football::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'football_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'golfs':






                        $listingcategory = Golf::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'golf_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;








                    case 'huntings':





                        $listingcategory = Hunting::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'hunting_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'musculations':






                        $listingcategory = Musculation::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'musculation_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;








                    case 'surfs':






                        $listingcategory = Surf::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'surf_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'tennis':






                        $listingcategory = Tennis::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'tennis_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'audios':






                        $listingcategory = Audio::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'audio_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'cameras':





                        $listingcategory = Camera::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'camera_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'chargers':






                        $listingcategory = Charger::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'charger_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'drones':





                        $listingcategory = Drone::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'drone_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;









                    case 'gamings':





                        $listingcategory = Gaming::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'gaming_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'laptops':





                        $listingcategory = Laptop::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'laptop_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;








                    case 'lightings':





                        $listingcategory = Lighting::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'lighting_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;








                    case 'printers':





                        $listingcategory = Printer::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'printer_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'routers':







                        $listingcategory = Router::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'router_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'tablettes':







                        $listingcategory = Tablette::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'tablette_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'eclairages':






                        $listingcategory = Eclairage::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'eclairage_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'mobiliers':






                        $listingcategory = Mobilier::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'mobilier_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'photographies':





                        $listingcategory = Photographie::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'photographie_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'sonorisations':







                        $listingcategory = Sonorisation::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'sonorisation_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'tentes':






                        $listingcategory = Tente::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'tente_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'clothes':






                        $listingcategory = Clothes::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'clothes_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'jewelrys':






                        $listingcategory = Jewelry::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'jewelry_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'apartments':





                        $listingcategory = Apartment::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'apartment_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'bureauxs':





                        $listingcategory = Bureaux::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'bureaux_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);









                        break;






                    case 'magasins':






                        $listingcategory = Magasin::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'magasin_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'maisons':





                        $listingcategory = Maison::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'maison_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'riads':






                        $listingcategory = Riad::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'riad_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;





                    case 'terrains':





                        $listingcategory = Terrain::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'terrain_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'villas':





                        $listingcategory = Villa::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'villa_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'activities':






                        $listingcategory = Activity::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'activity_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'livres':





                        $listingcategory = Livre::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'livre_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'musicals':





                        $listingcategory = Musical::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'musical_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'furnitures':





                        $listingcategory = Furniture::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'furniture_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'houseappliances':





                        $listingcategory = Houseappliance::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'houseappliance_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'electricaltools':






                        $listingcategory = Electricaltool::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'electricaltool_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'ladders':





                        $listingcategory = Ladder::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'ladder_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'mechanicaltools':





                        $listingcategory = Mechanicaltool::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'mechanicaltool_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'powertools':






                        $listingcategory = Powertool::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'powertool_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);






                        break;






                    case 'pressurewashers':





                        $listingcategory = Pressurewasher::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'pressurewasher_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'services':






                        $listingcategory = Service::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'service_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'boats':




                        $listingcategory = Boat::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'boat_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'camions':




                        $listingcategory = Camion::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'camion_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'caravans':





                        $listingcategory = Caravan::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'caravan_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;





                    case 'cars':





                        $listingcategory = Car::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'car_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'engins':





                        $listingcategory = Engin::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'engin_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);









                        break;





                    case 'motos':





                        $listingcategory = Moto::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'moto_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'scooters':





                        $listingcategory = Scooter::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'scooter_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'taxiaeroports':






                        $listingcategory = Taxiaeroport::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'taxiaeroport_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;





                    case 'transportations':





                        $listingcategory = Transportation::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'transportation_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'velos':





                        $listingcategory = Velo::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'velo_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    default:
                        // Default code
                        break;
                    }





                return response()->json(['favorite' => true]);


            }

    }




}
