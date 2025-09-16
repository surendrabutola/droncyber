<?php

use App\Http\Controllers\AccordionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CaptchaController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CMSController;
use App\Http\Controllers\CmsMediaLibrary;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CustomModuleController;
use App\Http\Controllers\InfocardController;
use App\Http\Controllers\NewsTickerController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/resources', function () {
    return Inertia::render('resources');
})->name('resources');

Route::get('/contact', function () {
    return Inertia::render('contactus');
})->name('contactus');
Route::post('/contact', [ContactController::class, 'store'])->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::get('admin/service', [PageController::class, 'service']);
    Route::get('admin/editpage/{id}', [CMSController::class, 'editPage'])->name('editPage');
    Route::get('admin/cms/pages',[CMSController::class,'cmsPages'])->name('cmpPages');
    Route::get('admin/cms/pages/create',[CMSController::class,'create'])->name('cms.create');
    Route::post('/cms', [CMSController::class, 'store'])->name('cms.store');
    Route::get('/admin/editpage/{id}/edit',[CMSController::class,'editPage'])->name('editPage');
    Route::post('/cms/{id}', [CMSController::class, 'update'])->name('cms.update');

    Route::resource('admin/cmsmodules', CustomModuleController::class);
    Route::get('admin/cmsmodulesdeatils/{id}', [CustomModuleController::class, 'getModule'])->name('getModuleDetails');
    Route::post('admin/cmsmodulesdeatils/{id?}', [CustomModuleController::class, 'storeDetail']);
    Route::put('/admin/cmsmodulesdeatils/{id}/publish', [CustomModuleController::class, 'publish'])->name('publish.module');
    Route::delete('/admin/cmsmodulesdeatils/{id}', [CustomModuleController::class, 'deleteDetail'])->name('module.delete');

    Route::resource('admin/cms/media-library', CmsMediaLibrary::class);
    Route::post('admin/cms/media-library/store', [CmsMediaLibrary::class, 'store'])->name('admin.media-library.store');
    Route::post('admin/cms/media-library/update', [CmsMediaLibrary::class, 'replace'])->name('admin.media-library.replace');
    Route::post('admin/cms/media-library', [CmsMediaLibrary::class, 'destroy'])->name('admin.media-library.delete');

    Route::resources([
        'infocards' => InfocardController::class,
        'newstickers' => NewsTickerController::class,
        'cyberaccordions' => AccordionController::class,
    ]);

    Route::get('admin/queries', [AdminController::class, 'getContactQueries'])->name('admin.contact');
   

    Route::get('admin/cms/homepage', [CMSController::class, 'getHomepage']);
    Route::post('admin/cms/homepage/{id?}', [CMSController::class, 'setHomepage'])->name('cms.homepage');
    Route::put('admin/cms/homepage/banner/{id}', [CMSController::class, 'publishBanner'])->name('cms.banner');
    Route::delete('/admin/cms/homepage/banner/{id}', [CMSController::class, 'deleteBanner'])->name('banner.delete');

});
Route::get('pages/{url}',[CMSController::class,'getPage'])->name('pages.url');
Route::get('cmsmodule/{name}', [CustomModuleController::class, 'getCmsModule'])->name('getCmsmodule');

Route::get('/captcha/{config?}', [CaptchaController::class, 'getCaptcha'])->middleware('throttle:captcha');

Route::get('/media/{path}', [CmsMediaLibrary::class, 'mediaFiles'])->where('path', '.*');
Route::get('/gallery', [CustomModuleController::class, 'getGalleryImages']);
Route::get('/banner', [CMSController::class, 'getBannerImages']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';