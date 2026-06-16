<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Demo user
        User::create([
            'first_name' => 'Demo',
            'last_name'  => 'User',
            'username'   => 'demo',
            'email'      => 'demo@mail.com',
            'password'   => Hash::make('password'),
        ]);

        User::create([
            'first_name' => 'Joallen',
            'last_name'  => 'Escartin',
            'username'   => 'joallen',
            'email'      => 'joallen@mail.com',
            'password'   => Hash::make('password'),
        ]);

        User::create([
            'first_name' => 'Mia',
            'last_name'  => 'Escartin',
            'username'   => 'mia',
            'email'      => 'mia@mail.com',
            'password'   => Hash::make('password'),
        ]);
    }
}
