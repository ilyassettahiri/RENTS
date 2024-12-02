<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes([
            'middleware' => ['auth:api'], // Ensure the auth middleware is used
            'prefix' => 'api/v2',         // Use the same prefix as your API routes
        ]);

        require base_path('routes/channels.php');
    }
}
