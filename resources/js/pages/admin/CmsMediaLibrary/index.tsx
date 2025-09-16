import CarouselMediaModal from '@/components/carouselMediaModal';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import { ChevronDown, Paperclip, Pencil, Trash } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Media Gallery',
        href: 'admin/cms/media-library',
    },
];

interface MediaItem {
    name: string;
    url: string;
    created_at: any | null;
}

interface Props {
    media: MediaItem[];
}

export default function MediaIndex({ media }: Readonly<Props>) {
    const [files, setFiles] = useState<File[]>([]);
    const [mediaList, setMediaList] = useState<MediaItem[]>(media);
    const [originalMediaList, setOriginalMediaList] = useState<MediaItem[]>(media);

    const [isCarouselOpen, setCarouselOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const mediaOptions = Array.from(new Set(mediaList.map((item) => item.name))).map((name) => ({
        label: name,
        value: name,
    }));

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        // files: [] as File[],
    });

    const sortOptions = [
        { label: 'Newest', value: 'newest' },
        { label: 'Oldest', value: 'oldest' },
        { label: 'Name (A-Z)', value: 'name_asc' },
        { label: 'Name (Z-A)', value: 'name_desc' },
    ];

    const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

    const handleSortChange = (value: string) => {
        const selected = sortOptions.find((opt) => opt.value === value);
        if (!selected) return;

        setSelectedSort(selected);

        const sorted = [...mediaList];

        if (value === 'newest') {
            sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else if (value === 'oldest') {
            sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else if (value === 'name_asc') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (value === 'name_desc') {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        }

        setMediaList(sorted);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        files.forEach((file) => {
            formData.append('file[]', file);
        });

        axios
            .post(route('admin.media-library.store'), formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
                const uploadedPaths = res.data.paths;
                const newMedia = uploadedPaths.map((path: string) => ({
                    name: path.split('/').pop() ?? '',
                    url: `${path}`,
                }));
                setMediaList((prev) => [...newMedia, ...prev]);
                setOriginalMediaList((prev) => [...newMedia, ...prev]);
                setFiles([]);

                toast.success(res.data.message || 'Files uploaded successfully!');
            })
            .catch((err) => {
                toast.error('Upload failed. Please try again later.');
                console.error('Upload failed', err);
            });
    };

    const handleChange = (item: { label: string; value: string | number }) => {
        const name = String(item.value);
        setSearchTerm(name);
    };

    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = originalMediaList.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setMediaList(filtered);
        } else {
            setMediaList(originalMediaList); // Reset full list on clear
        }
    }, [searchTerm, originalMediaList]);

    const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});
    const fileInputRef = useRef<{ [key: number]: HTMLInputElement | null }>({});

    const handleEdit = (index: number) => {
        fileInputRefs.current[index]?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, item: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', item.name); // replace existing image by name

        handleFileUpload(item, formData);
    };

    const handleFileUpload = async (item: MediaItem, formData: FormData) => {
        try {
            const res = await axios.post(route('admin.media-library.replace'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadedPaths = res.data.paths;

            const newMedia = uploadedPaths.map((path: string) => ({
                name: path.split('/').pop() ?? '',
                url: path,
            }));

            setMediaList((prev) => prev.map((mediaItem) => (mediaItem.name === item.name ? newMedia[0] : mediaItem)));

            setOriginalMediaList((prev) => prev.map((mediaItem) => (mediaItem.name === item.name ? newMedia[0] : mediaItem)));

            toast.success(res.data.message || 'Files updated successfully!');
        } catch (error) {
            toast.error('Upload failed. Please try again later.');
            console.error('Image upload failed:', error);
        }
    };

    const handleDelete = (item: MediaItem) => {
        if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;

        axios
            .post(route('admin.media-library.delete'), { name: item.name })
            .then(() => {
                setMediaList((prev) => prev.filter((media) => media.name !== item.name));
                setOriginalMediaList((prev) => prev.filter((media) => media.name !== item.name));
                toast.success('Files updated successfully!');
            })
            .catch((err) => {
                toast.error('Operation failed. Please try again later.');
                console.error('Delete failed:', err);
            });
    };

    const isPdf = (item: MediaItem) => {
        const n = (item.name || '').toLowerCase();
        const u = (item.url || '').toLowerCase();
        return n.endsWith('.pdf') || u.includes('.pdf');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Media Gallery" />
            <Toaster position="top-right" reverseOrder={false} />

            <div className="p-6">
                <h1 className="mb-4 text-2xl font-semibold">Media Gallery</h1>
                <div className="float-start flex flex-row items-center justify-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2 p-2">
                                Order by: {selectedSort.label}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-44">
                            {sortOptions.map((option) => (
                                <DropdownMenuItem
                                    key={option.value}
                                    onSelect={() => handleSortChange(option.value)}
                                    className={selectedSort.value === option.value ? 'font-semibold' : ''}
                                >
                                    {option.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-9 w-64 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <form onSubmit={handleSubmit} className="float-end space-y-4 p-4">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <input
                            type="file"
                            name="file[]"
                            onChange={(e) => {
                                const selected = Array.from(e.target.files ?? []);
                                setFiles(selected);
                            }}
                            className="w-full rounded border border-gray-300 p-2 focus:outline-none"
                            accept="image/*,application/pdf"
                            required
                            multiple
                        />
                        <button type="submit" disabled={processing} className="rounded-2xl border-[#001e31] bg-[#001e31] px-4 py-2 text-white">
                            Upload
                        </button>
                    </div>
                    {errors.title && <div className="text-red-500">{errors.title}</div>}
                </form>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {mediaList.map((item, index) => (
                    <div
                        key={index}
                        className="group relative cursor-pointer overflow-hidden rounded-lg border shadow transition hover:shadow-md"
                           onClickCapture={(e) => {
                            const target = e.target as HTMLElement;

                            // Prevent if click is inside the buttons or input
                            if (target.closest('button') || target.closest('input[type="file"]')) {
                                return;
                            }

                            if (isPdf(item)) {
                                // PDFs: open in a new tab instead of carousel
                                window.open(item.url, '_blank');
                                return;
                            }
                            setActiveIndex(index);
                            setCarouselOpen(true);
                        }}
                    >
                        {isPdf(item) ? (
                            <div className="flex h-32 w-full items-center justify-center bg-gray-200">
                                <span className="flex flex-row gap-2 text-gray-500">
                                    <Paperclip className="h-5 w-5 text-red-600" /> PDF Document
                                </span>
                            </div>
                        ) : (
                            <img src={item.url} alt={item.name} className="h-32 w-full object-cover" />
                        )}

                        {/* Hover Actions */}
                        <div className="absolute inset-0 z-10 hidden items-start justify-end gap-2 bg-black/40 p-2 group-hover:flex">
                            {/* 🔧 Edit Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm(`Are you sure you want to replace the image "${item.name}"?`)) {
                                        setCarouselOpen(false);
                                        handleEdit(index);
                                    }
                                }}
                                className="absolute top-2 right-8 rounded bg-white p-1 text-gray-700 shadow hover:bg-gray-100"
                            >
                                <Pencil className="h-4 w-4" />
                            </button>

                            {/* Hidden File Input (per item) */}
                            <input
                                type="file"
                                ref={(el) => (fileInputRefs.current[index] = el)}
                                onChange={(e) => handleFileChange(e, item)}
                                className="hidden"
                                accept="image/*,application/pdf"
                            />

                            {/* Delete Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item);
                                }}
                                className="absolute top-2 right-2 rounded bg-white p-1 text-red-600 shadow hover:bg-red-100"
                            >
                                <Trash className="h-4 w-4" />
                            </button>
                        </div>

                        <div
                            className="absolute bottom-0 z-10 w-full truncate bg-white p-2 text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setCarouselOpen(false);
                                // Copy text to clipboard
                                navigator.clipboard
                                    .writeText(item.name)
                                    .then(() => {
                                        toast.success('File name copied to clipboard!');
                                    })
                                    .catch((err) => {
                                        toast.error('Failed to copy file name.');
                                        console.error('Failed to copy: ', err);
                                    });
                            }}
                        >
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
            <CarouselMediaModal images={mediaList} open={isCarouselOpen} onClose={() => setCarouselOpen(false)} initialIndex={activeIndex} />
        </AppLayout>
    );
}
