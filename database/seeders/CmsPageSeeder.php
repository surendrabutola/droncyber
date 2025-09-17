<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CmsPage;

class CmsPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CmsPage::truncate();
        $pages = [
            [
                'title' => 'Page Not Found',
                'url' => 'page-not-found',
                'content' => '<div class=" bg-white flex flex-col justify-center items-center px-4 text-center">
                                    <h1 class="text-9xl font-bold text-yellow-500">404</h1>
                                    <h2 class="text-2xl md:text-4xl font-semibold mt-4">Page Not Found</h2>
                                    <p class="text-gray-600 mt-2 mb-6">Sorry, the page you are looking for does not exist
                                        or has been moved.</p>
                                    <p><a href="/">Go Home</a></p>
                                </div>',
            ],
            [
                'title' => 'About Us',
                'url' => 'about-us',
                'content' => '<div class="grid md:grid-cols-3 gap-10 items-center">
                                <div class="col-span-2">
                                    <h2 class="text-3xl font-bold mb-4 text-zinc-800">Our Mission & Purpose</h2>
                                    <p class="text-slate-600 text-xl  mb-6">At Droncyber, we aim to bridge the digital gap by offering quality computer training, reliable cyber café services, and quick assistance with government-related certificates. Our mission is to empower students, professionals, and local citizens with digital skills while ensuring easy access to essential online services.</p>
                                    <h2 class="text-2xl font-bold mb-4 text-zinc-800">Our Core Objectives Include:
                                    </h2>
                                    <ul class="list-disc list-inside space-y-2 text-slate-600 text-lg  ">
                                        <li>Providing affordable and practical computer education for all age groups.</li>
                                        <li> Offering fast and secure cyber café services like printing, scanning, and browsing.</li>
                                        <li> Assisting citizens with government-related certificates and online applications.</li>
                                        <li>Promoting digital awareness and computer literacy in our community.</li>
                                    </ul>
                                </div>
                                <div class="flex justify-end"><img src="/images/aboutus.png" alt="Cyber Security">
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="p-6 border-yellow-400 border-2 border-dashed rounded-lg bg-yellow-50">
                                    <h3 class="text-xl font-bold mb-2 text-zinc-800">Vision &amp; Mission</h3>
                                    <p class="text-slate-600 text-base">Our vision is to create a digitally empowered society where everyone has the skills and resources to succeed in today’s technology-driven world.</p>
                                    <ul class="list-disc list-inside space-y-2 text-slate-600 text-base  ">
                                        <li>Delivering high-quality computer training programs.
                                        </li>
                                        <li>Ensuring transparent, affordable, and reliable online services.
                                        </li>
                                        <li>Supporting students and job seekers with practical IT knowledge.
                                        </li>
                                        <li>Helping citizens save time and effort through hassle-free certificate services.</li>
                                    </ul>
                                </div>
                                <div class="p-6 border-yellow-400 border-2 border-dashed rounded-lg bg-yellow-50">
                                    <h3 class="text-xl font-bold mb-2 text-zinc-800">Who We Are</h3>
                                    <p class="text-slate-600 text-base">Droncyber is more than just a training center or a cyber café – we are a trusted partner in your digital journey. With a focus on customer satisfaction and community development, we combine modern learning methods with professional support to make technology simple, accessible, and useful for everyone.</p>
                                    
                                </div>
                            </div>',
            ],
           
            [
                'title' => 'Services & Learning',
                'url' => 'services',
                'content' => '<h2 class="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">Our Services &amp;
                        Learning Programs</h2>
                    <p class="text-zinc-600 text-sm md:text-base w-full">At [Your Business Name], we provide a complete
                        range of digital services—from professional computer training and internet access to
                        government-related certificate assistance. Whether you`re a student, job seeker, or citizen,
                        our services are designed to educate, support, and simplify your digital journey.</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-12 gap-6">
                        <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                            <div class=" flex item-center mb-6">
                                <div
                                    class="rounded-full p-2 bg-pink-100 text-pink-600 fas fa-desktop w-12 h-12 text-4xl">
                                </div>
                            </div>
                            <h3 class="text-md font-semibold mb-2">Computer Training</h3>
                            <p class="text-sm text-gray-600">Learn basic to advanced computer skills including MS
                                Office, Internet, Tally, and more with experienced trainers.</p>
                        </div>
                        <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                            <div class=" flex item-center mb-6">
                                <div
                                    class="rounded-full p-2 bg-green-100 text-green-600 fas fa-wifi w-12 h-12 text-4xl">
                                </div>
                            </div>
                            <h3 class="text-md font-semibold mb-2">Cyber Café Services</h3>
                            <p class="text-sm text-gray-600">High-speed internet browsing, printing, scanning,
                                photocopy, and email services—all under one roof.</p>
                        </div>
                        <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                            <div class=" flex item-center mb-6">
                                <div
                                    class="rounded-full p-2 bg-blue-100 text-blue-600 fas fa-id-card w-12 h-12 text-4xl">
                                </div>
                            </div>
                            <h3 class="text-md font-semibold mb-2">Government Certificates</h3>
                            <p class="text-sm text-gray-600">Assistance for PAN, Aadhaar updates, Income, Caste,
                                Residence certificates, Voter ID, and more.</p>
                        </div>
                        <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                            <div class=" flex item-center mb-6">
                                <div
                                    class="rounded-full p-2 bg-orange-100 text-orange-600 fas fa-chalkboard-teacher w-12 h-12 text-4xl">
                                </div>
                            </div>
                            <h3 class="text-md font-semibold mb-2">Workshops & Training</h3>
                            <p class="text-sm text-gray-600">Regular skill development workshops and special
                                computer awareness programs for students and professionals.</p>
                        </div>
                        <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                            <div class=" flex item-center mb-6">
                                <div
                                    class="rounded-full p-2 bg-sky-100 text-sky-600 fas fa-book-open w-12 h-12 text-4xl">
                                </div>
                            </div>
                            <h3 class="text-md font-semibold mb-2">E-Learning Support</h3>
                            <p class="text-sm text-gray-600">Access digital learning platforms, online exam forms,
                                and practice modules to enhance your skills.</p>
                        </div>
                        <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                            <div class=" flex item-center mb-6">
                                <div
                                    class="rounded-full p-2 bg-fuchsia-100 text-fuchsia-600 fas fa-headset w-12 h-12 text-4xl">
                                </div>
                            </div>
                            <h3 class="text-md font-semibold mb-2">Customer Support</h3>
                            <p class="text-sm text-gray-600">Friendly guidance for filling government forms,
                                applying for certificates, and resolving digital service issues.</p>
                        </div>
                        <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                            <div class=" flex item-center mb-6">
                                <div
                                    class="rounded-full p-2 bg-cyan-100 text-cyan-600 fas fa-calendar-alt w-12 h-12 text-4xl">
                                </div>
                            </div>
                            <h3 class="text-md font-semibold mb-2">Events & Batches</h3>
                            <p class="text-sm text-gray-600">Stay updated about new training batches, workshops,
                                government deadlines, and community events.</p>
                        </div>
                    </div>',
            ],
            [
                'title' => 'Events',
                'url' => 'events',
                'content' => '<h2 class="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">Learning & Digital Services in Action</h2>
                            <p class="text-zinc-600 text-base mb-10 w-full">At Droncyber, we regularly host events to support both students and citizens. From computer training workshops and skill development sessions to awareness drives about online services and government certificate guidance, our events are designed to make technology more accessible and useful for everyone.</p>',
            ],
            [
                'title' => 'Notification & Updates',
                'url' => 'notification-updates',
                'content' => '<h2 class="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">Stay Informed. Stay Ahead.</h2>
                            <p class="text-zinc-600 text-base mb-10 w-full">Keep track of the latest announcements, training schedules, and service updates from Droncyber. Whether you’re a student, a job seeker, or a citizen availing government-related services, this section keeps you updated with important news, new course launches, certificate application deadlines, and cyber café service alerts.</p>',
            ],
            [
                'title' => 'Teams',
                'url' => 'teams',
                'content' => '<div class="py-10">
                                    <div class="max-w-7xl mx-auto">
                                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                            <div class="bg-white p-4 border rounded-xl shadow hover:shadow-md transition">
                                                <img src="/media/M2Lew7HWMy.png" alt="Shri Anand Bardhan"
                                                    class="w-[265px] h-[225px] object-cover object-top rounded-t-xl mx-auto mt-4">
                                                <div class="px-4 py-3 space-y-1 text-left">
                                                    <p class="font-bold text-zinc-900">Shri Anand Bardhan</p>
                                                    <p class="text-sm text-zinc-600">Chief Secretary, Chairman of CERT UK
                                                    </p>
                                                    <p><a target="_blank" rel="noopener noreferrer nofollow"
                                                            class="text-sm text-yellow-600 font-medium hover:underline"
                                                            href="#">see more</a></p>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-white  p-4 border rounded-xl shadow hover:shadow-md transition">
                                                <img src="/media/IoPkVXn2in.png" alt="Shri Nitesh Kumar Jha"
                                                    class="w-[265px] h-[225px] object-cover object-top rounded-t-xl mx-auto mt-4">
                                                <div class="px-4 py-3 space-y-1 text-left">
                                                    <p class="font-bold text-zinc-900">Shri Nitesh Kumar Jha</p>
                                                    <p class="text-sm text-zinc-600">Secretary UDD/Secretary IT/Chairman,
                                                        EC, UUSDA</p>
                                                    <p><a target="_blank" rel="noopener noreferrer nofollow"
                                                            class="text-sm text-yellow-600 font-medium hover:underline"
                                                            href="#">see more</a></p>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-white  p-4 border rounded-xl shadow hover:shadow-md transition">
                                                <img src="/media/lZLBdJbsKr.png" alt="Shri Gaurav Kumar Singhal"
                                                    class="w-[265px] h-[225px] object-cover object-top rounded-t-xl mx-auto mt-4">
                                                <div class="px-4 py-3 space-y-1 text-left">
                                                    <p class="font-bold text-zinc-900">Shri Gaurav Kumar Singhal</p>
                                                    <p class="text-sm text-zinc-600">Additional Secretary / Director,
                                                        Urban</p>
                                                    <p><a target="_blank" rel="noopener noreferrer nofollow"
                                                            class="text-sm text-yellow-600 font-medium hover:underline"
                                                            href="#">see more</a></p>
                                                </div>
                                            </div>
                                            <div
                                                class="bg-white  p-4 border rounded-xl shadow hover:shadow-md transition">
                                                <img src="/media/VPTpdXap6X.png" alt="Ashish K Upadhyay"
                                                    class="w-[265px] h-[225px] object-cover object-top rounded-t-xl mx-auto mt-4">
                                                <div class="px-4 py-3 space-y-1 text-left">
                                                    <p class="font-bold text-zinc-900">Ashish K Upadhyay</p>
                                                    <p class="text-sm text-zinc-600">Head CERT-UK, AGM Cyber Security
                                                        &amp; Forensics</p>
                                                    <p><a target="_blank" rel="noopener noreferrer nofollow"
                                                            class="text-sm text-yellow-600 font-medium hover:underline"
                                                            href="#">see more</a></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>',
            ],
            [
                'title' => 'Screen Reader',
                'url' => 'screen-reader',
                'content' => '<div class="max-w-4xl mx-auto p-4">
                    <div class="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table class="w-full table-auto border-collapse text-left text-sm bg-white">
                        <thead>
                            <tr class="bg-gray-100 text-gray-700">
                            <th class="px-4 py-3 font-semibold">Screen Reader</th>
                            <th class="px-4 py-3 font-semibold">Download Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-t">
                            <td class="px-4 py-3">Non Visual Desktop Access (NVDA)</td>
                            <td class="px-4 py-3 text-blue-600 underline">
                                <a href="https://www.nvaccess.org/download/" target="_blank" rel="noopener noreferrer">
                                https://www.nvaccess.org/download/
                                </a>
                            </td>
                            </tr>
                            <tr class="bg-gray-50 border-t">
                            <td class="px-4 py-3">System Access To Go</td>
                            <td class="px-4 py-3 text-blue-600 underline">
                                <a href="http://www.satogo.com/en/" target="_blank" rel="noopener noreferrer">
                                http://www.satogo.com/en/
                                </a>
                            </td>
                            </tr>
                            <tr class="border-t">
                            <td class="px-4 py-3">Thunder</td>
                            <td class="px-4 py-3 text-blue-600 underline">
                                <a href="https://www.webbie.org.uk/thunder/" target="_blank" rel="noopener noreferrer">
                                https://www.webbie.org.uk/thunder/
                                </a>
                            </td>
                            </tr>
                            <tr class="bg-gray-50 border-t">
                            <td class="px-4 py-3">Hal</td>
                            <td class="px-4 py-3 text-blue-600 underline">
                                <a href="http://www.yourdolphin.co.uk/productdetail.asp?id=5" target="_blank" rel="noopener noreferrer">
                                http://www.yourdolphin.co.uk/productdetail.asp?id=5
                                </a>
                            </td>
                            </tr>
                            <tr class="border-t">
                            <td class="px-4 py-3">Supernova</td>
                            <td class="px-4 py-3 text-blue-600 underline">
                                <a href="http://www.yourdolphin.co.uk/productdetail.asp?id=1" target="_blank" rel="noopener noreferrer">
                                http://www.yourdolphin.co.uk/productdetail.asp?id=1
                                </a>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                ',
            ]
        ];

        CmsPage::insert($pages);
    }
}
