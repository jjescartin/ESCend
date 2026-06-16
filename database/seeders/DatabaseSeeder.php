<?php

namespace Database\Seeders;
use Database\Seeders\UserSeeder;
use Database\Seeders\BoardSeeder;
use Database\Seeders\ColumnSeeder;
use Database\Seeders\TagSeeder;
use Database\Seeders\PivotSeeder;
use Database\Seeders\CardSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call([
            UserSeeder::class,
            BoardSeeder::class,
            ColumnSeeder::class,
            TagSeeder::class,
            CardSeeder::class,
            CommentSeeder::class,
            PivotSeeder::class
        ]);
    }
}
