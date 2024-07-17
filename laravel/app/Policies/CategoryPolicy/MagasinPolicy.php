<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MagasinPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view magasins');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view magasins');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create magasins');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit magasins');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete magasins');
    }
}
