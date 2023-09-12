<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', [\App\Http\Controllers\GazeboController::class,
    'show']);

Route::get('/Reserve', [\App\Http\Controllers\GazeboController::class,
    'show'])->name('Show.Gazebo.Reservation.Form');

Route::post('/Reservation/New',[\App\Http\Controllers\ReservationController::class,'create'])->name('Create_Reservation');
//Route::get('/Review/{confirmation_number}',[\App\Http\Controllers\ReviewController::class,'show']);
Route::get('/Gazebos/Generate',[\App\Http\Controllers\GazeboController::class,'create']);
Route::get('/Initialize', [\App\Http\Controllers\SettingsController::class, 'initializeSettings'])->name('Initialize_Settings');


Route::get('/Reserve/Availability',[\App\Http\Controllers\GazeboController::class,'checkRangeAvailability'])
    ->name('Get_Availability_For_Range');
Route::get('/Availability',[\App\Http\Controllers\GazeboController::class,'getAvailabilityForDate'])->name('Get_Availability_For_Date');


Route::middleware('auth')->prefix('/Admin')->group(function () {
    Route::get('/', [\App\Http\Controllers\AdminController::class,
        'showAdminPanel'])->name('ShowAdminPanel');

    Route::prefix('/Settings')->group(function () {
        Route::prefix('/Dinner')->group(function () {
            Route::post('/Store', [\App\Http\Controllers\SettingsController::class, 'saveDinnerSettings'])->name('Save_Dinner_Settings');
        });
    });

    Route::prefix('/CurrentDay')->group(function () {
        Route::get('/Reservations',[\App\Http\Controllers\GazeboController::class,'getCurrenDayReservations'])->name('Get_Reservations_Current_Day');
    });

    Route::prefix('/Gazebo')->group(function () {
        Route::get('/Reservations',[\App\Http\Controllers\GazeboController::class,'getReservationsForTable'])->name('Get_Reservations_For_Table');
    });

    Route::prefix('/Day')->group(function () {
        Route::get('/Reservations',[\App\Http\Controllers\GazeboController::class,'getReservationsForDate'])->name('Get_Reservations_For_Date');
    });

    Route::prefix('/Reservation')->group(function () {
        Route::prefix('/Manage')->group(function () {
            Route::patch('/OccurDate', [\App\Http\Controllers\ReservationController::class, 'changeReservationDate'])->
            name('Change_Reservation_Date');
            Route::patch('/Gazebo', [\App\Http\Controllers\ReservationController::class, 'changeReservationTable'])->
            name('Change_Reservation_Table');
            Route::get('/Search',[\App\Http\Controllers\ReservationController::class,'Search'])->name('Search_Reservations');
        });
        Route::get('/ActiveReservation',[\App\Http\Controllers\ReservationController::class,'getReservation'])->name('Get_Reservation');

        Route::prefix('/CurrentStatus')->group(function () {
            Route::patch('/Change', [\App\Http\Controllers\ReservationController::class, 'changeReservationStatus'])->name('Change_Reservation_Status');
        });
    });

    Route::prefix('/Menu')->group(function () {
        Route::post('/Create', [\App\Http\Controllers\MenuController::class, 'create'])->name('Create_Menu');
        Route::delete('/Delete', [\App\Http\Controllers\MenuController::class, 'destroy'])->name('Delete_Menu');
        Route::patch('/Edit', [\App\Http\Controllers\MenuController::class, 'edit'])->name('Edit_Menu');
        Route::get('/Items', [\App\Http\Controllers\MenuController::class,'Items'])->name('Menu_Items');
    });

    Route::prefix('/Date_Range')->group(function() {
       Route::get('/Reservations',[\App\Http\Controllers\GazeboController::class,'getReservationsForDates'])
           ->name('Get_Reservations_For_Dates');

        Route::prefix('/Disable')->group(function () {
            Route::post('/Days', [\App\Http\Controllers\DisabledDayController::class, 'Disable_Days'])->name('Disable_Days');
            Route::post('/Table', [\App\Http\Controllers\DisabledTableController::class, 'Disable_Tables'])->name('Disable_Table_In_Range');
        });
    });

    Route::prefix('/Disable')->group(function () {
        Route::post('/Day', [\App\Http\Controllers\DisabledDayController::class, 'Disable_Day'])->name('Disable_Day');
        Route::post('/Table', [\App\Http\Controllers\DisabledTableController::class, 'Disable_Table'])->name('Disable_Table');
    });

    Route::prefix('/Enable')->group(function () {
        Route::delete('/Day', [\App\Http\Controllers\DisabledDayController::class, 'Enable_Day'])->name('Enable_Day');
        Route::delete('/Table', [\App\Http\Controllers\DisabledTableController::class, 'Enable_Table'])->name('Enable_Table');
    });
});
require __DIR__.'/auth.php';
