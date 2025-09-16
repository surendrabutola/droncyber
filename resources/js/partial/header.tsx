import { cert_logo } from '@/assets/footer/footer';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import useRoute from '@/components/useRoute';

export default function Header() {
    const route = useRoute();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const { url } = usePage();
    const isActive = (path: string) => url.startsWith(path);
    const toggleMobileDropdown = (menu: string) => {
        setMobileDropdown(mobileDropdown === menu ? null : menu);
    };

    return (
        <header>
            {/* Top Bar */}
            <div className="flex h-[88px] items-center justify-between px-10 text-base lg:px-[80px]">
                {/* Left: Logo and Title */}
                <div className="flex items-center gap-2 md:gap-3 lg:gap-5">
                    <Link href="/" className="flex space-x-1 md:space-x-3">
                        <img src={cert_logo} className="size-11 object-contain md:size-12 lg:size-16" />
                    </Link>
                    <Link href="/" className="flex flex-col pl-4 lg:gap-1 lg:pl-0">
                        <h1 className="font-bold uppercase">
                            <span className="hidden lg:inline">Learning Computer</span>
                            <span className="inline lg:hidden">Dron Cyber</span>
                        </h1>
                        <span className="text-xs text-zinc-600 uppercase lg:text-sm">Dron Cyber</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex md:items-center md:space-x-8 lg:space-x-12">
                    <div className="flex items-center space-x-4 text-lg lg:space-x-8">
                        <Link
                            href="/"
                            className={`text-base ${url == '/' ? 'font-semibold text-yellow-600' : 'text-gray-700 hover:text-yellow-600'}`}
                        >
                            Home
                        </Link>

                        {/* About Us Dropdown */}
                        <div className="relative" onMouseEnter={() => setDesktopDropdown('about')} onMouseLeave={() => setDesktopDropdown(null)}>
                            <button
                                className={`flex items-center text-base ${isActive('/pages/about-us') || isActive('/pages/organisation-structure') || isActive('/pages/who-is-who') || isActive('/pages/certuk-committee') ? 'font-semibold text-yellow-600' : 'text-gray-700 hover:text-yellow-600'}`}
                            >
                                About us
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                            {desktopDropdown === 'about' && (
                                <div className="absolute top-full left-0 z-10 mt-0 w-48 rounded bg-white pt-1 shadow-lg">
                                    <Link href="/pages/about-us" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        About us
                                    </Link>
                                    <Link href="/pages/organisation-structure" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Organisation Structure
                                    </Link>
                                    <Link href="/pages/who-is-who" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Who’s Who
                                    </Link>
                                    <Link href="/pages/certuk-committee" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        CERT-UK Committee
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Notifications Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setDesktopDropdown('notifications')}
                            onMouseLeave={() => setDesktopDropdown(null)}
                        >
                            <button
                                className={`flex items-center text-base ${isActive('/pages/events') || isActive('/pages/notification-updates') || isActive('/pages/advisories') || isActive('/pages/resources') ? 'font-bold text-yellow-600' : 'text-gray-700 hover:text-yellow-600'}`}
                            >
                                Notifications & Advisories
                                <ChevronDown className="ml-1 h-4 w-4" />
                            </button>
                            {desktopDropdown === 'notifications' && (
                                <div className="absolute top-full left-0 z-10 mt-0 w-64 rounded bg-white pt-1 shadow-lg">
                                    <Link href="/pages/notification-updates" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Notification & Updates
                                    </Link>
                                    <Link href="/pages/events" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Events & Gallery
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/pages/services"
                            className={`text-base ${isActive('/pages/services') ? 'font-semibold text-yellow-600' : 'text-gray-700 hover:text-yellow-600'}`}
                        >
                            Services
                        </Link>

                        <Link
                            href={route('contactus')}
                            className={`text-base ${isActive('/contact') ? 'font-semibold text-yellow-600' : 'text-gray-700 hover:text-yellow-600'}`}
                        >
                            Contact us
                        </Link>
                    </div>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 focus:outline-none">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mt-2 space-y-2 px-4 pb-4 text-sm md:hidden">
                    <Link href="/" className="block text-yellow-600">
                        Home
                    </Link>

                    {/* Mobile About Us */}
                    <div>
                        <button
                            onClick={() => toggleMobileDropdown('about')}
                            className="flex w-full justify-between text-gray-700 hover:text-yellow-600"
                        >
                            About us
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {mobileDropdown === 'about' && (
                            <div className="mt-1 ml-4 space-y-1">
                                <Link href="/pages/about-us" className="block text-gray-600">
                                    About us
                                </Link>
                                <Link href="/pages/about-us" className="block text-gray-600">
                                    Organisation Structure
                                </Link>
                                <Link href="/pages/who-is-who" className="block text-gray-600">
                                    Who’s Who
                                </Link><Link href="/pages/certuk-committee" className="block text-gray-600">
                                    CERT-UK Committee
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Notifications */}
                    <div>
                        <button
                            onClick={() => toggleMobileDropdown('notifications')}
                            className="flex w-full justify-between text-gray-700 hover:text-yellow-600"
                        >
                            Notifications & Advisories
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {mobileDropdown === 'notifications' && (
                            <div className="mt-1 ml-4 space-y-1">
                                <Link href="/pages/notification-updates" className="block text-gray-600">
                                    Notification & Updates
                                </Link>
                                <Link href="/pages/advisories" className="block text-gray-600">
                                    Advisories
                                </Link>
                                <Link href="/pages/events" className="block text-gray-600">
                                    Events & Gallery
                                </Link>
                                <Link href="/pages/resources" className="block text-gray-600">
                                    Resources
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href="/pages/services" className="block text-gray-700">
                        Services
                    </Link>

                    {/* Mobile Notifications */}
                    <div>
                        <button
                            onClick={() => toggleMobileDropdown('ciso_user')}
                            className="flex w-full justify-between text-gray-700 hover:text-yellow-600"
                        >
                            CISO
                            <ChevronDown className="h-4 w-4" />
                        </button>
                        {mobileDropdown === 'ciso_user' && (
                            <div className="mt-1 ml-4 space-y-1">
                                <Link href="/pages/ciso-guidelines" className="block text-gray-600">
                                    Appointment & Guidelines
                                </Link>
                                <Link href="/ciso-registration" className="block text-gray-600">
                                    CISO Registration
                                </Link>
                                <Link href="/ciso-users" className="block text-gray-600">
                                    Find CISO
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link href={route('contactus')} className="block text-gray-700">
                        Contact us
                    </Link>
                </div>
            )}
        </header>
    );
}
