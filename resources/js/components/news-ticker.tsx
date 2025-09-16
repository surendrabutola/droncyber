import clsx from 'clsx';
import { ChevronsRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface NewsTickerProps {
    name: string;
    news: NewsItem[];
    title?: string;
    className?: string;
}

interface NewsItem {
    id: number;
    name: string;
    [key: string]: any;
}

export default function NewsTicker({ name, news, title, className }: Readonly<NewsTickerProps>) {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    if(name === 'trainings') {
        name = 'notification-updates'; 
    }
    const url = '/pages/'+name;

    // Filter news items by search term
    const filtered = news.filter((item) => typeof item.name === 'string' && item.name.toLowerCase().includes(searchTerm.toLowerCase()));
 
    // Detect click outside to close search input
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        }

        if (showSearch) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearch]);

    return (
        <div className={clsx('rounded-xl border bg-white p-5 py-2 shadow-sm', className)}>
            {/* Title + Search */}
            <div className="relative mb-4 flex h-7 items-center justify-between">
                <h2 className="text-xl mt-2 font-semibold text-zinc-800">{title}</h2>

                <div className="relative w-56" ref={wrapperRef}>
                    {/* Input Box */}
                    { name == 'advisories' || name == 'notification-updates' || name == 'events' ?  (
                    <a
                        href={url}
                        className="absolute top-0 right-0 text-sm font-medium text-yellow-600 hover:underline"
                        >
                        View all
                    </a>
                        )
                        :
                        (
                            <>
                            {/* Search Icon */}
                            {!showSearch && (
                                <button
                                    onClick={() => {
                                        setShowSearch(true);
                                        setTimeout(() => inputRef.current?.focus(), 10);
                                    }}
                                    className="absolute top-0 right-0 text-zinc-600 transition hover:text-yellow-600"
                                >
                                    <Search className="h-5 w-5" />
                                </button>
                            )}
                            </>
                        )
                    }

                        <input
                            type="text"
                            ref={inputRef}
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={clsx(
                                'absolute top-0 right-0 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm transition-all duration-200 outline-none focus:outline-yellow-500',
                                showSearch ? 'z-10 opacity-100' : 'pointer-events-none opacity-0',
                            )}
                        />
                    
                </div>
            </div>

            {/* News List */}
            <ul className="max-h-[14.5rem] space-y-3 overflow-y-auto py-2">
                {filtered.length > 0 ? (
                    filtered.map((item) => (
                        <li key={item.id} className="flex items-start gap-4 text-sm leading-snug text-zinc-800">
                            <ChevronsRight className="mt-1 h-5 w-5 shrink-0 text-yellow-600" />
                            <span className="md:ml-1 text-base">
                                {item.name}
                                {item.status && (
                                    <>
                                        {' - '}
                                        <span
                                            className={clsx(
                                                'font-bold',
                                                item.status === 'High Severity'
                                                    ? 'text-red-500'
                                                    : item.status === 'Moderate Severity'
                                                      ? 'text-blue-500'
                                                      : item.status === 'Low Severity'
                                                        ? 'text-green-500'
                                                        : 'text-black',
                                            )}
                                        >
                                            {item.status}
                                        </span>
                                    </>
                                )}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="text-sm text-zinc-500 italic">No matching results found.</li>
                )}
            </ul>
        </div>
    );
}
