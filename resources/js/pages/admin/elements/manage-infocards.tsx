import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
  { title: 'Service', href: '/admin/service' },
];

export default function InfoCardForm() {
  const { infoCard } = usePage().props as {
    infoCard?: {
      id: number;
      type: string;
      title: string;
      icon: string;
      content: string;
      className?: string;
      iconClassName?: string;
    };
  };

  const isEdit = !!infoCard;

  const { data, setData, post, put, processing, errors } = useForm({
    type: infoCard?.type || '',
    title: infoCard?.title || '',
    icon: infoCard?.icon || '',
    content: infoCard?.content || '',
    className: infoCard?.className || '',
    iconClassName: infoCard?.iconClassName || '',
  });

  console.log(data);
  const [search, setSearch] = useState(infoCard?.icon || '');

  const filteredIcons = Object.keys(Icons).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      put(route('infocards.update', infoCard!.id));
    } else {
      post(route('infocards.store'));
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
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full rounded border border-gray-300 p-2 focus:outline-none"
            />
            {errors.title && <div className="text-red-500">{errors.title}</div>}
          </div>

          {/* Icon Search */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold">Icon</label>
            <input
              type="text"
              placeholder="Search Lucide icon..."
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Icon Grid */}
          <div className="md:col-span-2">
            <div className="grid max-h-72 grid-cols-4 gap-4 overflow-y-auto pr-2 border-b pb-4 md:grid-cols-6">
              {filteredIcons.slice(0, 100).map((iconName) => {
                const LucideIcon = Icons[iconName as keyof typeof Icons];
                return (
                  <button
                    type="button"
                    key={iconName}
                    onClick={() => {
                      setData('icon', iconName);
                      setSearch(iconName);
                    }}
                    className={`flex flex-col items-center rounded p-2 text-center text-sm ${
                      data.icon === iconName ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                  >
                    <LucideIcon className="h-6 w-6 text-gray-700" />
                    <span className="mt-1 truncate text-xs">{iconName}</span>
                  </button>
                );
              })}
            </div>
            {errors.icon && <div className="text-red-500 mt-1">{errors.icon}</div>}
          </div>

          {/* Content Field */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold">Content</label>
            <textarea
              rows={4}
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            ></textarea>
            {errors.content && <div className="text-red-500 mt-1">{errors.content}</div>}
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
