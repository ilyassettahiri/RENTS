<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CamionPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view camions');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view camions');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create camions');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit camions');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete camions');
    }
}
