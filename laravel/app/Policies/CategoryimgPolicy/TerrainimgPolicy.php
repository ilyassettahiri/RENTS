<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TerrainimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view terrainsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view terrainsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create terrainsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit terrainsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete terrainsimg');
    }
}
