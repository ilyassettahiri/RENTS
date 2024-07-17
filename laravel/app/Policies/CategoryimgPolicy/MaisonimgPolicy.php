<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MaisonimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view maisonsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view maisonsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create maisonsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit maisonsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete maisonsimg');
    }
}
