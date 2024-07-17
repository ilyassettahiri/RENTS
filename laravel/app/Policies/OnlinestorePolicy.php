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
        return $user->can('view onlinestore');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view onlinestore');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create onlinestore');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit onlinestore');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete onlinestore');
    }
}
