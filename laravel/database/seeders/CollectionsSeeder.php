<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CollectionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        DB::table('collections')->truncate();
        Schema::enableForeignKeyConstraints();

        DB::table('collections')->insert([
            'id' => 1,
            'user_id' => 1,
            'name' => 'Travelcoll',
            'description' => 'Travel ideas for everyone',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('collections')->insert([
            'id' => 2,
            'user_id' => 1,
            'name' => 'Foodcoll',
            'description' => 'Our favourite recipes',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('collections')->insert([
            'id' => 3,
            'user_id' => 1,
            'name' => 'Homecoll',
            'description' => 'The latest trends in home decorations',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('collections')->insert([
            'id' => 4,
            'user_id' => 1,
            'name' => 'Fashioncoll',
            'description' => 'Stay in touch with the latest trends',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('collections')->insert([
            'id' => 5,
            'user_id' => 1,
            'name' => 'Healthcoll',
            'description' => 'An apple a day keeps the doctor away',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
