<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class TaxiaeroportimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view taxiaeroportsimg');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view taxiaeroportsimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create taxiaeroportsimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit taxiaeroportsimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete taxiaeroportsimg');
    }
}
