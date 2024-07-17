<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BureauxPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view bureauxs');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view bureauxs');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create bureauxs');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit bureauxs');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete bureauxs');
    }
}
