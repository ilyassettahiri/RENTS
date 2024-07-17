<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class FurniturePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view furnitures');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view furnitures');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create furnitures');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit furnitures');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete furnitures');
    }
}
