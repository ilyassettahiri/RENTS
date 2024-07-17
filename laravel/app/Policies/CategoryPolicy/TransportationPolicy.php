<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TransportationPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view transportations');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view transportations');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create transportations');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit transportations');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete transportations');
    }
}
