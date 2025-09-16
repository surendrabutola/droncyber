import Captcha from '@/components/captcha';
import FrontendLayout from '@/layouts/frontend-layout';
import { validateForm, ValidationRules } from '@/lib/formValidator';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios';
import clsx from 'clsx';
import { CircleCheck, ImagePlus } from 'lucide-react';
import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const schema: Record<string, ValidationRules> = {
    first_name: {
        required: true,
        type: 'text',
        minLength: 2,
    },
    last_name: {
        required: true,
        type: 'text',
        minLength: 2,
    },
    email: {
        required: true,
        type: 'email',
    },
    phone: {
        required: true,
        type: 'phone',
    },
    designation: {
        required: true,
        type: 'text',
    },
    department: {
        required: true,
        type: 'number',
    },
    organization: {
        required: true,
        type: 'number',
    },
    appointment_order: {
        required: true,
        type: 'file',
    },
};

const labels = {
    first_name: 'First Name',
    last_name: 'Last Name',
    email: 'Email',
    phone: 'Mobile',
    designation: 'Designation',
    department: 'Department',
    organization: 'Organization',
    appointment_order: 'CISO Appointment Order',
};

interface Department {
    id: number;
    name: string;
}

interface SubDepartment {
    id: number;
    name: string;
}

interface CICORegisterFormProps {
    departments: Department[];
}

