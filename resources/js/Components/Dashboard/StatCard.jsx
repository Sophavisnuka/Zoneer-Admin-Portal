import { Users } from "lucide-react";

export default function StatCard({
    label = "Total Landlords",
    value = 5,
    Icon = Users,
}) {
    return (
        <div className="w-[260px] rounded-xl bg-white px-5 py-4 shadow-sm">
            <div className="flex items-start justify-between">
                <p className="text-xs font-medium text-gray-500">{label}</p>

                <div className="rounded-md p-1">
                <Icon className="h-5 w-5 text-rose-500" />
                </div>
            </div>

            <div className="mt-2">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
}
