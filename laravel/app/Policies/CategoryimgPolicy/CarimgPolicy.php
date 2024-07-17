<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CarimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view carsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view carsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create carsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit carsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete carsimg');
    }
}
