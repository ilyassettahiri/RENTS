<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CollectionPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view collections');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view collections');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create collections');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit collections');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete collections');
    }
}
