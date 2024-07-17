<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class GolfPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view golfs');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view golfs');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create golfs');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit golfs');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete golfs');
    }
}
