<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SonorisationPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view sonorisations');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view sonorisations');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create sonorisations');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit sonorisations');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete sonorisations');
    }
}
