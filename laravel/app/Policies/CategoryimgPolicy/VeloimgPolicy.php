<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class VeloimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view velosimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view velosimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create velosimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit velosimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete velosimg');
    }
}
