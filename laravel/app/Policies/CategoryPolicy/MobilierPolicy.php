<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MobilierPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view mobiliers');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view mobiliers');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create mobiliers');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit mobiliers');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete mobiliers');
    }
}
