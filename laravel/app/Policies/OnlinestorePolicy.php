<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class OnlinestorePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view onlinestores');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view onlinestores');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create onlinestores');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit onlinestores');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete onlinestores');
    }
}
