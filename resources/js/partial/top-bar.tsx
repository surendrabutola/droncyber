import { useState, useLayoutEffect } from 'react'
import AEqual from '@/components/ui/a-equal';
import AMinus from '@/components/ui/a-minus';
import APlus from '@/components/ui/a-plus';
import { Link, usePage } from '@inertiajs/react';
import { Accessibility } from 'lucide-react';

type Size = 'small' | 'default' | 'large'
const SIZE_CONFIG: Record<Size, { fontSize: number; label: string }> = {
  small: {
    fontSize: 14,
    label: 'A-',
  },
  default: {
    fontSize: 16,
    label: 'A',
  },
  large: {
    fontSize: 20,
    label: 'A+',
  },
}

export default function TopBar() {
    const { url } = usePage();
    const isActive = (path: string) => url.startsWith(path);
    const [activeSize, setActiveSize] = useState<Size>('default')
     useLayoutEffect(
        function updateBodyFontSize() {
            document.documentElement.style.fontSize = `${SIZE_CONFIG[activeSize].fontSize}px`
        },
        [activeSize],
    )
    return (
        <div className="hidden h-[42px] items-center justify-between bg-orange-50 px-[80px] text-base lg:flex">
            <div className="flex items-center gap-8 divide-x-2 divide-gray-400">
                <div className="pr-5">
                    <span className="font-bold">Phone:</span> +91 9917440070
                </div>
                <div>
                    <span className="font-bold">Email:</span><a href="mailto:sendrarawat325@gmail.com"> sendrarawat325@gmail.com</a>
                </div>
            </div>
            <div className="flex justify-between gap-1">
                <button className={`cursor-pointer rounded-sm border border-slate-200 p-1 ${activeSize =='large' ? 'bg-yellow-600':'' } hover:bg-yellow-600`} onClick={() => {
                    setActiveSize('large')}}
                >
                    <APlus className="size-5 text-zinc-700 hover:text-white" />
                </button>
                <button className={`cursor-pointer rounded-sm border border-slate-200 p-1 ${activeSize =='default' ? 'bg-yellow-600':'' } hover:bg-yellow-600`} onClick={() => {
                     setActiveSize('default')}}
                >
                    <AEqual className="size-5 text-zinc-700 hover:text-white" />
                </button>
                <button className={`cursor-pointer rounded-sm border border-slate-200 p-1 ${activeSize =='small' ? 'bg-yellow-600':'' } hover:bg-yellow-600`} onClick={() => {
                    setActiveSize('small') }}
                >
                    <AMinus className="size-5 text-zinc-700 hover:text-white" />
                </button>
                <Link
                    href="/pages/screen-reader"
                    className={`${isActive('/pages/screen-reader') ? 'font-bold rounded-sm border border-yellow-600 text-white bg-yellow-600' : 'text-gray-700 hover:text-yellow-600'}`}
                >
                    <Accessibility
                        className="cursor-pointer rounded-sm border border-slate-200 p-1 hover:bg-yellow-600 hover:text-white"
                        size={29}
                    ></Accessibility>
                </Link>
            </div>
        </div>
    );
}
