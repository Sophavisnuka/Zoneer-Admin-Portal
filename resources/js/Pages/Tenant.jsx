import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link, router } from "@inertiajs/react";
import { useEffect } from "react";

export default function Tenant() {
    const { tenants } = usePage().props; // plural
    const rows = tenants?.data ?? [];
    const refreshStats = () => {
        router.reload({
            only: ["tenants"],
            preserveScroll: true,
            preserveStat: true,
        });
    };
    useEffect(() => {
        const interval = setInterval(refreshStats, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Tenants" />

            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold">Tenants</h1>
                    <div className="text-sm text-gray-500">
                        {/* {Tenants?.total ?? Tenants?.data?.length ?? 0} total */}
                        0 total
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl border bg-white">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="px-4 py-3">Full name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone Number</th>
                                <th className="px-4 py-3">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((u) => (
                                <tr key={u.id} className="border-t">
                                    <td className="px-4 py-3 font-medium">{u.fullname}</td>
                                    <td className="px-4 py-3">{u.email}</td>
                                    <td className="px-4 py-3">{u.phone_number}</td>
                                    <td className="px-4 py-3">
                                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : "-"}
                                    </td>
                                </tr>
                            ))}
                            {rows.length == 0 && (
                                <tr>
                                    <td colSpan={4} className="py-10">
                                        <div className="flex items-center justify-center text-gray-500">
                                            No Tenants found.
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {/* {!rows.length && (
                            )} */}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (simple) */}
                {tenants?.links?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                    {tenants.links.map((l, idx) => (
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
