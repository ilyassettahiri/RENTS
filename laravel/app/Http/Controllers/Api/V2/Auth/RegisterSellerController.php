<?php

namespace App\Http\Controllers\Api\V2\Auth;
use Illuminate\Auth\Events\Registered;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V2\Auth\LoginRequest;
use App\Http\Requests\Api\V2\Auth\RegisterRequest;
use App\Models\User;
use LaravelJsonApi\Core\Document\Error;
use Symfony\Component\HttpFoundation\Response;

class RegisterSellerController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param \App\Http\Requests\Api\V2\Auth\RegisterRequest $request
     *
     * @return \Symfony\Component\HttpFoundation\Response|\LaravelJsonApi\Core\Document\Error
     * @throws \Exception
     */
    public function __invoke(RegisterRequest $request): Response|Error
    {
        $user = User::create([
            'name'           => $request->name,
            'first_name'     => $request->firstName,
            'last_name'      => $request->lastName,
            'address' => $request->streetAddress,
            'phone_number'   => $request->phoneNumber,
            'city'           => $request->city,
            'zip'       => $request->zipCode,
            'country'        => $request->country,
            'email'         => $request->email,
            'password'      => $request->password,
            'profile_image' => '/logo/admin.jpg',
        ]);

        $user->assignRole('seller');

        // Fire the Registered event to send the email verification notification
        event(new Registered($user));

        // Optionally, you can log the user in automatically after registration
        return (new LoginController)(new LoginRequest($request->only(['email', 'password'])));


    }
}
