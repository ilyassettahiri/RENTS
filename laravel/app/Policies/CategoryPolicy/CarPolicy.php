<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CarPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view cars');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view cars');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create cars');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit cars');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete cars');
    }
}
