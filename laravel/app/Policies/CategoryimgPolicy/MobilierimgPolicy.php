<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MobilierimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view mobiliersimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view mobiliersimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create mobiliersimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit mobiliersimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete mobiliersimg');
    }
}
