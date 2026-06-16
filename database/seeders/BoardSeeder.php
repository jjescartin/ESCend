<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\User;
use Illuminate\Database\Seeder;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        $demo = User::where('username', 'demo')->first();

        Board::create([
            'user_id'   => $demo->id,
            'name'      => 'ESCend',
            'end_date'  => '2025-12-31',
            'completed' => false,
        ]);

        Board::create([
            'user_id'   => $demo->id,
            'name'      => 'Orphan Outreach Program',
            'end_date'  => null,
            'completed' => false,
        ]);

        Board::create([
            'user_id'   => $demo->id,
            'name'      => '8Bacus online casino',
            'end_date'  => null,
            'completed' => false,
        ]);
    }
}
