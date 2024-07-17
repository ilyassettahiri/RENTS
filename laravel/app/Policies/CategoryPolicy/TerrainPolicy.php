<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TerrainPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view terrains');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view terrains');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create terrains');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit terrains');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete terrains');
    }
}
