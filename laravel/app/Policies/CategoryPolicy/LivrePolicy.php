<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LivredPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view livres');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view livres');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create livres');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit livres');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete livres');
    }
}
