<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BilliardimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view billiardsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view billiardsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create billiardsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit billiardsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete billiardsimg');
    }
}
