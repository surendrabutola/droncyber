<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Mews\Captcha\Captcha;

class CaptchaController extends Controller
{
    public function getCaptcha(Captcha $captcha, $config = 'default')
    {
        // Store CAPTCHA metadata in session
        Session::put('captcha_generated_at', now());
        Session::put('captcha_token', request()->user()?->id ?? request()->ip());

        // Return the CAPTCHA image
        return $captcha->create($config);
    }
}
