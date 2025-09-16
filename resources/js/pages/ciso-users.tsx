import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FrontendLayout from '@/layouts/frontend-layout';
import { Head, router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, RefreshCcw, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CicoRecord {
    id: number;
    department: string;
    organization: string;
    name: string;
    email?: string;
    designation?: string;
}

interface PageProps {
    users: {
        data: CicoRecord[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
        department?: string;
        organization?: string;
        per_page?: number | string;
    };
    allDepartments: any[];
    allOrganizations: any[];
}

export default function CicoSearchTable({ users, filters, allDepartments, allOrganizations }: PageProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [department, setDepartment] = useState(filters.department ?? 'all');
    const [organization, setOrganization] = useState(filters.organization ?? 'all');
    const [per_page, setPerPage] = useState(filters.per_page ?? '10');

    const handleFilterChange = () => {
        router.get(
            route('ciso.users'),
            {
                search,
                department,
                organization,
                per_page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

   const [filteredOrganizations, setFilteredOrganizations] = useState<any[]>(allOrganizations);

    useEffect(() => {
        setSearch(filters.search ?? '');
        setDepartment(String(filters.department ?? 'all'));
        setOrganization(String(filters.organization ?? 'all'));
        setPerPage(filters.per_page ?? '10');
    }, [filters]);

    useEffect(() => {
        const fetchSubDepartments = async () => {
            if (department !== "all") {
                try {
                    const res = await axios.get(
                        route("ciso.sub-department", { id: department })
                    );

                    setFilteredOrganizations(res.data.sub_departments);
                } catch (error) {
                    console.error("Error fetching sub-departments:", error);
                }
            } else {
                setFilteredOrganizations(allOrganizations); // reset to all if department = all
            }
        };

        fetchSubDepartments();
    }, [department]);



    const handlePageChange = (page: number) => {
        router.get(
            route('ciso.users'),
            {
                search,
                department,
                organization,
                per_page,
                page,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleReset = () => {
        setSearch('');
        setDepartment('all');
        setOrganization('all');
        setPerPage('10');
        router.get(route('ciso.users'));
    };

    return (
        <FrontendLayout>
            <Head title="CISO Users" />
            <div className="relative h-[216px] w-full bg-[#2b0a4e] bg-cover" style={{ backgroundImage: `url('/images/page-hero-section.png')` }}>
                <div className="absolute bottom-10 left-8 md:left-[96px]">
                    <h1 className="text-5xl font-semibold text-white">CISO Users</h1>
                </div>
            </div>

            <div className="rounded-lg bg-white px-6 py-10 shadow md:px-20">
                {/* Filters */}
                <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-2xl font-semibold">Find CISO</h2>

                    <div className="flex flex-col gap-3 md:flex-row">
                        <Input
                            placeholder="Search Name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="py-2 md:w-32 lg:w-65"
                        />

                        {/* <Select value={department} onValueChange={setDepartment}>
                            <SelectTrigger className="truncate md:w-32 lg:w-65">
                                <SelectValue placeholder="Search Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {allDepartments.map((dep, ind) => (
                                    <SelectItem key={ind} value={String(dep.id)}>
                                        {dep.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={organization} onValueChange={setOrganization}>
                            <SelectTrigger className="truncate md:w-32 lg:w-65">
                                <SelectValue placeholder="Search Organization" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sub Departments</SelectItem>
                                {allOrganizations.map((org, ind) => (
                                    <SelectItem key={ind} value={String(org.id)}>
                                        {org.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select> */}

                        <Select
                            value={department}
                            onValueChange={(value) => {
                                setDepartment(value);
                                setOrganization('all'); // reset org when dept changes
                            }}
                        >
                            <SelectTrigger className="truncate md:w-32 lg:w-65">
                                <SelectValue placeholder="Search Department" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Departments</SelectItem>
                                {allDepartments.map((dep, ind) => (
                                    <SelectItem key={ind} value={String(dep.id)}>
                                        {dep.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={organization} onValueChange={setOrganization}>
                            <SelectTrigger className="truncate md:w-32 lg:w-65">
                                <SelectValue placeholder="Search Organization" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Sub Departments</SelectItem>
                                {filteredOrganizations.map((org, ind) => (
                                    <SelectItem key={ind} value={String(org.id)}>
                                        {org.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Button onClick={() => handleFilterChange()} className="cursor-pointer bg-yellow-400 px-5 text-white hover:bg-yellow-600">
                            <Search className="mr-2 size-4" />
                            Search
                        </Button>
                        <Button onClick={() => handleReset()} className="cursor-pointer bg-yellow-400 px-5 text-white hover:bg-yellow-600">
                            <RefreshCcw className="mr-2 size-4" />
                            Reset
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse text-sm">
                        <thead className="bg-gray-100 text-left font-semibold">
                            <tr>
                                <th className="p-2">S. No.</th>
                                <th className="p-2">Department/District</th>
                                <th className="p-2">Organization/HODs</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.length > 0 ? (
                                users.data.map((item, i) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-2">{(Number(users.current_page) - 1) * Number(users.per_page) + i + 1}</td>
                                        <td className="p-2">{item.department}</td>
                                        <td className="p-2">{item.organization}</td>
                                        <td className="p-2">{item.name}</td>
                                        <td className="p-2">{item.designation}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-4 text-center" colSpan={4}>
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" disabled={users.current_page === 1} onClick={() => handlePageChange(users.current_page - 1)}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        {Array.from({ length: users.last_page }).map((_, i) => (
                            <Button
                                key={i}
                                size="sm"
                                variant={users.current_page === i + 1 ? 'default' : 'ghost'}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </Button>
                        ))}

                        <Button
                            variant="ghost"
                            disabled={users.current_page === users.last_page}
                            onClick={() => handlePageChange(users.current_page + 1)}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>

                    <div>
                        <label className="mr-2 text-sm font-medium">Rows per page:</label>
                        <select
                            value={per_page}
                            onChange={(e) => {
                                setPerPage(e.target.value);
                                handleFilterChange();
                            }}
                            className="rounded border px-2 py-1 text-sm"
                        >
                            {[10, 20, 30].map((n, i) => (
                                <option key={i} value={n}>
                                    {n}/page
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </FrontendLayout>
    );
}
