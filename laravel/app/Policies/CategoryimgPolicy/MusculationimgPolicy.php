<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class MusculationimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view musculationsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view musculationsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create musculationsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit musculationsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete musculationsimg');
    }
}
