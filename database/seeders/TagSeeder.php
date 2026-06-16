<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $escend = Board::where('name', 'ESCend')->first();

        Tag::create(['board_id' => $escend->id, 'label' => 'Backend',  'color' => '#7C3AED']);
        Tag::create(['board_id' => $escend->id, 'label' => 'Frontend', 'color' => '#F59E0B']);
        Tag::create(['board_id' => $escend->id, 'label' => 'DevOps',   'color' => '#10B981']);
    }
}
