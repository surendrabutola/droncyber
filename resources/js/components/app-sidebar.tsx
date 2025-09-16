import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FolderArchive, HomeIcon, Images, LayoutGrid, PackageSearch } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'CMS Home Page',
        href: '/admin/cms/homepage',
        icon: HomeIcon,
    },
    {
        title: 'CMS Pages',
        href: '/admin/cms/pages',
        icon: PackageSearch,
    },
    {
        title: 'CMS Modules',
        href: '/admin/cmsmodules',
        icon: FolderArchive,
    },
    {
        title: 'CMS Media Library',
        href: '/admin/cms/media-library',
        icon: Images,
    },
    // {
    //     title: 'Info Cards',
    //     href: '/infocards',
    //     icon: Folder,
    // },
    // {
    //     title: 'News Tickers',
    //     href: '/newstickers',
    //     icon: BookOpen,
    // },
    // {
    //     title: 'Cyber Accordions',
    //     href: '/cyberaccordions',
    //     icon: Folder,
    // },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
