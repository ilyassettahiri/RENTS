<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TagPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view tags');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view tags');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create tags');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit tags');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete tags');
    }
}
