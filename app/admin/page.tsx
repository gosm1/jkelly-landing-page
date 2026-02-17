"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Shield,
    Users,
    Flame,
    Sun,
    Snowflake,
    Mail,
    Globe,
    DollarSign,
    Calendar,
    Search,
    RefreshCw,
    X,
    ArrowRight,
    BarChart3,
    TrendingUp,
    Phone,
    LogOut,
    Lock,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
interface Lead {
    _id: string;
    name: string;
    email: string;
    niche?: string;
    message?: string;
    goals?: string[];
    audience?: string;
    existingSite?: string;
    investmentAmount?: number;
    references?: string;
    brandTone?: string;
    contentAck?: boolean;
    contactMethod?: string;
    score: number;
    status: "Hot" | "Warm" | "Cold" | "Unscored";
    analysis: string;
    createdAt: string;
}

/* ─── Helpers ─── */
const getStatusColor = (status: string) => {
    switch (status) {
        case "Hot":
            return "bg-red-500/15 text-red-400 border-red-500/25";
        case "Warm":
            return "bg-orange-500/15 text-orange-400 border-orange-500/25";
        case "Cold":
            return "bg-blue-500/15 text-blue-400 border-blue-500/25";
        default:
            return "bg-gray-500/15 text-gray-400 border-gray-500/25";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "Hot":
            return <Flame className="w-3.5 h-3.5" />;
        case "Warm":
            return <Sun className="w-3.5 h-3.5" />;
        case "Cold":
            return <Snowflake className="w-3.5 h-3.5" />;
        default:
            return <BarChart3 className="w-3.5 h-3.5" />;
    }
};

