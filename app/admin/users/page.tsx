"use client";

import { useEffect, useState } from "react";
import { supabase, SubmittedProfile } from "@/lib/supabase";

export default function AdminUsersPage() {
  const [authenticated] = useState(true);
  const [profiles, setProfiles] = useState<SubmittedProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "tech" | "business">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [todayViews, setTodayViews] = useState<number | null>(null);
  const [sources, setSources] = useState<{ name: string; count: number }[]>([]);

  function parseSource(referrer: string | null): string {
    if (!referrer) return "Direct";
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, "");
      if (host.includes("netlify.app")) return "Direct";
      if (host.includes("google")) return "Google";
      if (host.includes("linkedin")) return "LinkedIn";
      if (host.includes("t.co") || host.includes("twitter") || host.includes("x.com")) return "Twitter / X";
      if (host.includes("facebook") || host.includes("fb.com")) return "Facebook";
      if (host.includes("instagram")) return "Instagram";
      if (host.includes("youtube")) return "YouTube";
      if (host.includes("tiktok")) return "TikTok";
      return host;
    } catch {
      return "Autre";
    }
  }

  useEffect(() => {
    if (!authenticated) return;
    async function fetchProfiles() {
      setLoading(true);
      const { data, error } = await supabase
        .from("submitted_profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setProfiles(data as SubmittedProfile[]);
      setLoading(false);
    }
    async function fetchPageViews() {
      const { count: total } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true });
      setTotalViews(total ?? 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("visited_at", today.toISOString());
      setTodayViews(todayCount ?? 0);

      const { data: refData } = await supabase
        .from("page_views")
        .select("referrer");
      if (refData) {
        const counts: Record<string, number> = {};
        refData.forEach((row: { referrer: string | null }) => {
          const src = parseSource(row.referrer);
          counts[src] = (counts[src] ?? 0) + 1;
        });
        const sorted = Object.entries(counts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);
        setSources(sorted);
      }
    }
    fetchProfiles();
    fetchPageViews();
  }, []);

  const filtered = profiles.filter((p) => {
    const typeOk = filter === "all" || p.type === filter;
    const statusOk = statusFilter === "all" || p.status === statusFilter;
    return typeOk && statusOk;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* Sources de trafic */}
        {sources.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-4">Sources de trafic</p>
            <div className="flex flex-col gap-2">
              {sources.map((s) => {
                const max = sources[0].count;
                const pct = Math.round((s.count / max) * 100);
                return (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-sm text-gray-300 w-32 shrink-0">{s.name}</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-violet-500 h-2 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-8 text-right">{s.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Visites totales</p>
            <p className="text-3xl font-bold text-violet-400">
              {totalViews === null ? "…" : totalViews}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Visites aujourd&apos;hui</p>
            <p className="text-3xl font-bold text-violet-400">
              {todayViews === null ? "…" : todayViews}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Inscrits total</p>
            <p className="text-3xl font-bold text-violet-400">{profiles.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-1">
            <p className="text-xs text-gray-500 uppercase tracking-wider">En attente</p>
            <p className="text-3xl font-bold text-yellow-400">
              {profiles.filter((p) => p.status === "pending").length}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Inscrits{" "}
            <span className="text-violet-400 text-xl font-normal">
              ({filtered.length})
            </span>
          </h1>
          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Tous les types</option>
              <option value="tech">Tech</option>
              <option value="business">Business</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
        </div>

        {loading && (
          <p className="text-gray-400 text-center py-12">Chargement...</p>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-gray-500 text-center py-12">Aucun inscrit trouvé.</p>
        )}

        <div className="flex flex-col gap-5">
          {filtered.map((p, i) => (
            <div
              key={p.id ?? i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">
                      {p.first_name} {p.last_name}
                    </h2>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        p.type === "tech"
                          ? "bg-blue-900 text-blue-300"
                          : "bg-amber-900 text-amber-300"
                      }`}
                    >
                      {p.type === "tech" ? "Tech" : "Business"}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        p.status === "approved"
                          ? "bg-green-900 text-green-300"
                          : p.status === "rejected"
                          ? "bg-red-900 text-red-300"
                          : "bg-yellow-900 text-yellow-300"
                      }`}
                    >
                      {p.status === "approved"
                        ? "Approuvé"
                        : p.status === "rejected"
                        ? "Rejeté"
                        : "En attente"}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    {p.email} · {p.location}
                  </p>
                  {p.created_at && (
                    <p className="text-gray-600 text-xs mt-1">
                      Inscrit le{" "}
                      {new Date(p.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>

              {/* Bio */}
              {p.bio && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bio</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{p.bio}</p>
                </div>
              )}

              {/* Skills */}
              {p.skills && p.skills.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Compétences</p>
                  <div className="flex flex-wrap gap-2">
                    {p.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Business fields */}
              {p.agency_name && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {p.agency_name && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Agence</p>
                      <p className="text-gray-300 text-sm">{p.agency_name}</p>
                    </div>
                  )}
                  {p.agency_stage && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Stade</p>
                      <p className="text-gray-300 text-sm">{p.agency_stage}</p>
                    </div>
                  )}
                  {p.agency_description && (
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Description agence</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{p.agency_description}</p>
                    </div>
                  )}
                  {p.looking_for && (
                    <div className="sm:col-span-2">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Recherche</p>
                      <p className="text-gray-300 text-sm">{p.looking_for}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Links */}
              {(p.linkedin || p.website) && (
                <div className="flex gap-4 pt-1">
                  {p.linkedin && (
                    <a
                      href={p.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 text-sm underline underline-offset-2"
                    >
                      LinkedIn
                    </a>
                  )}
                  {p.website && (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 text-sm underline underline-offset-2"
                    >
                      Site web
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
