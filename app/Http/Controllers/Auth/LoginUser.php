<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginUser extends Controller
{

    public function __invoke(LoginRequest $request)
    {
        try {
            $credentials = $request->only('email', 'password');
           
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'success'=> false,
                    'message'=> 'Invalid credentials',                
                ], 401);
            }

            $request->session()->regenerate();

            return response()->json([
                'success'=> true,
                'user'=> Auth::user() 
            ]);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.'
            ], 500);
        }
    }
}