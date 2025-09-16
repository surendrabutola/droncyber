
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react'
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import TiptapEditor from '@/components/TiptapEditor';
import { url } from 'inspector';

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

export default function Service({page}:any) {
    const { data, setData, post, processing, errors } = useForm({
        title: page.title,
        content: page.content,
        url: page.url,
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post(route('cms.update', page.id))
    }
   
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Service" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <form className="space-y-4 p-4" >
                    <div>
                        <label className="block font-bold">Title</label>
                        <input
                        type="text"
                        value={data.title}
                        onChange={e => setData('title', e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full focus:outline-none "
                        />
                        {errors.title && <div className="text-red-500">{errors.title}</div>}
                    </div>
                    <div>
                        <label className="block font-bold">URL</label>
                        <input
                        type="text"
                        value={data.url}
                        onChange={e => setData('url', e.target.value)}
                        className="border border-gray-300 rounded p-2 w-full focus:outline-none "
                        />
                        {errors.url && <div className="text-red-500">{errors.url}</div>}
                    </div>

                    <div>
                        <label className="block font-bold">Content</label>
                        <TiptapEditor
                        content={data.content}
                        onChange={(val) => setData('content', val)}
                        />
                        {errors.content && <div className="text-red-500">{errors.content}</div>}
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                    </form>
                
            </div>
        </AppLayout>
    );
}
