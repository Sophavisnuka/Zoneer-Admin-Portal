import React from "react";
import NavLink from '@/Components/NavLink';
import {
    LayoutGrid,
    Users,
    User,
    Eye,
    Home,
    Star,
    HelpCircle,
    BadgeCheck,
    Bell,
    Settings,
} from "lucide-react";

const NAV = [
    {
        label: null,
        items: [{ key: "dashboard", name: "Dashboard", icon: LayoutGrid }],
    },
    {
        label: "USER MANAGEMENT",
        items: [
        { key: "landlords", name: "Landlords", icon: Users },
        { key: "tenants", name: "Tenants", icon: User },
        { key: "visitors", name: "Visitors", icon: Eye },
        ],
    },
    {
        label: "PROPERTY MANAGEMENT",
        items: [
        { key: "properties", name: "Properties", icon: Home },
        { key: "amenities", name: "Amenities", icon: Star },
        ],
    },
    {
        label: "OPERATIONS",
        items: [
        { key: "inquiries", name: "Inquiries", icon: HelpCircle },
        { key: "verifications", name: "Verifications", icon: BadgeCheck },
        { key: "notifications", name: "Notifications", icon: Bell },
        ],
    },
    {
        label: "SYSTEM",
        items: [{ key: "settings", name: "Settings", icon: Settings }],
    },
];

export default function AdminSidebar({
    activeKey = "dashboard",
    onNavigate,
}) {
    return (
        <aside className="w-[260px] h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <div className="text-lg font-extrabold tracking-tight">
                    <img src="/images/Zoneer-full.png" alt="" className="h-10 w-full"/>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
                {NAV.map((group, idx) => (
                <div key={idx} className={idx === 0 ? "" : "mt-5"}>
                    {group.label && (
                    <div className="px-3 mb-2 text-[10px] font-bold tracking-wider text-gray-400">
                        {group.label}
                    </div>
                    )}

                    <div className="space-y-1">
                    {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeKey === item.key;

                        return (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => onNavigate?.(item.key)}
                                className={[
                                    "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                                    isActive
                                        ? "bg-red-50 text-red-600"
                                        : "text-gray-700 hover:bg-gray-50",
                                    ].join(" ")}
                            >
                                <Icon
                                className={[
                                    "h-4 w-4",
                                    isActive ? "text-red-500" : "text-gray-500",
                                ].join(" ")}
                                />
                                    <span className={isActive ? "font-semibold" : "font-medium"}>
                                        {item.name}
                                    </span>
                            </button>
                        );
                    })}
                    </div>
                </div>
                ))}
            </nav>

            {/* Bottom space (optional) */}
            <div className="h-6" />
        </aside>
    );
}
