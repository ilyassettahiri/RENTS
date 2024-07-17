<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view users');
    }

    public function view(User $user, User $requested): Response|bool
    {
        if ($user->is($requested)) {
            return true;
        }

        return $user->can('view users');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create users');
    }

    public function update(User $user, User $requested): Response|bool
    {
        if ($user->is($requested)) {
            return true;
        }

        return $user->can('edit users');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete users');
    }
}
