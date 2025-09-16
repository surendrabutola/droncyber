<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('contactus');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => [
                'required',
                'digits:10', // ensures exactly 10 digits
                'regex:/^[0-9]{10}$/',
            ],
            'message' => 'required|string',
            'captcha' => ['required','captcha'],
        ], [
            'phone.digits' => 'Phone number must be exactly 10 digits.',
            'phone.regex' => 'Phone number must contain only numbers.',
            'captcha.required' => 'The CAPTCHA is required. Please try again.',
            'captcha.captcha' => 'The CAPTCHA is incorrect. Please try again.',
        ]);

        Contact::create($validated);

        return redirect()->back()->with('success', 'Thank you, we’ll get back to you soon!');
    }
}
