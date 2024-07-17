<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SurfPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view surfs');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view surfs');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create surfs');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit surfs');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete surfs');
    }
}
