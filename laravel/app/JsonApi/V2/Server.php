<?php

namespace App\JsonApi\V2;

use App\JsonApi\V2\Categories\CategorySchema;
use App\JsonApi\V2\Collections\CollectionSchema;
use App\JsonApi\V2\Discounts\DiscountSchema;
use App\JsonApi\V2\Customers\CustomerSchema;
use App\JsonApi\V2\Listings\ListingSchema;



use App\JsonApi\V2\Items\ItemSchema;
use App\JsonApi\V2\Permissions\PermissionSchema;
use App\JsonApi\V2\Roles\RoleSchema;
use App\JsonApi\V2\Tags\TagSchema;
use App\JsonApi\V2\Users\UserSchema;
use LaravelJsonApi\Core\Document\JsonApi;
use LaravelJsonApi\Core\Server\Server as BaseServer;


use App\JsonApi\V2\Reviews\ReviewSchema;

use App\JsonApi\V2\Favorites\FavoriteSchema;


use App\JsonApi\V2\Reviewreplys\ReviewreplySchema;


use App\JsonApi\V2\Checkingouts\CheckingoutSchema;
use App\JsonApi\V2\Upcomings\UpcomingSchema;

use App\JsonApi\V2\Currentlyhostings\CurrentlyhostingSchema;


use App\JsonApi\V2\Reservations\ReservationSchema;
use App\JsonApi\V2\Billiards\BilliardSchema;
use App\JsonApi\V2\Activities\ActivitySchema;
use App\JsonApi\V2\Apartments\ApartmentSchema;
use App\JsonApi\V2\Audios\AudioSchema;
use App\JsonApi\V2\Boats\BoatSchema;
use App\JsonApi\V2\Boxings\BoxingSchema;
use App\JsonApi\V2\Bureauxs\BureauxSchema;
use App\JsonApi\V2\Cameras\CameraSchema;
use App\JsonApi\V2\Camions\CamionSchema;
use App\JsonApi\V2\Caravans\CaravanSchema;
use App\JsonApi\V2\Cars\CarSchema;
use App\JsonApi\V2\Chargers\ChargerSchema;
use App\JsonApi\V2\Clothes\ClotheSchema;
use App\JsonApi\V2\Divings\DivingSchema;
use App\JsonApi\V2\Drones\DroneSchema;
use App\JsonApi\V2\Eclairages\EclairageSchema;
use App\JsonApi\V2\Electricaltools\ElectricaltoolSchema;
use App\JsonApi\V2\Engins\EnginSchema;
use App\JsonApi\V2\Footballs\FootballSchema;
use App\JsonApi\V2\Furnitures\FurnitureSchema;
use App\JsonApi\V2\Gamings\GamingSchema;
use App\JsonApi\V2\Golfs\GolfSchema;
use App\JsonApi\V2\Houseappliances\HouseapplianceSchema;
use App\JsonApi\V2\Huntings\HuntingSchema;
use App\JsonApi\V2\Jewelrys\JewelrySchema;
use App\JsonApi\V2\Ladders\LadderSchema;
use App\JsonApi\V2\Laptops\LaptopSchema;
use App\JsonApi\V2\Lightings\LightingSchema;
use App\JsonApi\V2\Livres\LivreSchema;
use App\JsonApi\V2\Magasins\MagasinSchema;
use App\JsonApi\V2\Maisons\MaisonSchema;
use App\JsonApi\V2\Mechanicaltools\MechanicaltoolSchema;
use App\JsonApi\V2\Mobiliers\MobilierSchema;
use App\JsonApi\V2\Motos\MotoSchema;
use App\JsonApi\V2\Musculations\MusculationSchema;
use App\JsonApi\V2\Musicals\MusicalSchema;
use App\JsonApi\V2\Photographies\PhotographieSchema;
use App\JsonApi\V2\Powertools\PowertoolSchema;
use App\JsonApi\V2\Pressurewashers\PressurewasherSchema;
use App\JsonApi\V2\Printers\PrinterSchema;
use App\JsonApi\V2\Riads\RiadSchema;
use App\JsonApi\V2\Routers\RouterSchema;
use App\JsonApi\V2\Scooters\ScooterSchema;
use App\JsonApi\V2\Services\ServiceSchema;
use App\JsonApi\V2\Sonorisations\SonorisationSchema;
use App\JsonApi\V2\Surfs\SurfSchema;
use App\JsonApi\V2\Tablettes\TabletteSchema;
use App\JsonApi\V2\Taxiaeroports\TaxiaeroportSchema;
use App\JsonApi\V2\Tennis\TennisSchema;
use App\JsonApi\V2\Tentes\TenteSchema;
use App\JsonApi\V2\Terrains\TerrainSchema;
use App\JsonApi\V2\Transportations\TransportationSchema;
use App\JsonApi\V2\Velos\VeloSchema;
use App\JsonApi\V2\Villas\VillaSchema;

