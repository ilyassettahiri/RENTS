<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class PrinterPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view printers');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view printers');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create printers');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit printers');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete printers');
    }
}
