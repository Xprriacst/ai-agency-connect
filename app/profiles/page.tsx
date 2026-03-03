"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2, TrendingUp, Search, Filter, ArrowLeft, Zap,
  Lock, ShieldCheck,
} from "lucide-react";
import { fakeProfiles, ProfileType } from "@/lib/profiles";
import ProfileCard from "@/components/ProfileCard";
import { cn } from "@/lib/utils";

export default function ProfilesPage() {
  const [filter, setFilter] = useState<ProfileType | "all">("all");
  const [search, setSearch] = useState("");

  // Simulates auth state — replace with real session check once Supabase auth is wired
  const isUnlocked = false;

  const filtered = fakeProfiles.filter((p) => {
    const matchType = filter === "all" || p.type === filter;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      (p.agencyName?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      p.bio.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">AI Agency Connect</span>
          </Link>
          <Link href="/register" className="btn-primary text-sm px-4 py-2">
            Créer mon profil
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Explorer les profils
              </h1>
              <p className="text-slate-500">
                {fakeProfiles.length} fondateurs sélectionnés — top 1%
              </p>
            </div>

            {/* Locked banner */}
            {!isUnlocked && (
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
                <Lock className="w-4 h-4 flex-shrink-0" />
                Accès réservé aux profils validés
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, compétence..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
                disabled={!isUnlocked}
              />
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl self-start">
              {(["all", "tech", "business"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  disabled={!isUnlocked}
                  className={cn(
                    "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all disabled:cursor-not-allowed",
                    filter === f && f === "all" && "bg-white text-slate-900 shadow-sm",
                    filter === f && f === "tech" && "bg-tech-500 text-white shadow-sm",
                    filter === f && f === "business" && "bg-biz-500 text-white shadow-sm",
                    filter !== f && "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {f === "all" && <><Filter className="w-3.5 h-3.5" />Tous ({fakeProfiles.length})</>}
                  {f === "tech" && <><Code2 className="w-3.5 h-3.5" />Tech ({fakeProfiles.filter((p) => p.type === "tech").length})</>}
                  {f === "business" && <><TrendingUp className="w-3.5 h-3.5" />Business ({fakeProfiles.filter((p) => p.type === "business").length})</>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="relative">
          {/* Blurred grid */}
          <div
            className={cn(
              "grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300",
              !isUnlocked && "blur-sm pointer-events-none select-none"
            )}
          >
            {filtered.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>

          {/* Lock overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-100 p-8 sm:p-10 max-w-md w-full mx-4 text-center">
                <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-500/30">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2">
                  Accès membres uniquement
                </h2>
                <p className="text-slate-500 text-sm sm:text-base mb-6 leading-relaxed">
                  Les profils sont visibles uniquement aux fondateurs dont la candidature a été <span className="font-semibold text-slate-700">validée par notre équipe</span>.
                </p>

                <div className="flex flex-col gap-3 mb-6">
                  {[
                    "Soumet ta candidature gratuitement",
                    "Notre équipe vérifie ton profil sous 48h",
                    "Accès immédiat à tous les profils une fois validé",
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-left">
                      <div className="w-6 h-6 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                      </div>
                      <span className="text-sm text-slate-600">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/register?type=tech"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-tech-500 hover:bg-tech-600 text-white font-bold text-sm transition-colors shadow-md shadow-tech-500/25"
                  >
                    <Code2 className="w-4 h-4" /> Je suis Tech
                  </Link>
                  <Link
                    href="/register?type=business"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-biz-500 hover:bg-biz-600 text-white font-bold text-sm transition-colors shadow-md shadow-biz-500/25"
                  >
                    <TrendingUp className="w-4 h-4" /> Je suis Business
                  </Link>
                </div>

                <p className="text-xs text-slate-400 mt-4">
                  Candidature gratuite · Réponse sous 48h
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
