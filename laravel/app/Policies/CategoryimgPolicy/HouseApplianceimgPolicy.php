<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class HouseApplianceimgPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view houseappliances');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view houseappliancesimg');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create houseappliancesimg');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit houseappliancesimg');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete houseappliancesimg');
    }
}
