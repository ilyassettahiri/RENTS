<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class RouterimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view routersimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view routersimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create routersimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit routersimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete routersimg');
    }
}
