<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class JewelryimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view jewelrysimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view jewelrysimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create jewelrysimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit jewelrysimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete jewelrysimg');
    }
}
