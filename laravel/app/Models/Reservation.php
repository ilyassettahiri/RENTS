<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


use App\Enums\Status;


class Reservation extends Model
{


    protected $fillable = ['name','email','address','city','zip','country','phone','reservationstart' ,'reservationsend' ,'status','user_id','onlinestore_id','checkout_id','category','listings_thumb','listings_title','listings_price','url',

    'listing_id','billiard_id','boxing_id','diving_id','football_id','golf_id','hunting_id','musculation_id','surf_id','tennis_id',

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



    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }


    public function listing(): belongsTo {

        return $this->belongsTo(Listing::class);

    }

    public static function getTopListingsOfMonth($limit = 5)
    {
        return self::select('listing_id', DB::raw('COUNT(listing_id) as reservation_count'))
            ->whereYear('created_at', Carbon::now()->year)
            ->whereMonth('created_at', Carbon::now()->month)
            ->groupBy('listing_id')
            ->orderBy('reservation_count', 'desc')
            ->limit($limit)
            ->get();
    }


    public function onlinestore(): belongsTo {

        return $this->belongsTo(Onlinestore::class);

    }









// Bien et Sport

  public function billiard(): belongsTo {


    return $this->belongsTo(Billiard::class);
   }


    public function boxing(): belongsTo {


        return $this->belongsTo(Boxing::class);
    }

    public function diving(): belongsTo {


        return $this->belongsTo(Diving::class);
    }

    public function football(): belongsTo {


        return $this->belongsTo(Football::class);
    }


    public function golf(): belongsTo {


        return $this->belongsTo(Golf::class);
    }


    public function hunting(): belongsTo {


        return $this->belongsTo(Hunting::class);
    }


    public function musculation(): belongsTo {


        return $this->belongsTo(Musculation::class);
    }


    public function surf(): belongsTo {


        return $this->belongsTo(Surf::class);
    }


    public function tenni(): belongsTo {


        return $this->belongsTo(Tennis::class);
    }




    // Electronique

    public function audio(): belongsTo {


        return $this->belongsTo(Audio::class);
    }

    public function camera(): belongsTo {


        return $this->belongsTo(Camera::class);
    }

    public function charger(): belongsTo {


        return $this->belongsTo(Charger::class);
    }

    public function drone(): belongsTo {


        return $this->belongsTo(Drone::class);
    }

    public function gaming(): belongsTo {


        return $this->belongsTo(Gaming::class);
    }

    public function laptop(): belongsTo {


        return $this->belongsTo(Laptop::class);
    }

    public function lighting(): belongsTo {


        return $this->belongsTo(Lighting::class);
    }

    public function printer(): belongsTo {


        return $this->belongsTo(Printer::class);
    }

    public function router(): belongsTo {


        return $this->belongsTo(Router::class);
    }

    public function tablette(): belongsTo {


        return $this->belongsTo(Tablette::class);
    }





    // Evenement

    public function eclairage(): belongsTo {


        return $this->belongsTo(Eclairage::class);
    }


    public function mobilier(): belongsTo {


        return $this->belongsTo(Mobilier::class);
    }


    public function photographie(): belongsTo {


        return $this->belongsTo(Photographie::class);
    }


    public function sonorisation(): belongsTo {


        return $this->belongsTo(Sonorisation::class);
    }


    public function tente(): belongsTo {


        return $this->belongsTo(Tente::class);
    }



    // Habillement


    public function clothe(): belongsTo {


        return $this->belongsTo(Clothes::class);
    }

    public function jewelry(): belongsTo {


        return $this->belongsTo(Jewelry::class);
    }



    // Immobilier


    public function apartment(): belongsTo {


        return $this->belongsTo(Apartment::class);
    }

    public function bureaux(): belongsTo {


        return $this->belongsTo(Bureaux::class);
    }

    public function magasin(): belongsTo {


        return $this->belongsTo(Magasin::class);
    }


    public function maison(): belongsTo {


        return $this->belongsTo(Maison::class);
    }


    public function riad(): belongsTo {


        return $this->belongsTo(Riad::class);
    }

    public function terrain(): belongsTo {


        return $this->belongsTo(Terrain::class);
    }


    public function villa(): belongsTo {


        return $this->belongsTo(Villa::class);
    }






    // Loisirs


    public function activitie(): belongsTo {


        return $this->belongsTo(Activity::class);
    }



    public function livre(): belongsTo {


        return $this->belongsTo(Livre::class);
    }



    public function musical(): belongsTo {


        return $this->belongsTo(Musical::class);
    }



    // Maison et Jardin


    public function furniture(): belongsTo {


        return $this->belongsTo(Furniture::class);
    }


    public function houseappliance(): belongsTo {


        return $this->belongsTo(Houseappliance::class);
    }



    // Materiels


    public function electricaltool(): belongsTo {


        return $this->belongsTo(Electricaltool::class);
    }


    public function ladder(): belongsTo {


        return $this->belongsTo(Ladder::class);
    }


    public function mechanicaltool(): belongsTo {


        return $this->belongsTo(Mechanicaltool::class);
    }



    public function powertool(): belongsTo {


        return $this->belongsTo(Powertool::class);
    }



    public function pressurewasher(): belongsTo {


        return $this->belongsTo(Pressurewasher::class);
    }





    // Services

    public function service(): belongsTo {


        return $this->belongsTo(Service::class);
    }


    // Vehicules


    public function boat(): belongsTo {


        return $this->belongsTo(Boat::class);
    }


    public function camion(): belongsTo {


        return $this->belongsTo(Camion::class);
    }

    public function caravan(): belongsTo {


        return $this->belongsTo(Caravan::class);
    }


    public function car(): belongsTo {


        return $this->belongsTo(Car::class);
    }


    public function engin(): belongsTo {


        return $this->belongsTo(Engin::class);
    }


    public function moto(): belongsTo {


        return $this->belongsTo(Moto::class);
    }


    public function scooter(): belongsTo {


        return $this->belongsTo(Scooter::class);
    }


    public function taxiaeroport(): belongsTo {


        return $this->belongsTo(Taxiaeroport::class);
    }


    public function transportation(): belongsTo {


        return $this->belongsTo(Transportation::class);
    }


    public function velo(): belongsTo {


        return $this->belongsTo(Velo::class);
    }


}
