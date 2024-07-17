<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ReviewPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view reviews');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view reviews');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create reviews');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit reviews');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete reviews');
    }
}
