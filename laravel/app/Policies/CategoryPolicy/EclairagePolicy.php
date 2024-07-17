<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class EclairagePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view eclairages');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view eclairages');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create eclairages');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit eclairages');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete eclairages');
    }
}
