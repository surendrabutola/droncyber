import CyberAccordion, { AccordionItem } from '@/components/accordion';
import InfoCard from '@/components/info-card';
import FrontendLayout from '@/layouts/frontend-layout';
import { Head } from '@inertiajs/react';
import { Calendar, FileText, FolderCog, School, ScrollText, SearchCode } from 'lucide-react';

const tips: AccordionItem[] = [
    {
        title: 'Zero-Day Exploit in Email Gateway – Immediate Patching Required',
        severity: 'High Severity',
        description:
            'A critical vulnerability in popular state-level email systems allows remote code execution. Apply vendor patch v3.2.1 urgently.',
    },
    {
        title: 'Vulnerability in VPN Software Used by District Offices',
        severity: 'Medium Severity',
        description:
            'A critical vulnerability in popular state-level email systems allows remote code execution. Apply vendor patch v3.2.1 urgently. A critical vulnerability in popular state-level email systems allows remote code execution. Apply vendor patch v3.2.1 urgently.',
    },
    {
        title: 'Ransomware Attack Detected in Educational Institution Servers',
        severity: 'High Severity',
        description:
            'A critical vulnerability in popular state-level email systems allows remote code execution. Apply vendor patch v3.2.1 urgently.',
    },
    {
        title: 'Deprecated JavaScript Library Found in State Web Portals',
        severity: 'Low Severity',
        description: '',
    },
    {
        title: 'Brute Force Login Attempts on Public Service Dashboards',
        severity: 'High Severity',
        description:
            'A critical vulnerability in popular state-level email systems allows remote code execution. Apply vendor patch v3.2.1 urgently. A critical vulnerability in popular state-level email systems allows remote code execution. Apply vendor patch v3.2.1 urgently.',
    },
];

const infocards = [
    {
        icon: <SearchCode className="h-5 w-5" />,
        iconClassName: 'border-red-600 bg-red-100 text-red-600',
        title: 'Submit a Security Incident',
        content: 'Report a cyber incident directly to CERT Uttarakhand for rapid action and containment.',
    },
    {
        icon: <FolderCog className="h-5 w-5" />,
        iconClassName: 'border-green-600 bg-green-100 text-green-600',
        title: 'Apply for Security Audit',
        content: 'Request a certified cybersecurity audit through our empaneled vendor system.',
    },
    {
        icon: <FileText className="h-5 w-5" />,
        iconClassName: 'border-blue-600 bg-blue-100 text-blue-600',
        title: 'Cybersecurity Awareness',
        content: 'Browse guides, posters, and videos to build digital safety knowledge.',
    },
    {
        icon: <ScrollText className="h-5 w-5" />,
        iconClassName: 'border-orange-600 bg-orange-100 text-orange-600',
        title: 'Change of CISO Request Form',
        content: 'Submit and verify departmental CISO change requests with supporting documents.',
    },
    {
        icon: <School className="h-5 w-5" />,
        iconClassName: 'border-orange-600 bg-orange-100 text-orange-600',
        title: 'Change of CISO Request Form',
        content: 'Submit and verify departmental CISO change requests with supporting documents.',
    },
    {
        icon: <Calendar className="h-5 w-5" />,
        iconClassName: 'border-orange-600 bg-orange-100 text-orange-600',
        title: 'Change of CISO Request Form',
        content: 'Submit and verify departmental CISO change requests with supporting documents.',
    },
];

const severityColors = {
    'High Severity': 'text-rose-600',
    'Medium Severity': 'text-yellow-600',
    'Low Severity': 'text-emerald-600',
};

export default function CyberTipsPage() {
    return (
        <FrontendLayout>
            <Head title="Resources" />
            <div className="grid grid-cols-1 gap-6 py-10 px-18 sm:grid-cols-2 lg:grid-cols-4">
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
            <div className='px-20 py-10'>
            <CyberAccordion title = 'FAQs & Cybersecurity Tips' items={tips} severityColors={severityColors} />
            </div>
        </FrontendLayout>
    );
}
