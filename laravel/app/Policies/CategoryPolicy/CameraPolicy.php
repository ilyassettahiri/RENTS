<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CameraPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view cameras');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view cameras');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create cameras');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit cameras');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete cameras');
    }
}
