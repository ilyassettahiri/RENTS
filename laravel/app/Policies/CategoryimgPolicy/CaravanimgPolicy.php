<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CaravanimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view caravansimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view caravansimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create caravansimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit caravansimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete caravansimg');
    }
}
