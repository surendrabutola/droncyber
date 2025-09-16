<?php

namespace App\Http\Controllers;

use App\Models\CustomModule;
use App\Models\CustomModuleDetail;
use CurlHandle;
use Egulias\EmailValidator\Result\Reason\DetailedReason;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CustomModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $module = new CustomModuleDetail();
        $formFields = $module->getFillable();
        $cmsModules = CustomModule::orderBy('title', 'ASC')->get();
        return Inertia::render('admin/cms/modules/index', compact('cmsModules', 'formFields'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/cms/modules/add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:custom_modules',
            'title' => 'required|string|max:255',
            'detail' => 'nullable|string',
            'form_fields' => 'required|array',
        ]);
        $validated['form_fields'] = json_encode($request->form_fields);
        // Save to DB or your CMS model
        CustomModule::create($validated);
        return redirect()->back()->with('success', 'Module created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(CustomModule $customModule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CustomModule $customModule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $customModule = CustomModule::find($id);

        // Validate the request
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:custom_modules,name,' . $id,
            'title' => 'required|string|max:255',
            'detail' => 'nullable|string',
            'form_fields' => 'required|array',
        ]);

        // Update the CMS module with validated data
        $customModule->update($validated);

        // Redirect back with a success message
        return redirect()->back()->with('success', 'Module updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CustomModule $customModule)
    {
        //
    }

    public function getCmsmodule(string $name)
    {
        $cms_module = CustomModule::with(['customModuleDetail' => function ($query) {
            $query->where('publish', 1);
        }])->where('name', $name)->first();
        // dd($cms_module);
        return response()->json($cms_module);
    }
    public function getModule($id)
    {
        
        $cms_module = CustomModule::find($id);
        $name = $cms_module->name;
        if($name === 'advisories'){
            $cms_module = CustomModule::where('name', 'technical-advisories')->first();
        }
        $details = CustomModuleDetail::where('custom_module_id', $cms_module->id)->get();
        $form_fields = $cms_module->form_fields;
        $title = $cms_module->title;

        return Inertia::render('admin/cms/modules/addDetails', compact(['details', 'id', 'form_fields', 'title', 'name']));
    }

    public function storeDetail(Request $request, $id = null)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'designation' => 'nullable|string|max:255',
            'email' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('custom_module_details', 'email')->ignore($id) // also ignore for custom module id
            ],
            'status' => 'nullable|string',
            'detail' => 'nullable|string',
        ]);
        $validated['custom_module_id'] = $request->custom_module_id;
        $moduleDetail = $id ? CustomModuleDetail::findOrFail($id) : new CustomModuleDetail();
        $id ?  $validated['publish'] = $moduleDetail->publish : $validated['publish'] = 1;

        if ($request->hasFile('image')) {
            $request->validate(['image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048']);
            if ($moduleDetail->image && file_exists(public_path($moduleDetail->image))) {
                unlink(public_path($moduleDetail->image));
            }
            $image = $request->file('image');
            $destinationPath = public_path('uploads/modules/' . $validated['custom_module_id']);
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $fileName = uniqid() . '_' . $image->getClientOriginalName();
            $image->move($destinationPath, $fileName);

            $validated['image'] = 'uploads/modules/' . $validated['custom_module_id'] . '/' . $fileName;
        }
        $moduleDetail->fill($validated);
        $moduleDetail->save();

        return response()->json([
            'success' => $id ? 'Details updated successfully!' : 'Details added successfully!',
            'data' => $moduleDetail,
        ]);
    }

    public function publish(Request $request, $id)
    {
        $request->validate([
            'publish' => 'required|boolean',
        ]);

        $module = CustomModuleDetail::findOrFail($id);
        $module->publish = $request->publish;
        $module->save();

        return response()->json([
            'message' => 'Publish status updated.',
            'data' => $module,
        ]);
    }

    public function deleteDetail(Request $request, $id)
    {
        $module = CustomModuleDetail::findOrFail($id);

        if ($module->image && file_exists(public_path($module->image))) {
            unlink(public_path($module->image));
        }
        $module->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function getGalleryImages()
    {
        $gallerymoduleId = CustomModule::select('id')->where('name', 'gallery-media'); 
        
        $images = CustomModuleDetail::select('name', 'image')->where('custom_module_id', $gallerymoduleId)->where('publish', 1)->get();// Only get image column

        return response()->json($images);
    }

    
}
