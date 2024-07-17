<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DrivingPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view drivings');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view drivings');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create drivings');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit drivings');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete drivings');
    }
}
