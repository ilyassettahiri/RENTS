<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ServicePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view services');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view services');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create services');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit services');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete services');
    }
}
