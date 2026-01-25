import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import StatCard from "@/Components/Dashboard/StatCard";
import { Users, User, House, MessageCircle, Timer } from "lucide-react";

function StatusBadge({ status }) {
    const map = {
        new: "bg-blue-50 text-blue-600 border-blue-100",
        resolved: "bg-green-50 text-green-600 border-green-100",
        spam: "bg-red-50 text-red-600 border-red-100",
    };

    const cls = map[status] ?? "bg-gray-50 text-gray-600 border-gray-100";

    return (
        <span
            className={[
                "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                cls,
            ].join(" ")}
            >
            {status}
        </span>
    );
}

export default function Dashboard(props) {
    const stats = [
        { label: "Total Landlords", value: 0, icon: Users },
        { label: "Total Tenants", value: 0, icon: User },
        { label: "Total Properties", value: 0, icon: House },
        { label: "New Inquiries", value: 0, icon: MessageCircle },
        { label: "Pending Verifications", value: 0, icon: Timer},
    ];
    const data = [
        { tenant: "Alice Cooper", property: "Modern Downtown Apartment", status: "new" },
        { tenant: "Bob Martin", property: "Luxury Penthouse Suite", status: "resolved" },
        { tenant: "Carol White", property: "Cozy Studio with View", status: "spam" },
        { tenant: "David Lee", property: "Modern Downtown Apartment", status: "new" },
    ];
    const verificationQueue = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "https://i.pravatar.cc/80?img=32",
    },
    {
        id: 2,
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: null,
    },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="space-y-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                    <div className="flex gap-5">
                        {stats.map((s) => (
                            <StatCard
                                key={s.label}
                                label={s.label}
                                value={s.value}
                                Icon={s.icon}
                            />
                        ))}
                    </div>
                </div>
            }
            >
            <Head title="Dashboard" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-sm sm:rounded-lg flex justify-between gap-5">
                        {/* recent inquiries */}
                        <div className="bg-white rounded-md p-5 flex-1">
                            <h1 className="font-bold">Recent Inquires</h1>
                            <div className="mt-3 overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-t border-b border-gray-100">
                                        <tr className="text-[10px] font-bold tracking-wider text-gray-400">
                                        <th className="px-5 py-2">TENANT</th>
                                        <th className="px-5 py-2">PROPERTY</th>
                                        <th className="px-5 py-2 text-right">STATUS</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.map((r, idx) => (
                                        <tr key={idx} className="border-b border-gray-50 last:border-b-0">
                                            <td className="px-5 py-3 text-sm font-medium text-gray-900">
                                            {r.tenant}
                                            </td>
                                            <td className="px-5 py-3 text-sm text-gray-600">
                                            {r.property}
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                            <StatusBadge status={r.status} />
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* verification queue */}
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex-1">
                            <h1 className="text-sm font-semibold text-gray-900">
                                Verification Queue
                            </h1>

                            <div className="mt-4 space-y-3">
                                {verificationQueue.map((u) => (
                                <div
                                    key={u.id}
                                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50/40 px-3 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                    {/* Avatar */}
                                    {u.avatar ? (
                                        <img
                                        src={u.avatar}
                                        alt={u.name}
                                        className="h-9 w-9 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                                        {u.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .slice(0, 2)
                                            .join("")
                                            .toUpperCase()}
                                        </div>
                                    )}

                                    {/* Name + Email */}
                                    <div className="leading-tight">
                                        <div className="text-sm font-semibold text-gray-900">
                                        {u.name}
                                        </div>
                                        <div className="text-xs text-gray-500">{u.email}</div>
                                    </div>
                                    </div>

                                    {/* Review Button */}
                                    <button
                                    className="rounded-md bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                                    >
                                    Review
                                    </button>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
