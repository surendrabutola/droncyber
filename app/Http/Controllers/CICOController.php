<?php

namespace App\Http\Controllers;

use App\Models\CicoUser;
use App\Models\Department;
use App\Models\SubDepartment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;


class CICOController extends Controller
{
    public function index()
    {
        $departments = Department::all();
        return Inertia::render('ciso-register', [
            'departments' => $departments,
        ]);
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
            'designation' => 'required|string',
            'department' => 'required|string',
            'organization' => 'required|string',
            'appointment_order' => 'required|mimes:pdf,jpg,jpeg,png,webp|max:2048',
            'captcha' => ['required', 'captcha'],
        ], [
            'phone.digits' => 'Phone number must be exactly 10 digits.',
            'phone.regex' => 'Phone number must contain only numbers.',
            'captcha.required' => 'The CAPTCHA is required. Please try again.',
            'captcha.captcha' => 'The CAPTCHA is incorrect. Please try again.',
        ]);

        $cicoUser = CicoUser::create(array_merge($validated, ['appointment_order' => $validated['first_name']]));

        if ($request->hasFile('appointment_order')) {
            $image = $request->file('appointment_order');

            $fileName = Str::uuid() . '_' . $image->getClientOriginalName();

            $relativePath = "uploads/modules/{$cicoUser->id}/{$fileName}";
            $image->storeAs("uploads/modules/{$cicoUser->id}", $fileName, 'public');

            $cicoUser->update([
                'appointment_order' => $relativePath,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'CICO User registered successfully.',
            'success' => true,
        ]);
    }

    public function getUsers(Request $request)
    {

        $query = CicoUser::with(['departments', 'subDepartment']);

        if ($request->department && $request->department !== 'all') {
            $query->where('department', $request->department);
        }
        if ($request->organization && $request->organization !== 'all') {
            $query->where('organization', $request->organization);
        }

        if ($request->filled('search')) {
            $query->where('first_name', 'ILIKE', '%' . strtolower($request->search) . '%');
        }

        $perPage = $request->input('per_page', 10);

        $paginated = $query->paginate($perPage)->through(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->first_name,
                'email' => $user->email,
                'designation' => $user->designation,
                'department' => $user->departments?->name ?? '—',
                'organization' => $user->subDepartment?->name ?? '—',
            ];
        });

        $allDepartments = Department::select('id', 'name')->get();
        // $allOrganizations = SubDepartment::select('id', 'name')->get();

        // Step 1: Get unique organization IDs from cico_users table
        $orgIds = CicoUser::query()
            ->whereNotNull('organization')
            ->pluck('organization')
            ->unique()
            ->map(fn($id) => (int) $id)
            ->filter()
            ->values();

        // Step 2: Fetch sub_departments that match those IDs
        $allOrganizations = SubDepartment::whereIn('id', $orgIds)
            ->select('id', 'name')
            ->get();


        return Inertia::render('ciso-users', [
            'users' => $paginated,
            'filters' => $request->only(['search', 'department', 'organization', 'per_page']),
            'allDepartments' => $allDepartments,
            'allOrganizations' => $allOrganizations,
        ]);
    }

    public function getSubDepartments($id = null)
    {
        $department = Department::with('sub_departments')->find($id);

        return response()->json([
            'sub_departments' =>  $department->sub_departments
        ]);
    }
}
