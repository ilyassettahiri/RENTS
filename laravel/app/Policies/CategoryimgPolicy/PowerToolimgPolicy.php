<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PowerToolimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view powertoolsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view powertoolsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create powertoolsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit powertoolsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete powertoolsimg');
    }
}
