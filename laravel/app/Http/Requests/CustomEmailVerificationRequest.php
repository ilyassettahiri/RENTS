<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;


class CustomEmailVerificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
        ];
    }


    public function fulfill(): void
    {


        $user = \App\Models\User::find($this->route('id'));

        if (!$user) {

            abort(404, 'User not found.');
        }



        if (!hash_equals((string) $this->route('hash'), sha1($user->getEmailForVerification()))) {

            abort(403, 'Invalid hash.');
        }

        if ($user->hasVerifiedEmail()) {

            abort(400, 'Email is already verified.');
        }

        $user->markEmailAsVerified();



        event(new \Illuminate\Auth\Events\Verified($user));


    }


}
