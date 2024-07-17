<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class AudioimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view audiosimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view audiosimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create audiosimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit audiosimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete audiosimg');
    }
}
