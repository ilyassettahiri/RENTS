<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PrinterimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view printersimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view printersimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create printersimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit printersimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete printersimg');
    }
}
