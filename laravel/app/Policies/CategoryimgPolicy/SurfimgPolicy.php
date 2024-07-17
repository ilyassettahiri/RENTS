<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SurfimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view surfsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view surfsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create surfsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit surfsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete surfsimg');
    }
}
