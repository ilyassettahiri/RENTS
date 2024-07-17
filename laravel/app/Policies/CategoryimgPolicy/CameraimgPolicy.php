<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CameraimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view camerasimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view camerasimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create camerasimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit camerasimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete camerasimg');
    }
}
