<?php

namespace Database\Seeders;

use App\Models\Board;
use App\Models\Card;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class PivotSeeder extends Seeder
{
    public function run(): void
    {
        $demo    = User::where('username', 'demo')->first();
        $joallen = User::where('username', 'joallen')->first();
        $mia     = User::where('username', 'mia')->first();
        $escend  = Board::where('name', 'ESCend')->first();

        $tagBackend  = Tag::where('label', 'Backend')->first();
        $tagFrontend = Tag::where('label', 'Frontend')->first();
        $tagDevOps   = Tag::where('label', 'DevOps')->first();

        $card1 = Card::where('code', 'ESC-1')->first();
        $card2 = Card::where('code', 'ESC-2')->first();
        $card3 = Card::where('code', 'ESC-3')->first();
        $card4 = Card::where('code', 'ESC-4')->first();

        // board_user pivot (members)
        $escend->members()->attach([$demo->id, $joallen->id, $mia->id]);

        // card_tag pivot
        $card1->tags()->attach($tagBackend->id);
        $card2->tags()->attach($tagBackend->id);
        $card3->tags()->attach($tagFrontend->id);
        $card4->tags()->attach($tagDevOps->id);

        // card_user pivot (assignees)
        $card1->assignees()->attach($demo->id);
        $card2->assignees()->attach([$demo->id, $joallen->id, $mia->id]);
        $card3->assignees()->attach($demo->id);
        $card4->assignees()->attach($demo->id);
    }
}