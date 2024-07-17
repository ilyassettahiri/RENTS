<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class EnginPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view engins');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view engins');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create engins');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit engins');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete engins');
    }
}
