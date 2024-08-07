<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class FurnitureimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view furnitures');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view furnituresimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create furnituresimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit furnituresimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete furnituresimg');
    }
}
