<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class EclairageimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view eclairagesimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view eclairagesimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create eclairagesimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit eclairagesimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete eclairagesimg');
    }
}
