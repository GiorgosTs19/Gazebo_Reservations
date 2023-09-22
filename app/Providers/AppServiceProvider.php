<?php

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        JsonResource::withoutWrapping();
        Validator::extend('array_length', function ($attribute, $value, $parameters, $validator) {
            $expectedLength = (int) $parameters[0];

            if (is_array($value) && count($value) === $expectedLength) {
                return true;
            }

            return false;
        });
    }
}
