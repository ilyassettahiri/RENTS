<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ChargerimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view chargersimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view chargersimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create chargersimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit chargersimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete chargersimg');
    }
}
