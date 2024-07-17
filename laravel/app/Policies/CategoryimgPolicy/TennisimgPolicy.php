<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TennisimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view tennissimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view tennissimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create tennissimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit tennissimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete tennissimg');
    }
}
