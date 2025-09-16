<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use App\Models\CmsPage;
use App\Models\CustomModule;
use App\Models\CustomModuleDetail;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CMSController extends Controller
{
    public function create(){
        return Inertia::render('admin/cms/service');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'url' => 'nullable|string|max:255|unique:cms_pages,url',
            'content' => ['required',
                function ($attribute, $value, $fail) {
                    if (preg_match('/<script\b[^>]*>(.*?)<\/script>/i', $value)) {
                        $fail("The $attribute field must not contain script tags.");
                    }
                },
            ],
        ]);
        // Save to DB or your CMS model
        if (empty($validated['url'])) {
            $validated['url'] = preg_replace('/[^a-z0-9]+/i', '-', strtolower($validated['title']));
        }
        
        if (CmsPage::where('url', $validated['url'])->exists()) {
            return redirect()->back()->withErrors(['url' => 'The URL must be unique.']);
        }
        $validated['url'] = trim($validated['url'], '-'); // Trim leading/trailing hyphens
        CmsPage::create($validated);
        return redirect()->route('cmpPages')->with('success', 'Page created successfully!');
    }
    public function cmsPages(){
        $pages = CmsPage::get();

        return Inertia::render('admin/cms/pages', compact('pages'));
    }
    public function getPage($url){
        $page = CmsPage::where('url',$url)->first();
        if($page){
           return Inertia::render('page',compact('page'));
        }
        $page = CmsPage::find(1);
        return Inertia::render('page',compact('page'));
       
    }
    public function editPage($id){
        $page = CmsPage::find($id);
        return Inertia::render('admin/cms/editpage',compact('page'));
    }
    public function update(Request $request, string $id)
    {
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => ['required',
                function ($attribute, $value, $fail) {
                    if (preg_match('/<script\b[^>]*>(.*?)<\/script>/i', $value)) {
                        $fail("The $attribute field must not contain script tags.");
                    }
                },
            ],
            'url' => 'required|string|max:255|unique:cms_pages,url,' . $id,
        ]);
        $page = CmsPage::find($id);
        // Save to DB or your CMS model
        $page->update($validated);
        return redirect()->back()->with('success', 'Page Update successfully!');
    }

    public function getHomepage() {
        $banners = Banner::orderBy('title', 'ASC')->get();
        return Inertia::render('admin/cmsHomePage/index', compact('banners'));
    }
    
    public function setHomepage(Request $request) {

         $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => ['required',
                function ($attribute, $value, $fail) {
                    if (preg_match('/<script\b[^>]*>(.*?)<\/script>/i', $value)) {
                        $fail("The $attribute field must not contain script tags.");
                    }
                },
            ],
            'image' => ($request->banner_id ? 'nullable' : 'required') . '|image|mimes:jpg,jpeg,png,webp|max:1048|dimensions:width=1440,height=556',
            'link' => 'required|string|max:255',
        ]);


        $image = $request->file('image');
        if($image){
            $directory = 'uploads/banners';
            $extension = $image->getClientOriginalExtension();

            // Generate a unique filename that does not already exist
            do {
                $filename = Str::random(10) . '.' . $extension;
                $fullPath = $directory . '/' . $filename;
            } while (Storage::disk('public')->exists($fullPath));

            // Store the file
            $image->storeAs($directory, $filename, 'public');

            $validated['image'] =  "/media/banners/{$filename}";
        }else{
            $detail = Banner::select('image')->where('id', $request->banner_id)->first();
            $validated['image']= $detail->image;
        }

        // Create or update
        $banner = Banner::updateOrCreate(
            ['id' => $request->banner_id],
            $validated
        );

        return redirect()->back()->with('success', 'Banner created successfully!');
    }
    
    public function publishBanner(Request $request, $id)
    {
        $request->validate([
            'publish' => 'required|boolean',
        ]);

        $module = Banner::findOrFail($id);
        $module->publish = $request->publish;
        $module->save();

        return response()->json([
            'message' => 'Publish status updated.',
            'data' => $module,
        ]);
    }

    public function deleteBanner(Request $request, $id)
    {
        $module = Banner::findOrFail($id);

        if ($module->image && Storage::disk('public')->exists($module->image)) {
             Storage::disk('public')->delete($module->image);
        }
        $module->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function getBannerImages()
    {
        $banners = Banner::where('publish', 1)->get();

        return response()->json($banners);
    }
}
