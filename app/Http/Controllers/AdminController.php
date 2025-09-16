<?php

namespace App\Http\Controllers;

use App\Models\CicoUser;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {

        $user = Auth::user();

        $currentFingerprint = hash('sha256', $request->ip() . '|' . $request->userAgent());
        $validFingerprint = Cache::get('user_session_' . $user->id);

        if ($validFingerprint !== $currentFingerprint) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('login')->withErrors([
                'session' => 'Your session has been logged out because you logged in from another device.',
            ]);
        }
        return Inertia::render('dashboard');
    }

    public function getContactQueries()
    {

        $data = Contact::select('id', 'first_name',  'last_name', 'email', 'phone', 'message', 'created_at')->get();

        return Inertia::render('admin/contact/index', [
            'queries' => $data,
        ]);
    }
    public function getCisoRegistration()
    {

        $data = CicoUser::select('id', 'first_name', 'email', 'phone', 'designation', 'organization', 'department', 'is_approved', 'created_at')->get();

        return Inertia::render('admin/ciso/index', [
            'registrations' => $data,
        ]);
    }

    public function approveRegistration(Request $request, $id)
    {
        $cicoUser = CicoUser::findOrFail($id);

        if ($request->input('action') === 'approve') {
            $cicoUser->is_approved = 1;
        } elseif ($request->input('action') === 'reject') {
            $cicoUser->is_approved = -1;
        }
        $cicoUser->remark = $request->input('remark', ucfirst($request->action) . 'd by' . ' ' . Auth::user()->name);
        $cicoUser->save();

        return response()->json([
            'message' => 'CISO registration status updated successfully.',
            'data' => $cicoUser
        ]);
    }
}
