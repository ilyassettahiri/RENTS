<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DronePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view drones');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view drones');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create drones');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit drones');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete drones');
    }
}
