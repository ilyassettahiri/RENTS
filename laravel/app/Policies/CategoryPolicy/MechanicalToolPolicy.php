<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MechanicalToolPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view mechanicaltools');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view mechanicaltools');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create mechanicaltools');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit mechanicaltools');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete mechanicaltools');
    }
}
