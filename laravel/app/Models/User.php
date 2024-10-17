<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use App\Notifications\Auth\ResetPasswordNotification;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Relations\HasMany;

use App\Models\Reviewreply;



use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\Onlinestore;
use App\Models\Listing;
use App\Models\Favorite;
use App\Models\Favoritestore;


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
use App\Models\Job  ;





class User extends Authenticatable
{
    use HasApiTokens, HasRoles, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'profile_image',
        'address','city','zip','country', 'first_name', 'last_name',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];



    public function conversations()
    {

        return $this->hasMany(Conversation::class,'sender_id')->orWhere('receiver_id',$this->id)->whereNotDeleted();
    }



    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }


    public function Reviewreply(): HasMany
    {
        return $this->hasMany(Reviewreply::class);
    }



    public function onlinestore(): HasMany {


        return $this->hasMany(Onlinestore::class);
    }


    public function listing(): HasMany {


        return $this->hasMany(Listing::class);
    }

    public function favorite(): HasMany {


        return $this->hasMany(Favorite::class);
    }

    public function favoritestore(): HasMany {


        return $this->hasMany(Favoritestore::class);
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


        return $this->hasMany(Billiards::class);
    }


    public function boxings(): HasMany {


        return $this->hasMany(Boxings::class);
    }

    public function divings(): HasMany {


        return $this->hasMany(Divings::class);
    }

    public function footballs(): HasMany {


        return $this->hasMany(Footballs::class);
    }


    public function golfs(): HasMany {


        return $this->hasMany(Golfs::class);
    }


    public function huntings(): HasMany {


        return $this->hasMany(Huntings::class);
    }


    public function musculations(): HasMany {


        return $this->hasMany(Musculations::class);
    }


    public function surfs(): HasMany {


        return $this->hasMany(Surfs::class);
    }


    public function tennis(): HasMany {


        return $this->hasMany(Tennis::class);
    }




    // Electronique

    public function audios(): HasMany {


        return $this->hasMany(Audios::class);
    }

    public function cameras(): HasMany {


        return $this->hasMany(Cameras::class);
    }

    public function chargers(): HasMany {


        return $this->hasMany(Chargers::class);
    }

    public function drones(): HasMany {


        return $this->hasMany(Drones::class);
    }

    public function gamings(): HasMany {


        return $this->hasMany(Gamings::class);
    }

    public function laptops(): HasMany {


        return $this->hasMany(Laptops::class);
    }

    public function lightings(): HasMany {


        return $this->hasMany(Lightings::class);
    }

    public function printers(): HasMany {


        return $this->hasMany(Printers::class);
    }

    public function routers(): HasMany {


        return $this->hasMany(Routers::class);
    }

    public function tablettes(): HasMany {


        return $this->hasMany(Tablettes::class);
    }





    // Evenement

    public function eclairages(): HasMany {


        return $this->hasMany(Eclairages::class);
    }


    public function mobiliers(): HasMany {


        return $this->hasMany(Mobiliers::class);
    }


    public function photographies(): HasMany {


        return $this->hasMany(Photographies::class);
    }


    public function sonorisations(): HasMany {


        return $this->hasMany(Sonorisations::class);
    }


    public function tentes(): HasMany {


        return $this->hasMany(Tentes::class);
    }



    // Habillement


    public function clothes(): HasMany {


        return $this->hasMany(Clothes::class);
    }

    public function jewelrys(): HasMany {


        return $this->hasMany(Jewelrys::class);
    }



    // Immobilier


    public function apartments(): HasMany {


        return $this->hasMany(Apartments::class);
    }

    public function bureauxs(): HasMany {


        return $this->hasMany(Bureauxs::class);
    }

    public function magasins(): HasMany {


        return $this->hasMany(Magasins::class);
    }


    public function maisons(): HasMany {


        return $this->hasMany(Maisons::class);
    }


    public function riads(): HasMany {


        return $this->hasMany(Riads::class);
    }

    public function terrains(): HasMany {


        return $this->hasMany(Terrains::class);
    }


    public function villas(): HasMany {


        return $this->hasMany(Villas::class);
    }






    // Loisirs


    public function activities(): HasMany {


        return $this->hasMany(Activities::class);
    }



    public function livres(): HasMany {


        return $this->hasMany(Livres::class);
    }



    public function musicals(): HasMany {


        return $this->hasMany(Musicals::class);
    }



    // Maison et Jardin


    public function furnitures(): HasMany {


        return $this->hasMany(Furnitures::class);
    }


    public function houseappliances(): HasMany {


        return $this->hasMany(Houseappliances::class);
    }



    // Materiels


    public function electricaltools(): HasMany {


        return $this->hasMany(Electricaltools::class);
    }


    public function ladders(): HasMany {


        return $this->hasMany(Ladders::class);
    }


    public function mechanicaltools(): HasMany {


        return $this->hasMany(Mechanicaltools::class);
    }



    public function powertools(): HasMany {


        return $this->hasMany(Powertools::class);
    }



    public function pressurewashers(): HasMany {


        return $this->hasMany(Pressurewashers::class);
    }





    // Services

    public function services(): HasMany {


        return $this->hasMany(Service::class);
    }

    public function jobs(): HasMany {


        return $this->hasMany(Job::class);
    }


    // Vehicules


    public function boats(): HasMany {


        return $this->hasMany(Boats::class);
    }


    public function camions(): HasMany {


        return $this->hasMany(Camions::class);
    }

    public function caravans(): HasMany {


        return $this->hasMany(Caravans::class);
    }


    public function cars(): HasMany {


        return $this->hasMany(Cars::class);
    }


    public function engins(): HasMany {


        return $this->hasMany(Engins::class);
    }


    public function motos(): HasMany {


        return $this->hasMany(Motos::class);
    }


    public function scooters(): HasMany {


        return $this->hasMany(Scooters::class);
    }


    public function taxiaeroports(): HasMany {


        return $this->hasMany(Taxiaeroports::class);
    }


    public function transportations(): HasMany {


        return $this->hasMany(Transportations::class);
    }


    public function velos(): HasMany {


        return $this->hasMany(Velos::class);
    }












    public function password(): Attribute
    {
        return Attribute::make(
            set: fn(string $value) => Hash::make($value)
        );
    }

    /**
     * Send the password reset notification.
     *
     * @param string $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }

    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('users.name', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeEmail(Builder $query, string $value): Builder
    {
        return $query->where('users.email', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeRoles(Builder $query, string $value): Builder
    {
        return $query->orWhereHas('roles', function ($query) use ($value) {
            $query->where('roles.name', 'LIKE', "%$value%");
        });
    }

    /**
     * @return bool|null
     * @throws \Exception
     */
    public function delete(): bool|null
    {
        if ($this->id === auth()->id()) {
            // @todo Should be ConstraintException
            throw new Exception('You cannot delete yourself.');
        }

        return parent::delete();
    }
}
