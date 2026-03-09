import { router } from '@inertiajs/react';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function RefreshButton({ only = [] }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        router.reload({
            only: only.length ? only : undefined,
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsRefreshing(false),
        });
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50 transition"
            title="Refresh data"
        >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
        </button>
    );
}
