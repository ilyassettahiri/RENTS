<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Listing;
use App\Models\Favorite;

use App\Models\Reservation;
use App\Models\Customer;
use App\Models\Review;
use App\Models\Collection;
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




class Onlinestore extends Model
{


    protected $fillable = ['typea','url','profile_picture','user_id','name','email','phone','type','description' ,'picture','address','city','zip','country'];



    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }










    public function listing(): HasMany {


        return $this->hasMany(Listing::class);
    }

    public function favorite(): HasMany {


        return $this->hasMany(Favorite::class);
    }



    public function reservation(): HasMany {


        return $this->hasMany(Reservation::class);
    }



    public function customer(): HasMany {


        return $this->hasMany(Customer::class);
    }


    public function review(): HasMany {


        return $this->hasMany(Review::class);
    }

    public function collection(): HasMany {


        return $this->hasMany(Collection::class);
    }


    public function discount(): HasMany {


        return $this->hasMany(Discount::class);
    }




     // Bien et Sport

     public function billiards(): HasMany {


        return $this->hasMany(Billiard::class);
    }


    public function boxings(): HasMany {


        return $this->hasMany(Boxing::class);
    }

    public function divings(): HasMany {


        return $this->hasMany(Diving::class);
    }

    public function footballs(): HasMany {


        return $this->hasMany(Football::class);
    }


    public function golfs(): HasMany {


        return $this->hasMany(Golf::class);
    }


    public function huntings(): HasMany {


        return $this->hasMany(Hunting::class);
    }


    public function musculations(): HasMany {


        return $this->hasMany(Musculation::class);
    }


    public function surfs(): HasMany {


        return $this->hasMany(Surf::class);
    }


    public function tennis(): HasMany {


        return $this->hasMany(Tennis::class);
    }




    // Electronique

    public function audios(): HasMany {


        return $this->hasMany(Audio::class);
    }

    public function cameras(): HasMany {


        return $this->hasMany(Camera::class);
    }

    public function chargers(): HasMany {


        return $this->hasMany(Charger::class);
    }

    public function drones(): HasMany {


        return $this->hasMany(Drone::class);
    }

    public function gamings(): HasMany {


        return $this->hasMany(Gaming::class);
    }

    public function laptops(): HasMany {


        return $this->hasMany(Laptop::class);
    }

    public function lightings(): HasMany {


        return $this->hasMany(Lighting::class);
    }

    public function printers(): HasMany {


        return $this->hasMany(Printer::class);
    }

    public function routers(): HasMany {


        return $this->hasMany(Router::class);
    }

    public function tablettes(): HasMany {


        return $this->hasMany(Tablette::class);
    }





    // Evenement

    public function eclairages(): HasMany {


        return $this->hasMany(Eclairage::class);
    }


    public function mobiliers(): HasMany {


        return $this->hasMany(Mobilier::class);
    }


    public function photographies(): HasMany {


        return $this->hasMany(Photographie::class);
    }


    public function sonorisations(): HasMany {


        return $this->hasMany(Sonorisation::class);
    }


    public function tentes(): HasMany {


        return $this->hasMany(Tente::class);
    }



    // Habillement


    public function clothes(): HasMany {


        return $this->hasMany(Clothes::class);
    }

    public function jewelrys(): HasMany {


        return $this->hasMany(Jewelry::class);
    }



    // Immobilier


    public function apartments(): HasMany {


        return $this->hasMany(Apartment::class);
    }

    public function bureauxs(): HasMany {


        return $this->hasMany(Bureaux::class);
    }

    public function magasins(): HasMany {


        return $this->hasMany(Magasin::class);
    }


    public function maisons(): HasMany {


        return $this->hasMany(Maison::class);
    }


    public function riads(): HasMany {


        return $this->hasMany(Riad::class);
    }

    public function terrains(): HasMany {


        return $this->hasMany(Terrain::class);
    }


    public function villas(): HasMany {


        return $this->hasMany(Villa::class);
    }






    // Loisirs


    public function activities(): HasMany {


        return $this->hasMany(Activity::class);
    }



    public function livres(): HasMany {


        return $this->hasMany(Livre::class);
    }



    public function musicals(): HasMany {


        return $this->hasMany(Musical::class);
    }



    // Maison et Jardin


    public function furnitures(): HasMany {


        return $this->hasMany(Furniture::class);
    }


    public function houseappliances(): HasMany {


        return $this->hasMany(Houseappliance::class);
    }



    // Materiels


    public function electricaltools(): HasMany {


        return $this->hasMany(Electricaltool::class);
    }


    public function ladders(): HasMany {


        return $this->hasMany(Ladder::class);
    }


    public function mechanicaltools(): HasMany {


        return $this->hasMany(Mechanicaltool::class);
    }



    public function powertools(): HasMany {


        return $this->hasMany(Powertool::class);
    }



    public function pressurewashers(): HasMany {


        return $this->hasMany(Pressurewasher::class);
    }





    // Services

    public function services(): HasMany {


        return $this->hasMany(Service::class);
    }


    // Vehicules


    public function boats(): HasMany {


        return $this->hasMany(Boat::class);
    }


    public function camions(): HasMany {


        return $this->hasMany(Camion::class);
    }

    public function caravans(): HasMany {


        return $this->hasMany(Caravan::class);
    }


    public function cars(): HasMany {


        return $this->hasMany(Car::class);
    }


    public function engins(): HasMany {


        return $this->hasMany(Engin::class);
    }


    public function motos(): HasMany {


        return $this->hasMany(Moto::class);
    }


    public function scooters(): HasMany {


        return $this->hasMany(Scooter::class);
    }


    public function taxiaeroports(): HasMany {


        return $this->hasMany(Taxiaeroport::class);
    }


    public function transportations(): HasMany {


        return $this->hasMany(Transportation::class);
    }


    public function velos(): HasMany {


        return $this->hasMany(Velo::class);
    }









}
