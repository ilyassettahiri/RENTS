<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Reviewreply;

use App\Enums\Status;


class Review extends Model
{


    protected $fillable = ['like','rating','name','email' ,'description','status','user_id','onlinestore_id' ,'category','listings_thumb','listings_title','listings_price','url','listings_description',

    'billiard_id','boxing_id','diving_id','football_id','golf_id','hunting_id','musculation_id','surf_id','tennis_id',

    'audio_id','camera_id','charger_id','drone_id','gaming_id','laptop_id','lighting_id','printer_id','router_id','tablette_id',

    'eclairage_id','mobilier_id','photographie_id','sonorisation_id','tente_id',

    'clothes_id','jewelry_id',

    'apartment_id','bureaux_id','magasin_id','maison_id','riad_id','terrain_id','villa_id',

    'activity_id','livre_id','musical_id',

    'furniture_id','houseappliance_id',

    'electricaltool_id','ladder_id','mechanicaltool_id','powertool_id','pressurewasher_id',

    'service_id',

    'boat_id','camion_id','caravan_id','car_id','engin_id','moto_id','scooter_id','taxiaeroport_id','transportation_id','velo_id',




];



protected $casts = [
    'like' => 'integer',
];






    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }


    public function onlinestore(): belongsTo {

        return $this->belongsTo(Onlinestore::class);

    }



    public function reviewreply()
    {
        return $this->hasMany(Reviewreply::class);
    }



   // Bien et Sport

   public function billiards(): belongsTo {


    return $this->belongsTo(Billiards::class);
   }


    public function boxings(): belongsTo {


        return $this->belongsTo(Boxings::class);
    }

    public function divings(): belongsTo {


        return $this->belongsTo(Divings::class);
    }

    public function footballs(): belongsTo {


        return $this->belongsTo(Footballs::class);
    }


    public function golfs(): belongsTo {


        return $this->belongsTo(Golfs::class);
    }


    public function huntings(): belongsTo {


        return $this->belongsTo(Huntings::class);
    }


    public function musculations(): belongsTo {


        return $this->belongsTo(Musculations::class);
    }


    public function surfs(): belongsTo {


        return $this->belongsTo(Surfs::class);
    }


    public function tennis(): belongsTo {


        return $this->belongsTo(Tennis::class);
    }




    // Electronique

    public function audios(): belongsTo {


        return $this->belongsTo(Audios::class);
    }

    public function cameras(): belongsTo {


        return $this->belongsTo(Cameras::class);
    }

    public function chargers(): belongsTo {


        return $this->belongsTo(Chargers::class);
    }

    public function drones(): belongsTo {


        return $this->belongsTo(Drones::class);
    }

    public function gamings(): belongsTo {


        return $this->belongsTo(Gamings::class);
    }

    public function laptops(): belongsTo {


        return $this->belongsTo(Laptops::class);
    }

    public function lightings(): belongsTo {


        return $this->belongsTo(Lightings::class);
    }

    public function printers(): belongsTo {


        return $this->belongsTo(Printers::class);
    }

    public function routers(): belongsTo {


        return $this->belongsTo(Routers::class);
    }

    public function tablettes(): belongsTo {


        return $this->belongsTo(Tablettes::class);
    }





    // Evenement

    public function eclairages(): belongsTo {


        return $this->belongsTo(Eclairages::class);
    }


    public function mobiliers(): belongsTo {


        return $this->belongsTo(Mobiliers::class);
    }


    public function photographies(): belongsTo {


        return $this->belongsTo(Photographies::class);
    }


    public function sonorisations(): belongsTo {


        return $this->belongsTo(Sonorisations::class);
    }


    public function tentes(): belongsTo {


        return $this->belongsTo(Tentes::class);
    }



    // Habillement


    public function clothes(): belongsTo {


        return $this->belongsTo(Clothes::class);
    }

    public function jewelrys(): belongsTo {


        return $this->belongsTo(Jewelrys::class);
    }



    // Immobilier


    public function apartments(): belongsTo {


        return $this->belongsTo(Apartments::class);
    }

    public function bureauxs(): belongsTo {


        return $this->belongsTo(Bureauxs::class);
    }

    public function magasins(): belongsTo {


        return $this->belongsTo(Magasins::class);
    }


    public function maisons(): belongsTo {


        return $this->belongsTo(Maisons::class);
    }


    public function riads(): belongsTo {


        return $this->belongsTo(Riads::class);
    }

    public function terrains(): belongsTo {


        return $this->belongsTo(Terrains::class);
    }


    public function villas(): belongsTo {


        return $this->belongsTo(Villas::class);
    }






    // Loisirs


    public function activities(): belongsTo {


        return $this->belongsTo(Activities::class);
    }



    public function livres(): belongsTo {


        return $this->belongsTo(Livres::class);
    }



    public function musicals(): belongsTo {


        return $this->belongsTo(Musicals::class);
    }



    // Maison et Jardin


    public function furnitures(): belongsTo {


        return $this->belongsTo(Furnitures::class);
    }


    public function houseappliances(): belongsTo {


        return $this->belongsTo(Houseappliances::class);
    }



    // Materiels


    public function electricaltools(): belongsTo {


        return $this->belongsTo(Electricaltools::class);
    }


    public function ladders(): belongsTo {


        return $this->belongsTo(Ladders::class);
    }


    public function mechanicaltools(): belongsTo {


        return $this->belongsTo(Mechanicaltools::class);
    }



    public function powertools(): belongsTo {


        return $this->belongsTo(Powertools::class);
    }



    public function pressurewashers(): belongsTo {


        return $this->belongsTo(Pressurewashers::class);
    }





    // Services

    public function services(): belongsTo {


        return $this->belongsTo(Services::class);
    }


    // Vehicules


    public function boats(): belongsTo {


        return $this->belongsTo(Boats::class);
    }


    public function camions(): belongsTo {


        return $this->belongsTo(Camions::class);
    }

    public function caravans(): belongsTo {


        return $this->belongsTo(Caravans::class);
    }


    public function cars(): belongsTo {


        return $this->belongsTo(Cars::class);
    }


    public function engins(): belongsTo {


        return $this->belongsTo(Engins::class);
    }


    public function motos(): belongsTo {


        return $this->belongsTo(Motos::class);
    }


    public function scooters(): belongsTo {


        return $this->belongsTo(Scooters::class);
    }


    public function taxiaeroports(): belongsTo {


        return $this->belongsTo(Taxiaeroports::class);
    }


    public function transportations(): belongsTo {


        return $this->belongsTo(Transportations::class);
    }


    public function velos(): belongsTo {


        return $this->belongsTo(Velos::class);
    }





}
