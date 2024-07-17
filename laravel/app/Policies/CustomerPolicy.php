<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class CustomerPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view customers');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view customers');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create customers');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit customers');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete customers');
    }
}
