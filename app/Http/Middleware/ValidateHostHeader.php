<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateHostHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowedHosts = ['cert.prodioslabs.com'];

        if (! in_array($request->getHost(), $allowedHosts)) {
            abort(400, 'Invalid Host header');
        }
        return $next($request);
    }
}
