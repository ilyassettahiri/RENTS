<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Spatie\Permission\Models\Permission;

class PermissionPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view permissions');
    }

    public function view(User $user, Permission $permission): Response|bool
    {
        if ($user->getAllPermissions()->contains($permission)) {
            return true;
        }

        return $user->can('view permissions');
    }

    public function create(User $user): Response|bool
    {
        return false;
    }

    public function update(User $user): Response|bool
    {
        return false;
    }

    public function delete(User $user): Response|bool
    {
        return false;
    }
}
