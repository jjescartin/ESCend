<?php

namespace Database\Seeders;

use App\Models\Column;
use App\Models\Card;
use Illuminate\Database\Seeder;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $todo       = Column::where('title', 'To Do')->first();
        $inProgress = Column::where('title', 'In Progress')->first();
        $done       = Column::where('title', 'Done')->first();

        Card::create([
            'column_id'   => $todo->id,
            'code'        => 'ESC-1',
            'title'       => 'Set up Laravel scaffolding',
            'description' => 'Initialize Laravel project with authentication, middleware, and base routing.',
            'order'       => 0,
            'priority'    => 'mid',
            'due_date'    => null,
        ]);

        Card::create([
            'column_id'   => $todo->id,
            'code'        => 'ESC-2',
            'title'       => 'Design database schema',
            'description' => 'Define all tables, relationships, and indexes for boards, columns, cards, tags, and assignees.',
            'order'       => 1,
            'priority'    => 'high',
            'due_date'    => '2025-07-15',
        ]);

        Card::create([
            'column_id'   => $inProgress->id,
            'code'        => 'ESC-3',
            'title'       => 'Build drag-and-drop UI',
            'description' => null,
            'order'       => 0,
            'priority'    => 'high',
            'due_date'    => '2025-07-10',
        ]);

        Card::create([
            'column_id'   => $done->id,
            'code'        => 'ESC-4',
            'title'       => 'Repo init & project setup',
            'description' => 'Initialize React + Laravel project, configure Vite, Tailwind, and folder structure.',
            'order'       => 0,
            'priority'    => 'low',
            'due_date'    => '2025-06-30',
        ]);
    }
}
