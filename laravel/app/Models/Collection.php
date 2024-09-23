<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int                                                         $id
 * @property string                                                      $name
 * @property string|null                                                 $description
 *
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\Item[] $items
 */
class Collection extends Model
{
    protected $fillable = [
        'name',
        'picture',
        'description',
        'typea',
        'typeb',

        'user_id',
        'onlinestore_id',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function discounts()
    {
        return $this->belongsToMany(Discount::class, 'collection_discount');
    }



    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }


    public function onlinestore(): belongsTo {

        return $this->belongsTo(Onlinestore::class);

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





   /*
    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('collections.name', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeDescription(Builder $query, string $value): Builder
    {
        return $query->where('collections.description', 'LIKE', "%{$value}%", 'or');
    }




    public function delete(): bool|null
    {
        if ($this->items->isNotEmpty()) {
            // @todo Should be ConstraintException
            throw new Exception('This Collection still has associated Items.');
        }

        return parent::delete();
    }*/
}
