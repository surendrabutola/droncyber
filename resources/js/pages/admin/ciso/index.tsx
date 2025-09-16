import { type BreadcrumbItem } from '@/types';
import axios from 'axios';
import * as React from 'react';

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, Check, ChevronDown, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export type CisoRequest = {
    id: string;
    name?: string;
    email?: string;
    phone?: string;
    designation?: string;
    organization?: string;
    department?: string;
    is_approved?: number;
    created_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'CISO Registrations',
        href: '/admin/ciso-registration',
    },
];

export const columns: ColumnDef<CisoRequest>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'first_name',
        header: 'Name',
        cell: ({ row }) => <div>{row.getValue('first_name')}</div>,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Email <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => <div>{row.getValue('phone')}</div>,
    },
    {
        accessorKey: 'designation',
        header: 'Designation',
        cell: ({ row }) => <div>{row.getValue('designation')}</div>,
    },
    {
        accessorKey: 'organization',
        header: 'Organization',
        cell: ({ row }) => <div>{row.getValue('organization')}</div>,
    },
    {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => <div>{row.getValue('department')}</div>,
    },
    {
        accessorKey: 'is_approved',
        header: 'Status',
        cell: ({ row }) => {
            const value = row.getValue('is_approved');
            let statusText = '';
            if (value === 1) {
                statusText = 'Approved';
            } else if (value === 0) {
                statusText = 'Pending';
            } else {
                statusText = 'Rejected';
            }
            return <div>{statusText}</div>;
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Created At',
        cell: ({ row }) => <div>{new Date(row.getValue('created_at')).toLocaleDateString()}</div>,
    },
    {
        id: 'actions',
        header: 'Action',
        enableHiding: false,
        cell: ({ row }) => {
            const ciso = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleRequest(ciso.id)}>Approve<Check className='text-green-400'/></DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRequest(ciso.id)}>Reject<Trash className='text-red-400' /></DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

interface Props {
    registrations: CisoRequest[];
}

export default function DataTableDemo({ registrations }: Props) {
    const [data, setData] = React.useState<CisoRequest[]>(registrations);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const handleRequest = React.useCallback((id: string, action: 'approve' | 'reject') => {
        axios
            .post(`/admin/ciso-registration/${id}/handle`, { action })
            .then((response) => {
                const updated = response.data.data;
                setData((prev) => prev.map((row) => (row.id === id ? { ...row, ...updated } : row)));
            })
            .catch((error) => {
                console.error('Error handling request:', error);
            });
    }, []);

    const table = useReactTable({
        data,
        columns: columns.map((col) =>
            col.id === 'actions'
                ? {
                      ...col,
                      cell: ({ row }) => {
                          const ciso = row.original;
                          return (
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" className="h-8 w-8 p-0">
                                          <span className="sr-only">Open menu</span>
                                          <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => handleRequest(ciso?.id, 'approve')}><Check className='text-green-400' />Approve</DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleRequest(ciso?.id, 'reject')}><Trash className='text-red-400' />Reject</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                  </DropdownMenuContent>
                              </DropdownMenu>
                          );
                      },
                  }
                : col,
        ),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CISO Registrations" />
            <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter by emails..."
                        value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
                        onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className='font-bold'>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => {
                                    // Get status value for highlighting
                                    const status = row.getValue('is_approved');
                                    let rowClass = '';
                                    if (status === 0 || status === '0') {
                                        rowClass = 'bg-yellow-100'; // Pending: yellow
                                    } else if (status === 1) {
                                        rowClass = 'bg-green-100'; // Approved: green
                                    } else if (status !== 1 && status !== '1') {
                                        rowClass = 'bg-red-100'; // Rejected: red
                                    }
                                    return (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className={rowClass}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                            Previous
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
