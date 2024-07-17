<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class HuntingimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view huntingsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view huntingsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create huntingsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit huntingsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete huntingsimg');
    }
}
