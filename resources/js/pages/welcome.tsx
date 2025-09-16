import { slider1 } from '@/assets/images/images';
import digitalIndiaLogo from '@/assets/logo/digital-india.png';
import emigrateLogo from '@/assets/logo/emigrate-logo.png';
import makeInIndiaLogo from '@/assets/logo/make-in-india-logo.png';
import myGovLogo from '@/assets/logo/my-gov-logo.png';
import rojgaarLogo from '@/assets/logo/rojgaar-logo.png';
import standUpLogo from '@/assets/logo/stand-up-logo.png';
import { CmsModule } from '@/components/cms-modules';
import InfoCard from '@/components/info-card';
import FrontendLayout from '@/layouts/frontend-layout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';
import { BookOpen, ChevronLeft, ChevronRight, FileText, ShieldCheck, Users } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HeroSlider.css'; // Custom styles for dots
import useRoute from '@/components/useRoute';




const infocards = [
    {
        icon: <ShieldCheck className="h-5 w-5" />,
        iconClassName: 'border-red-600 bg-red-100 text-red-600',
        title: 'Computer Training',
        content: 'Learn Basic to Advanced Computer Skills, MS Office, Internet, and Job-Oriented Courses.',
    },
    {
        icon: <FileText className="h-5 w-5" />,
        iconClassName: 'border-green-600 bg-green-100 text-green-600',
        title: 'Cyber Cafe Services',
        content: 'Internet Browsing, Online Form Filling, Printing, Scanning, Photocopy & Lamination.',
    },
    {
        icon: <BookOpen className="h-5 w-5" />,
        iconClassName: 'border-blue-600 bg-blue-100 text-blue-600',
        title: 'Government Certificates',
        content: 'Aadhaar Update, PAN Card, Voter ID, Birth/Residence/Income Certificates, and More.',
    },
    {
        icon: <Users className="h-5 w-5" />,
        iconClassName: 'border-orange-600 bg-orange-100 text-orange-600',
        title: 'Digital Payments',
        content: 'Utility Bills, Mobile Recharge, DTH & Online Applications.',
    },
];

interface GalleryImage {
    name: string;
    image: string;
}

interface BannerImage {
    id: number;
    title: string;
    content: string;
    image: string;
    link: string;
}


