import TiptapEditor from '@/components/TiptapEditor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Service',
        href: '/admin/service',
    },
];

export default function Service() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cms.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <div>
                        <label className="block font-bold">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none"
                        />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block font-bold">Content</label>
                        <TiptapEditor content={data.content} onChange={(val) => setData('content', val)} />
                        {errors.content && <div className="text-red-500">{errors.content}</div>}
                    </div>

                    <button type="submit" disabled={processing} className="rounded bg-blue-600 px-4 py-2 text-white">
                        Submit
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
