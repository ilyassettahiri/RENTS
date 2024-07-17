<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LaptopimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view laptopsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view laptopsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create laptopsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit laptopsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete laptopsimg');
    }
}