use App\JsonApi\V2\Onlinestores\OnlinestoreSchema;


use App\JsonApi\V2\Billiardsimg\BilliardimgSchema;
use App\JsonApi\V2\Activitiesimg\ActivityimgSchema;
use App\JsonApi\V2\Apartmentsimg\ApartmentimgSchema;
use App\JsonApi\V2\Audiosimg\AudioimgSchema;
use App\JsonApi\V2\Boatsimg\BoatimgSchema;
use App\JsonApi\V2\Boxingsimg\BoxingimgSchema;
use App\JsonApi\V2\Bureauxsimg\BureauximgSchema;
use App\JsonApi\V2\Camerasimg\CameraimgSchema;
use App\JsonApi\V2\Camionsimg\CamionimgSchema;
use App\JsonApi\V2\Caravansimg\CaravanimgSchema;
use App\JsonApi\V2\Carsimg\CarimgSchema;
use App\JsonApi\V2\Chargersimg\ChargerimgSchema;
use App\JsonApi\V2\Clothesimg\ClotheimgSchema;
use App\JsonApi\V2\Divingsimg\DivingimgSchema;
use App\JsonApi\V2\Dronesimg\DroneimgSchema;
use App\JsonApi\V2\Eclairagesimg\EclairageimgSchema;
use App\JsonApi\V2\Electricaltoolsimg\ElectricaltoolimgSchema;
use App\JsonApi\V2\Enginsimg\EnginimgSchema;
use App\JsonApi\V2\Footballsimg\FootballimgSchema;
use App\JsonApi\V2\Furnituresimg\FurnitureimgSchema;
use App\JsonApi\V2\Gamingsimg\GamingimgSchema;
use App\JsonApi\V2\Golfsimg\GolfimgSchema;
use App\JsonApi\V2\Houseappliancesimg\HouseapplianceimgSchema;
use App\JsonApi\V2\Huntingsimg\HuntingimgSchema;
use App\JsonApi\V2\Jewelrysimg\JewelryimgSchema;
use App\JsonApi\V2\Laddersimg\LadderimgSchema;
use App\JsonApi\V2\Laptopsimg\LaptopimgSchema;
use App\JsonApi\V2\Lightingsimg\LightingimgSchema;
use App\JsonApi\V2\Livresimg\LivreimgSchema;
use App\JsonApi\V2\Magasinsimg\MagasinimgSchema;
use App\JsonApi\V2\Maisonsimg\MaisonimgSchema;
use App\JsonApi\V2\Mechanicaltoolsimg\MechanicaltoolimgSchema;
use App\JsonApi\V2\Mobiliersimg\MobilierimgSchema;
use App\JsonApi\V2\Motosimg\MotoimgSchema;
use App\JsonApi\V2\Musculationsimg\MusculationimgSchema;
use App\JsonApi\V2\Musicalsimg\MusicalimgSchema;
use App\JsonApi\V2\Photographiesimg\PhotographieimgSchema;
use App\JsonApi\V2\Powertoolsimg\PowertoolimgSchema;
use App\JsonApi\V2\Pressurewashersimg\PressurewasherimgSchema;
use App\JsonApi\V2\Printersimg\PrinterimgSchema;
use App\JsonApi\V2\Riadsimg\RiadimgSchema;
use App\JsonApi\V2\Routersimg\RouterimgSchema;
use App\JsonApi\V2\Scootersimg\ScooterimgSchema;
use App\JsonApi\V2\Servicesimg\ServiceimgSchema;
use App\JsonApi\V2\Sonorisationsimg\SonorisationimgSchema;
use App\JsonApi\V2\Surfsimg\SurfimgSchema;
use App\JsonApi\V2\Tablettesimg\TabletteimgSchema;
use App\JsonApi\V2\Taxiaeroportsimg\TaxiaeroportimgSchema;
use App\JsonApi\V2\Tennisimg\TennisimgSchema;
use App\JsonApi\V2\Tentesimg\TenteimgSchema;
use App\JsonApi\V2\Terrainsimg\TerrainimgSchema;
use App\JsonApi\V2\Transportationsimg\TransportationimgSchema;
use App\JsonApi\V2\Velosimg\VeloimgSchema;
use App\JsonApi\V2\Villasimg\VillaimgSchema;



