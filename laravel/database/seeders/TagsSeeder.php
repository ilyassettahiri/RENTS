<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('item_tag')->truncate();
        DB::table('tags')->truncate();
        Schema::enableForeignKeyConstraints();

        DB::table('tags')->insert([
            'id' => 1,
            'name' => 'Hot',
            'color' => '#f44336',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('tags')->insert([
            'id' => 2,
            'name' => 'Trending',
            'color' => '#9c27b0',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        DB::table('tags')->insert([
            'id' => 3,
            'name' => 'New',
            'color' => '#00bcd4',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
