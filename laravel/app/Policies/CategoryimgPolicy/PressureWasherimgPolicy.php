<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PressureWasherimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view pressurewashersimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view pressurewashersimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create pressurewashersimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit pressurewashersimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete pressurewashersimg');
    }
}
