<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MotoPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view motos');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view motos');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create motos');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit motos');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete motos');
    }
}
