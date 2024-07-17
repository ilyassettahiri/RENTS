<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LightingimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view lightingsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view lightingsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create lightingsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit lightingsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete lightingsimg');
    }
}
