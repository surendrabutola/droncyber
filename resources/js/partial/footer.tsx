import { cert_logo, instagram, linkedin,  x, youtube, facebook } from '@/assets/footer/footer';
import { Link } from '@inertiajs/react';
import useRoute from '@/components/useRoute';

export default function Footer() {
    const route = useRoute();
    return (
        <footer className="bg-yellow-50 px-10 py-5 text-zinc-800 md:px-20 md:py-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                {/* Left Section */}
                <div className="max-w-[720px]">
                    <Link href='/' className="mb-4 flex items-center gap-2 md:gap-4">
                        <img src={cert_logo} alt="CERT Logo" className="h-16 w-auto" />
                        <div>
                            <h4 className="text-lg md:text-xl font-bold uppercase">
                                <span className="hidden lg:inline">Computer Emergency Response Team</span>
                                <span className="inline lg:hidden">CERT UK</span>
                            </h4>
                            <h6 className="text-xs md:text-sm text-zinc-600 uppercase">Govt. of Uttarakhand</h6>
                        </div>
                    </Link>

                    <p className="max-w-md mb-4 text-base pr-8 py-2 md:py-4 leading-relaxed text-zinc-800">
                        Computer Emergency Response Team (CERT) Uttarakhand is the state's official cybersecurity agency, dedicated to protecting and securing digital infrastructure.
                    </p>

                    <div className="flex items-center gap-4">
                        <a href="https://www.linkedin.com/company/certuk/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedin} className="h-8 w-8" alt="LinkedIn" />
                        </a>
                        <a href="https://www.instagram.com/itda_uttarakhand/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} className="h-8 w-8" alt="Instagram" />
                        </a>
                        <a href="https://x.com/uttarakhanditda" target="_blank" rel="noopener noreferrer">
                            <img src={x} className="h-8 w-8" alt="X" />
                        </a>
                        <a href="https://www.facebook.com/InformationTechnologyDevelopmentAgencyITDA" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} className="h-8 w-8" alt="X" />
                        </a>
                        <a href="https://www.youtube.com/@itdauttarakhand7220" target="_blank" rel="noopener noreferrer">
                            <img src={youtube} className="h-8 w-8" alt="YouTube" />
                        </a>
                    </div>
                </div>

                <div className="max-w-[720px] grid grid-cols-2">
                    {/* Pages Section */}
                    <div>
                        <h5 className="mb-2 text-xl font-bold">Pages</h5>
                        <ul className="space-y-1 flex flex-col gap-2 text-base text-zinc-800">
                            <li>
                                <a href={route('home')}>Home</a>
                            </li>
                            <li>
                                <a href={route('pages.url', 'services')}>Services</a>
                            </li>
                            <li>
                                <a href={route('pages.url', 'about-us')}>About us</a>
                            </li>
                            <li>
                                <a href={route('pages.url', 'notification-updates')}>Notification and Updates</a>
                            </li>
                            <li>
                                <a href={route('pages.url', 'advisories')}>Advisories</a>
                            </li>
                        </ul>
                    </div>

                    {/* Key Agencies Section */}
                    <div>
                        <h5 className="mb-2 text-xl font-bold">Key Agencies</h5>
                        <ul className="space-y-1 flex flex-col gap-2 text-base text-zinc-800">
                            <li>
                                <a href="https://www.meity.gov.in/" target='_blank'>MeiTY</a>
                            </li>
                            <li>
                                <a href="https://www.cert-in.org.in"  target='_blank'>CERT-IN</a>
                            </li>
                            <li>
                                <a href="https://cybercrime.gov.in/" target='_blank'>National Cyber Security Portal</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Text */}
            <div className="mt-10 text-center text-base text-zinc-700">
               Dron Cyber cafe &copy; {new Date().getFullYear()}. All Rights Are Reserved... | Design & Developed By Surya,
                Uttarakhand
            </div>
        </footer>
    );
}
