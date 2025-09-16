import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'CMS Home Page', href: '/admin/cms/homepage' },
];

interface BannerProps {
    id: number;
    title: string;
    content: string;
    image: File | null;
    link: string;
}

interface CmsHomePageProps {
    banners: BannerProps[];
}

export default function CmsHomePage({ banners }: CmsHomePageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dimensionError, setDimensionError] = useState<string | null>(null);
    const [localDetails, setLocalDetails] = useState(banners);
    const [editingId, setEditingId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    // Find the banner we’re editing (if any)
    const editingBanner = editingId ? (localDetails.find((b) => b.id === editingId) ?? null) : null;

    const { data, setData, post, put, processing, errors, reset } = useForm<{
        banner_id: number;
        title: string;
        content: string;
        image: File | null;
        link: string;
    }>({
        banner_id: editingBanner?.id ?? 0,
        title: editingBanner?.title ?? '',
        content: editingBanner?.content ?? '',
        image: null, // always reset on edit
        link: editingBanner?.link ?? '',
    });

      useEffect(() => {
            setLocalDetails(banners);
        }, [banners]);

    const openCreateDialog = () => {
        reset();
        setEditingId(null);
        setIsDialogOpen(true);
        setData({
            banner_id: 0,
            title: '',
            content: '',
            image: null,
            link: '',
        });
        setDimensionError(null);
    };

    const isPublish = async (bannerId: number, newPublishValue: boolean, onSuccess?: (updatedItem: any) => void) => {
        try {
            console.log(bannerId);
            const response = await axios.put(route('cms.banner', bannerId), { publish: newPublishValue });
            const updated = response.data.data;

            // update only that module in the list
            setLocalDetails((prev) => prev.map((item) => (item.id === bannerId ? { ...item, publish: updated.publish } : item)));
        } catch (error) {
            console.error('Failed to update publish status:', error);
        }
    };

    const editBanner = (bannerId: number) => {
        const module = localDetails.find((m) => m.id === bannerId);
        if (module) {
            setData({
                banner_id: module.id,
                title: module.title ?? '',
                content: module.content ?? '',
                link: module.link ?? '',
                image: null, // reset file upload
            });
            setEditingId(bannerId);
            setDimensionError(null);
            setIsDialogOpen(true);
        }
    };

    const deleteBanner = async (bannerId: number) => {
        const module = localDetails.find((m: any) => m.id === bannerId);
        if (module) {
            if (confirm(`Are you sure you want to delete this banner?`)) {
                try {
                    const response = await axios.delete(route('banner.delete', bannerId));
                    toast.success(response.data.message || 'Deleted successfully');
                    
                    setLocalDetails((prev) => prev.filter((item) => item.id !== bannerId));

                } catch (error) {
                    console.log(error);
                    toast.error('Failed to delete module.');
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        
        const url = editingId ? route('cms.homepage', editingId) : route('cms.homepage');

        post(url, {
            onSuccess: () => {
                // reset form and close dialog only on success
                reset('title', 'content', 'image', 'link');
                setIsDialogOpen(false);
                
                toast.success(editingId ? 'Banner updated successfully!' : 'Banner created successfully!');
            },
            onError: (errors) => {
                if (errors.image) {
                    // show error inline or alert
                    alert('Image upload failed: ' + errors.image);
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CMS Home Page" />
            <Toaster position="top-right" reverseOrder={false} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Banner Details</h2>

                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-5 w-5" /> Add New
                        </Button>
                    </div>

                    {/* Controlled Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogOverlay className="bg-transparent" /> 
                        <DialogContent
                             onInteractOutside={(e) => e.preventDefault()}
                             onEscapeKeyDown={(e) => e.preventDefault()} 
                        >
                            <DialogHeader>
                                <DialogTitle>{editingId ? 'Edit Banner' : 'Add Banner'}</DialogTitle>
                                <DialogDescription>Fill in the details to {editingId ? 'update' : 'add'} a home page banner.</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Content <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    {errors.content && <div className="text-sm text-red-500">{errors.content}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Link <span className="text-red-500">*</span> (eg. /resources)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.link}
                                        onChange={(e) => setData('link', e.target.value)}
                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    {errors.link && <div className="text-sm text-red-500">{errors.link}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Banner Image <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        required = {editingId ? false : true }
                                        onChange={(e) => {
                                            const file = e.target.files?.[0] || null;
                                            if (!file) return;

                                            const img = new Image();
                                            img.src = URL.createObjectURL(file);

                                            img.onload = () => {
                                                if (img.width !== 1440 || img.height !== 556) {
                                                    setDimensionError('Image dimensions must be 1440x556px.');
                                                    setData('image', null); // Clear invalid file

                                                    // Reset file input field
                                                    if (fileInputRef.current) {
                                                    fileInputRef.current.value = "";
                                                    }
                                                } else {
                                                    setDimensionError(null);
                                                    setData('image', file);
                                                }
                                            };
                                        }}
                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    <p className="my-2 text-sm font-semibold">
                                        <span className="font-bold">Note : </span>Please set the dimensions as width: 1440px and height: 556px.{' '}
                                    </p>
                                    {dimensionError && <div className="text-sm text-red-500">{dimensionError}</div>}
                                    {errors.image && <div className="text-sm text-red-500">{errors.image}</div>}
                                </div>

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" variant="ghost">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Saving...' : editingId ? 'Update' : 'Save'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg bg-white shadow">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-3 font-bold text-gray-700">#</th>
                                    <th className="p-3 font-bold text-gray-700">Title</th>
                                    <th className="p-3 font-bold text-gray-700">Banner</th>
                                    <th className="p-3 font-bold text-gray-700">Publish</th>
                                    <th className="p-3 font-bold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localDetails.map((banner: any, index: number) => (
                                    <tr key={banner.id} className="border-b odd:bg-white even:bg-gray-50">
                                        <td className="px-2 py-3">{index + 1}</td>
                                        <td className="px-2 py-3">{banner.title}</td>
                                        <td className="px-2 py-3">
                                            <img src={banner.image} alt="Banner" className="h-16 w-28 rounded-md border object-cover" />
                                        </td>
                                        <td className="px-2 py-3">
                                                <Switch
                                                    checked={banner.publish}
                                                    onCheckedChange={(checked) => isPublish(banner.id, checked)}
                                                    id={`publish-${banner.id}`}
                                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                                                />
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="flex items-center gap-4">
                                               
                                                <button
                                                    onClick={() => editBanner(banner.id)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-6 w-6" />
                                                </button>
                                                <button
                                                    onClick={() => deleteBanner(banner.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <Trash className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
