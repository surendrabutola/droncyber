import FrontendLayout from '@/layouts/frontend-layout';
import { Shield, RefreshCcw, FileCheck, ClipboardCheck, BookOpen, Users, Image } from "lucide-react";
import { Head } from '@inertiajs/react';
import { CmsModule } from '@/components/cms-modules';
import { route } from 'ziggy-js';
export default function Home({page}:any) {
    return (
        <FrontendLayout>
            <Head title={page.title} />
            <div className='relative w-full h-[216px] bg-[#2b0a4e] bg-cover'
                style={{
                    backgroundImage: `url('/images/page-hero-section.png')`,
                }}
            >
                <div className='absolute bottom-10 left-8 md:left-[96px]'>
                   <h1 className='text-5xl text-white font-semibold'> {page.title}</h1>
                   <span className='text-2xl w-full mx-auto mt-12 mb-10 w-[433px] max-h-100 w-[265px] h-[225px] object-cover object-top' ></span>
                </div>
            </div>
           
            <div className="px-8 md:px-20 mt-12 mx-auto space-y-12 mb-4"
                dangerouslySetInnerHTML={{ __html: page.content }}>
            </div>

            { page.url == 'about-us' &&
                <div className='px-8 md:px-20 py-12 mx-auto space-y-12'>
                    <CmsModule name="team"></CmsModule>
                    <CmsModule name="leadership"></CmsModule>
                </div>
            }
            { page.url == 'events' &&
                <>
                <section className="grid grid-cols-1 gap-6 px-8 md:px-20 py-5 md:grid-cols-5">
                    <CmsModule name="calendar" className="md:col-span-3" />
                    <CmsModule name="archives" className="md:col-span-2" />
                </section>
                <div className='px-8 md:px-20 mx-auto'>
                    <CmsModule name="gallery"></CmsModule>
                </div>
                </>
            }
            {
                page.url == 'notification-updates' &&
                <section className="grid grid-cols-1 gap-6 px-8 md:px-20 py-12 md:grid-cols-5">
                    <CmsModule name="notification" className="md:col-span-3" />
                    <CmsModule name="alerts" className="md:col-span-2" />
                    <CmsModule name="releases" className="md:col-span-2" />
                    <CmsModule name="bulletins" className="md:col-span-3" />
                </section>
                
            }
            {
                page.url == 'who-is-who' &&
                <div className='px-8 md:px-20 mx-auto'>
                    {/* <CmsModule name="whos-who"></CmsModule> */}
                </div>
                
            }
            {
                page.url == 'advisories' &&
                <div className='px-8 md:px-20 mx-auto'>
                <CmsModule name="technical-advisories"></CmsModule>
                <CmsModule name="cyber-hygiene"></CmsModule>
                </div>
            }
            {
                page.url == 'resources' &&
                <div className='px-8 md:px-20 mx-auto pt-12'>
                <CmsModule name="cybersecurity-tips"></CmsModule>
                </div>
            }
            
        </FrontendLayout>
    )
}