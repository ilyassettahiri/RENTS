<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LadderimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view laddersimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view laddersimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create laddersimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit laddersimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete laddersimg');
    }
}
