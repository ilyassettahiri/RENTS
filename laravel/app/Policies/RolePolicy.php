<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view roles');
    }

    public function view(User $user, Role $role): Response|bool
    {
        if ($user->roles->contains($role)) {
            return true;
        }

        return $user->can('view roles');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create roles');
    }

    public function update(User $user, Role $role): Response|bool
    {
        return $user->can('edit roles');
    }

    public function delete(User $user, Role $role): Response|bool
    {
        return $user->can('delete roles');
    }
}
