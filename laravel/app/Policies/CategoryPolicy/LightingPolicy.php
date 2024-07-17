<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LightingPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view lightings');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view lightings');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create lightings');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit lightings');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete lightings');
    }
}
