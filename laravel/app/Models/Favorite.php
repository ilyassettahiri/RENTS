<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Favorite extends Model
{



    protected $fillable = [ 'seller_id','user_id','title','status','listing_old','city','picture','price','category','url',

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





        public function billiards(): BelongsTo {


        return $this->belongsTo(Billiards::class);
       }


        public function boxings(): BelongsTo {


            return $this->belongsTo(Boxings::class);
        }

        public function divings(): BelongsTo {


            return $this->belongsTo(Divings::class);
        }

        public function footballs(): BelongsTo {


            return $this->belongsTo(Footballs::class);
        }


        public function golfs(): BelongsTo {


            return $this->belongsTo(Golfs::class);
        }


        public function huntings(): BelongsTo {


            return $this->belongsTo(Huntings::class);
        }


        public function musculations(): BelongsTo {


            return $this->belongsTo(Musculations::class);
        }


        public function surfs(): BelongsTo {


            return $this->belongsTo(Surfs::class);
        }


        public function tennis(): BelongsTo {


            return $this->belongsTo(Tennis::class);
        }




        // Electronique

        public function audios(): BelongsTo {


            return $this->belongsTo(Audios::class);
        }

        public function cameras(): BelongsTo {


            return $this->belongsTo(Cameras::class);
        }

        public function chargers(): BelongsTo {


            return $this->belongsTo(Chargers::class);
        }

        public function drones(): BelongsTo {


            return $this->belongsTo(Drones::class);
        }

        public function gamings(): BelongsTo {


            return $this->belongsTo(Gamings::class);
        }

        public function laptops(): BelongsTo {


            return $this->belongsTo(Laptops::class);
        }

        public function lightings(): BelongsTo {


            return $this->belongsTo(Lightings::class);
        }

        public function printers(): BelongsTo {


            return $this->belongsTo(Printers::class);
        }

        public function routers(): BelongsTo {


            return $this->belongsTo(Routers::class);
        }

        public function tablettes(): BelongsTo {


            return $this->belongsTo(Tablettes::class);
        }





        // Evenement

        public function eclairages(): BelongsTo {


            return $this->belongsTo(Eclairages::class);
        }


        public function mobiliers(): BelongsTo {


            return $this->belongsTo(Mobiliers::class);
        }


        public function photographies(): BelongsTo {


            return $this->belongsTo(Photographies::class);
        }


        public function sonorisations(): BelongsTo {


            return $this->belongsTo(Sonorisations::class);
        }


        public function tentes(): BelongsTo {


            return $this->belongsTo(Tentes::class);
        }



        // Habillement


        public function clothes(): BelongsTo {


            return $this->belongsTo(Clothes::class);
        }

        public function jewelrys(): BelongsTo {


            return $this->belongsTo(Jewelrys::class);
        }



        // Immobilier


        public function apartments(): BelongsTo {


            return $this->belongsTo(Apartments::class);
        }

        public function bureauxs(): BelongsTo {


            return $this->belongsTo(Bureauxs::class);
        }

        public function magasins(): BelongsTo {


            return $this->belongsTo(Magasins::class);
        }


        public function maisons(): BelongsTo {


            return $this->belongsTo(Maisons::class);
        }


        public function riads(): BelongsTo {


            return $this->belongsTo(Riads::class);
        }

        public function terrains(): BelongsTo {


            return $this->belongsTo(Terrains::class);
        }


        public function villas(): BelongsTo {


            return $this->belongsTo(Villas::class);
        }






        // Loisirs


        public function activities(): BelongsTo {


            return $this->belongsTo(Activities::class);
        }



        public function livres(): BelongsTo {


            return $this->belongsTo(Livres::class);
        }



        public function musicals(): BelongsTo {


            return $this->belongsTo(Musicals::class);
        }



        // Maison et Jardin


        public function furnitures(): BelongsTo {


            return $this->belongsTo(Furnitures::class);
        }


        public function houseappliances(): BelongsTo {


            return $this->belongsTo(Houseappliances::class);
        }



        // Materiels


        public function electricaltools(): BelongsTo {


            return $this->belongsTo(Electricaltools::class);
        }


        public function ladders(): BelongsTo {


            return $this->belongsTo(Ladders::class);
        }


        public function mechanicaltools(): BelongsTo {


            return $this->belongsTo(Mechanicaltools::class);
        }



        public function powertools(): BelongsTo {


            return $this->belongsTo(Powertools::class);
        }



        public function pressurewashers(): BelongsTo {


            return $this->belongsTo(Pressurewashers::class);
        }





        // Services

        public function services(): BelongsTo {


            return $this->belongsTo(Services::class);
        }


        // Vehicules


        public function boats(): BelongsTo {


            return $this->belongsTo(Boats::class);
        }


        public function camions(): BelongsTo {


            return $this->belongsTo(Camions::class);
        }

        public function caravans(): BelongsTo {


            return $this->belongsTo(Caravans::class);
        }


        public function cars(): BelongsTo {


            return $this->belongsTo(Cars::class);
        }


        public function engins(): BelongsTo {


            return $this->belongsTo(Engins::class);
        }


        public function motos(): BelongsTo {


            return $this->belongsTo(Motos::class);
        }


        public function scooters(): BelongsTo {


            return $this->belongsTo(Scooters::class);
        }


        public function taxiaeroports(): BelongsTo {


            return $this->belongsTo(Taxiaeroports::class);
        }


        public function transportations(): BelongsTo {


            return $this->belongsTo(Transportations::class);
        }


        public function velos(): BelongsTo {


            return $this->belongsTo(Velos::class);
        }



}
