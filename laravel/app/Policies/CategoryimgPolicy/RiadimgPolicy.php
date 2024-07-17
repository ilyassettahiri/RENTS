<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class RiadimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view riadsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view riadsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create riadsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit riadsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete riadsimg');
    }
}
