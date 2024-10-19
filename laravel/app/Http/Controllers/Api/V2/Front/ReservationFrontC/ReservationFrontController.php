<?php

namespace App\Http\Controllers\Api\V2\Front\ReservationFrontC;

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
use Illuminate\Support\Carbon;

use App\Enums\ItemStatus;
use Illuminate\Support\Str;




use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;


use App\Models\Job;
use App\Models\Jobsimg;


use App\Models\Listing;
use App\Models\Reservation;
use App\Models\Customer;


use App\Models\Discount;



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






class ReservationFrontController extends JsonApiController
{


    protected $category;
    protected $listingcategory;
    protected $url;
    protected $checkout_id;



    public function getReservation(Request $request, $category, $url)
    {



        $this->category = $category;

        $this->url = $url;







        switch ($this->category) {



            case 'billiards':


                $this->listingcategory = Billiard::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);

                break;





            case 'boxings':


                $this->listingcategory = Boxing::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;






            case 'divings':


                $this->listingcategory = Diving::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'footballs':


                $this->listingcategory = Football::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'golfs':


                $this->listingcategory = Golf::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;








            case 'huntings':


                $this->listingcategory = Hunting::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'musculations':


                $this->listingcategory = Musculation::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;








            case 'surfs':



                $this->listingcategory = Surf::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);








                break;







            case 'tennis':


                $this->listingcategory = Tennis::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'audios':



                $this->listingcategory = Audio::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'cameras':


