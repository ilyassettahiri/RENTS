<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SonorisationimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view sonorisationsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view sonorisationsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create sonorisationsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit sonorisationsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete sonorisationsimg');
    }
}
