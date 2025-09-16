import PageBanner from '@/components/banners';
import Captcha from '@/components/captcha';
import FrontendLayout from '@/layouts/frontend-layout';
import { validateForm } from '@/lib/formValidator';
import { Head, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const schema = {
    first_name: { required: true, type: 'text', minLength: 3 },
    last_name: { required: false, type: 'text', minLength: 3 },
    email: { required: true, type: 'email' },
    phone: { required: true, type: 'phone' },
    message: { required: true, minLength: 5 },
};

type ContactForm = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
    captcha: string | null;
};


export default function ContactPage() {
    const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});

    const { data, setData, post, processing, errors, clearErrors } = useForm<Required<ContactForm>>({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
        captcha: '',
    });
    
    const captchaRef = useRef<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name, value);
        clearErrors(name);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validateForm(data, schema);
        setClientErrors(errors); // store local errors

        if (Object.keys(errors).length > 0) {
            toast.error('Please fill the required fields.');
            return;
        }

        post(route('contact'), {
            onSuccess: () => {
                toast.success('Your message has been sent successfully!');
                captchaRef.current?.reset();
                setData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    message: '',
                    captcha: '',
                });
            },
            onError: () => {
                toast.error('Something went wrong, please try again.');
                captchaRef.current?.reset();
            },
        });
    };

    return (
        <FrontendLayout>
            <Head title="Contact" />
            <PageBanner name="Contact Us" />
            <Toaster position="top-right" reverseOrder={false} />
            <section className="px-6 py-12 md:px-20">
                <h2 className="text-3xl font-bold">Contact Us</h2>
                <div className="grid gap-10 py-3 md:grid-cols-5 md:py-6">
                    {/* Contact Form */}
                    <form className="col-span-3 space-y-4 rounded-xl bg-gray-100 px-6 py-10" onSubmit={handleSubmit}>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-lg font-semibold text-zinc-800">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="w-full rounded-md border bg-white p-2"
                                />
                                {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                                {(clientErrors.first_name || errors.first_name) && (
                                    <p className="text-sm text-red-500">{clientErrors.first_name || errors.first_name}</p>
                                )}
                            </div>
                            <div>
                                <label className="mb-1 block text-lg font-semibold text-zinc-800">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="w-full rounded-md border bg-white p-2"
                                />
                                {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                                {(clientErrors.last_name || errors.last_name) && (
                                    <p className="text-sm text-red-500">{clientErrors.last_name || errors.last_name}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-lg font-semibold text-zinc-800">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full rounded-md border bg-white p-2"
                                />
                                {errors.email && <p className="text-red-500">{errors.email}</p>}
                                {(clientErrors.email || errors.email) && <p className="text-sm text-red-500">{clientErrors.email || errors.email}</p>}
                            </div>
                            <div>
                                <label className="mb-1 block text-lg font-semibold text-zinc-800">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={data.phone}
                                    onChange={handleChange}
                                    placeholder="1234567890"
                                    className="w-full rounded-md border bg-white p-2"
                                />
                                {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                                {(clientErrors.phone || errors.phone) && <p className="text-sm text-red-500">{clientErrors.phone || errors.phone}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-lg font-semibold text-zinc-800">Message</label>
                            <textarea
                                name="message"
                                value={data.message}
                                onChange={handleChange}
                                placeholder="Leave your message"
                                rows={6}
                                className="w-full rounded-md border bg-white p-2"
                            ></textarea>
                            {errors.message && <p className="text-red-500">{errors.message}</p>}
                            {(clientErrors.message || errors.message) && (
                                <p className="text-sm text-red-500">{clientErrors.message || errors.message}</p>
                            )}
                        </div>

                        <div className="grid gap-4 items-center lg:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-lg font-semibold text-zinc-800">Enter Captcha</label>
                                <Captcha onChange={(value) => setData({ ...data, captcha: value })} ref={captchaRef} error={errors.captcha} />                        
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-yellow-600 h-10 w-fit px-6 py-2 text-white hover:bg-yellow-700 disabled:opacity-50"
                            >
                                {processing ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </form>

                    {/* Contact Info */}
                    <div className="col-span-2 space-y-4">
                        <div className="space-y-4 rounded-xl bg-gray-100 p-6 shadow-md">
                            <div>
                                <strong className="text-lg text-zinc-700">Email ID</strong>
                                <p className="text-slate-600">helpdesk-soc-itda[at]ukgovernment[dot]in</p>
                            </div>
                            <div>
                                <strong className="text-lg text-zinc-700">Office Address</strong>
                                <p className="text-slate-600">
                                    4 Subash Road, Uttarakhand Secretariat, Fourth Floor
                                    <br />
                                    New Building, Dehradun, Uttarakhand Pin Code – 248001
                                </p>
                            </div>
                            <div>
                                <strong className="text-lg text-zinc-700">WhatsApp Contact Number</strong>
                                <p className="text-slate-600">+91-9412054548</p>
                                <p className="text-slate-600">(For Services related queries, kindly contact on above given contact numbers)</p>
                            </div>
                        </div>

                        <div className="h-60 overflow-hidden rounded-lg">
                            <iframe
                                title="office-location"
                                className="h-full w-full"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6887.460388758286!2d78.05352002124019!3d30.33019134271595!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390929c5011ee42f%3A0xc4e71b83af0bf1!2sUttaranchal%20Secretariat%2C%20Irigation%20Colony%2C%20Karanpur%2C%20Dehradun%2C%20Uttarakhand%20248001!5e0!3m2!1sen!2sin!4v1752837595001!5m2!1sen!2sin"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </FrontendLayout>
    );
}
