<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MusicalimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view musicalsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view musicalsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create musicalsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit musicalsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete musicalsimg');
    }
}
