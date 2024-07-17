<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CamionimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view camionsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view camionsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create camionsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit camionsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete camionsimg');
    }
}
