<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PermissionsSeeder::class);
        $this->call(UsersSeeder::class);

        $this->call(TagsSeeder::class);
        $this->call(BlogsSeeder::class);

        $this->command->call('passport:install', ['--force' => true]);
    }
}
