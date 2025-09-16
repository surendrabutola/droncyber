import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'CMS Modules', href: '/admin/cmsmodules' },
];

export default function CmsModule({ cmsModules,formFields }: any) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const options = formFields.map((field: string) => ({
        value: field,
        label: field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' '),
    }));

    const { data, setData, post, put, get, processing, errors, reset } = useForm({
        name: '',
        title: '',
        detail: '',
        form_fields: [],
    });

    const openCreateDialog = () => {
        reset();
        setEditingId(null);
        setIsDialogOpen(true);
    };

    const editModule = (moduleId: number) => {
        const module = cmsModules.find((m: any) => m.id === moduleId);
        if (module) {
            const jsonFormFields = module.form_fields ? JSON.parse(module.form_fields) : [];
            const selectedOptions = jsonFormFields.map((field: any) => ({
                value: field,
                label: field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' '),
            }));
            setData({
                name: module.name ?? '',
                title: module.title ?? '',
                detail: module.detail ?? '',
                form_fields: jsonFormFields ?? [],
            });
            setSelectedFields(selectedOptions);
            setEditingId(moduleId);
            setIsDialogOpen(true);
        }
    };

    const showDetail = (moduleId: number) => {
        router.visit(`/admin/cmsmodulesdeatils/${moduleId}`);
    };
     const handleChange = (selectedOptions: any) => {
       
        const values = selectedOptions.map((opt: any) => ( opt.value));
        setData('form_fields', values)
        setSelectedFields(selectedOptions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            put(`/admin/cmsmodules/${editingId}`, {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/cmsmodules', {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CMS Modules" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">CMS Modules</h2>

                        <Button onClick={openCreateDialog}>
                            <Plus className="mr-2 h-5 w-5" /> Add New
                        </Button>
                    </div>

                    {/* Controlled Dialog */}
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingId ? 'Edit CMS Module' : 'Add CMS Module'}</DialogTitle>
                                <DialogDescription>Fill in the details to {editingId ? 'update' : 'create'} a CMS module.</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        readOnly={editingId != null }
                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    {errors.title && <div className="text-sm text-red-500">{errors.title}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Content</label>
                                    <textarea
                                        value={data.detail}
                                        onChange={(e) => setData('detail', e.target.value)}
                                        className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    />
                                    {errors.detail && <div className="text-sm text-red-500">{errors.detail}</div>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Select Fields</label>
                                    <Select
                                        isMulti
                                        options={options}
                                        value={selectedFields}
                                        className="text-sm"
                                        classNamePrefix="select"
                                        onChange ={handleChange}
                                    />
                                    {errors.form_fields && <div className="text-sm text-red-500">{errors.form_fields}</div>}
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
                                    <th className="p-3 font-bold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cmsModules.map((service: any, index: number) => (
                                    <tr key={service.id} className="border-b odd:bg-white even:bg-gray-50">
                                        <td className="px-2 py-3">{index + 1}</td>
                                        <td className="px-2 py-3">{service.title}</td>
                                        <td className="px-2 py-3">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => showDetail(service.id)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title="Edit"
                                                >
                                                    <Eye className="h-6 w-6" />
                                                </button>
                                                <button
                                                    onClick={() => editModule(service.id)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-6 w-6" />
                                                </button>
                                                {/* <button
                                                    onClick={() => deleteModule(service.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <Trash className="h-6 w-6" />
                                                </button> */}
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
