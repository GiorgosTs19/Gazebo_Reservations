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

Route::get('/', [\App\Http\Controllers\GazeboController::class,
    'show']);

Route::get('/Reserve', [\App\Http\Controllers\GazeboController::class,
    'show'])->name('Show.Gazebo.Reservation.Form');

Route::get('/Admin', [\App\Http\Controllers\AdminController::class,
    'showAdminPanel'])->name('ShowAdminPanel');

Route::post('/Reservation/New',[\App\Http\Controllers\ReservationController::class,'create'])->name('Create_Reservation');
Route::get('/Review/{confirmation_number}',[\App\Http\Controllers\ReviewController::class,'show']);
Route::get('/Gazebos/Generate',[\App\Http\Controllers\GazeboController::class,'create']);

Route::prefix('/Menu')->group(function () {
    Route::post('/Create', [\App\Http\Controllers\MenuController::class,'create'])->name('Create_Menu');
    Route::delete('/Delete', [\App\Http\Controllers\MenuController::class,'destroy'])->name('Delete_Menu');
    Route::patch('/Edit', [\App\Http\Controllers\MenuController::class,'edit'])->name('Edit_Menu');
});

Route::prefix('/Disable')->group(function () {
    Route::post('/Day', [\App\Http\Controllers\DisabledDayController::class, 'Disable_Day'])->name('Disable_Day');
    Route::post('/Table', [\App\Http\Controllers\DisabledTableController::class, 'Disable_Table'])->name('Disable_Table');
});
Route::prefix('/Enable')->group(function () {
    Route::delete('/Day', [\App\Http\Controllers\DisabledDayController::class, 'Enable_Day'])->name('Enable_Day');
    Route::delete('/Table', [\App\Http\Controllers\DisabledTableController::class, 'Enable_Table'])->name('Enable_Table');
});
