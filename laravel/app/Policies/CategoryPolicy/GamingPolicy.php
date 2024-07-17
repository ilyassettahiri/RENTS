<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class GamingPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view gamings');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view gamings');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create gamings');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit gamings');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete gamings');
    }
}
