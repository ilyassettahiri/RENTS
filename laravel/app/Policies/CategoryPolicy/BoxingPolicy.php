<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BoxingPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view boxings');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view boxings');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create boxings');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit boxings');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete boxings');
    }
}
