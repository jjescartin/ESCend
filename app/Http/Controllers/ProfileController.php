<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function index() 
    {
        $profile = Auth::user();

        $data = [
            'id' => $profile->id,
            'first_name' => $profile->first_name,
            'last_name' => $profile->last_name,
            'username' => $profile->username,
            'email' => $profile->email,
            'initials' => strtoupper(substr($profile->first_name, 0,1).substr($profile->last_name, 0,1)),
            'created_at' => $profile->created_at
        ];

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function getBoardList () 
    {
        /** @var \App\Models\User $user */
        $data = Auth::user()->boards()
            ->select('id','name as boardName')
            ->get()
            ->toArray();

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }
}
