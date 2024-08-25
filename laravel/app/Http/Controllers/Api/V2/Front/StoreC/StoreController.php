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

use App\Models\Review;

use App\Models\Reviewreply;

use App\Models\Favorite;




use App\Models\Listing;
use App\Models\User;

use App\Models\Onlinestore;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;





use App\Models\Reservation;


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

            $seller = User::where('id', $store->user_id)->first();


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


                        'seller' => [
                            'name' => $seller->name,
                            'id' => $seller->id,

                            'profile_image' => $seller->profile_image,
                            'created_at' => $seller->created_at->toIso8601String(),

                        ],




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





                            $getImages = function ($listing) {
                                Log::info('listing category: ' . $listing->category);

                                switch ($listing->category) {
                                    case 'billiards':
                                        $billiard = Billiard::where('url', $listing->url)->first();
                                        if ($billiard) {
                                            $listing->billiard_id = $billiard->id;
                                        }
                                        return Billiardsimg::where('billiard_id', $listing->billiard_id)->get()->pluck('picture');

                                    case 'boxings':
                                        $boxing = Boxing::where('url', $listing->url)->first();
                                        if ($boxing) {
                                            $listing->boxing_id = $boxing->id;
                                        }
                                        return Boxingsimg::where('boxing_id', $listing->boxing_id)->get()->pluck('picture');

                                    case 'divings':
                                        $diving = Diving::where('url', $listing->url)->first();
                                        if ($diving) {
                                            $listing->diving_id = $diving->id;
                                        }
                                        return Divingsimg::where('diving_id', $listing->diving_id)->get()->pluck('picture');

                                    case 'footballs':
                                        $football = Football::where('url', $listing->url)->first();
                                        if ($football) {
                                            $listing->football_id = $football->id;
                                        }
                                        return Footballsimg::where('football_id', $listing->football_id)->get()->pluck('picture');

                                    case 'golfs':
                                        $golf = Golf::where('url', $listing->url)->first();
                                        if ($golf) {
                                            $listing->golf_id = $golf->id;
                                        }
                                        return Golfsimg::where('golf_id', $listing->golf_id)->get()->pluck('picture');

                                    case 'huntings':
                                        $hunting = Hunting::where('url', $listing->url)->first();
                                        if ($hunting) {
                                            $listing->hunting_id = $hunting->id;
                                        }
                                        return Huntingsimg::where('hunting_id', $listing->hunting_id)->get()->pluck('picture');

                                    case 'musculations':
                                        $musculation = Musculation::where('url', $listing->url)->first();
                                        if ($musculation) {
                                            $listing->musculation_id = $musculation->id;
                                        }
                                        return Musculationsimg::where('musculation_id', $listing->musculation_id)->get()->pluck('picture');

                                    case 'surfs':
                                        $surf = Surf::where('url', $listing->url)->first();
                                        if ($surf) {
                                            $listing->surf_id = $surf->id;
                                        }
                                        return Surfsimg::where('surf_id', $listing->surf_id)->get()->pluck('picture');

                                    case 'tennis':
                                        $tennis = Tennis::where('url', $listing->url)->first();
                                        if ($tennis) {
                                            $listing->tennis_id = $tennis->id;
                                        }
                                        return Tennisimg::where('tennis_id', $listing->tennis_id)->get()->pluck('picture');

                                    // Electronique
                                    case 'audios':
                                        $audio = Audio::where('url', $listing->url)->first();
                                        if ($audio) {
                                            $listing->audio_id = $audio->id;
                                        }
                                        return Audiosimg::where('audio_id', $listing->audio_id)->get()->pluck('picture');

                                    case 'cameras':
                                        $camera = Camera::where('url', $listing->url)->first();
                                        if ($camera) {
                                            $listing->camera_id = $camera->id;
                                        }
                                        return Camerasimg::where('camera_id', $listing->camera_id)->get()->pluck('picture');

                                    case 'chargers':
                                        $charger = Charger::where('url', $listing->url)->first();
                                        if ($charger) {
                                            $listing->charger_id = $charger->id;
                                        }
                                        return Chargersimg::where('charger_id', $listing->charger_id)->get()->pluck('picture');

                                    case 'drones':
                                        $drone = Drone::where('url', $listing->url)->first();
                                        if ($drone) {
                                            $listing->drone_id = $drone->id;
                                        }
                                        return Dronesimg::where('drone_id', $listing->drone_id)->get()->pluck('picture');

                                    case 'gamings':
                                        $gaming = Gaming::where('url', $listing->url)->first();
                                        if ($gaming) {
                                            $listing->gaming_id = $gaming->id;
                                        }
                                        return Gamingsimg::where('gaming_id', $listing->gaming_id)->get()->pluck('picture');

                                    case 'laptops':
                                        $laptop = Laptop::where('url', $listing->url)->first();
                                        if ($laptop) {
                                            $listing->laptop_id = $laptop->id;
                                        }
                                        return Laptopsimg::where('laptop_id', $listing->laptop_id)->get()->pluck('picture');

                                    case 'lightings':
                                        $lighting = Lighting::where('url', $listing->url)->first();
                                        if ($lighting) {
                                            $listing->lighting_id = $lighting->id;
                                        }
                                        return Lightingsimg::where('lighting_id', $listing->lighting_id)->get()->pluck('picture');

                                    case 'printers':
                                        $printer = Printer::where('url', $listing->url)->first();
                                        if ($printer) {
                                            $listing->printer_id = $printer->id;
                                        }
                                        return Printersimg::where('printer_id', $listing->printer_id)->get()->pluck('picture');

                                    case 'routers':
                                        $router = Router::where('url', $listing->url)->first();
                                        if ($router) {
                                            $listing->router_id = $router->id;
                                        }
                                        return Routersimg::where('router_id', $listing->router_id)->get()->pluck('picture');

                                    case 'tablettes':
                                        $tablette = Tablette::where('url', $listing->url)->first();
                                        if ($tablette) {
                                            $listing->tablette_id = $tablette->id;
                                        }
                                        return Tablettesimg::where('tablette_id', $listing->tablette_id)->get()->pluck('picture');

                                    // Evenement
                                    case 'eclairages':
                                        $eclairage = Eclairage::where('url', $listing->url)->first();
                                        if ($eclairage) {
                                            $listing->eclairage_id = $eclairage->id;
                                        }
                                        return Eclairagesimg::where('eclairage_id', $listing->eclairage_id)->get()->pluck('picture');

                                    case 'mobiliers':
                                        $mobilier = Mobilier::where('url', $listing->url)->first();
                                        if ($mobilier) {
                                            $listing->mobilier_id = $mobilier->id;
                                        }
                                        return Mobiliersimg::where('mobilier_id', $listing->mobilier_id)->get()->pluck('picture');

                                    case 'photographies':
                                        $photographie = Photographie::where('url', $listing->url)->first();
                                        if ($photographie) {
                                            $listing->photographie_id = $photographie->id;
                                        }
                                        return Photographiesimg::where('photographie_id', $listing->photographie_id)->get()->pluck('picture');

                                    case 'sonorisations':
                                        $sonorisation = Sonorisation::where('url', $listing->url)->first();
                                        if ($sonorisation) {
                                            $listing->sonorisation_id = $sonorisation->id;
                                        }
                                        return Sonorisationsimg::where('sonorisation_id', $listing->sonorisation_id)->get()->pluck('picture');

                                    case 'tentes':
                                        $tente = Tente::where('url', $listing->url)->first();
                                        if ($tente) {
                                            $listing->tente_id = $tente->id;
                                        }
                                        return Tentesimg::where('tente_id', $listing->tente_id)->get()->pluck('picture');

                                    // Habillement
                                    case 'clothes':
                                        $clothes = Clothes::where('url', $listing->url)->first();
                                        if ($clothes) {
                                            $listing->clothes_id = $clothes->id;
                                        }
                                        return Clothesimg::where('clothes_id', $listing->clothes_id)->get()->pluck('picture');

                                    case 'jewelrys':
                                        $jewelry = Jewelry::where('url', $listing->url)->first();
                                        if ($jewelry) {
                                            $listing->jewelry_id = $jewelry->id;
                                        }
                                        return Jewelrysimg::where('jewelry_id', $listing->jewelry_id)->get()->pluck('picture');

                                    // Immobilier
                                    case 'apartments':
                                        $apartment = Apartment::where('url', $listing->url)->first();
                                        if ($apartment) {
                                            $listing->apartment_id = $apartment->id;
                                        }
                                        return Apartmentsimg::where('apartment_id', $listing->apartment_id)->get()->pluck('picture');

                                    case 'bureauxs':
                                        $bureaux = Bureaux::where('url', $listing->url)->first();
                                        if ($bureaux) {
                                            $listing->bureaux_id = $bureaux->id;
                                        }
                                        return Bureauxsimg::where('bureaux_id', $listing->bureaux_id)->get()->pluck('picture');

                                    case 'magasins':
                                        $magasin = Magasin::where('url', $listing->url)->first();
                                        if ($magasin) {
                                            $listing->magasin_id = $magasin->id;
                                        }
                                        return Magasinsimg::where('magasin_id', $listing->magasin_id)->get()->pluck('picture');

                                    case 'maisons':
                                        $maison = Maison::where('url', $listing->url)->first();
                                        if ($maison) {
                                            $listing->maison_id = $maison->id;
                                        }
                                        return Maisonsimg::where('maison_id', $listing->maison_id)->get()->pluck('picture');

                                    case 'riads':
                                        $riad = Riad::where('url', $listing->url)->first();
                                        if ($riad) {
                                            $listing->riad_id = $riad->id;
                                        }
                                        return Riadsimg::where('riad_id', $listing->riad_id)->get()->pluck('picture');

                                    case 'terrains':
                                        $terrain = Terrain::where('url', $listing->url)->first();
                                        if ($terrain) {
                                            $listing->terrain_id = $terrain->id;
                                        }
                                        return Terrainsimg::where('terrain_id', $listing->terrain_id)->get()->pluck('picture');

                                    case 'villas':
                                        $villa = Villa::where('url', $listing->url)->first();
                                        if ($villa) {
                                            $listing->villa_id = $villa->id;
                                        }
                                        return Villasimg::where('villa_id', $listing->villa_id)->get()->pluck('picture');

                                    // Loisirs
                                    case 'activities':
                                        $activity = Activity::where('url', $listing->url)->first();
                                        if ($activity) {
                                            $listing->activity_id = $activity->id;
                                        }
                                        return Activitiesimg::where('activity_id', $listing->activity_id)->get()->pluck('picture');

                                    case 'livres':
                                        $livre = Livre::where('url', $listing->url)->first();
                                        if ($livre) {
                                            $listing->livre_id = $livre->id;
                                        }
                                        return Livresimg::where('livre_id', $listing->livre_id)->get()->pluck('picture');

                                    case 'musicals':
                                        $musical = Musical::where('url', $listing->url)->first();
                                        if ($musical) {
                                            $listing->musical_id = $musical->id;
                                        }
                                        return Musicalsimg::where('musical_id', $listing->musical_id)->get()->pluck('picture');

                                    // Maison et Jardin
                                    case 'furnitures':
                                        $furniture = Furniture::where('url', $listing->url)->first();
                                        if ($furniture) {
                                            $listing->furniture_id = $furniture->id;
                                        }
                                        return Furnituresimg::where('furniture_id', $listing->furniture_id)->get()->pluck('picture');

                                    case 'houseappliances':
                                        $houseappliance = Houseappliance::where('url', $listing->url)->first();
                                        if ($houseappliance) {
                                            $listing->houseappliance_id = $houseappliance->id;
                                        }
                                        return Houseappliancesimg::where('houseappliance_id', $listing->houseappliance_id)->get()->pluck('picture');

                                    // Materiels
                                    case 'electricaltools':
                                        $electricaltool = Electricaltool::where('url', $listing->url)->first();
                                        if ($electricaltool) {
                                            $listing->electricaltool_id = $electricaltool->id;
                                        }
                                        return Electricaltoolsimg::where('electricaltool_id', $listing->electricaltool_id)->get()->pluck('picture');

                                    case 'ladders':
                                        $ladder = Ladder::where('url', $listing->url)->first();
                                        if ($ladder) {
                                            $listing->ladder_id = $ladder->id;
                                        }
                                        return Laddersimg::where('ladder_id', $listing->ladder_id)->get()->pluck('picture');

                                    case 'mechanicaltools':
                                        $mechanicaltool = Mechanicaltool::where('url', $listing->url)->first();
                                        if ($mechanicaltool) {
                                            $listing->mechanicaltool_id = $mechanicaltool->id;
                                        }
                                        return Mechanicaltoolsimg::where('mechanicaltool_id', $listing->mechanicaltool_id)->get()->pluck('picture');

                                    case 'powertools':
                                        $powertool = Powertool::where('url', $listing->url)->first();
                                        if ($powertool) {
                                            $listing->powertool_id = $powertool->id;
                                        }
                                        return Powertoolsimg::where('powertool_id', $listing->powertool_id)->get()->pluck('picture');

                                    case 'pressurewashers':
                                        $pressurewasher = Pressurewasher::where('url', $listing->url)->first();
                                        if ($pressurewasher) {
                                            $listing->pressurewasher_id = $pressurewasher->id;
                                        }
                                        return Pressurewashersimg::where('pressurewasher_id', $listing->pressurewasher_id)->get()->pluck('picture');

                                    // Services
                                    case 'services':
                                        $service = Service::where('url', $listing->url)->first();
                                        if ($service) {
                                            $listing->service_id = $service->id;
                                        }
                                        return Servicesimg::where('service_id', $listing->service_id)->get()->pluck('picture');

                                    // Vehicules
                                    case 'boats':
                                        $boat = Boat::where('url', $listing->url)->first();
                                        if ($boat) {
                                            $listing->boat_id = $boat->id;
                                        }
                                        return Boatsimg::where('boat_id', $listing->boat_id)->get()->pluck('picture');

                                    case 'camions':
                                        $camion = Camion::where('url', $listing->url)->first();
                                        if ($camion) {
                                            $listing->camion_id = $camion->id;
                                        }
                                        return Camionsimg::where('camion_id', $listing->camion_id)->get()->pluck('picture');

                                    case 'caravans':
                                        $caravan = Caravan::where('url', $listing->url)->first();
                                        if ($caravan) {
                                            $listing->caravan_id = $caravan->id;
                                        }
                                        return Caravansimg::where('caravan_id', $listing->caravan_id)->get()->pluck('picture');

                                    case 'cars':
                                        $car = Car::where('url', $listing->url)->first();
                                        if ($car) {
                                            $listing->car_id = $car->id;
                                        }
                                        return Carsimg::where('car_id', $listing->car_id)->get()->pluck('picture');

                                    case 'engins':
                                        $engin = Engin::where('url', $listing->url)->first();
                                        if ($engin) {
                                            $listing->engin_id = $engin->id;
                                        }
                                        return Enginsimg::where('engin_id', $listing->engin_id)->get()->pluck('picture');

                                    case 'motos':
                                        $moto = Moto::where('url', $listing->url)->first();
                                        if ($moto) {
                                            $listing->moto_id = $moto->id;
                                        }
                                        return Motosimg::where('moto_id', $listing->moto_id)->get()->pluck('picture');

                                    case 'scooters':
                                        $scooter = Scooter::where('url', $listing->url)->first();
                                        if ($scooter) {
                                            $listing->scooter_id = $scooter->id;
                                        }
                                        return Scootersimg::where('scooter_id', $listing->scooter_id)->get()->pluck('picture');

                                    case 'taxiaeroports':
                                        $taxiaeroport = Taxiaeroport::where('url', $listing->url)->first();
                                        if ($taxiaeroport) {
                                            $listing->taxiaeroport_id = $taxiaeroport->id;
                                        }
                                        return Taxiaeroportsimg::where('taxiaeroport_id', $listing->taxiaeroport_id)->get()->pluck('picture');

                                    case 'transportations':
                                        $transportation = Transportation::where('url', $listing->url)->first();
                                        if ($transportation) {
                                            $listing->transportation_id = $transportation->id;
                                        }
                                        return Transportationsimg::where('transportation_id', $listing->transportation_id)->get()->pluck('picture');

                                    case 'velos':
                                        $velo = Velo::where('url', $listing->url)->first();
                                        if ($velo) {
                                            $listing->velo_id = $velo->id;
                                        }
                                        return Velosimg::where('velo_id', $listing->velo_id)->get()->pluck('picture');

                                    default:
                                        return collect(); // Return an empty collection if no match
                                }
                            };





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

                                    'images' => $getImages($listing), // Fetch images based on the category

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
