<?php

namespace App\Providers;
use Illuminate\Auth\Notifications\VerifyEmail;

use App\Models\Category;
use App\Models\Discount;
use App\Models\Customer;
use App\Models\Listing;
use App\Models\Reservation;

use App\Models\Onlinestore;

use App\Models\Collection;
use App\Models\Review;



use App\Models\Item;
use App\Models\Tag;
use App\Models\User;
use App\Policies\CategoryPolicy;
use App\Policies\ListingPolicy;
use App\Policies\OnlinestorePolicy;

use App\Policies\CollectionPolicy;


use App\Policies\DiscountPolicy;
use App\Policies\CustomerPolicy;

use App\Policies\ReviewPolicy;



use App\Policies\ItemPolicy;
use App\Policies\PermissionPolicy;
use App\Policies\RolePolicy;
use App\Policies\TagPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


/*

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







        use App\Policies\BilliardPolicy;
        use App\Policies\BoxingPolicy;
        use App\Policies\DivingPolicy;
        use App\Policies\FootballPolicy;
        use App\Policies\GolfPolicy;
        use App\Policies\HuntingPolicy;
        use App\Policies\MusculationPolicy;
        use App\Policies\SurfPolicy;
        use App\Policies\TenniPolicy;


        use App\Policies\AudioPolicy;
        use App\Policies\CameraPolicy;
        use App\Policies\ChargerPolicy;
        use App\Policies\DronePolicy;
        use App\Policies\GamingPolicy;
        use App\Policies\LaptopPolicy;
        use App\Policies\LightingPolicy;
        use App\Policies\PrinterPolicy;
        use App\Policies\RouterPolicy;
        use App\Policies\TablettePolicy;


        use App\Policies\EclairagePolicy;
        use App\Policies\MobilierPolicy;
        use App\Policies\PhotographiePolicy;
        use App\Policies\SonorisationPolicy;
        use App\Policies\TentePolicy;



        use App\Policies\ClothePolicy;
        use App\Policies\JewelryPolicy;


        use App\Policies\ApartmentPolicy;
        use App\Policies\BureauxPolicy;
        use App\Policies\MagasinPolicy;
        use App\Policies\MaisonPolicy;
        use App\Policies\RiadPolicy;
        use App\Policies\TerrainPolicy;
        use App\Policies\VillaPolicy;


        use App\Policies\ActivityPolicy;
        use App\Policies\LivrePolicy;
        use App\Policies\MusicalPolicy;


        use App\Policies\FurniturePolicy;
        use App\Policies\HouseappliancePolicy;


        use App\Policies\ElectricaltoolPolicy;
        use App\Policies\LadderPolicy;
        use App\Policies\MechanicaltoolPolicy;
        use App\Policies\PowertoolPolicy;
        use App\Policies\PressurewasherPolicy;


        use App\Policies\ServicePolicy;


        use App\Policies\BoatPolicy;
        use App\Policies\CamionPolicy;
        use App\Policies\CaravanPolicy;
        use App\Policies\CarPolicy;
        use App\Policies\EnginPolicy;
        use App\Policies\MotoPolicy;
        use App\Policies\ScooterPolicy;
        use App\Policies\TaxiaeroportPolicy;
        use App\Policies\TransportationPolicy;
        use App\Policies\VeloPolicy;

        */

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Category::class   => CategoryPolicy::class,
        Listing::class   =>  ListingPolicy::class,
        Reservation::class   =>  ReservationPolicy::class,

        Collection::class   =>  CollectionPolicy::class,

        Onlinestore::class   =>  OnlinestorePolicy::class,

        Customer::class   => CustomerPolicy::class,
        Review::class   => ReviewPolicy::class,

        Discount::class   => DiscountPolicy::class,
        Item::class       => ItemPolicy::class,
        Permission::class => PermissionPolicy::class,
        Role::class       => RolePolicy::class,
        Tag::class        => TagPolicy::class,
        User::class       => UserPolicy::class,


        /*



        Billiard::class   => BilliardPolicy::class,
        Boxing::class => BoxingPolicy::class,
        Diving::class => DivingPolicy::class,
        Football::class => FootballPolicy::class,
        Golf::class => GolfPolicy::class,
        Hunting::class => HuntingPolicy::class,
        Musculation::class => MusculationPolicy::class,
        Surf::class => SurfPolicy::class,
        Tennis::class => TenniPolicy::class,

        Audio::class => AudioPolicy::class,
        Camera::class => CameraPolicy::class,
        Charger::class => ChargerPolicy::class,
        Drone::class => DronePolicy::class,
        Gaming::class => GamingPolicy::class,
        Laptop::class => LaptopPolicy::class,
        Lighting::class => LightingPolicy::class,
        Printer::class => PrinterPolicy::class,
        Router::class => RouterPolicy::class,
        Tablette::class => TablettePolicy::class,


        Eclairage::class => EclairagePolicy::class,
        Mobilier::class => MobilierPolicy::class,
        Photographie::class => PhotographiePolicy::class,
        Sonorisation::class => SonorisationPolicy::class,
        Tente::class => TentePolicy::class,


        Clothes::class => ClothePolicy::class,
        Jewelry::class => JewelryPolicy::class,


        Apartment::class => ApartmentPolicy::class,
        Bureaux::class => BureauxPolicy::class,
        Magasin::class => MagasinPolicy::class,
        Maison::class => MaisonPolicy::class,
        Riad::class => RiadPolicy::class,
        Terrain::class => TerrainPolicy::class,
        Villa::class => VillaPolicy::class,


        Activity::class => ActivityPolicy::class,
        Livre::class => LivrePolicy::class,
        Musical::class => MusicalPolicy::class,


        Furniture::class => FurniturePolicy::class,
        Houseappliance::class => HouseappliancePolicy::class,


        Electricaltool::class => ElectricaltoolPolicy::class,
        Ladder::class => LadderPolicy::class,
        Mechanicaltool::class => MechanicaltoolPolicy::class,
        Powertool::class => PowertoolPolicy::class,
        Pressurewasher::class => PressurewasherPolicy::class,

        Service::class => ServicePolicy::class,


        Boat::class => BoatPolicy::class,
        Camion::class => CamionPolicy::class,
        Caravan::class => CaravanPolicy::class,
        Car::class => CarPolicy::class,
        Engin::class => EnginPolicy::class,
        Moto::class => MotoPolicy::class,
        Scooter::class => ScooterPolicy::class,
        Taxiaeroport::class => TaxiaeroportPolicy::class,
        Transportation::class => TransportationPolicy::class,
        Velo::class => VeloPolicy::class,











        */
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // if (!$this->app->routesAreCached()) {
        //     Passport::routes();
        // }

        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            return (new \Illuminate\Notifications\Messages\MailMessage)
                ->subject('Verify Your Email Address')
                ->line('Please click the button below to verify your email address.')
                ->action('Verify Email', $url)
                ->line('If you did not create this account, no further action is required.');
        });


        Passport::tokensExpireIn(now()->addDay());
    }
}