                $this->listingcategory = Camera::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);





                break;






            case 'chargers':



                $this->listingcategory = Charger::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);







                break;






            case 'drones':


                $this->listingcategory = Drone::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;









            case 'gamings':


                $this->listingcategory = Gaming::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'laptops':



                $this->listingcategory = Laptop::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;








            case 'lightings':


                $this->listingcategory = Lighting::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;








            case 'printers':


                $this->listingcategory = Printer::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;






            case 'routers':


                $this->listingcategory = Router::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);







                break;







            case 'tablettes':


                $this->listingcategory = Tablette::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);







                break;







            case 'eclairages':



                $this->listingcategory = Eclairage::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'mobiliers':



                $this->listingcategory = Mobilier::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;







            case 'photographies':


                $this->listingcategory = Photographie::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);






                break;






            case 'sonorisations':


                $this->listingcategory = Sonorisation::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);







                break;







            case 'tentes':



                $this->listingcategory = Tente::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'clothes':


                $this->listingcategory = Clothes::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;







            case 'jewelrys':


                $this->listingcategory = Jewelry::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;






            case 'apartments':



                $this->listingcategory = Apartment::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;







            case 'bureauxs':


                $this->listingcategory = Bureaux::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);





                break;






            case 'magasins':


                $this->listingcategory = Magasin::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;






            case 'maisons':


                $this->listingcategory = Maison::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'riads':



                $this->listingcategory = Riad::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;





            case 'terrains':


                $this->listingcategory = Terrain::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;







            case 'villas':



                $this->listingcategory = Villa::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'activities':



                $this->listingcategory = Activity::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'livres':


                $this->listingcategory = Livre::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'musicals':



                $this->listingcategory = Musical::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'furnitures':


                $this->listingcategory = Furniture::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;






            case 'houseappliances':


                $this->listingcategory = Houseappliance::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;






            case 'electricaltools':



                $this->listingcategory = Electricaltool::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;






            case 'ladders':


                $this->listingcategory = Ladder::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'mechanicaltools':



                $this->listingcategory = Mechanicaltool::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;





            case 'powertools':


                $this->listingcategory = Powertool::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'pressurewashers':


                $this->listingcategory = Pressurewasher::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'services':


                $this->listingcategory = Service::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;



            case 'jobs':


                $this->listingcategory = Job::where('url', $url)->first();





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
                            'picture' => $this->listingcategory->picture,
                            'url' => $this->url,
                            'created_ad' => $this->listingcategory->created_ad,





                        ],
                    ],
                ]);




                break;






            case 'boats':


                $this->listingcategory = Boat::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            case 'camions':



                $this->listingcategory = Camion::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);


                break;





            case 'caravans':


                $this->listingcategory = Caravan::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;





            case 'cars':


                $this->listingcategory = Car::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;





            case 'engins':




                $this->listingcategory = Engin::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;





            case 'motos':



                $this->listingcategory = Moto::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;





            case 'scooters':


                $this->listingcategory = Scooter::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;






            case 'taxiaeroports':




                $this->listingcategory = Taxiaeroport::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);


                break;





            case 'transportations':


                $this->listingcategory = Transportation::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);




                break;







            case 'velos':



                $this->listingcategory = Velo::where('url', $url)->first();





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
                        'picture' => $this->listingcategory->picture,
                        'url' => $this->url,
                        'created_ad' => $this->listingcategory->created_ad,





                    ],
                ],
            ]);



                break;






            default:
                // Default code
                break;
        }





    }


    public function createReservation(Request $request, $category, $url)
    {



        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',      // Add last name validation if required
            'email' => 'required|email|max:255',
            'fullAddress' => 'required|string|max:255',   // Full address validation
            'fullAddress2' => 'nullable|string|max:255',  // Optional second address field
            'zipCode' => 'required|string|max:10',        // Zip code validation
            'city' => 'required|string|max:100',          // City validation
            'phoneNumber' => 'required|string|max:20',    // Phone number validation
            'reservationstart' => 'required|date',
            'reservationsend' => 'required|date',
        ]);

        $this->category = $category;

        $this->url = $url;

        // Generate a unique checkout ID
        $checkout_id = Str::random(30);


         // Convert the dates to MySQL format
         $reservationStart = Carbon::parse($validatedData['reservationstart'])->format('Y-m-d H:i:s');
         $reservationEnd = Carbon::parse($validatedData['reservationsend'])->format('Y-m-d H:i:s');











        switch ($this->category) {



                    case 'billiards':


                        $this->listingcategory = Billiard::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],



                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'billiard_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'billiard_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;





                    case 'boxings':


                        $this->listingcategory = Boxing::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'boxing_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'boxing_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'divings':


                        $this->listingcategory = Diving::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'diving_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'diving_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'footballs':


                        $this->listingcategory = Football::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'football_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'football_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'golfs':


                        $this->listingcategory = Golf::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'golf_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'golf_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;








                    case 'huntings':


                        $this->listingcategory = Hunting::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'hunting_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'hunting_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'musculations':


                        $this->listingcategory = Musculation::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'musculation_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'musculation_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;








                    case 'surfs':


                        $this->listingcategory = Surf::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'surf_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'surf_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'tennis':


                        $this->listingcategory = Tennis::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'tennis_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'tennis_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'audios':


                        $this->listingcategory = Audio::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'audio_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'audio_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'cameras':


                        $this->listingcategory = Camera::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'camera_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'camera_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'chargers':


                        $this->listingcategory = Charger::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'charger_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'charger_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);







                        break;






                    case 'drones':


                        $this->listingcategory = Drone::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'drone_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'drone_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;









                    case 'gamings':


                        $this->listingcategory = Gaming::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'gaming_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'gaming_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'laptops':


                        $this->listingcategory = Laptop::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'laptop_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'laptop_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;








                    case 'lightings':


                        $this->listingcategory = Lighting::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'lighting_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'lighting_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;








                    case 'printers':


                        $this->listingcategory = Printer::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'printer_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'printer_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'routers':


                        $this->listingcategory = Router::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'router_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'router_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);







                        break;







                    case 'tablettes':


                        $this->listingcategory = Tablette::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'tablette_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'tablette_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);







                        break;







                    case 'eclairages':


                        $this->listingcategory = Eclairage::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'eclairage_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'eclairage_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'mobiliers':


                        $this->listingcategory = Mobilier::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'mobilier_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'mobilier_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'photographies':


                        $this->listingcategory = Photographie::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'photographie_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'photographie_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'sonorisations':


                        $this->listingcategory = Sonorisation::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'sonorisation_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'sonorisation_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);







                        break;







                    case 'tentes':


                        $this->listingcategory = Tente::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'tente_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'tente_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'clothes':


                        $this->listingcategory = Clothes::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'clothes_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'clothes_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'jewelrys':


                        $this->listingcategory = Jewelry::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'jewelry_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'jewelry_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'apartments':


                        $this->listingcategory = Apartment::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'apartment_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'apartment_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'bureauxs':


                        $this->listingcategory = Bureaux::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'bureaux_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'bureaux_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);







                        break;






                    case 'magasins':


                        $this->listingcategory = Magasin::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'magasin_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'magasin_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'maisons':


                        $this->listingcategory = Maison::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'maison_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'maison_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'riads':


                        $this->listingcategory = Riad::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'riad_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'riad_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;





                    case 'terrains':


                        $this->listingcategory = Terrain::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'terrain_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'terrain_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'villas':


                        $this->listingcategory = Villa::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'villa_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'villa_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'activities':


                        $this->listingcategory = Activity::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'activity_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'activity_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'livres':


                        $this->listingcategory = Livre::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'livre_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'livre_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'musicals':


                        $this->listingcategory = Musical::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'musical_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'musical_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'furnitures':


                        $this->listingcategory = Furniture::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'furniture_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'furniture_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'houseappliances':


                        $this->listingcategory = Houseappliance::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'houseappliance_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'houseappliance_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'electricaltools':


                        $this->listingcategory = Electricaltool::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'electricaltool_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'electricaltool_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);







                        break;






                    case 'ladders':


                        $this->listingcategory = Ladder::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'ladder_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'ladder_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'mechanicaltools':


                        $this->listingcategory = Mechanicaltool::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'mechanicaltool_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'mechanicaltool_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;





                    case 'powertools':


                        $this->listingcategory = Powertool::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'powertool_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'powertool_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'pressurewashers':


                        $this->listingcategory = Pressurewasher::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'pressurewasher_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'pressurewasher_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'services':


                        $this->listingcategory = Service::where('url', $url)->first();


                        Reservation::create([

                            'checkout_id' =>$checkout_id,
                            'name' => $validatedData['name'],
                            'email' => $validatedData['email'],
                            'address' => $validatedData['fullAddress'],
                            'zip' => $validatedData['zipCode'],
                            'city' => $validatedData['city'],
                            'phone' => $validatedData['phoneNumber'],
                            'url' =>$this->url ,
                            'category' =>$this->category ,
                            'service_id' =>$this->listingcategory->id,
                            'user_id'=> $this->listingcategory->user_id,

                            'onlinestore_id'=> $this->listingcategory->user_id,


                            'status' => "pending",


                            'listings_thumb' =>$this->listingcategory->picture ,
                            'listings_title' =>$this->listingcategory->title ,
                            'listings_price' =>$this->listingcategory->price ,

                            'reservationstart' => $reservationStart,
                            'reservationsend' => $reservationEnd,


                        ]);

                        Customer::create([
                            'name' => $validatedData['name'],
                            'email' => $validatedData['email'],
                            'address' => $validatedData['fullAddress'],
                            'zip' => $validatedData['zipCode'],
                            'city' => $validatedData['city'],
                            'phone' => $validatedData['phoneNumber'],
                            'url' =>$this->url ,
                            'category' =>$this->category ,
                            'service_id' =>$this->listingcategory->id,
                            'user_id'=> $this->listingcategory->user_id,
                            'listings_thumb' =>$this->listingcategory->picture ,
                            'listings_title' =>$this->listingcategory->title ,
                            'listings_price' =>$this->listingcategory->price ,


                        ]);





                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $this->listingcategory->id,
                                'attributes' => [
                                    'checkout_id' => $checkout_id,






                                ],
                            ],
                        ]);






                        break;





                        case 'jobs':


                            $this->listingcategory = Job::where('url', $url)->first();


                            Reservation::create([

                                'checkout_id' =>$checkout_id,
                                'name' => $validatedData['name'],
                                'email' => $validatedData['email'],
                                'address' => $validatedData['fullAddress'],
                                'zip' => $validatedData['zipCode'],
                                'city' => $validatedData['city'],
                                'phone' => $validatedData['phoneNumber'],
                                'url' =>$this->url ,
                                'category' =>$this->category ,
                                'service_id' =>$this->listingcategory->id,
                                'user_id'=> $this->listingcategory->user_id,

                                'onlinestore_id'=> $this->listingcategory->user_id,


                                'status' => "pending",


                                'listings_thumb' =>$this->listingcategory->picture ,
                                'listings_title' =>$this->listingcategory->title ,
                                'listings_price' =>$this->listingcategory->price ,

                                'reservationstart' => $reservationStart,
                                'reservationsend' => $reservationEnd,


                            ]);

                            Customer::create([
                                'name' => $validatedData['name'],
                                'email' => $validatedData['email'],
                                'address' => $validatedData['fullAddress'],
                                'zip' => $validatedData['zipCode'],
                                'city' => $validatedData['city'],
                                'phone' => $validatedData['phoneNumber'],
                                'url' =>$this->url ,
                                'category' =>$this->category ,
                                'service_id' =>$this->listingcategory->id,
                                'user_id'=> $this->listingcategory->user_id,
                                'listings_thumb' =>$this->listingcategory->picture ,
                                'listings_title' =>$this->listingcategory->title ,
                                'listings_price' =>$this->listingcategory->price ,


                            ]);





                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $this->listingcategory->id,
                                    'attributes' => [
                                        'checkout_id' => $checkout_id,






                                    ],
                                ],
                            ]);






                            break;








                    case 'boats':


                        $this->listingcategory = Boat::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'boat_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'boat_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;






                    case 'camions':


                        $this->listingcategory = Camion::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'camion_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'camion_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;





                    case 'caravans':


                        $this->listingcategory = Caravan::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'caravan_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'caravan_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);





                        break;





                    case 'cars':


                        $this->listingcategory = Car::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'car_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'car_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;





                    case 'engins':


                        $this->listingcategory = Engin::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'engin_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'engin_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);







                        break;





                    case 'motos':


                        $this->listingcategory = Moto::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'moto_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'moto_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;





                    case 'scooters':


                        $this->listingcategory = Scooter::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'scooter_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'scooter_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    case 'taxiaeroports':


                        $this->listingcategory = Taxiaeroport::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'taxiaeroport_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'taxiaeroport_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;





                    case 'transportations':


                        $this->listingcategory = Transportation::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'transportation_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'transportation_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;







                    case 'velos':


                        $this->listingcategory = Velo::where('url', $url)->first();


                Reservation::create([

                    'checkout_id' =>$checkout_id,
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'velo_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,

                    'onlinestore_id'=> $this->listingcategory->user_id,


                    'status' => "pending",


                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,

                    'reservationstart' => $reservationStart,
                    'reservationsend' => $reservationEnd,


                ]);

                Customer::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'address' => $validatedData['fullAddress'],
                    'zip' => $validatedData['zipCode'],
                    'city' => $validatedData['city'],
                    'phone' => $validatedData['phoneNumber'],
                    'url' =>$this->url ,
                    'category' =>$this->category ,
                    'velo_id' =>$this->listingcategory->id,
                    'user_id'=> $this->listingcategory->user_id,
                    'listings_thumb' =>$this->listingcategory->picture ,
                    'listings_title' =>$this->listingcategory->title ,
                    'listings_price' =>$this->listingcategory->price ,


                ]);





                return response()->json([
                    'data' => [
                        'type' => $category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'checkout_id' => $checkout_id,






                        ],
                    ],
                ]);






                        break;






                    default:
                        // Default code
                        break;
        }







    }



    public function checkDiscount(Request $request)
    {
        // Validate the incoming request to ensure 'discount_code' and 'url' are provided
        $validatedData = $request->validate([
            'discount_code' => 'required|string',
            'url' => 'required|string',
        ]);



        // Find the listing by URL
        $listing = Listing::where('url', $validatedData['url'])->first();



        // Find the discount by code
        $discount = Discount::where('code', $validatedData['discount_code'])->first();

        // If no discount is found, return an error
        if (!$discount) {
            return response()->json(['error' => 'Invalid discount code.'], 400);
        }

        // Check if the discount is associated with the listing
        if ($listing->discount_id !== $discount->id) {
            return response()->json(['error' => 'Discount code not applicable to this listing.'], 400);
        }

        // Return the discount value
        return response()->json([
            'discount_value' => $discount->discountvalue, // Discount percentage
        ]);
    }




}
