import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { GlassCard } from "./ui/glass-card";

export default function AccountState() {
    const { accessToken } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!accessToken) return;

        const fetchStats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user-summary`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user summary");
                }

                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching user summary:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [accessToken]);

    return (
        <GlassCard className="p-6">
            <div className="space-y-6">
                <h2 className="text-xl font-semibold">Account Activity</h2>

                {loading || !data ? (
                    <div className="text-muted-foreground">Loading...</div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <StatCard label="Songs Shared" value={data.songs_shared} />
                        <StatCard label="Connections" value={data.connections} />
                        <StatCard label="Countries" value={data.countries} />
                        <StatCard label="Days Active" value={data.days_active} />
                    </div>
                )}
            </div>
        </GlassCard>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="p-4 rounded-lg bg-muted/20">
            <div className="text-2xl font-bold text-primary">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </div>
    );
}