export default function Home() {
   const route = useRoute();
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await axios.get('/gallery');
                setGalleryImages(response.data); // ✅ This triggers a re-render
            } catch (error) {
                console.error('Error fetching gallery data:', error);
            }
        };

        fetchGallery();
    }, []);

    return (
        <FrontendLayout>
            <Head title="Home" />
            <HeroSection></HeroSection>
            <div className="flex flex-col gap-5 px-10 py-4 md:px-20 md:py-8">
                <section className="px-2 py-10">
                    <div className="flex flex-col items-start justify-between pb-8 md:pb-14 lg:flex-row">
                        {/* Left */}
                        <div className="w-full md:mb-2 lg:mb-0 lg:w-1/2">
                            <p className="mb-2 text-lg font-medium text-yellow-700 lg:text-xl">Quick Access</p>
                            <h2 className="text-2xl leading-tight font-bold text-zinc-800 md:text-5xl">
                               Access All Services  <br className="hidden sm:block" />
                               in One Place
                            </h2>
                        </div>

                        {/* Right */}
                        <div className="w-full text-left text-base leading-relaxed text-zinc-500 md:text-xl lg:w-1/2">
                            Stay connected and skilled with our wide range of digital solutions:
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {infocards.map((card, index) => (
                            <InfoCard
                                key={index}
                                icon={card.icon}
                                iconClassName={card.iconClassName}
                                title={card.title}
                                content={card.content}
                                className="px-6 py-4"
                            />
                        ))}
                    </div>
                </section>

                <HeroSection1></HeroSection1>
                <CmsModule name="leadership"></CmsModule>
                <section className="py-10">
                    <div className="mb-6 flex items-center justify-between px-2">
                        <h1 className="text-3xl font-bold">Gallery Media</h1>
                        <span className="border-b-1 text-xl font-medium text-yellow-500">
                            <a href={route('pages.url', 'events')}>View more</a>
                        </span>
                    </div>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        loop={true}
                        autoplay={{ delay: 3500 }}
                        spaceBetween={50}
                        slidesPerView={3}
                        breakpoints={{
                            640: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 5,
                            },
                        }}
                        className="mySwiper mb-4 w-full"
                    >
                        {galleryImages.map((item, index) => (
                            <SwiperSlide key={index} className="flex items-center justify-center">
                                <img
                                    src={`/${item.image}`} // or your correct path
                                    alt={`${item.name}`}
                                    className="max-h-[300px] object-contain"
                                />
                                <p className="py-2 text-center">{item.name}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
                <section className="grid grid-cols-1 gap-6 px-2 py-14 md:grid-cols-3">
                    <CmsModule name="advisories" className="md:col-span-1" />
                    <CmsModule name="trainings" className="md:col-span-1" />
                    <CmsModule name="events" className="md:col-span-1" />
                </section>
                {/* <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    autoplay={{ delay: 3000 }}
                    spaceBetween={200}
                    slidesPerView={3}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 5,
                        },
                    }}
                    className="mySwiper mb-4 w-full"
                >
                    {[myGovLogo, makeInIndiaLogo, emigrateLogo, rojgaarLogo, standUpLogo, digitalIndiaLogo].map((logo, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center">
                            <img src={logo} alt={`logo-${index}`} className="h-[77px] object-contain" />
                        </SwiperSlide>
                    ))}
                </Swiper> */}
            </div>
        </FrontendLayout>
    );
}
const HeroSection = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [bannerImages, setBannerImages] = useState<BannerImage[]>([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get('/banner');
                setBannerImages(response.data); // ✅ This triggers a re-render
            } catch (error) {
                console.error('Error fetching gallery data:', error);
            }
        };

        fetchBanner();
    }, []);



    return (
        <div className="relative">
            {/* Custom Buttons */}
            <div className="absolute bottom-10 left-10 z-10 flex h-[48px] w-[224px] items-center justify-between md:bottom-24 md:left-20">
                <button ref={prevRef} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                    <ChevronLeft />
                </button>

                {/* Pagination Dots */}
                <div className="custom-pagination flex gap-2" />

                {/* Next Button */}
                <button ref={nextRef} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                    <ChevronRight />
                </button>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation, Pagination]}
                loop={true}
                pagination={{ el: '.custom-pagination', clickable: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                className="h-[556px] w-full"
            >
                {bannerImages.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="flex h-full flex-col justify-center from-blue-900 to-blue-700 bg-cover bg-center px-10 text-white md:px-20"
                            style={{ backgroundImage: `url(${item.image ?? slider1})` }}
                        >
                            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-4xl">{item.title}</h2>
                            <p className="mb-6 w-full text-base md:max-w-4xl md:text-lg">{item.content}</p>
                                <Link
                                    href={item.link}
                                    className="w-fit rounded bg-yellow-500 px-6 py-2 text-base text-black hover:bg-yellow-600 md:text-lg"
                                >
                                    View Details
                                </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
const HeroSection1 = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className="relative">
            {/* Custom Buttons */}
            <div className="absolute bottom-10 left-20 z-10 flex h-[48px] w-[224px] items-center justify-between text-base text-white">
                Issued On: 11 June 2025
            </div>
            <div className="absolute right-20 bottom-3 z-10 flex h-[48px] w-[224px] items-center justify-between md:bottom-10">
                <button ref={prevRef} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                    <ChevronLeft />
                </button>

                {/* Pagination Dots */}
                <div className="custom-pagination1 flex gap-2" />

                {/* Next Button */}
                <button ref={nextRef} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white">
                    <ChevronRight />
                </button>
            </div>

            {/* Swiper */}
            <Swiper
                modules={[Navigation, Pagination]}
                loop={true}
                pagination={{ el: '.custom-pagination1', clickable: true }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                }}
                className="h-[445px] w-full rounded-xl"
            >
                <SwiperSlide>
                    <div
                        className="flex h-full flex-col items-center justify-center from-blue-900 to-blue-700 bg-cover bg-center px-4 text-white md:px-20"
                        style={{ backgroundImage: "url('/images/slider_1_1.png')" }}
                    >
                        <h2 className="mb-4 text-2xl font-bold md:text-4xl">Malware Attack on State Education Portals</h2>
                        <p className="mx-auto mb-6 w-full text-center md:max-w-4xl md:text-lg">
                            A new malware strain is targeting login systems of government-run school portals. All departments are advised to disable
                            external access temporarily and follow the mitigation steps issued.
                        </p>
                        <a href="/pages/advisories" className="my-4 text-yellow-400 underline hover:text-yellow-500">
                            View Full Advisory
                        </a>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div
                        className="flex h-full flex-col items-center justify-center from-blue-900 to-blue-700 bg-cover bg-center px-4 text-white md:px-20"
                        style={{ backgroundImage: "url('/images/slider_1_1.png')" }}
                    >
                        <h2 className="mb-4 text-2xl font-bold md:text-4xl">Malware Attack on State Education Portals</h2>
                        <p className="mx-auto mb-6 w-full text-center md:max-w-4xl md:text-lg">
                            A new malware strain is targeting login systems of government-run school portals. All departments are advised to disable
                            external access temporarily and follow the mitigation steps issued.
                        </p>
                        <a href="pages/advisories" className="my-4 text-yellow-400 underline hover:text-yellow-500">
                            View Full Advisory
                        </a>
                    </div>
                </SwiperSlide>
                {/* Add more SwiperSlides */}
            </Swiper>
        </div>
    );
};