export default function CICORegisterForm({ departments }: CICORegisterFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm<{
        first_name: string;
        last_name: string;
        designation: string;
        department: string | null;
        organization: string | null;
        email: string;
        phone: string;
        appointment_order: File | null;
        captcha: string | null;
    }>({
        first_name: '',
        last_name: '',
        designation: '',
        department: null, // Just the ID
        organization: null,
        email: '',
        phone: '',
        appointment_order: null,
        captcha: '',
    });

    const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});
    const captchaRef = useRef<any>(null);
    const [relatedValues, setRelatedValues] = useState<SubDepartment[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setData(name as keyof typeof data, files[0]);
        }
    };

    const handleDepartmentChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const departmentId = e.target.value;
        setData('department', departmentId);
        setRelatedValues([]);

        try {
            const res = await axios.get(`/subdepartments/${departmentId}`);
            setRelatedValues(res.data.sub_departments); // Assuming the API returns an array
        } catch (error) {
            console.error('Failed to fetch related values', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(data, schema, labels);
        setClientErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).forEach((msg) => {
                // toast.error(msg);
            });
            return;
        }

        const formData = new FormData();
        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('designation', data.designation);
        formData.append('department', data.department ?? '');
        formData.append('organization', data.organization ?? '');
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('captcha', data.captcha ?? '');

        if (data.appointment_order) {
            formData.append('appointment_order', data.appointment_order);
        }

        try {
            toast.promise(
                axios.post(route('ciso.register'), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }),
                {
                    loading: 'Submitting...',
                    success: () => {
                        // run after success
                        reset();
                        setRelatedValues([]);
                        captchaRef.current?.reset();
                        setData((prev) => ({
                            ...prev,
                            captcha: '',
                            appointment_order: null,
                        }));
                        return (
                            <>
                                <p>
                                    <b>Thank you!</b>
                                    <br />
                                    Your application has been received and is currently under review. We’ll contact you through your official email
                                    once approved.
                                </p>
                            </>
                        );
                    },
                    error: (err) => {
                        if (err?.response?.data?.errors) {
                            setClientErrors(err.response.data.errors);
                        }
                        return <b>Something went wrong. Please try again.</b>;
                    },
                },
                {
                    position: 'top-center',
                    duration: 8000,
                },
            );
        } catch (error) {
            toast.error('Network error. Please try again later.');
            captchaRef.current?.reset();
        }
    };

    return (
        <FrontendLayout>
            <Head title="CISO Registeration" />
            <Toaster position="top-right" reverseOrder={false} />
            <div
                className="relative h-[216px] w-full bg-[#2b0a4e] bg-cover"
                style={{
                    backgroundImage: `url('/images/page-hero-section.png')`,
                }}
            >
                <div className="absolute bottom-10 left-8 md:left-[96px]">
                    <h1 className="text-5xl font-semibold text-white"> CISO Register</h1>
                    <span className="mt-12 mb-10 w-[433px] text-2xl"></span>
                </div>
            </div>

            <div className="mx-auto mt-12 mb-10 space-y-12 px-8 md:px-20">
                <h2 className="mb-6 text-2xl font-bold">CISO Registeration Form</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 rounded-xl bg-gray-100 px-6 py-10 md:grid-cols-2">
                    {/* First Name */}
                    <div>
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="first_name"
                            value={data.first_name}
                            onChange={handleChange}
                            className="w-full rounded-md border bg-white px-4 py-2"
                            placeholder="John"
                        />
                        {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                        {(clientErrors.first_name || errors.first_name) && (
                            <p className="text-sm text-red-500">{clientErrors.first_name || errors.first_name}</p>
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="last_name"
                            value={data.last_name}
                            onChange={handleChange}
                            className="w-full rounded-md border bg-white px-4 py-2"
                            placeholder="Smith"
                        />
                        {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                        {(clientErrors.last_name || errors.last_name) && (
                            <p className="text-sm text-red-500">{clientErrors.last_name || errors.last_name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            Email <span className="text-red-500">*(Use official/department email address)</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="w-full rounded-md border bg-white px-4 py-2"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        {(clientErrors.email || errors.email) && <p className="text-sm text-red-500">{clientErrors.email || errors.email}</p>}
                    </div>

                    {/* phone */}
                    <div>
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            Mobile <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            className="w-full rounded-md border bg-white px-4 py-2"
                            placeholder="Enter phone number"
                            maxLength={10}
                        />
                        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                        {(clientErrors.phone || errors.phone) && <p className="text-sm text-red-500">{clientErrors.phone || errors.phone}</p>}
                    </div>

                    {/* Designation */}
                    <div>
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            Designation <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="designation"
                            value={data.designation}
                            onChange={handleChange}
                            className="w-full rounded-md border bg-white px-4 py-2"
                            placeholder="Enter designation"
                        />
                        {errors.designation && <p className="text-red-500">{errors.designation}</p>}
                        {(clientErrors.designation || errors.designation) && (
                            <p className="text-sm text-red-500">{clientErrors.designation || errors.designation}</p>
                        )}
                    </div>

                    {/* Department/District */}
                    <div>
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="department"
                            value={data.department ?? ''}
                            onChange={handleDepartmentChange}
                            className="w-full rounded-md border bg-white px-4 py-2"
                        >
                            <option value="0">Select ...</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                        {errors.department && <p className="text-red-500">{errors.department}</p>}
                        {(clientErrors.department || errors.department) && (
                            <p className="text-sm text-red-500">{clientErrors.department || errors.department}</p>
                        )}
                    </div>

                    {/* HODs/Organization */}

                    <div>
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            Sub Department <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-4">
                            <select
                                name="organization"
                                value={data.organization ?? ''}
                                onChange={(e) => setData('organization', e.target.value)}
                                className="w-full rounded-md border bg-white px-4 py-2"
                            >
                                <option value=" ">Select ...</option>
                                {relatedValues.length > 0 &&
                                    relatedValues.map((subdept) => (
                                        <option key={subdept.id} value={subdept.id}>
                                            {subdept.name}
                                        </option>
                                    ))}
                            </select>

                            {(clientErrors.organization || errors.organization) && (
                                <p className="text-sm text-red-500">{clientErrors.organization || errors.organization}</p>
                            )}
                        </div>
                    </div>

                    {/* Upload File */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="mb-1 block text-base font-semibold md:text-lg">
                            CISO Appointment Order <span className="text-red-500">*</span>
                        </label>
                        <div className="w-full rounded-md border-2 border-dashed border-gray-300 bg-white p-6 text-center">
                            <input type="file" name="appointment_order" onChange={handleFileChange} className="hidden" id="file-upload" />
                            <label htmlFor="file-upload" className="cursor-pointer text-sm text-gray-700">
                                <div className="flex flex-col items-center">
                                    {!data.appointment_order ? (
                                        <>
                                            <ImagePlus className="mb-2 h-8 w-8 text-gray-400" />
                                            <span className="font-medium text-orange-600">Upload a file</span> or drag and drop
                                            <br />
                                            <span className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</span>
                                        </>
                                    ) : (
                                        <span className="flex items-center text-lg font-semibold text-green-500">
                                            <CircleCheck /> File selected
                                        </span>
                                    )}
                                </div>
                            </label>
                        </div>

                        {errors.appointment_order && <p className="text-red-500">{errors.appointment_order}</p>}
                        {(clientErrors.appointment_order || errors.appointment_order) && (
                            <p className="text-sm text-red-500">{clientErrors.appointment_order || errors.appointment_order}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6 flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between md:gap-6">
                        <div>
                            <label className="mb-1 block text-lg font-semibold text-zinc-800">
                                Enter Captcha <span className="text-red-500">*</span>
                            </label>
                            <Captcha onChange={(value) => setData({ ...data, captcha: value })} ref={captchaRef} error={errors.captcha} />
                        </div>
                        <button
                            type="submit"
                            className={clsx(
                                'h-10 w-fit rounded bg-yellow-600 px-6 py-2 font-semibold text-white shadow hover:bg-yellow-700',
                                processing && 'opacity-60',
                            )}
                            disabled={processing}
                        >
                            {processing ? 'Submitting…' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </FrontendLayout>
    );
}
