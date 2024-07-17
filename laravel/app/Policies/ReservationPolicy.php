<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class ReservationPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view reservations');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view reservations');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create reservations');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit reservations');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete reservations');
    }
}
