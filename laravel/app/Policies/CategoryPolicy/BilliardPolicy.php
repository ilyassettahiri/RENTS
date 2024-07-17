<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BilliardPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view billiards');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view billiards');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create billiards');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit billiards');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete billiards');
    }
}
