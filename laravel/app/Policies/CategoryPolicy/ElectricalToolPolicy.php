<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ElectricalToolPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view electricaltools');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view electricaltools');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create electricaltools');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit electricaltools');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete electricaltools');
    }
}
