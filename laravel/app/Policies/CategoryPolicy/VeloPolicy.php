<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class VeloPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view velos');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view velos');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create velos');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit velos');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete velos');
    }
}
