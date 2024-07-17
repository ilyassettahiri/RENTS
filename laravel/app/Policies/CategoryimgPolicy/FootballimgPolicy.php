<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class FootballimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view footballsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view footballsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create footballsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit footballsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete footballsimg');
    }
}
