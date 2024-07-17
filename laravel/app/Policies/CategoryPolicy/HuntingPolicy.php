<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class HuntingPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view huntings');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view huntings');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create huntings');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit huntings');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete huntings');
    }
}
