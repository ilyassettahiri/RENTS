<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use LaravelJsonApi\Core\Document\Error;
use Illuminate\Support\Facades\Auth;

use App\Models\User;


class UploadController extends Controller
{

    public function upload(Request $request)
    {
        // Validate the request
        $request->validate([
            'attachment' => 'required|image|max:2048',
        ]);

        // Get the authenticated user
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'errors' => [
                    'title' => 'Unauthorized',
                    'detail' => 'User not authenticated',
                    'status' => '401',
                ]
            ], 401);
        }

        // Store the image in a single folder
        $path = "images";
        $filePath = Storage::disk('public')->put($path, $request->file('attachment'));
        $relativePath = '/' . $filePath; // Prepend '/' to make it a relative URL

        // Update the user's profile image URL in the database
        $user->profile_image = $relativePath;
        $user->save();

        return response()->json(compact('relativePath'), 201);
    }
}
