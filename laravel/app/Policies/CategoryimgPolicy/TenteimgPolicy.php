<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TenteimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view tentesimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view tentesimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create tentesimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit tentesimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete tentesimg');
    }
}
