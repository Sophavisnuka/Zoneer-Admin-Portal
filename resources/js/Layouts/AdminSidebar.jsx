import React from "react";
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
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from '@inertiajs/react';
import NavLink from "@/Components/NavLink";

const NAV = [
    {
        label: null,
        items: [
            { key: "dashboard", name: "Dashboard", icon: LayoutGrid, href: route("dashboard"),routeName: "dashboard",}],
    },
    {
        label: "USER MANAGEMENT",
        items: [
            { key: "landlords", name: "Landlords", icon: Users, href: route("landlord"), routeName: "landlord"},
            { key: "tenants", name: "Tenants", icon: User, href: route('tenant'), routeName: "tenant" },
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
        items: [{ key: "settings", name: "Settings", icon: Settings, href: route("profile.edit"), routeName: "profile.edit" }],
    },
];

export default function AdminSidebar() {
    return (
        <aside className="sticky top-0 w-[260px] h-screen bg-white border-r border-gray-200 flex flex-col">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <NavLink href="/"  className="text-lg font-extrabold tracking-tight">
                    <img src="/images/Zoneer-full.png" alt="" className="h-10 w-full"/>
                </NavLink>
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
                        const isActive = item.routeName
                            ? route().current(item.routeName)
                            : false;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
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
                                </Link>
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
