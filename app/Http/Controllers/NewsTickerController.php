<?php

namespace App\Http\Controllers;

use App\Models\NewsTicker;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsTickerController extends Controller
{
        /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = NewsTicker::query();

        // ✅ Search filter
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('type', 'like', "%{$search}%")
                    ->orWhere('news', 'like', "%{$search}%");
            });
        }

        // ✅ Sorting
        $sortBy = $request->input('sortBy', 'id');
        $sortDir = $request->input('sortDir', 'desc');

        $query->orderBy($sortBy, $sortDir);

        // ✅ Paginate
        $data = $query->paginate(10)->withQueryString();

        return Inertia::render('admin/elements/news-tickers', [
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
        return Inertia::render('admin/elements/manage-newstickers');
    }

    /*
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required',
            'news' => 'required|string',
        ]);

        // Save to DB or your CMS model
        NewsTicker::create($validated);

        return redirect()->route('newstickers.index')->with('success', 'Data created successfully!');
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
        $data = NewsTicker::find($id);
        return Inertia::render('admin/elements/manage-infocards', [ 'newstickers' => $data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $data = NewsTicker::find($id);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required',
            'icon' => 'required',
            'content' => 'required|string',
        ]);

        // Save to DB or your CMS model
        $data->update($validated);

        return redirect()->route('newstickers.index')->with('success', 'Data updated successfully!');

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
