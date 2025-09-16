import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Service', href: '/admin/service' },
];

export default function NewsTickerForm() {
  const { newsticker } = usePage().props as {
    newsticker?: {
      id: number;
      type: string;
      name: string;
      news: string;
    };
  };

  const isEdit = !!newsticker;

  const { data, setData, post, put, processing, errors } = useForm({
    type: newsticker?.type || '',
    name: newsticker?.name || '',
    news: newsticker?.news || '',
  });

  const [search, setSearch] = useState(newsticker?.name || '');

  const filteredIcons = Object.keys(Icons).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      put(route('newstickers.update', newsticker!.id));
    } else {
      post(route('newstickers.store'));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={isEdit ? 'Edit Info Card' : 'Create Info Card'} />
      <div className="flex h-full max-w-7xl flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 space-y-4 p-4 md:grid-cols-2">
          {/* Type Field */}
          <div>
            <label className="mb-2 block font-semibold">Type</label>
            <input
              type="text"
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
              className="w-full rounded border border-gray-300 p-2 focus:outline-none"
            />
            {errors.type && <div className="text-red-500">{errors.type}</div>}
          </div>

          {/* Title Field */}
          <div>
            <label className="mb-2 block font-semibold">Title</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full rounded border border-gray-300 p-2 focus:outline-none"
            />
            {errors.name && <div className="text-red-500">{errors.name}</div>}
          </div>

          {/* Content Field */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold">News</label>
            <textarea
              rows={4}
              value={data.news}
              onChange={(e) => setData('news', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            ></textarea>
            {errors.news && <div className="text-red-500 mt-1">{errors.news}</div>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={processing}
              className="w-48 rounded bg-blue-600 px-4 py-2 text-white"
            >
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
