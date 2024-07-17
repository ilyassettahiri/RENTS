<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BureauximgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view bureauxsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view bureauxsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create bureauxsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit bureauxsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete bureauxsimg');
    }
}
