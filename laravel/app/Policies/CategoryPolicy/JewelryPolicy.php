<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class JewelryPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view jewelrys');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view jewelrys');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create jewelrys');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit jewelrys');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete jewelrys');
    }
}