<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


/**
 * @property int                                                         $id
 * @property string                                                      $name
 * @property string|null                                                 $description
 *
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\Item[] $items
 */
class Customer extends Model
{
    protected $fillable = ['name','email' ,'status','user_id','category','listings_thumb','listings_title','listings_price','url','listings_description',

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


    public function user(): BelongsTo {

        return $this->belongsTo(User::class);

    }



    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('customers.name', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeDescription(Builder $query, string $value): Builder
    {
        return $query->where('customers.description', 'LIKE', "%{$value}%", 'or');
    }




    // Bien et Sport

   public function billiard(){


    return $this->belongsTo(Billiard::class);
   }


    public function boxing(){


        return $this->belongsTo(Boxing::class);
    }

    public function diving(){


        return $this->belongsTo(Diving::class);
    }

    public function football(){


        return $this->belongsTo(Football::class);
    }


    public function golf(){


        return $this->belongsTo(Golf::class);
    }


    public function hunting(){


        return $this->belongsTo(Hunting::class);
    }


    public function musculation(){


        return $this->belongsTo(Musculation::class);
    }


    public function surf(){


        return $this->belongsTo(Surf::class);
    }


    public function tenni(){


        return $this->belongsTo(Tennis::class);
    }




    // Electronique

    public function audio(){


        return $this->belongsTo(Audio::class);
    }

    public function camera(){


        return $this->belongsTo(Camera::class);
    }

    public function charger(){


        return $this->belongsTo(Charger::class);
    }

    public function drone(){


        return $this->belongsTo(Drone::class);
    }

    public function gaming(){


        return $this->belongsTo(Gaming::class);
    }

    public function laptop(){


        return $this->belongsTo(Laptop::class);
    }

    public function lighting(){


        return $this->belongsTo(Lighting::class);
    }

    public function printer(){


        return $this->belongsTo(Printer::class);
    }

    public function router(){


        return $this->belongsTo(Router::class);
    }

    public function tablette(){


        return $this->belongsTo(Tablette::class);
    }





    // Evenement

    public function eclairage(){


        return $this->belongsTo(Eclairage::class);
    }


    public function mobilier(){


        return $this->belongsTo(Mobilier::class);
    }


    public function photographie(){


        return $this->belongsTo(Photographie::class);
    }


    public function sonorisation(){


        return $this->belongsTo(Sonorisation::class);
    }


    public function tente(){


        return $this->belongsTo(Tente::class);
    }



    // Habillement


    public function clothe(){


        return $this->belongsTo(Clothes::class);
    }

    public function jewelry(){


        return $this->belongsTo(Jewelry::class);
    }



    // Immobilier


    public function apartment(){


        return $this->belongsTo(Apartment::class);
    }

    public function bureaux(){


        return $this->belongsTo(Bureaux::class);
    }

    public function magasin(){


        return $this->belongsTo(Magasin::class);
    }


    public function maison(){


        return $this->belongsTo(Maison::class);
    }


    public function riad(){


        return $this->belongsTo(Riad::class);
    }

    public function terrain(){


        return $this->belongsTo(Terrain::class);
    }


    public function villa(){


        return $this->belongsTo(Villa::class);
    }






    // Loisirs


    public function activitie(){


        return $this->belongsTo(Activity::class);
    }



    public function livre(){


        return $this->belongsTo(Livre::class);
    }



    public function musical(){


        return $this->belongsTo(Musical::class);
    }



    // Maison et Jardin


    public function furniture(){


        return $this->belongsTo(Furniture::class);
    }


    public function houseappliance(){


        return $this->belongsTo(Houseappliance::class);
    }



    // Materiels


    public function electricaltool(){


        return $this->belongsTo(Electricaltool::class);
    }


    public function ladder(){


        return $this->belongsTo(Ladder::class);
    }


    public function mechanicaltool(){


        return $this->belongsTo(Mechanicaltool::class);
    }



    public function powertool(){


        return $this->belongsTo(Powertool::class);
    }



    public function pressurewasher(){


        return $this->belongsTo(Pressurewasher::class);
    }





    // Services

    public function service(){


        return $this->belongsTo(Service::class);
    }


    // Vehicules


    public function boat(){


        return $this->belongsTo(Boat::class);
    }


    public function camion(){


        return $this->belongsTo(Camion::class);
    }

    public function caravan(){


        return $this->belongsTo(Caravan::class);
    }


    public function car(){


        return $this->belongsTo(Car::class);
    }


    public function engin(){


        return $this->belongsTo(Engin::class);
    }


    public function moto(){


        return $this->belongsTo(Moto::class);
    }


    public function scooter(){


        return $this->belongsTo(Scooter::class);
    }


    public function taxiaeroport(){


        return $this->belongsTo(Taxiaeroport::class);
    }


    public function transportation(){


        return $this->belongsTo(Transportation::class);
    }


    public function velo(){


        return $this->belongsTo(Velo::class);
    }


    /**
     * @return bool|null
     * @throws \Exception
     */

}
