<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ClothesimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view clothessimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view clothessimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create clothessimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit clothessimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete clothessimg');
    }
}
