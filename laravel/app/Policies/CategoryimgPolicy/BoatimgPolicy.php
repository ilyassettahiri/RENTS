<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BoatimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view boatsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view boatsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create boatsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit boatsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete boatsimg');
    }
}
