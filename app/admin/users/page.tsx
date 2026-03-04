"use client";

import { useEffect, useState } from "react";
import { supabase, SubmittedProfile } from "@/lib/supabase";

const ADMIN_PASSWORD = "admin2024";

export default function AdminUsersPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [profiles, setProfiles] = useState<SubmittedProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "tech" | "business">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [todayViews, setTodayViews] = useState<number | null>(null);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError("");
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `admin_session=1; path=/; expires=${expires.toUTCString()}`;
    } else {
      setError("Mot de passe incorrect");
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
    }
    fetchProfiles();
    fetchPageViews();
  }, [authenticated]);

  const filtered = profiles.filter((p) => {
    const typeOk = filter === "all" || p.type === filter;
    const statusOk = statusFilter === "all" || p.status === statusFilter;
    return typeOk && statusOk;
  });

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
        >
          <h1 className="text-white text-2xl font-bold text-center">Admin</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-3 outline-none border border-gray-700 focus:border-violet-500"
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg py-3 transition-colors"
          >
            Connexion
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

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
