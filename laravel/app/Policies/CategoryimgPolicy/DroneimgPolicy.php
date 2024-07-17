<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DroneimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view dronesimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view dronesimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create dronesimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit dronesimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete dronesimg');
    }
}
