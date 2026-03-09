import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import RefreshButton from "@/Components/RefreshButton";

export default function Landlord() {
    const { landlords } = usePage().props; // plural
    const rows = landlords?.data ?? [];

    return (
        <AuthenticatedLayout>
            <Head title="Landlords" />

            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">Landlords</h1>
                        <RefreshButton only={['landlords']} />
                    </div>
                    <div className="text-sm text-gray-500">
                        {landlords?.total ?? landlords?.data?.length ?? 0} total
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border bg-white">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="px-4 py-3">Full name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone Number</th>
                                <th className="px-4 py-3">Verification</th>
                                <th className="px-4 py-3">Joined</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="px-4 py-3 font-medium">{u.fullname}</td>
                                    <td className="px-4 py-3">{u.email}</td>
                                    <td className="px-4 py-3">{u.phone_number}</td>
                                    <td className="px-4 py-3">{u.verify_status}</td>
                                    <td className="px-4 py-3">
                                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : "-"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <PrimaryButton>Edit</PrimaryButton>
                                    </td>
                                </tr>
                            ))}

                            {!rows.length && (
                                <tr>
                                    <td colSpan={5} className="py-10">
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
                {landlords?.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {landlords.links.map((l, idx) => (
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
    );
}