const getScoreColor = (score: number) => {
    if (score >= 4) return "bg-red-400";
    if (score === 3) return "bg-orange-400";
    return "bg-blue-400";
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

/* ─── Main ─── */
export default function AdminDashboard() {
    const [authenticated, setAuthenticated] = useState(false);
    const [secretKey, setSecretKey] = useState("");
    const [authError, setAuthError] = useState("");
    const [authLoading, setAuthLoading] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);

    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    /* ─── Auth ─── */
    const handleAuth = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setAuthLoading(true);
        setAuthError("");
        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secretKey }),
            });
            const data = await res.json();
            if (data.authenticated) {
                setAuthenticated(true);
                sessionStorage.setItem("admin_key", secretKey);
            } else {
                setAuthError("Invalid secret key");
            }
        } catch {
            setAuthError("Connection error");
        }
        setAuthLoading(false);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_key");
        setAuthenticated(false);
        setSecretKey("");
        setLeads([]);
        setSelectedLead(null);
    };

    /* ─── Fetch leads ─── */
    const fetchLeads = useCallback(async (key: string) => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ secretKey: key }),
            });
            const data = await res.json();
            if (data.leads) setLeads(data.leads);
        } catch (err) {
            console.error("Failed to fetch leads:", err);
        }
        setLoading(false);
    }, []);

    /* ─── Auto-auth from session ─── */
    useEffect(() => {
        const saved = sessionStorage.getItem("admin_key");
        if (saved) {
            setSecretKey(saved);
            setAuthenticated(true);
        }
        setCheckingSession(false);
    }, []);

    useEffect(() => {
        if (authenticated) {
            const key = sessionStorage.getItem("admin_key") || secretKey;
            fetchLeads(key);
        }
    }, [authenticated, secretKey, fetchLeads]);

    /* ─── Filtered leads ─── */
    const filteredLeads = leads.filter((lead) => {
        const matchesFilter = filter === "All" || lead.status === filter;
        const matchesSearch =
            searchQuery === "" ||
            lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (lead.niche && lead.niche.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    /* ─── Stats ─── */
    const stats = {
        total: leads.length,
        hot: leads.filter((l) => l.status === "Hot").length,
        warm: leads.filter((l) => l.status === "Warm").length,
        cold: leads.filter((l) => l.status === "Cold").length,
        avgScore: leads.length > 0
            ? (leads.reduce((a, l) => a + l.score, 0) / leads.length).toFixed(1)
            : "0",
        totalRevenue: leads.reduce((a, l) => a + (l.investmentAmount || 0), 0),
    };

    /* ─── Loading ─── */
    if (checkingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <RefreshCw className="w-6 h-6 animate-spin text-[#027DD5]" />
            </div>
        );
    }

    /* ─── Auth Screen ─── */
    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
                {/* Ambient background glows */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#027DD5]/8 via-transparent to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] bg-[#027DD5]/10 rounded-b-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[30vw] h-[30vh] bg-[#027DD5]/5 rounded-full blur-[80px]" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 w-full max-w-md"
                >
                    {/* Badge */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-[#027DD5] text-xs font-medium mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            Admin Portal
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Lead <span className="text-gray-500">CRM</span>
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Enter your secret key to access the dashboard
                        </p>
                    </div>

                    {/* Glassmorphic form card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/20">
                        <form onSubmit={handleAuth} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                                    Secret Key
                                </label>
                                <div className="relative">
                                    <Lock className={cn(
                                        "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors",
                                        authError ? "text-red-400" : "text-white/30"
                                    )} />
                                    <input
                                        type="password"
                                        placeholder="Enter your secret key..."
                                        value={secretKey}
                                        onChange={(e) => { setSecretKey(e.target.value); setAuthError(""); }}
                                        className={cn(
                                            "flex h-12 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/25 transition-all duration-300 outline-none focus:border-[#027DD5]/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(2,125,213,0.1)]",
                                            authError && "border-red-500/50"
                                        )}
                                    />
                                </div>
                                {authError && (
                                    <p className="text-red-400 text-[11px] mt-1.5 pl-1">{authError}</p>
                                )}
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={authLoading || !secretKey}
                                className="relative group w-full"
                            >
                                <div className="absolute inset-0 bg-[#027DD5]/25 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative px-6 py-3 bg-[#027DD5] text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-[#027DD5]/90 transition-colors disabled:opacity-50">
                                    {authLoading ? (
                                        <div className="w-4 h-4 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Access Dashboard
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </div>
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    /* ─── Dashboard ─── */
    return (
        <div className="min-h-screen text-white relative">
            {/* Ambient background glows for the dashboard */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-1/4 w-[50vw] h-[30vh] bg-[#027DD5]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[40vw] h-[25vh] bg-[#027DD5]/3 rounded-full blur-[100px]" />
            </div>

            {/* Glassmorphic header */}
            <header className="sticky top-0 z-40 border-b border-white/8 bg-white/5 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#027DD5]/10 backdrop-blur-sm border border-[#027DD5]/25 rounded-xl">
                            <Users className="w-5 h-5 text-[#027DD5]" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold">Lead CRM</h1>
                            <p className="text-xs text-gray-500">{stats.total} total leads</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => fetchLeads(sessionStorage.getItem("admin_key") || secretKey)}
                            disabled={loading}
                            className="p-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-[#027DD5]/30 transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Glassmorphic Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
                    <GlassStatCard label="Total Leads" value={stats.total} icon={Users} color="text-[#027DD5]" />
                    <GlassStatCard label="Hot" value={stats.hot} icon={Flame} color="text-red-400" />
                    <GlassStatCard label="Warm" value={stats.warm} icon={Sun} color="text-orange-400" />
                    <GlassStatCard label="Cold" value={stats.cold} icon={Snowflake} color="text-blue-400" />
                    <GlassStatCard label="Avg Score" value={stats.avgScore} icon={TrendingUp} color="text-emerald-400" />
                    <GlassStatCard label="Pipeline" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} color="text-green-400" />
                </div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, or niche..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:border-[#027DD5]/50 focus:bg-white/8 focus:shadow-[0_0_20px_rgba(2,125,213,0.08)] focus:outline-none transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(["All", "Hot", "Warm", "Cold", "Unscored"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 backdrop-blur-sm border rounded-xl text-xs font-medium transition-all",
                                    filter === f
                                        ? "border-[#027DD5]/40 bg-[#027DD5]/15 text-[#027DD5] shadow-[0_0_15px_rgba(2,125,213,0.1)]"
                                        : "border-white/10 bg-white/5 text-gray-400 hover:bg-white/8 hover:border-white/20"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Glassmorphic Leads Table */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
                    {loading ? (
                        <div className="p-16 text-center text-gray-500">
                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3" />
                            Loading leads...
                        </div>
                    ) : filteredLeads.length === 0 ? (
                        <div className="p-16 text-center text-gray-500">
                            <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
                            No leads found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/3 border-b border-white/8">
                                    <tr>
                                        <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-medium uppercase tracking-wider">Lead</th>
                                        <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-medium uppercase tracking-wider">Niche</th>
                                        <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-medium uppercase tracking-wider">Budget</th>
                                        <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-medium uppercase tracking-wider">Status</th>
                                        <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-medium uppercase tracking-wider">Score</th>
                                        <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-medium uppercase tracking-wider">AI Analysis</th>
                                        <th className="text-left px-5 py-3.5 text-xs text-gray-500 font-medium uppercase tracking-wider">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.map((lead, i) => (
                                        <motion.tr
                                            key={lead._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.02 }}
                                            onClick={() => setSelectedLead(lead)}
                                            className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-all duration-200"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="text-white text-sm font-medium">{lead.name}</p>
                                                <div className="flex items-center gap-1 mt-0.5 text-gray-500 text-xs">
                                                    <Mail className="w-3 h-3" />
                                                    {lead.email}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-gray-400 text-sm">{lead.niche || "—"}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-emerald-400 text-sm font-medium">
                                                    {lead.investmentAmount ? `$${lead.investmentAmount.toLocaleString()}` : "—"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={cn(
                                                    "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-lg backdrop-blur-sm",
                                                    getStatusColor(lead.status)
                                                )}>
                                                    {getStatusIcon(lead.status)}
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((dot) => (
                                                        <div
                                                            key={dot}
                                                            className={cn(
                                                                "w-2 h-2 rounded-full transition-colors",
                                                                dot <= lead.score ? getScoreColor(lead.score) : "bg-white/10"
                                                            )}
                                                        />
                                                    ))}
                                                    <span className="ml-1.5 text-sm text-gray-400">{lead.score}/5</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 max-w-[200px]">
                                                <p className="text-gray-500 text-xs truncate leading-relaxed">
                                                    {lead.analysis || "Pending..."}
                                                </p>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>

            {/* Lead Detail Modal */}
            <AnimatePresence>
                {selectedLead && (
                    <LeadModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Glassmorphic Stat Card ─── */
function GlassStatCard({
    label,
    value,
    icon: Icon,
    color,
}: {
    label: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}) {
    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/8 hover:border-white/15 transition-all duration-300 group">
            <div className="flex items-center gap-2 mb-2">
                <Icon className={cn("w-4 h-4 transition-transform group-hover:scale-110", color)} />
                <span className="text-xs text-gray-500">{label}</span>
            </div>
            <p className="text-white text-2xl font-bold">{value}</p>
        </div>
    );
}

/* ─── Lead Detail Modal ─── */
function LeadModal({ lead, onClose }: { lead: Lead; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/30"
            >
                {/* Header */}
                <div className="sticky top-0 z-10 px-6 py-5 border-b border-white/8 bg-white/5 backdrop-blur-xl flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white">{lead.name}</h2>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg backdrop-blur-sm",
                            getStatusColor(lead.status)
                        )}>
                            {getStatusIcon(lead.status)}
                            {lead.status} Lead
                        </span>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((dot) => (
                                <div
                                    key={dot}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full",
                                        dot <= lead.score ? getScoreColor(lead.score) : "bg-white/10"
                                    )}
                                />
                            ))}
                            <span className="ml-1.5 text-[#027DD5] font-bold text-sm">{lead.score}/5</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    {/* AI Analysis */}
                    {lead.analysis && (
                        <div className="bg-[#027DD5]/10 backdrop-blur-sm border border-[#027DD5]/25 rounded-xl p-4">
                            <p className="text-xs text-[#027DD5] font-medium mb-2 uppercase tracking-wider">AI Analysis</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{lead.analysis}</p>
                        </div>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <GlassInfoCard icon={Mail} label="Email" value={lead.email} />
                        <GlassInfoCard icon={Globe} label="Niche" value={lead.niche} />
                        <GlassInfoCard icon={DollarSign} label="Budget" value={lead.investmentAmount ? `$${lead.investmentAmount.toLocaleString()}` : undefined} />
                        <GlassInfoCard icon={Phone} label="Contact Method" value={lead.contactMethod} />
                        <GlassInfoCard icon={Calendar} label="Submitted" value={formatDate(lead.createdAt)} />
                        <GlassInfoCard icon={Globe} label="Existing Site" value={lead.existingSite} />
                    </div>

                    {/* Goals */}
                    {lead.goals && lead.goals.length > 0 && (
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Goals</p>
                            <div className="flex flex-wrap gap-2">
                                {lead.goals.map((goal) => (
                                    <span key={goal} className="px-3 py-1.5 bg-[#027DD5]/10 backdrop-blur-sm border border-[#027DD5]/20 rounded-lg text-xs text-[#027DD5]">
                                        {goal}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Text blocks */}
                    {lead.audience && <GlassTextBlock label="Target Audience" value={lead.audience} />}
                    {lead.message && <GlassTextBlock label="Project Description" value={lead.message} />}
                    {lead.references && <GlassTextBlock label="Reference Websites" value={lead.references} />}
                    {lead.brandTone && <GlassTextBlock label="Brand Tone" value={lead.brandTone} />}
                </div>
            </motion.div>
        </motion.div>
    );
}

function GlassInfoCard({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value?: string;
}) {
    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/8 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-gray-500 text-xs">{label}</span>
            </div>
            <p className="text-white text-sm font-medium truncate">{value || "—"}</p>
        </div>
    );
}

function GlassTextBlock({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1.5">{label}</p>
            <div className="bg-white/5 backdrop-blur-sm border border-white/8 rounded-xl p-3">
                <p className="text-gray-300 text-sm leading-relaxed">{value}</p>
            </div>
        </div>
    );
}
