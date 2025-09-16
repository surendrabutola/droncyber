<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CmsMediaLibrary extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = Storage::disk('public')->files('uploads/media-library');

        $media = collect($files)->map(function ($path) {
            $filename = basename($path);
            return [
                'url' => url("/media/{$filename}"),
                'name' => $filename,
                'created_at' => Storage::disk('public')->lastModified($path) ? date('Y-m-d H:i:s', Storage::disk('public')->lastModified($path)) : null,
            ];
        });

        return Inertia::render('admin/CmsMediaLibrary/index', [
            'media' => $media
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file.*' => 'required|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,application/pdf|max:2048',
        ]);

        $uploadedPaths = [];

        foreach ($request->file('file') as $file) {

            // Double-check MIME using finfo
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime = finfo_file($finfo, $file->getPathname());
            finfo_close($finfo);

            $allowed = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

            if (!in_array($mime, $allowed)) {
                return back()->withErrors(['file' => 'Invalid file type']);
            }

            $content = file_get_contents($file->getPathname());

            $suspiciousPatterns = [
                '/\/JavaScript/i',
                '/\/JS/i',
                '/\/OpenAction/i',
                '/\/AA/i',
                '/\/Launch/i',
                '/\/RichMedia/i',
                '/\/AcroForm/i',
            ];

            foreach ($suspiciousPatterns as $pattern) {
                if (preg_match($pattern, $content)) {
                    return back()->withErrors([
                        'file.0' => 'Rejected: PDF contains embedded scripts or actions (potential XSS).'
                    ]);
                }
            }
            
            $directory = 'uploads/media-library';
            $extension = $file->getClientOriginalExtension();

            // Generate a unique filename that does not already exist
            do {
                $filename = Str::random(10) . '.' . $extension;
                $fullPath = $directory . '/' . $filename;
            } while (Storage::disk('public')->exists($fullPath));

            // Store the file
            $file->storeAs($directory, $filename, 'public');

            $uploadedPaths[] =  "/media/{$filename}";
        }

        return response()->json([
            'message' => 'Files uploaded successfully',
            'paths' => $uploadedPaths,
        ]);
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        dd($request);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $filename = $request->input('name');

        // Assuming the files are stored in public disk (e.g. storage/app/public/uploads/...)
        $filePath = 'uploads/media-library/' . $filename;

        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);

            // If you're storing media records in DB, you can also delete that record here
            // Media::where('name', $filename)->delete();

            return response()->json(['message' => 'File deleted successfully.']);
        }

        return response()->json(['message' => 'File not found.'], 404);
    }

    public function mediaFiles($path)
    {
        if(str_contains($path, '/')){

            $safePath = str_replace('..', '', $path);

            // Build the storage path relative to "uploads"
            $filePath = 'uploads/' . ltrim($safePath, '/');

        }else{
            $filePath = 'uploads/media-library/' . $path;
        }
        if (!Storage::disk('public')->exists($filePath)) {
            abort(404, 'File not found!');
        }

        $file = Storage::disk('public')->get($filePath);
        $mime = Storage::disk('public')->mimeType($filePath);

        return Response::make($file, 200)->header("Content-Type", $mime);
    }

    /**
     * Update the specified resource in storage.
     */
    public function replace(Request $request)
    {
        //

        $request->validate([
            'file.*' => 'required|file|mimes:jpg,png,jpeg,gif,pdf|max:2048',
        ]);

        $uploadedPaths = [];

        $parts = explode('.', $request->name);
        $name = $parts[0];

        $file = $request->file('file');
        $directory = 'uploads/media-library';
        $extension = $file->getClientOriginalExtension();

        $old_file = $directory . '/' . $request->name;
        if (Storage::disk('public')->exists($old_file)) {
            Storage::disk('public')->delete($old_file);
        }

        // Generate a unique filename that does not already exist
        $filename = $name . '.' . $extension;

        // Store the file
        $file->storeAs($directory, $filename, 'public');

        $uploadedPaths[] =  "/media/{$filename}";


        return response()->json([
            'message' => 'Files updated successfully',
            'paths' => $uploadedPaths,
        ]);
    }
}
