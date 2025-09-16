import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil, PlusCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'CMS Pages',
        href: '/admin/cms/pages',
    },
];

export default function Pages({ pages }: any) {
    const toggleStatus = (id, status) => {
        router.put(`/admin/services/${id}/toggle`, { status: status === 'active' ? 'deactive' : 'active' });
    };

    const editService = (id: any) => {
        router.visit(`/admin/editpage/${id}/edit`);
    };

    const addService = () => {
        router.visit('/admin/cms/pages/create');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CMS Pages" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold">CMS Pages</h2>
                        <button onClick={addService} className="flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            <PlusCircle className="mr-2 h-5 w-5" /> Add New
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-lg bg-white shadow">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 font-bold text-gray-700">#</th>
                                    <th className="p-3 font-bold text-gray-700">Title</th>
                                    <th className="p-3 font-bold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pages.map((service:any, index:number) => (
                                    <tr key={service.id} className="border-b odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                        <td className="px-2 py-3">{index + 1}</td>
                                        <td className="px-2 py-3">{service.title}</td>
                                        <td className="flex items-center space-x-3 px-2 py-3">
                                            
                                            <button
                                                onClick={() => editService(service.id)}
                                                className="text-yellow-600 hover:text-yellow-800"
                                                title="Edit"
                                            >
                                                <Pencil className="h-5 w-5" />
                                            </button>
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
