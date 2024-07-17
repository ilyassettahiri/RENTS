<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ListingPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view listings');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view listings');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create listings');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit listings');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete listings');
    }
}
