<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ActivitiePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view activities');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view activities');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create activities');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit activities');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete activities');
    }
}
