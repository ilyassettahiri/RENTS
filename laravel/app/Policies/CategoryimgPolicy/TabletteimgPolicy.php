<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TabletteimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view tablettesimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view tablettesimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create tablettesimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit tablettesimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete tablettesimg');
    }
}
