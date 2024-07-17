<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ActivitieimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view activitiesimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view activitiesimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create activitiesimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit activitiesimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete activitiesimg');
    }
}
