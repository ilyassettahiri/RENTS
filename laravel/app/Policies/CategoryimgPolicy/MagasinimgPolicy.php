<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MagasinimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view magasinsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view magasinsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create magasinsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit magasinsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete magasinsimg');
    }
}
