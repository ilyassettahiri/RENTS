<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class FootballPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view footballs');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view footballs');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create footballs');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit footballs');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete footballs');
    }
}
