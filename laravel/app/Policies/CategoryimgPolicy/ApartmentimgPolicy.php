<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ApartmentimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view apartmentsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view apartmentsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create apartmentsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit apartmentsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete apartmentsimg');
    }
}
