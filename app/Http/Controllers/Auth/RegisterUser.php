<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;
use Hash;

class RegisterUser extends Controller
{
    public function __invoke(RegisterUserRequest $request)
    {   
        try {
            User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Successfully create new uesr',
                'user' => [
                    'email' => $request->email,
                    'password' => $request->password
                ]
            ],200);
            
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'error' => $th->getMessage(),
            ], 422);
        }
    }
}