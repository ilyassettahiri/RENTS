<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DrivingimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view drivingsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view drivingsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create drivingsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit drivingsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete drivingsimg');
    }
}