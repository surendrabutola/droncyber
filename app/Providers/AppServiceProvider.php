<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // if (env('FORCE_HTTPS', false)) {
        //     URL::forceScheme('https');
        // }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if ($appUrl = config('app.url')) {
            URL::forceRootUrl($appUrl);
        }

        // ✅ Enforce HTTPS if enabled in .env
        if (env('FORCE_HTTPS', false)) {
            URL::forceScheme('https');
        }

        RateLimiter::for('captcha', function ($request) {
            return Limit::perMinute(10)->by($request->ip());
        });
    }
}
