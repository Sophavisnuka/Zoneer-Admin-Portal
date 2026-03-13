import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'
import { Head, Link, usePage, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import RefreshButton from '@/Components/RefreshButton';

const Property = () => {
    const { property, filters } = usePage().props; 
    const activeStatus = filters?.status ?? null;
    const rows = property?.data ?? [];
    return (
        <AuthenticatedLayout>
            <Head title="Properties" />
            <div className='p-6'>
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">Properties</h1>
                        <RefreshButton only={['property']} />
                    </div>
                    <div className="text-sm text-gray-500">
                        {property?.total ?? property?.data?.length ?? 0} total
                    </div>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        {[
                            { label: "All", value: null },
                            { label: "Pending", value: 'pending' },
                            { label: "Verified", value: 'verified' },
                        ].map((tab) => (
                            <button
                                key={tab.value ?? 'all'}
                                onClick={() => router.get(route('property'), tab.value ? { status: tab.value } : {}, { preserveScroll: true })}
                                className={`border px-5 py-2 rounded-md ${
                                activeStatus === tab.value ? 'bg-red-700 text-white' : 'bg-white text-black'
                            }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className='border px-5 py-2 bg-red-700 rounded-md text-white'>
                        <Link
                        href={route("property.create")}
                        >
                            Create Property
                        </Link>
                    </div>
                </div>
                <div className='mt-5 overflow-hidden rounded-xl border bg-white'>
                    <table className='w-full text-sm'>
                        <thead className='bg-gray-50 text-left'>
                            <tr>
                                <th className='px-4 py-3'>Address</th>
                                <th className='px-4 py-3'>Price</th>
                                <th className='px-4 py-3'>Status</th>
                                <th className='px-4 py-3'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="px-4 py-3 font-medium">{u.address}</td>
                                    <td className="px-4 py-3">{u.price}</td>
                                    <td className="px-4 py-3">{u.property_status}</td>
                                    <td className="px-4 py-3">
                                        <Link href={route('property.edit', u.id)}>
                                            <PrimaryButton>Edit</PrimaryButton>
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {!rows.length && (
                                <tr>
                                    <td colSpan={4} className="py-10">
                                        <div className="flex items-center justify-center text-gray-500">
                                            No landlords found.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                 {/* Pagination (simple) */}
                {property?.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {property.links.map((l, idx) => (
                            <Link
                                key={idx}
                                href={l.url ?? ""}
                                preserveScroll
                                className={["rounded-lg border px-3 py-1 text-sm", l.active ? "bg-gray-900 text-white" : "bg-white text-gray-700",!l.url ? "pointer-events-none opacity-50" : "",].join(" ")}
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </AuthenticatedLayout>
    )
}

export default Property