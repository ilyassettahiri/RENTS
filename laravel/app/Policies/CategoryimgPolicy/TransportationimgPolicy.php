<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TransportationimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view transportationsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view transportationsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create transportationsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit transportationsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete transportationsimg');
    }
}
