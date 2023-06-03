<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome_Screen');
});

Route::get('/ReserveGazepo', [\App\Http\Controllers\GazepoController::class,
    'show'])->name('Show.Gazepo.Reservation.Form');
Route::get('/Menu', [\App\Http\Controllers\AdminController::class,
    'showMenuAdminPage'])->name('ShowAdminMenuPage');
Route::post('/Menu/Create', [\App\Http\Controllers\MenuController::class,'create'])
    ->name('Create_Menu');
Route::delete('/Menu/Delete', [\App\Http\Controllers\MenuController::class,'destroy'])
    ->name('Delete_Menu');
Route::post('/Reservation/New',[\App\Http\Controllers\ReservationController::class,'create'])->name('Create_Reservation');
Route::get('/Gazepos/Generate',[\App\Http\Controllers\GazepoController::class,'create']);
