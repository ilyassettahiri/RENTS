<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class GolfimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view golfsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view golfsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create golfsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit golfsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete golfsimg');
    }
}
