<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MotoimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view motosimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view motosimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create motosimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit motosimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete motosimg');
    }
}
