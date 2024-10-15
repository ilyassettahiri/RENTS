<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        Schema::enableForeignKeyConstraints();

        User::create([
            'name' => 'ilyass',
            'email' => 'contact.us.forum@gmail.com',
            'password' => 'secret',
            'profile_image' => env('APP_URL').'logo/admin.jpg'
        ])->assignRole('seller');

        User::create([
            'name' => 'ilyassett',
            'email' => 'ilyass.ettahiri.20@gmail.com',
            'password' => 'secret',
            'profile_image' => env('APP_URL').'logo/creator.jpg'
        ])->assignRole('super-admin');


    }
}
