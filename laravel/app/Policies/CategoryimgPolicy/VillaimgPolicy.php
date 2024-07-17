<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class VillaimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view villasimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view villasimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create villasimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit villasimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete villasimg');
    }
}
