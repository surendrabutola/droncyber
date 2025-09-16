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
                                    <h2 class="text-3xl font-bold mb-4 text-zinc-800">Mandate &amp; Objectives</h2>
                                    <p class="text-slate-600 text-xl  mb-6">CERT Uttarakhand (Cyber Emergency Response
                                        Team – Uttarakhand) serves as the state`s dedicated cybersecurity coordination
                                        body, operating under the guidance of national cybersecurity frameworks. Our
                                        primary mandate is to safeguard the digital assets and information
                                        infrastructure of public institutions, government departments, and citizens
                                        across the state.</p>
                                    <h2 class="text-2xl font-bold mb-4 text-zinc-800">Our core objectives include:
                                    </h2>
                                    <ul class="list-disc list-inside space-y-2 text-slate-600 text-lg  ">
                                        <li>Coordinating responses to cybersecurity incidents and threats.</li>
                                        <li> Facilitating communication between state and national cyber-agencies.</li>
                                        <li> Enhancing preparedness of public institutions.</li>
                                        <li>Promoting cyber hygiene awareness.</li>
                                    </ul>
                                </div>
                                <div class="flex justify-end"><img src="/images/aboutus.png" alt="Cyber Security">
                                </div>
                            </div>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="p-6 border-yellow-400 border-2 border-dashed rounded-lg bg-yellow-50">
                                    <h3 class="text-xl font-bold mb-2 text-zinc-800">Vision &amp; Mission</h3>
                                    <p class="text-slate-600 text-base">To build a cyber-resilient Uttarakhand that is
                                        secure, informed, and digitally empowered.</p>
                                    <ul class="list-disc list-inside space-y-2 text-slate-600 text-base  ">
                                        <li>Coordinating responses to cybersecurity incidents and threats.
                                        </li>
                                        <li>Facilitating communication between state and national cyber-agencies.
                                        </li>
                                        <li>Enhancing preparedness of public institutions.
                                        </li>
                                        <li>Promoting cyber hygiene awareness.</li>
                                    </ul>
                                </div>
                                <div class="p-6 border-yellow-400 border-2 border-dashed rounded-lg bg-yellow-50">
                                    <h3 class="text-xl font-bold mb-2 text-zinc-800">Organizational Structure</h3>
                                    <p class="text-slate-600 text-base">The organizational structure of CERT
                                        Uttarakhand is designed for swift decision-making and effective cyber incident
                                        response. It includes a coordinated hierarchy of technical officers,
                                        cybersecurity analysts, and senior leadership. This structure ensures seamless
                                        communication between state departments, rapid threat mitigation, and
                                        efficient execution of awareness, audit, and policy initiatives across
                                        Uttarakhand`s digital landscape.</p>
                                     <p class="mt-4"><a target="_blank" rel="noopener noreferrer nofollow"
                                        class="border-2 rounded-lg px-4 py-2 text-yellow-600 bg-yellow-100"
                                        href="#">Organizational Structure</a>
                                    </p>
                                </div>
                            </div>',
            ],
            [
                'title' => 'Advisories',
                'url' => 'advisories',
                'content' => '<div class="mb-12">
                                <h2 class="text-3xl font-bold text-zinc-800 ">Stay Updated. Stay Secure.</h2>
                                <p class="text-slate-600 text-lg">Get real-time notifications, critical alerts, and
                                    important policy updates from CERT Uttarakhand. Whether you`re an IT officer, a
                                    public user, or a cybersecurity stakeholder, this section ensures you`re always
                                    informed about potential threats, official releases, and scheduled system updates.
                                </p>
                            </div>',
            ],
            [
                'title' => 'Cybersecurity Services & Learning',
                'url' => 'services',
                'content' => '<h2 class="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">Cybersecurity Services &amp;
                                    Learning</h2>
                                <p class="text-zinc-600 text-sm md:text-base w-full">CERT Uttarakhand offers a full
                                    range of cybersecurity services—from incident response and forensic investigation to
                                    security audits and digital learning resources. Whether you`re a government
                                    department, IT officer, or an individual user, our services are designed to protect,
                                    educate, and empower the digital community of Uttarakhand.</p>
                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-12 gap-6">
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-pink-100 text-pink-600 fas fa-magnifying-glass w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Incident Investigation</h3>
                                        <p class="text-sm text-gray-600">Investigate, analyze, and resolve cyber incidents
                                            swiftly with expert digital forensics and response support services.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-green-100 text-green-600 fas fa-shield-halved w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Threat Recovery</h3>
                                        <p class="text-sm text-gray-600">Rapid containment and recovery solutions to
                                            minimize cyber incident impact and restore normal operations securely.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-blue-100 text-blue-600 fas fa-clipboard-list w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Vendor Audits</h3>
                                        <p class="text-sm text-gray-600">Independent cybersecurity assessments by
                                            CERT-approved vendors to ensure system integrity and risk compliance
                                            statewide.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-orange-100 text-orange-600 fas fa-clipboard-list w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Standards Compliance</h3>
                                        <p class="text-sm text-gray-600">Assess systems for compliance with government
                                            cybersecurity policies, frameworks, and security benchmarks.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-sky-100 text-sky-600 fas fa-file-lines w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">LMS Access</h3>
                                        <p class="text-sm text-gray-600">Connect to national e-learning platforms for
                                            certified cybersecurity courses, training modules, and self-paced learning.
                                        </p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-fuchsia-100 text-fuchsia-600 fas  fa-building w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Training Request</h3>
                                        <p class="text-sm text-gray-600">Submit an online request for customized
                                            cybersecurity seminars or workshops for your department or organization.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-cyan-100 text-cyan-600 fas fa-calendar-check w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Event Gallery</h3>
                                        <p class="text-sm text-gray-600">Explore photos and videos from past cybersecurity
                                            events, workshops, awareness campaigns, and training programs.</p>
                                    </div>
                                </div>',
            ],
            [
                'title' => 'Resources',
                'url' => 'resources',
                'content' => '<h2 class="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">Cyber Resources</h2>
                                <p class="text-zinc-600 text-base mb-10 w-full">Whether you`re a citizen, a public
                                    official, or an IT administrator, our categorized tips and FAQs are designed to
                                    improve awareness and reduce everyday cyber risks.</p>
                                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-pink-100 text-pink-600 fas fa-magnifying-glass w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Incident Investigation</h3>
                                        <p class="text-sm text-gray-600">Investigate, analyze, and resolve cyber incidents
                                            swiftly with expert digital forensics and response support services.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-green-100 text-green-600 fas fa-shield-halved w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Threat Recovery</h3>
                                        <p class="text-sm text-gray-600">Rapid containment and recovery solutions to
                                            minimize cyber incident impact and restore normal operations securely.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-blue-100 text-blue-600 fas fa-clipboard-list w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Vendor Audits</h3>
                                        <p class="text-sm text-gray-600">Independent cybersecurity assessments by
                                            CERT-approved vendors to ensure system integrity and risk compliance
                                            statewide.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-orange-100 text-orange-600 fas fa-clipboard-list w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Standards Compliance</h3>
                                        <p class="text-sm text-gray-600">Assess systems for compliance with government
                                            cybersecurity policies, frameworks, and security benchmarks.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-sky-100 text-sky-600 fas fa-file-lines w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">LMS Access</h3>
                                        <p class="text-sm text-gray-600">Connect to national e-learning platforms for
                                            certified cybersecurity courses, training modules, and self-paced learning.
                                        </p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-fuchsia-100 text-fuchsia-600 fas  fa-building w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Training Request</h3>
                                        <p class="text-sm text-gray-600">Submit an online request for customized
                                            cybersecurity seminars or workshops for your department or organization.</p>
                                    </div>
                                    <div class="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition">
                                        <div class=" flex item-center mb-6">
                                            <div
                                                class="rounded-full p-2 bg-cyan-100 text-cyan-600 fas fa-calendar-check w-12 h-12 text-4xl">
                                            </div>
                                        </div>
                                        <h3 class="text-md font-semibold mb-2">Event Gallery</h3>
                                        <p class="text-sm text-gray-600">Explore photos and videos from past cybersecurity
                                            events, workshops, awareness campaigns, and training programs.</p>
                                    </div>
                                </div>',
            ],
            [
                'title' => 'Events',
                'url' => 'events',
                'content' => '<h2 class="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">Cybersecurity in Action</h2>
                            <p class="text-zinc-600 text-base mb-10 w-full">Explore CERT Uttarakhand’s events, from hands-on training and live drills to state-level conferences and awareness campaigns.</p>',
            ],
            [
                'title' => 'Notification & Updates',
                'url' => 'notification-updates',
                'content' => '<h2 class="text-2xl md:text-3xl font-bold text-zinc-800 mb-4">Stay Updated. Stay Secure.</h2>
                            <p class="text-zinc-600 text-base mb-10 w-full">Get real-time notifications, critical alerts, and important policy updates from CERT Uttarakhand. Whether you`re an IT officer, a public user, or a cybersecurity stakeholder, this section ensures you`re always informed about potential threats, official releases, and scheduled system updates.</p>',
            ],
            [
                'title' => 'Who’s Who',
                'url' => 'who-is-who',
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
                                </div>
                                <div class="max-w-full mx-auto bg-white shadow rounded-lg mb-10">
                                    <div class="border-b px-6 py-4">
                                        <h2 class="text-2xl  font-semibold text-gray-800">UK CERT Team</h2>
                                    </div>
                                    <div class="overflow-x-auto">
                                        <table class="min-w-full table-auto" style="width: 0px;">
                                            <colgroup></colgroup>
                                            <tbody>
                                                <tr>
                                                    <th class="px-4 py-3 text-left">
                                                        <p>S. No.</p>
                                                    </th>
                                                    <th class="px-4 py-3 text-left">
                                                        <p>Department</p>
                                                    </th>
                                                    <th class="px-4 py-3 text-left">
                                                        <p>Sub-Department</p>
                                                    </th>
                                                    <th class="px-4 py-3 text-left">
                                                        <p>Name</p>
                                                    </th>
                                                    <th class="px-4 py-3 text-left">
                                                        <p>Designation</p>
                                                    </th>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>1</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>PWD</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>PWD - Sub</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Rohit Singh</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Senior Manager</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>2</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>DEV</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>DEV - Lead</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Aisha Patel</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Team Lead</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>3</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>DES</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>DES - Junior</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Michael Brown</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Junior Designer</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>4</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>QA</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>QA - Senior</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Linda Wong</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Senior Tester</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>5</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>MKT</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>MKT - Coordinator</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>David Lee</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Marketing Coordinator</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>6</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>HR</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>HR - Specialist</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Emily Davis</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>HR Specialist</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>7</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>SALES</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>SALES - Manager</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>James Smith</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Sales Manager</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>8</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>FIN</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>FIN - Analyst</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Oliver Johnson</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Financial Analyst</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>9</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>OPS</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>OPS - Supervisor</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Sophia Martinez</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Operations Supervisor</p>
                                                    </td>
                                                </tr>
                                                <tr class="border-t">
                                                    <td class="px-4 py-3">
                                                        <p>10</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>PR</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>PR - Executive</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Isabella Garcia</p>
                                                    </td>
                                                    <td class="px-4 py-3">
                                                        <p>Public Relations Executive</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
