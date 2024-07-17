<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ClothesPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view clothess');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view clothess');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create clothess');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit clothess');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete clothess');
    }
}
