<?php

namespace App\Http\Controllers;

use App\Models\InfoCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InfocardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = InfoCard::query();

        // ✅ Search filter
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%")
                    ->orWhere('icon', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // ✅ Sorting
        $sortBy = $request->input('sortBy', 'id');
        $sortDir = $request->input('sortDir', 'desc');

        $query->orderBy($sortBy, $sortDir);

        // ✅ Paginate
        $data = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/elements/info-cards', [
            'data' => $data->items(),
            'meta' => [
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
            ],
            'filters' => $request->only(['search', 'sortBy', 'sortDir']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/elements/manage-infocards');
    }

    /*
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required',
            'icon' => 'required',
            'content' => 'required|string',
        ]);

        // Save to DB or your CMS model
        InfoCard::create($validated);

        return redirect()->route('infocards.index')->with('success', 'Card created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $data = InfoCard::find($id);
        return Inertia::render('admin/elements/manage-infocards', [ 'infoCard' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $data = InfoCard::find($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required',
            'icon' => 'required',
            'content' => 'required|string',
        ]);

        // Save to DB or your CMS model
        $data->update($validated);

        return redirect()->route('infocards.index')->with('success', 'Card updated successfully!');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        dd('deleted');
    }
}
