<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PressureWasherPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view pressurewashers');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view pressurewashers');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create pressurewashers');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit pressurewashers');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete pressurewashers');
    }
}
