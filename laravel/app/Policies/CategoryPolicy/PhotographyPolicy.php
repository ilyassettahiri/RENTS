<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PhotographiePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view photographies');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view photographies');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create photographies');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit photographies');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete photographies');
    }
}
