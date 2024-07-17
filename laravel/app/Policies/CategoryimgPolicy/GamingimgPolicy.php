<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class GamingimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view gamingsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view gamingsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create gamingsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit gamingsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete gamingsimg');
    }
}
