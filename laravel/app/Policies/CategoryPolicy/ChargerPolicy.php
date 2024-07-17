<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ChargerPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view chargers');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view chargers');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create chargers');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit chargers');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete chargers');
    }
}
