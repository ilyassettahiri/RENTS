<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PowerToolPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view powertools');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view powertools');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create powertools');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit powertools');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete powertools');
    }
}
