<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Column;
use Illuminate\Database\Seeder;

class ColumnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $escend = Board::where('name', 'ESCend')->first();

        Column::create(['board_id' => $escend->id, 'title' => 'To Do',       'order' => 0, 'color' => '#7C3AED']);
        Column::create(['board_id' => $escend->id, 'title' => 'In Progress', 'order' => 1, 'color' => '#F59E0B']);
        Column::create(['board_id' => $escend->id, 'title' => 'Done',        'order' => 2, 'color' => '#10B981']);
    }
}
