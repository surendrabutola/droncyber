import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pen, Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import useRoute from '@/components/useRoute';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Service', href: '/admin/service' },
];

type InfoCard = {
    id: number;
    type: string;
    title: string;
    news: string;
};

export default function InfoCards() {
    const route = useRoute();
    const { data = [], meta = {}, sortBy: initSortBy = 'id', sortDir: initSortDir = 'desc' } = usePage().props;

    const [sortBy, setSortBy] = useState(initSortBy);
    const [sortDir, setSortDir] = useState(initSortDir);

    const fetchData = (page = meta.current_page, newSortBy = sortBy, newSortDir = sortDir) => {
        router.get(
            route('admin.info-cards.index'),
            { page, sortBy: newSortBy, sortDir: newSortDir },
            { preserveScroll: true, preserveState: true, replace: true },
        );
    };

    const handleSort = (column: string) => {
        const direction = sortBy === column && sortDir === 'asc' ? 'desc' : 'asc';
        setSortBy(column);
        setSortDir(direction);
        fetchData(1, column, direction);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this card?')) {
            router.delete(`/admin/elements/info-cards/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News Tickers" />
            <div className="w-full p-10">
                <div className="mb-6 flex flex-row justify-between">
                    <h1 className="text-xl font-bold">News Cards</h1>
                    <Link
                        href={route('newstickers.create')}
                        className="felx-row mr-2 flex items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-white hover:underline"
                    >
                        <Plus className="size-5" /> Add
                    </Link>
                </div>

                <div className="overflow-x-auto rounded border">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="cursor-pointer px-4 py-2" onClick={() => handleSort('type')}>
                                    Type {sortBy === 'type' && (sortDir === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="cursor-pointer px-4 py-2" onClick={() => handleSort('title')}>
                                    Title {sortBy === 'title' && (sortDir === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="px-4 py-2">Total news</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((card: InfoCard, index) => (
                                <tr key={card.id} className="border hover:bg-gray-50">
                                    <td className='px-4 py-2'>{index+1}</td>
                                    <td className="px-4 py-2">{card.type}</td>
                                    <td className="px-4 py-2">{card.title}</td>
                                    <td className="px-4 py-2">{card.news}</td>
                                    <td className="flex flex-row items-center gap-2 px-4 py-4">
                                        <Link href={route('infocards.edit', card.id)} className="mr-2 text-blue-500 hover:underline">
                                            <Pen className="size-5" />
                                        </Link>
                                        <button onClick={() => handleDelete(card.id)} className="text-red-500 hover:underline">
                                            <Trash className="size-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-6 text-center text-gray-500">
                                        No data found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {meta && (
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div>
                            Page {meta.current_page} of {meta.last_page}
                        </div>
                        <div className="space-x-2">
                            <button
                                disabled={meta.current_page === 1}
                                onClick={() => fetchData(meta.current_page - 1)}
                                className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                disabled={meta.current_page === meta.last_page}
                                onClick={() => fetchData(meta.current_page + 1)}
                                className="rounded border px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
