import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface cmsProps {
    details: any[];
    id: number;
    form_fields: string | null;
    title: string;
    name: string;
}

export default function CmsModule({ details, id, form_fields, title, name }: cmsProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'CMS Modules', href: '/admin/cmsmodules' },
        { title: title, href: ' ' },
    ];
    const [localDetails, setLocalDetails] = useState(details);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const jsonFormFields = form_fields ? JSON.parse(form_fields) : [];
    const { data, setData, post, put, processing, errors, reset } = useForm<{
        custom_module_id: number;
        name: string;
        designation: string;
        email: string;
        status: string;
        detail: string;
        image: File | null;
    }>({
        custom_module_id: id,
        name: '',
        designation: '',
        email: '',
        status: '',
        detail: '',
        image: null,
    });

    const openCreateDialog = () => {
        reset();
        setEditingId(null);
        setIsDialogOpen(true);
    };

    const isPublish = async (moduleId: number, newPublishValue: boolean, onSuccess?: (updatedItem: any) => void) => {
        try {
            const response = await axios.put(
                `/admin/cmsmodulesdeatils/${moduleId}/publish`,
                { publish: newPublishValue }
            );
            const updated = response.data.data;

            // update only that module in the list
            setLocalDetails((prev) => prev.map((item) => (item.id === moduleId ? { ...item, publish: updated.publish } : item)));
        } catch (error) {
            console.error('Failed to update publish status:', error);
        }
    };

    const editModule = (moduleId: number) => {
        const module = localDetails.find((m: any) => m.id === moduleId);
        if (module) {
            setData({
                custom_module_id: id,
                name: module.name ?? '',
                designation: module.designation ?? '',
                email: module.email ?? '',
                status: module.status ?? '',
                detail: module.detail ?? '',
                image: null,
            });
            setEditingId(moduleId);
            setIsDialogOpen(true);
        }
    };

    const deleteModule = async (moduleId: number) => {
        const module = localDetails.find((m: any) => m.id === moduleId);
        if (module) {
            if (confirm(`Are you sure you want to delete this row?`)) {
                try {
                    const response = await axios.delete(route('module.delete', moduleId));
                    toast.success(response.data.message || 'Deleted successfully');
                    
                    setLocalDetails((prev) => prev.filter((item) => item.id !== moduleId));

                } catch (error) {
                    toast.error('Failed to delete module.');
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = editingId ? `/admin/cmsmodulesdeatils/${editingId}` : '/admin/cmsmodulesdeatils';

        const formData = new FormData();
        formData.append('custom_module_id', data.custom_module_id.toString());
        formData.append('name', data.name);
        formData.append('designation', data.designation);
        formData.append('email', data.email);
        formData.append('status', data.status);
        formData.append('detail', data.detail);
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            const response = await axios.post(url, formData);

            const updated = response.data.data;

            // update only that module in the list
            if (editingId) {
                // Update existing module
                setLocalDetails((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
            } else {
                // Add new module to the list
                setLocalDetails((prev) => [...prev, updated]);
            }

            setIsDialogOpen(false);
            reset();
            setData({
                custom_module_id: id,
                name: '',
                designation: '',
                email: '',
                status: '',
                detail: '',
                image: null,
            });
        } catch (error: any) {
            console.error('Failed to submit form:', error);

            // Optional: handle validation errors
            if (error.response?.status === 422) {
                // Map Laravel validation errors manually if needed
            }
        }

    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CMS Modules" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">CMS Modules Detail</h2>

                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-5 w-5" /> Add New
                        </Button>
                    </div>

                    {/* ✅ Controlled Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingId ? 'Edit CMS Module' : 'Add CMS Module'}</DialogTitle>
                                <DialogDescription>Fill in the details to {editingId ? 'update' : 'create'} a CMS module.</DialogDescription>
                            </DialogHeader>
                            {jsonFormFields.length === 0 && <h1 className="text-2xl text-red-600">Please Add Form Fields in CMS Modules</h1>}
                            {jsonFormFields.length > 0 && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {jsonFormFields.includes('name') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Name</label>
                                            <input
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                                        </div>
                                    )}
                                    {jsonFormFields.includes('designation') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Designation</label>
                                            <input
                                                type="text"
                                                value={data.designation}
                                                onChange={(e) => setData('designation', e.target.value)}
                                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                            {errors.designation && <div className="text-sm text-red-500">{errors.designation}</div>}
                                        </div>
                                    )}
                                    {jsonFormFields.includes('email') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                            {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
                                        </div>
                                    )}
                                    {jsonFormFields.includes('status') && (
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                Status (Severity Level or Custom Status)
                                            </label>

                                            <Select
                                                value={
                                                    ['High Severity', 'Moderate Severity', 'Low Severity'].includes(data.status)
                                                        ? data.status
                                                        : 'Other'
                                                }
                                                onValueChange={(value) => {
                                                    if (value === 'Other') {
                                                        setData('status', ''); // clear status initially for typing
                                                    } else {
                                                        setData('status', value);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
                                                    <SelectValue placeholder="Severity" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="High Severity">High Severity</SelectItem>
                                                    <SelectItem value="Moderate Severity">Moderate Severity</SelectItem>
                                                    <SelectItem value="Low Severity">Low Severity</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            {errors.status && <div className="mt-1 text-sm text-red-500">{errors.status}</div>}

                                            {['High Severity', 'Moderate Severity', 'Low Severity'].includes(data.status) === false && (
                                                <div className="mt-3">
                                                    <input
                                                        type="text"
                                                        value={data.status}
                                                        onChange={(e) => setData('status', e.target.value)}
                                                        placeholder="Enter custom status"
                                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                                    />
                                                    {errors.status && <div className="mt-1 text-sm text-red-500">{errors.status}</div>}
                                                </div>
                                            )}
                                        </div>
                                        // <div>
                                        //     <label className="block text-sm font-medium text-gray-700">
                                        //         Status (In case of severity and any date)
                                        //     </label>
                                        //     <Select value={data.status} onValueChange={(value) => setData('status', value)} >
                                        //         <SelectTrigger className="w-[180px]">
                                        //             <SelectValue placeholder="Severity" />
                                        //         </SelectTrigger>
                                        //         <SelectContent>
                                        //             <SelectItem value="High Severity">High Severity</SelectItem>
                                        //             <SelectItem value="Moderate Severity">Moderate Severity</SelectItem>
                                        //             <SelectItem value="Low Severity">Low Severity</SelectItem>
                                        //             <SelectItem value="Other">Other</SelectItem>
                                        //         </SelectContent>
                                        //     </Select>
                                        //     <input
                                        //         type="text"
                                        //         value={data.status}
                                        //         onChange={(e) => setData('status', e.target.value)}
                                        //         className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                        //     />
                                        //     {errors.status && <div className="text-sm text-red-500">{errors.status}</div>}
                                        // </div>
                                    )}
                                    {jsonFormFields.includes('detail') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Detail</label>
                                            <textarea
                                                value={data.detail}
                                                onChange={(e) => setData('detail', e.target.value)}
                                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />
                                            {errors.detail && <div className="text-sm text-red-500">{errors.detail}</div>}
                                        </div>
                                    )}
                                    {jsonFormFields.includes('image') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Image</label>
                                            <input
                                                type="file"
                                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            />

                                            {errors.image && <div className="text-sm text-red-500">{errors.image}</div>}
                                        </div>
                                    )}
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
                            )}
                        </DialogContent>
                    </Dialog>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg bg-white shadow">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="p-3 font-bold text-gray-700">#</th>
                                    <th className="p-3 font-bold text-gray-700">Title</th>
                                    <th className="p-3 font-bold text-gray-700">Detail</th>
                                    <th className="p-3 font-bold text-gray-700">Publish</th>
                                    <th className="p-3 font-bold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {localDetails.map((service: any, index: number) => (
                                    <tr key={service.id} className="border-b odd:bg-white even:bg-gray-50">
                                        <td className="px-2 py-3">{index + 1}</td>
                                        <td className="px-2 py-3">{service.name ?? '-'}</td>
                                        <td className="px-2 py-3">{service.detail ?? '-'}</td>
                                        <td className="px-2 py-3">
                                            <Switch
                                                checked={service.publish}
                                                onCheckedChange={(checked) => isPublish(service.id, checked)}
                                                id={`publish-${service.id}`}
                                                className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300"
                                            />
                                        </td>
                                        <td className="px-2 py-3">
                                            <div className="flex items-center gap-2 font-bold">
                                                <button
                                                    onClick={() => editModule(service.id)}
                                                    className="text-yellow-600 bg-yellow-100 border-yellow-100 rounded-xl px-3 py-2 hover:text-yellow-800 hover:cursor-pointer hover:bg-yellow-200"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-6 w-6" />
                                                </button>
                                                <button
                                                    onClick={() => deleteModule(service.id)}
                                                    className="text-red-600 bg-red-100 border-red-100 rounded-xl px-3 py-2 hover:text-red-800 hover:cursor-pointer hover:bg-red-200"
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
