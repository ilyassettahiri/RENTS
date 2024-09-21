<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('permissions')->truncate();
        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_permissions')->truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('roles')->truncate();
        Schema::enableForeignKeyConstraints();

        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // User permissions
        Permission::create(['name' => 'view users']);
        Permission::create(['name' => 'create users']);
        Permission::create(['name' => 'edit users']);
        Permission::create(['name' => 'delete users']);

        // Role permissions
        Permission::create(['name' => 'view roles']);
        Permission::create(['name' => 'create roles']);
        Permission::create(['name' => 'edit roles']);
        Permission::create(['name' => 'delete roles']);

        // Permissions permissions
        Permission::create(['name' => 'view permissions']);

        // Category permissions
        Permission::create(['name' => 'view categories']);
        Permission::create(['name' => 'create categories']);
        Permission::create(['name' => 'edit categories']);
        Permission::create(['name' => 'delete categories']);


        Permission::create(['name' => 'view onlinestores']);
        Permission::create(['name' => 'create onlinestores']);
        Permission::create(['name' => 'edit onlinestores']);
        Permission::create(['name' => 'delete onlinestores']);

        // Reservation permissions
        Permission::create(['name' => 'view reservations']);
        Permission::create(['name' => 'create reservations']);
        Permission::create(['name' => 'edit reservations']);
        Permission::create(['name' => 'delete reservations']);

         // listing permissions
         Permission::create(['name' => 'view listings']);
         Permission::create(['name' => 'create listings']);
         Permission::create(['name' => 'edit listings']);
         Permission::create(['name' => 'delete listings']);

        // Collection permissions
        Permission::create(['name' => 'view collections']);
        Permission::create(['name' => 'create collections']);
        Permission::create(['name' => 'edit collections']);
        Permission::create(['name' => 'delete collections']);

        // Customer permissions
        Permission::create(['name' => 'view customers']);
        Permission::create(['name' => 'create customers']);
        Permission::create(['name' => 'edit customers']);
        Permission::create(['name' => 'delete customers']);


                // Review permissions
        Permission::create(['name' => 'view reviews']);
        Permission::create(['name' => 'create reviews']);
        Permission::create(['name' => 'edit reviews']);
        Permission::create(['name' => 'delete reviews']);

        // Discount permissions
        Permission::create(['name' => 'view discounts']);
        Permission::create(['name' => 'create discounts']);
        Permission::create(['name' => 'edit discounts']);
        Permission::create(['name' => 'delete discounts']);

        // Tag permissions
        Permission::create(['name' => 'view tags']);
        Permission::create(['name' => 'create tags']);
        Permission::create(['name' => 'edit tags']);
        Permission::create(['name' => 'delete tags']);

        // Item permissions
        Permission::create(['name' => 'view items']);
        Permission::create(['name' => 'create items']);
        Permission::create(['name' => 'edit items']);
        Permission::create(['name' => 'delete items']);



        // Billiard permissions
        Permission::create(['name' => 'view billiards']);
        Permission::create(['name' => 'create billiards']);
        Permission::create(['name' => 'edit billiards']);
        Permission::create(['name' => 'delete billiards']);

        // Boxing permissions
        Permission::create(['name' => 'view boxings']);
        Permission::create(['name' => 'create boxings']);
        Permission::create(['name' => 'edit boxings']);
        Permission::create(['name' => 'delete boxings']);

        // Football permissions
        Permission::create(['name' => 'view footballs']);
        Permission::create(['name' => 'create footballs']);
        Permission::create(['name' => 'edit footballs']);
        Permission::create(['name' => 'delete footballs']);

        // Golf permissions
        Permission::create(['name' => 'view golfs']);
        Permission::create(['name' => 'create golfs']);
        Permission::create(['name' => 'edit golfs']);
        Permission::create(['name' => 'delete golfs']);

        // Huntings permissions
        Permission::create(['name' => 'view huntings']);
        Permission::create(['name' => 'create huntings']);
        Permission::create(['name' => 'edit huntings']);
        Permission::create(['name' => 'delete huntings']);

        // Musculations permissions
        Permission::create(['name' => 'view musculations']);
        Permission::create(['name' => 'create musculations']);
        Permission::create(['name' => 'edit musculations']);
        Permission::create(['name' => 'delete musculations']);

        // Surfs permissions
        Permission::create(['name' => 'view surfs']);
        Permission::create(['name' => 'create surfs']);
        Permission::create(['name' => 'edit surfs']);
        Permission::create(['name' => 'delete surfs']);

        // Tennis permissions
        Permission::create(['name' => 'view tennis']);
        Permission::create(['name' => 'create tennis']);
        Permission::create(['name' => 'edit tennis']);
        Permission::create(['name' => 'delete tennis']);



        // Audios permissions
        Permission::create(['name' => 'view audios']);
        Permission::create(['name' => 'create audios']);
        Permission::create(['name' => 'edit audios']);
        Permission::create(['name' => 'delete audios']);

        // Cameras permissions
        Permission::create(['name' => 'view cameras']);
        Permission::create(['name' => 'create cameras']);
        Permission::create(['name' => 'edit cameras']);
        Permission::create(['name' => 'delete cameras']);

        // Chargers permissions
        Permission::create(['name' => 'view chargers']);
        Permission::create(['name' => 'create chargers']);
        Permission::create(['name' => 'edit chargers']);
        Permission::create(['name' => 'delete chargers']);

        // Drones permissions
        Permission::create(['name' => 'view drones']);
        Permission::create(['name' => 'create drones']);
        Permission::create(['name' => 'edit drones']);
        Permission::create(['name' => 'delete drones']);

        // Gamings permissions
        Permission::create(['name' => 'view gamings']);
        Permission::create(['name' => 'create gamings']);
        Permission::create(['name' => 'edit gamings']);
        Permission::create(['name' => 'delete gamings']);

        // Laptops permissions
        Permission::create(['name' => 'view laptops']);
        Permission::create(['name' => 'create laptops']);
        Permission::create(['name' => 'edit laptops']);
        Permission::create(['name' => 'delete laptops']);

        // Lightings permissions
        Permission::create(['name' => 'view lightings']);
        Permission::create(['name' => 'create lightings']);
        Permission::create(['name' => 'edit lightings']);
        Permission::create(['name' => 'delete lightings']);

        // Printers permissions
        Permission::create(['name' => 'view printers']);
        Permission::create(['name' => 'create printers']);
        Permission::create(['name' => 'edit printers']);
        Permission::create(['name' => 'delete printers']);

        // Routers permissions
        Permission::create(['name' => 'view routers']);
        Permission::create(['name' => 'create routers']);
        Permission::create(['name' => 'edit routers']);
        Permission::create(['name' => 'delete routers']);

        // Tablettes permissions
        Permission::create(['name' => 'view tablettes']);
        Permission::create(['name' => 'create tablettes']);
        Permission::create(['name' => 'edit tablettes']);
        Permission::create(['name' => 'delete tablettes']);




        // Eclairages permissions
        Permission::create(['name' => 'view eclairages']);
        Permission::create(['name' => 'create eclairages']);
        Permission::create(['name' => 'edit eclairages']);
        Permission::create(['name' => 'delete eclairages']);

        // Mobiliers permissions
        Permission::create(['name' => 'view mobiliers']);
        Permission::create(['name' => 'create mobiliers']);
        Permission::create(['name' => 'edit mobiliers']);
        Permission::create(['name' => 'delete mobiliers']);

        // Photographies permissions
        Permission::create(['name' => 'view photographies']);
        Permission::create(['name' => 'create photographies']);
        Permission::create(['name' => 'edit photographies']);
        Permission::create(['name' => 'delete photographies']);

        // Sonorisations permissions
        Permission::create(['name' => 'view sonorisations']);
        Permission::create(['name' => 'create sonorisations']);
        Permission::create(['name' => 'edit sonorisations']);
        Permission::create(['name' => 'delete sonorisations']);

        // Tentes permissions
        Permission::create(['name' => 'view tentes']);
        Permission::create(['name' => 'create tentes']);
        Permission::create(['name' => 'edit tentes']);
        Permission::create(['name' => 'delete tentes']);


        // Clothes permissions
        Permission::create(['name' => 'view clothes']);
        Permission::create(['name' => 'create clothes']);
        Permission::create(['name' => 'edit clothes']);
        Permission::create(['name' => 'delete clothes']);

        // Jewelrys permissions
        Permission::create(['name' => 'view jewelrys']);
        Permission::create(['name' => 'create jewelrys']);
        Permission::create(['name' => 'edit jewelrys']);
        Permission::create(['name' => 'delete jewelrys']);



        // Apartments permissions
        Permission::create(['name' => 'view apartments']);
        Permission::create(['name' => 'create apartments']);
        Permission::create(['name' => 'edit apartments']);
        Permission::create(['name' => 'delete apartments']);

        // Bureauxs permissions
        Permission::create(['name' => 'view bureauxs']);
        Permission::create(['name' => 'create bureauxs']);
        Permission::create(['name' => 'edit bureauxs']);
        Permission::create(['name' => 'delete bureauxs']);

        // Magasins permissions
        Permission::create(['name' => 'view magasins']);
        Permission::create(['name' => 'create magasins']);
        Permission::create(['name' => 'edit magasins']);
        Permission::create(['name' => 'delete magasins']);

        // Maisons permissions
        Permission::create(['name' => 'view maisons']);
        Permission::create(['name' => 'create maisons']);
        Permission::create(['name' => 'edit maisons']);
        Permission::create(['name' => 'delete maisons']);

        // Riads permissions
        Permission::create(['name' => 'view riads']);
        Permission::create(['name' => 'create riads']);
        Permission::create(['name' => 'edit riads']);
        Permission::create(['name' => 'delete riads']);

        // Terrains permissions
        Permission::create(['name' => 'view terrains']);
        Permission::create(['name' => 'create terrains']);
        Permission::create(['name' => 'edit terrains']);
        Permission::create(['name' => 'delete terrains']);

        // Villas permissions
        Permission::create(['name' => 'view villas']);
        Permission::create(['name' => 'create villas']);
        Permission::create(['name' => 'edit villas']);
        Permission::create(['name' => 'delete villas']);


        // Activities permissions
        Permission::create(['name' => 'view activities']);
        Permission::create(['name' => 'create activities']);
        Permission::create(['name' => 'edit activities']);
        Permission::create(['name' => 'delete activities']);

        // Livres permissions
        Permission::create(['name' => 'view livres']);
        Permission::create(['name' => 'create livres']);
        Permission::create(['name' => 'edit livres']);
        Permission::create(['name' => 'delete livres']);

        // Musicals permissions
        Permission::create(['name' => 'view musicals']);
        Permission::create(['name' => 'create musicals']);
        Permission::create(['name' => 'edit musicals']);
        Permission::create(['name' => 'delete musicals']);



        // Furnitures permissions
        Permission::create(['name' => 'view furnitures']);
        Permission::create(['name' => 'create furnitures']);
        Permission::create(['name' => 'edit furnitures']);
        Permission::create(['name' => 'delete furnitures']);

        // Houseappliances permissions
        Permission::create(['name' => 'view houseappliances']);
        Permission::create(['name' => 'create houseappliances']);
        Permission::create(['name' => 'edit houseappliances']);
        Permission::create(['name' => 'delete houseappliances']);



        // Electricaltools permissions
        Permission::create(['name' => 'view electricaltools']);
        Permission::create(['name' => 'create electricaltools']);
        Permission::create(['name' => 'edit electricaltools']);
        Permission::create(['name' => 'delete electricaltools']);

        // Ladders permissions
        Permission::create(['name' => 'view ladders']);
        Permission::create(['name' => 'create ladders']);
        Permission::create(['name' => 'edit ladders']);
        Permission::create(['name' => 'delete ladders']);

        // Mechanicaltools permissions
        Permission::create(['name' => 'view mechanicaltools']);
        Permission::create(['name' => 'create mechanicaltools']);
        Permission::create(['name' => 'edit mechanicaltools']);
        Permission::create(['name' => 'delete mechanicaltools']);

        // Powertools permissions
        Permission::create(['name' => 'view powertools']);
        Permission::create(['name' => 'create powertools']);
        Permission::create(['name' => 'edit powertools']);
        Permission::create(['name' => 'delete powertools']);

        // Pressurewashers permissions
        Permission::create(['name' => 'view pressurewashers']);
        Permission::create(['name' => 'create pressurewashers']);
        Permission::create(['name' => 'edit pressurewashers']);
        Permission::create(['name' => 'delete pressurewashers']);



        // Services permissions
        Permission::create(['name' => 'view services']);
        Permission::create(['name' => 'create services']);
        Permission::create(['name' => 'edit services']);
        Permission::create(['name' => 'delete services']);



        // Boats permissions
        Permission::create(['name' => 'view boats']);
        Permission::create(['name' => 'create boats']);
        Permission::create(['name' => 'edit boats']);
        Permission::create(['name' => 'delete boats']);

        // Camions permissions
        Permission::create(['name' => 'view camions']);
        Permission::create(['name' => 'create camions']);
        Permission::create(['name' => 'edit camions']);
        Permission::create(['name' => 'delete camions']);

        // Caravans permissions
        Permission::create(['name' => 'view caravans']);
        Permission::create(['name' => 'create caravans']);
        Permission::create(['name' => 'edit caravans']);
        Permission::create(['name' => 'delete caravans']);

        // Cars permissions
        Permission::create(['name' => 'view cars']);
        Permission::create(['name' => 'create cars']);
        Permission::create(['name' => 'edit cars']);
        Permission::create(['name' => 'delete cars']);

        // Engins permissions
        Permission::create(['name' => 'view engins']);
        Permission::create(['name' => 'create engins']);
        Permission::create(['name' => 'edit engins']);
        Permission::create(['name' => 'delete engins']);

        // Motos permissions
        Permission::create(['name' => 'view motos']);
        Permission::create(['name' => 'create motos']);
        Permission::create(['name' => 'edit motos']);
        Permission::create(['name' => 'delete motos']);

        // Scooters permissions
        Permission::create(['name' => 'view scooters']);
        Permission::create(['name' => 'create scooters']);
        Permission::create(['name' => 'edit scooters']);
        Permission::create(['name' => 'delete scooters']);

        // Taxiaeroports permissions
        Permission::create(['name' => 'view taxiaeroports']);
        Permission::create(['name' => 'create taxiaeroports']);
        Permission::create(['name' => 'edit taxiaeroports']);
        Permission::create(['name' => 'delete taxiaeroports']);

        // Transportations permissions
        Permission::create(['name' => 'view transportations']);
        Permission::create(['name' => 'create transportations']);
        Permission::create(['name' => 'edit transportations']);
        Permission::create(['name' => 'delete transportations']);

        // Velos permissions
        Permission::create(['name' => 'view velos']);
        Permission::create(['name' => 'create velos']);
        Permission::create(['name' => 'edit velos']);
        Permission::create(['name' => 'delete velos']);






        /** @var \Spatie\Permission\Models\Role $role */
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo(Permission::all());

        /** @var \Spatie\Permission\Models\Role $role */
        $role = Role::create(['name' => 'creator']);
        $role->givePermissionTo([
            'view categories',
            'create categories',
            'edit categories',
            'delete categories',

            'view listings',
            'create listings',
            'edit listings',
            'delete listings',


            'view collections',
            'create collections',
            'edit collections',
            'delete collections',


            'view onlinestores',
            'create onlinestores',
            'edit onlinestores',
            'delete onlinestores',

            'view reservations',
            'create reservations',
            'edit reservations',
            'delete reservations',

            'view customers',
            'create customers',
            'edit customers',
            'delete customers',


            'view reviews',
            'create reviews',
            'edit reviews',
            'delete reviews',


            'view discounts',
            'create discounts',
            'edit discounts',
            'delete discounts',

            'view tags',
            'create tags',
            'edit tags',
            'delete tags',

            'view items',
            'create items',
            'edit items',
            'delete items',


            'view billiards',
            'create billiards',
            'edit billiards',
            'delete billiards',

            'view boxings',
            'create boxings',
            'edit boxings',
            'delete boxings',

            'view footballs',
            'create footballs',
            'edit footballs',
            'delete footballs',

            'view golfs',
            'create golfs',
            'edit golfs',
            'delete golfs',

            'view huntings',
            'create huntings',
            'edit huntings',
            'delete huntings',

            'view musculations',
            'create musculations',
            'edit musculations',
            'delete musculations',

            'view surfs',
            'create surfs',
            'edit surfs',
            'delete surfs',

            'view tennis',
            'create tennis',
            'edit tennis',
            'delete tennis',




            'view audios',
            'create audios',
            'edit audios',
            'delete audios',

            'view cameras',
            'create cameras',
            'edit cameras',
            'delete cameras',

            'view chargers',
            'create chargers',
            'edit chargers',
            'delete chargers',

            'view drones',
            'create drones',
            'edit drones',
            'delete drones',

            'view gamings',
            'create gamings',
            'edit gamings',
            'delete gamings',

            'view laptops',
            'create laptops',
            'edit laptops',
            'delete laptops',

            'view lightings',
            'create lightings',
            'edit lightings',
            'delete lightings',

            'view printers',
            'create printers',
            'edit printers',
            'delete printers',

            'view routers',
            'create routers',
            'edit routers',
            'delete routers',

            'view tablettes',
            'create tablettes',
            'edit tablettes',
            'delete tablettes',




            'view eclairages',
            'create eclairages',
            'edit eclairages',
            'delete eclairages',

            'view mobiliers',
            'create mobiliers',
            'edit mobiliers',
            'delete mobiliers',

            'view photographies',
            'create photographies',
            'edit photographies',
            'delete photographies',

            'view sonorisations',
            'create sonorisations',
            'edit sonorisations',
            'delete sonorisations',

            'view tentes',
            'create tentes',
            'edit tentes',
            'delete tentes',


            'view clothes',
            'create clothes',
            'edit clothes',
            'delete clothes',

            'view jewelrys',
            'create jewelrys',
            'edit jewelrys',
            'delete jewelrys',



            'view apartments',
            'create apartments',
            'edit apartments',
            'delete apartments',

            'view bureauxs',
            'create bureauxs',
            'edit bureauxs',
            'delete bureauxs',

            'view magasins',
            'create magasins',
            'edit magasins',
            'delete magasins',

            'view maisons',
            'create maisons',
            'edit maisons',
            'delete maisons',

            'view riads',
            'create riads',
            'edit riads',
            'delete riads',

            'view terrains',
            'create terrains',
            'edit terrains',
            'delete terrains',

            'view villas',
            'create villas',
            'edit villas',
            'delete villas',




            'view activities',
            'create activities',
            'edit activities',
            'delete activities',

            'view livres',
            'create livres',
            'edit livres',
            'delete livres',

            'view musicals',
            'create musicals',
            'edit musicals',
            'delete musicals',


            'view furnitures',
            'create furnitures',
            'edit furnitures',
            'delete furnitures',

            'view houseappliances',
            'create houseappliances',
            'edit houseappliances',
            'delete houseappliances',


            'view electricaltools',
            'create electricaltools',
            'edit electricaltools',
            'delete electricaltools',

            'view ladders',
            'create ladders',
            'edit ladders',
            'delete ladders',

            'view mechanicaltools',
            'create mechanicaltools',
            'edit mechanicaltools',
            'delete mechanicaltools',

            'view powertools',
            'create powertools',
            'edit powertools',
            'delete powertools',

            'view pressurewashers',
            'create pressurewashers',
            'edit pressurewashers',
            'delete pressurewashers',


            'view services',
            'create services',
            'edit services',
            'delete services',



            'view boats',
            'create boats',
            'edit boats',
            'delete boats',

            'view camions',
            'create camions',
            'edit camions',
            'delete camions',

            'view caravans',
            'create caravans',
            'edit caravans',
            'delete caravans',

            'view cars',
            'create cars',
            'edit cars',
            'delete cars',

            'view engins',
            'create engins',
            'edit engins',
            'delete engins',

            'view motos',
            'create motos',
            'edit motos',
            'delete motos',

            'view scooters',
            'create scooters',
            'edit scooters',
            'delete scooters',

            'view taxiaeroports',
            'create taxiaeroports',
            'edit taxiaeroports',
            'delete taxiaeroports',

            'view transportations',
            'create transportations',
            'edit transportations',
            'delete transportations',

            'view velos',
            'create velos',
            'edit velos',
            'delete velos',












        ]);

        /** @var \Spatie\Permission\Models\Role $role */
        $role = Role::create(['name' => 'member']);
        $role->givePermissionTo([
            'view categories',
            'view listings',

            'view collections',
            'view customers',
            'view reviews',
            'view discounts',
            'view tags',
            'view items',

            'view onlinestores',


            'view billiards',

            'view boxings',

            'view reservations',




            'view footballs',

            'view golfs',

            'view huntings',

            'view musculations',

            'view surfs',

            'view tennis',

            'view audios',

            'view cameras',

            'view chargers',

            'view drones',

            'view gamings',

            'view laptops',

            'view lightings',

            'view printers',

            'view routers',

            'view tablettes',

            'view eclairages',

            'view mobiliers',

            'view photographies',

            'view sonorisations',

            'view tentes',

            'view clothes',

            'view jewelrys',

            'view apartments',

            'view bureauxs',

            'view magasins',

            'view maisons',

            'view riads',

            'view terrains',

            'view villas',

            'view activities',

            'view livres',

            'view musicals',

            'view furnitures',

            'view houseappliances',

            'view electricaltools',

            'view ladders',

            'view mechanicaltools',

            'view powertools',

            'view pressurewashers',

            'view services',

            'view boats',

            'view camions',

            'view caravans',

            'view cars',

            'view engins',

            'view motos',

            'view scooters',

            'view taxiaeroports',

            'view transportations',

            'view velos',









        ]);
    }
}
