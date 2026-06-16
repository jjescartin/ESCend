<?php

namespace Database\Seeders;

use App\Models\Card;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    public function run(): void
    {
        $demo    = User::where('username', 'demo')->first();
        $joallen = User::where('username', 'joallen')->first();
        $mia     = User::where('username', 'mia')->first();
        $card1   = Card::where('code', 'ESC-1')->first();
        $card2   = Card::where('code', 'ESC-2')->first();

        Comment::create([
            'card_id' => $card1->id,
            'user_id' => $demo->id,
            'message' => 'Started working on this.',
        ]);

        Comment::create([
            'card_id' => $card2->id,
            'user_id' => $joallen->id,
            'message' => 'Drafted the ERD, will share for review.',
        ]);

        Comment::create([
            'card_id' => $card2->id,
            'user_id' => $mia->id,
            'message' => 'Looks good, added indexes for foreign keys.',
        ]);
    }
}