use App\JsonApi\V2\Abouts\AboutSchema;
use App\JsonApi\V2\Accountfronts\AccountfrontSchema;
use App\JsonApi\V2\Accounts\AccountSchema;
use App\JsonApi\V2\Analytics\AnalyticsSchema;
use App\JsonApi\V2\Articles\ArticleSchema;
use App\JsonApi\V2\Blogs\BlogSchema;
use App\JsonApi\V2\Boosteds\BoostedSchema;
use App\JsonApi\V2\Businesslists\BusinesslistSchema;
use App\JsonApi\V2\Cancelleds\CancelledSchema;
use App\JsonApi\V2\Checkouts\CheckoutSchema;
use App\JsonApi\V2\Completedfronts\CompletedfrontSchema;
use App\JsonApi\V2\Completeds\CompletedSchema;
use App\JsonApi\V2\Contacts\ContactSchema;
use App\JsonApi\V2\Currentlyhostingfronts\CurrentlyhostingfrontSchema;
use App\JsonApi\V2\Dashboardfronts\DashboardfrontSchema;
use App\JsonApi\V2\Dashboards\DashboardSchema;
use App\JsonApi\V2\Drafts\DraftSchema;
use App\JsonApi\V2\Faqs\FaqSchema;
use App\JsonApi\V2\Finances\FinanceSchema;
use App\JsonApi\V2\Helps\HelpSchema;
use App\JsonApi\V2\Homes\HomeSchema;
use App\JsonApi\V2\Invoicefronts\InvoicefrontSchema;
use App\JsonApi\V2\Invoices\InvoiceSchema;
use App\JsonApi\V2\Listingfronts\ListingfrontSchema;
use App\JsonApi\V2\Messagefronts\MessagefrontSchema;
use App\JsonApi\V2\Messages\MessageSchema;
use App\JsonApi\V2\Paymentfronts\PaymentfrontSchema;
use App\JsonApi\V2\Payments\PaymentSchema;
use App\JsonApi\V2\Plans\PlanSchema;
use App\JsonApi\V2\Reservationfronts\ReservationfrontSchema;
use App\JsonApi\V2\Reviewfronts\ReviewfrontSchema;
use App\JsonApi\V2\Servicepages\ServicepageSchema;
use App\JsonApi\V2\Stores\StoreSchema;
use App\JsonApi\V2\Termconditions\TermconditionSchema;
use App\JsonApi\V2\Thankyous\ThankyouSchema;
use App\JsonApi\V2\Trackings\TrackingSchema;
use App\JsonApi\V2\Upcomingfronts\UpcomingfrontSchema;
use App\JsonApi\V2\Teams\TeamSchema;
use App\JsonApi\V2\Securities\SecuritySchema;
use App\JsonApi\V2\Pricings\PricingSchema;









class Server extends BaseServer
{
    /**
     * The base URI namespace for this server.
     *
     * @var string
     */
    protected string $baseUri = '/api/v2';

    /**
     * Bootstrap the server when it is handling an HTTP request.
     *
     * @return void
     */
    public function serving(): void
    {
        // no-op
    }

