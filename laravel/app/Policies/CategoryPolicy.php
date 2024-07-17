<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view categories');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view categories');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create categories');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit categories');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete categories');
    }
}
