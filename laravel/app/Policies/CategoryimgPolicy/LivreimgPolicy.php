<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LivredimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view livresimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view livresimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create livresimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit livresimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete livresimg');
    }
}