    /**
     * Get the server's list of schemas.
     *
     * @return array
     */
    protected function allSchemas(): array
    {
        return [
            CategorySchema::class,


            CollectionSchema::class,
            DiscountSchema::class,
            CustomerSchema::class,
            ItemSchema::class,
            PermissionSchema::class,
            RoleSchema::class,
            TagSchema::class,
            UserSchema::class,

            UpcomingSchema::class,

            CheckingoutSchema::class,

            CurrentlyhostingSchema::class,

            ReservationSchema::class,
            ReviewSchema::class,
            ReviewreplySchema::class,

            FavoriteSchema::class,

            OnlinestoreSchema::class,


            TeamSchema::class,

            ListingSchema::class,
            BilliardSchema::class,
            ActivitySchema::class,
            ApartmentSchema::class,
            AudioSchema::class,
            BoatSchema::class,
            BoxingSchema::class,
            BureauxSchema::class,
            CameraSchema::class,
            CamionSchema::class,
            CaravanSchema::class,
            CarSchema::class,
            ChargerSchema::class,
            ClotheSchema::class,
            DivingSchema::class,
            DroneSchema::class,
            EclairageSchema::class,
            ElectricaltoolSchema::class,
            EnginSchema::class,
            FootballSchema::class,
            FurnitureSchema::class,
            GamingSchema::class,
            GolfSchema::class,
            HouseapplianceSchema::class,
            HuntingSchema::class,
            JewelrySchema::class,
            LadderSchema::class,
            LaptopSchema::class,
            LightingSchema::class,
            LivreSchema::class,
            MagasinSchema::class,
            MaisonSchema::class,
            MechanicaltoolSchema::class,
            MobilierSchema::class,
            MotoSchema::class,
            MusculationSchema::class,
            MusicalSchema::class,
            PhotographieSchema::class,
            PowertoolSchema::class,
            PressurewasherSchema::class,
            PrinterSchema::class,
            RiadSchema::class,
            RouterSchema::class,
            ScooterSchema::class,
            ServiceSchema::class,
            SonorisationSchema::class,
            SurfSchema::class,
            TabletteSchema::class,
            TaxiaeroportSchema::class,
            TennisSchema::class,
            TenteSchema::class,
            TerrainSchema::class,
            TransportationSchema::class,
            VeloSchema::class,
            VillaSchema::class,



            BilliardimgSchema::class,
            ActivityimgSchema::class,
            ApartmentimgSchema::class,
            AudioimgSchema::class,
            BoatimgSchema::class,
            BoxingimgSchema::class,
            BureauximgSchema::class,
            CameraimgSchema::class,
            CamionimgSchema::class,
            CaravanimgSchema::class,
            CarimgSchema::class,
            ChargerimgSchema::class,
            ClotheimgSchema::class,
            DivingimgSchema::class,
            DroneimgSchema::class,
            EclairageimgSchema::class,
            ElectricaltoolimgSchema::class,
            EnginimgSchema::class,
            FootballimgSchema::class,
            FurnitureimgSchema::class,
            GamingimgSchema::class,
            GolfimgSchema::class,
            HouseapplianceimgSchema::class,
            HuntingimgSchema::class,
            JewelryimgSchema::class,
            LadderimgSchema::class,
            LaptopimgSchema::class,
            LightingimgSchema::class,
            LivreimgSchema::class,
            MagasinimgSchema::class,
            MaisonimgSchema::class,
            MechanicaltoolimgSchema::class,
            MobilierimgSchema::class,
            MotoimgSchema::class,
            MusculationimgSchema::class,
            MusicalimgSchema::class,
            PhotographieimgSchema::class,
            PowertoolimgSchema::class,
            PressurewasherimgSchema::class,
            PrinterimgSchema::class,
            RiadimgSchema::class,
            RouterimgSchema::class,
            ScooterimgSchema::class,
            ServiceimgSchema::class,
            SonorisationimgSchema::class,
            SurfimgSchema::class,
            TabletteimgSchema::class,
            TaxiaeroportimgSchema::class,
            TennisimgSchema::class,
            TenteimgSchema::class,
            TerrainimgSchema::class,
            TransportationimgSchema::class,
            VeloimgSchema::class,
            VillaimgSchema::class,



            AboutSchema::class,
            AccountfrontSchema::class,
            AccountSchema::class,
            AnalyticsSchema::class,
            ArticleSchema::class,
            BlogSchema::class,
            BoostedSchema::class,
            BusinesslistSchema::class,
            CancelledSchema::class,
            CheckoutSchema::class,
            CompletedfrontSchema::class,
            CompletedSchema::class,
            ContactSchema::class,
            CurrentlyhostingfrontSchema::class,
            DashboardfrontSchema::class,
            DashboardSchema::class,
            DraftSchema::class,
            FaqSchema::class,
            FinanceSchema::class,
            HelpSchema::class,
            HomeSchema::class,
            InvoicefrontSchema::class,
            InvoiceSchema::class,
            ListingfrontSchema::class,
            MessagefrontSchema::class,
            MessageSchema::class,
            PaymentfrontSchema::class,
            PaymentSchema::class,
            PlanSchema::class,
            ReservationfrontSchema::class,
            ReviewfrontSchema::class,
            SecuritySchema::class,
            ServicepageSchema::class,
            StoreSchema::class,
            TermconditionSchema::class,
            ThankyouSchema::class,
            TrackingSchema::class,
            UpcomingfrontSchema::class,

            PricingSchema::class,



        ];
    }

    public function jsonApi(): JsonApi
    {
        return JsonApi::make('2.0');
    }
}
