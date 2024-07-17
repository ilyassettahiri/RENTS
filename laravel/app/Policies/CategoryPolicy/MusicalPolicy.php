<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MusicalPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view musicals');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view musicals');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create musicals');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit musicals');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete musicals');
    }
}
