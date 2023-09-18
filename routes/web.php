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

//Route::get('/Review/{confirmation_number}',[\App\Http\Controllers\ReviewController::class,'show']);
Route::get('/gazebos/generate',[\App\Http\Controllers\GazeboController::class,'create']);
Route::get('/initialize', [\App\Http\Controllers\SettingsController::class, 'initializeSettings'])->name('Initialize_Settings');


Route::get('/', [\App\Http\Controllers\GazeboController::class, 'show']);
Route::prefix('/book')->group(function () {
    Route::get('/', [\App\Http\Controllers\GazeboController::class, 'show'])->name('Show.Gazebo.Reservation.Form');
    Route::post('/new',[\App\Http\Controllers\ReservationController::class,'create'])->name('Create_Reservation');
    Route::get('/rangeAvailability',[\App\Http\Controllers\GazeboController::class,'checkRangeAvailability'])->name('Get_Availability_For_Range');
    Route::get('/availability',[\App\Http\Controllers\GazeboController::class,'getAvailabilityForDate'])->name('Get_Availability_For_Date');

    Route::prefix('/menus')->group(function () {
        Route::get('/items', [\App\Http\Controllers\MenuController::class,'Items'])->name('Menu_Items');
    });
});

Route::middleware('auth')->prefix('/Admin')->group(function () {
    Route::get('/', [\App\Http\Controllers\AdminController::class,
        'showAdminPanel'])->name('ShowAdminPanel');

    Route::prefix('/settings')->group(function () {
        Route::prefix('/dinner')->group(function () {
            Route::post('/store', [\App\Http\Controllers\SettingsController::class, 'saveDinnerSettings'])->name('Save_Dinner_Settings');
        });
    });

    Route::prefix('/currentDay')->group(function () {
        Route::get('/reservations',[\App\Http\Controllers\GazeboController::class,'getCurrenDayReservations'])->name('Get_Reservations_Current_Day');
    });

    Route::prefix('/gazebo')->group(function () {
        Route::get('/reservations',[\App\Http\Controllers\GazeboController::class,'getReservationsForTable'])->name('Get_Reservations_For_Table');
    });

    Route::prefix('/day')->group(function () {
        Route::get('/reservations',[\App\Http\Controllers\GazeboController::class,'getReservationsForDate'])->name('Get_Reservations_For_Date');
    });

    Route::prefix('/reservations')->group(function () {
        Route::get('/cancelled', [\App\Http\Controllers\GazeboController::class, 'getCancelledReservations'])->name('Get_Cancelled_Reservations');

    });

    Route::prefix('/reservation')->group(function () {
        Route::prefix('/manage')->group(function () {
            Route::patch('/occurDate', [\App\Http\Controllers\ReservationController::class, 'changeReservationDate'])->
            name('Change_Reservation_Date');
            Route::patch('/gazebo', [\App\Http\Controllers\ReservationController::class, 'changeReservationTable'])->
            name('Change_Reservation_Table');
            Route::get('/search',[\App\Http\Controllers\ReservationController::class,'Search'])->name('Search_Reservations');
        });
        Route::get('/activeReservation',[\App\Http\Controllers\ReservationController::class,'getReservation'])->name('Get_Reservation');

        Route::prefix('/currentStatus')->group(function () {
            Route::patch('/change', [\App\Http\Controllers\ReservationController::class, 'changeReservationStatus'])->name('Change_Reservation_Status');
        });
    });

    Route::prefix('/menu')->group(function () {
        Route::post('/store', [\App\Http\Controllers\MenuController::class, 'create'])->name('Create_Menu');
        Route::delete('/delete', [\App\Http\Controllers\MenuController::class, 'destroy'])->name('Delete_Menu');
        Route::patch('/edit', [\App\Http\Controllers\MenuController::class, 'edit'])->name('Edit_Menu');
    });

    Route::prefix('/dateRange')->group(function() {
       Route::get('/reservations',[\App\Http\Controllers\GazeboController::class,'getReservationsForDates'])
           ->name('Get_Reservations_For_Dates');

        Route::prefix('/disable')->group(function () {
            Route::post('/days', [\App\Http\Controllers\DisabledDayController::class, 'Disable_Days'])->name('Disable_Days');
            Route::post('/table', [\App\Http\Controllers\DisabledTableController::class, 'Disable_Tables'])->name('Disable_Table_In_Range');
        });
    });

    Route::prefix('/disable')->group(function () {
        Route::post('/day', [\App\Http\Controllers\DisabledDayController::class, 'Disable_Day'])->name('Disable_Day');
        Route::post('/gazebo', [\App\Http\Controllers\DisabledTableController::class, 'Disable_Table'])->name('Disable_Table');
    });

    Route::prefix('/enable')->group(function () {
        Route::delete('/day', [\App\Http\Controllers\DisabledDayController::class, 'Enable_Day'])->name('Enable_Day');
        Route::delete('/gazebo', [\App\Http\Controllers\DisabledTableController::class, 'Enable_Table'])->name('Enable_Table');
    });
});
require __DIR__.'/auth.php';
