<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BlogsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('blogs')->truncate();
        Schema::enableForeignKeyConstraints();

        DB::table('blogs')->insert([
            'id' => 1,
            'title' => 'bloga',
            'content' => 'bloga',
            'created_at' => now(),
            'updated_at' => now()
        ]);

    }
}
