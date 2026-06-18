<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginUser;
use App\Http\Controllers\Auth\LogoutUser;


// Route::get('/', function(){
//     return Inertia::render('Landingpage');
// });



// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// });


// Route::middleware('auth')->group( function () {
//     Route::get('/', function(){
//         return Inertia::render('Dashboard');
//     });
// });



// Route::post('/login', LoginUser::class)->name('user.login.submit');
// Route::post('/logout', LogoutUser::class)->name('user.logout');

Route::get('/', fn()=> Inertia::render('Landingpage'))->name('login');

Route::post('/login', LoginUser::class)->name('user.login.submit');

Route::middleware('auth')->group( function () {
    Route::get('/dashboard', fn()=> Inertia::render('Dashboard'));
    Route::post('logout', LogoutUser::class)->name('user.logout');
});