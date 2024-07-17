<?php

namespace App\Http\Controllers\Api\V2\Admin\ListingC;

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







class DetailListingController extends Controller
{

    protected $listing;
    protected $category;
    protected $listingcategory;
    protected $reservations;



    public function showDetailListing(Request $request, $id)
    {
        $this->listing = Listing::where('id', $id)->first();
        $this->category = strtolower($this->listing->category);
        $url = $this->listing->url;




        switch ($this->category) {



            case 'billiards':


                $this->listingcategory = Billiard::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Billiardsimg::where('billiard_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);







                break;





            case 'boxings':

                $this->listingcategory = Boxing::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Boxingsimg::where('boxing_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'divings':


                            $this->listingcategory = Diving::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Divingsimg::where('diving_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'footballs':

                            $this->listingcategory = Football::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Footballsimg::where('football_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;







            case 'golfs':

                            $this->listingcategory = Golf::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Golfsimg::where('golf_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;








            case 'huntings':


                $this->listingcategory = Hunting::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Huntingsimg::where('hunting_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'musculations':

                $this->listingcategory = Musculation::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Musculationsimg::where('musculation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;








            case 'surfs':

                $this->listingcategory = Surf::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Surfsimg::where('surf_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;







            case 'tennis':


                $this->listingcategory = Tenni::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Tennisimg::where('tenni_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'audios':


                $this->listingcategory = Audio::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Audiosimg::where('audio_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'cameras':

                $this->listingcategory = Camera::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Camerasimg::where('camera_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'chargers':


                $this->listingcategory = Charger::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Chargersimg::where('charger_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;






            case 'drones':

                $this->listingcategory = Drone::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Dronesimg::where('drone_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;









            case 'gamings':


                $this->listingcategory = Gaming::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Gamingsimg::where('gaming_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'laptops':


                $this->listingcategory = Laptop::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Laptopsimg::where('laptop_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;








            case 'lightings':


                $this->listingcategory = Lighting::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Lightingsimg::where('lighting_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;








            case 'printers':


                $this->listingcategory = Printer::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Printersimg::where('printer_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'routers':


                $this->listingcategory = Router::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Routersimg::where('router_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;







            case 'tablettes':


                $this->listingcategory = Tablette::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Tablettesimg::where('tablette_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;







            case 'eclairages':


                $this->listingcategory = Eclairage::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Eclairagesimg::where('eclairage_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'mobiliers':


                $this->listingcategory = Mobilier::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Mobiliersimg::where('mobilier_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'photographies':


                $this->listingcategory = Photographie::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Photographiesimg::where('photographie_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'sonorisations':


                $this->listingcategory = Sonorisation::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Sonorisationsimg::where('sonorisation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;







            case 'tentes':


                $this->listingcategory = Tente::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Tentesimg::where('tente_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'clothes':


                $this->listingcategory = Clothe::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Clothesimg::where('clothe_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'jewelrys':

                $this->listingcategory = Jewelry::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Jewelrysimg::where('jewelry_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;






            case 'apartments':

                $this->listingcategory = Apartment::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Apartmentsimg::where('apartment_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;







            case 'bureauxs':



                $this->listingcategory = Bureaux::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Bureauxsimg::where('bureaux_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'magasins':


                $this->listingcategory = Magasin::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Magasinsimg::where('magasin_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'maisons':

                $this->listingcategory = Maison::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Maisonsimg::where('maison_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'riads':

                $this->listingcategory = Riad::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Riadsimg::where('riad_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;





            case 'terrains':


                $this->listingcategory = Terrain::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Terrainsimg::where('terrain_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'villas':


                $this->listingcategory = Villa::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Villasimg::where('villa_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'activities':

                $this->listingcategory = Activitie::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Activitiesimg::where('activitie_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;






            case 'livres':

                $this->listingcategory = Livre::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Livresimg::where('livre_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'musicals':


                $this->listingcategory = Musical::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Musicalsimg::where('musical_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'furnitures':


                $this->listingcategory = Furniture::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Furnituresimg::where('furniture_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'houseappliances':



                $this->listingcategory = Houseappliance::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Houseappliancesimg::where('houseappliance_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);




                break;






            case 'electricaltools':



                $this->listingcategory = Electricaltool::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Electricaltoolsimg::where('electricaltool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'ladders':

                $this->listingcategory = Ladder::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Laddersimg::where('ladder_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'mechanicaltools':

                $this->listingcategory = Mechanicaltool::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Mechanicaltoolsimg::where('mechanicaltool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;





            case 'powertools':


                $this->listingcategory = Powertool::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Powertoolsimg::where('powertool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);




                break;






            case 'pressurewashers':

                $this->listingcategory = Pressurewasher::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Pressurewashersimg::where('pressurewasher_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'services':


                $this->listingcategory = Service::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Servicesimg::where('service_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'boats':

                $this->listingcategory = Boat::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Boatsimg::where('boat_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'camions':

                $this->listingcategory = Camion::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Camionsimg::where('camion_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;





            case 'caravans':


                $this->listingcategory = Caravan::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Caravansimg::where('caravan_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);




                break;





            case 'cars':



                $this->listingcategory = Car::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Carsimg::where('car_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);




                break;





            case 'engins':


                $this->listingcategory = Engin::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Enginsimg::where('engin_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);






                break;





            case 'motos':


                $this->listingcategory = Moto::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Motosimg::where('moto_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;





            case 'scooters':


                $this->listingcategory = Scooter::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Scootersimg::where('scooter_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            case 'taxiaeroports':


                $this->listingcategory = Taxiaeroport::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Taxiaeroportsimg::where('taxiaeroport_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;





            case 'transportations':


                $this->listingcategory = Transportation::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Transportationsimg::where('transportation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;







            case 'velos':


                $this->listingcategory = Velo::where('url', $url)->first();
                            $this->reservations = $this->listingcategory->reservation()->orderBy('reservationstart')->get();




                                            return response()->json([
                                                'data' => [
                                                    'type' => $this->category,
                                                    'id' => $this->listingcategory->id,
                                                    'attributes' => [
                                                        'title' => $this->listingcategory->title,
                                                        'price' => $this->listingcategory->price,
                                                        'description' => $this->listingcategory->description,
                                                        'startdate' => $this->listingcategory->startdate,
                                                        'enddate' => $this->listingcategory->enddate,
                                                        'address' => $this->listingcategory->address,
                                                        'city' => $this->listingcategory->city,
                                                        'country' => $this->listingcategory->country,
                                                        'zip' => $this->listingcategory->zip,
                                                        'category' => $this->category,
                                                        'reservations' => $this->reservations->map(function ($reservation) {
                                                            return [
                                                                'start' => $reservation->reservationstart,
                                                                'end' => $reservation->reservationsend,
                                                                'name' => $reservation->name,  // Include reservation name

                                                            ];
                                                        }),



                                                        'images' => Velosimg::where('velo_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                            return $image->picture;
                                                        }),
                                                    ],
                                                ],
                                            ]);





                break;






            default:
                // Default code
                break;
        }





    }






    public function updateDetailListing(Request $request, $id)
    {


        $data = $request->input('data.attributes');

        $this->listing->update([
            'title' => $data['title'] ?? $this->listing->title,
            'price' => $data['price'] ?? $this->listing->price,
            'status' => $data['status'] ?? $this->listing->status,
            'category' => $data['category'] ?? $this->listing->category,
            'url' => $data['url'] ?? $this->listing->url,
        ]);

        switch ($this->category) {


            case 'billiards':

                $this->listingcategory->update([
                    'title' => $data['title'] ?? $this->listingcategory->title,
                    'price' => $data['price'] ?? $this->listingcategory->price,
                    'description' => $data['description'] ?? $this->listingcategory->description,
                    'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                    'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                    'address' => $data['address'] ?? $this->listingcategory->address,
                    'city' => $data['city'] ?? $this->listingcategory->city,
                    'country' => $data['country'] ?? $this->listingcategory->country,
                    'zip' => $data['zip'] ?? $this->listingcategory->zip,
                ]);


                if (isset($data['images'])) {
                    Billiardsimg::where('billiard_id', $this->listingcategory->id)->delete();
                    foreach ($data['images'] as $image) {
                        Billiardsimg::create([
                            'billiard_id' => $this->billiard->id,
                            'picture' => $image,
                        ]);
                    }
                }

                break;


        }

        return response()->json([
            'data' => [
                'type' => $this->category,
                'id' => $this->listing->id,
                'attributes' => [
                    'title' => $this->listing->title,
                    'price' => $this->listing->price,
                    'status' => $this->listing->status,
                    'category' => $this->listing->category,
                    'url' => $this->listing->url,
                ],
            ],
        ]);
    }





}
