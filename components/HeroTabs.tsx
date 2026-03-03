"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2, TrendingUp, ArrowRight, ShieldCheck, Star,
  Users, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Profile } from "@/lib/profiles";
import ProfileCard from "@/components/ProfileCard";

const selectionProcess = [
  "Vérification manuelle sous 48h",
  "Réalisations concrètes exigées",
  "Seuls les meilleurs profils publiés",
];

interface HeroTabsProps {
  techProfiles: Profile[];
  bizProfiles: Profile[];
}

export default function HeroTabs({ techProfiles, bizProfiles }: HeroTabsProps) {
  const [tab, setTab] = useState<"cherche" | "porte">("cherche");

  return (
    <>
      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute top-16 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-brand-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-tech-50/50 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />
            Seulement 10% des candidatures sont acceptées
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-5 sm:mb-6">
            Trouve ton associé pour{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400">
              lancer ton agence IA
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed px-2">
            La plateforme exclusive qui connecte les meilleurs fondateurs tech et business
            parmi le top 10% des candidats.
          </p>

          {/* Tabs switcher */}
          <div className="inline-flex items-center bg-slate-100 rounded-2xl p-1.5 mb-10 gap-1">
            <button
              onClick={() => setTab("cherche")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                tab === "cherche"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Users className="w-4 h-4" />
              Je cherche un projet
            </button>
            <button
              onClick={() => setTab("porte")}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
                tab === "porte"
                  ? "bg-white text-slate-900 shadow-md"
                  : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Zap className="w-4 h-4" />
              Je porte un projet
            </button>
          </div>

          {/* Tab CTAs */}
          {tab === "cherche" ? (
            <div>
              <p className="text-slate-500 text-sm mb-6">
                Tu as les compétences — explore les fondateurs qui cherchent un associé.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                <Link
                  href="/profiles?type=tech"
                  className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-br from-tech-500 to-tech-600 text-white shadow-xl shadow-tech-500/30 hover:shadow-tech-500/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs font-medium text-tech-100 mb-0.5">Je cherche un associé</div>
                    <div className="text-base sm:text-lg font-bold">Voir les profils Tech</div>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>

                <Link
                  href="/profiles?type=business"
                  className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-br from-biz-500 to-biz-600 text-white shadow-xl shadow-biz-500/30 hover:shadow-biz-500/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs font-medium text-biz-100 mb-0.5">Je cherche un associé</div>
                    <div className="text-base sm:text-lg font-bold">Voir les profils Business</div>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-slate-500 text-sm mb-6">
                Tu as un projet — soumets ton profil et trouve ton associé idéal parmi le top 10%.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
                <Link
                  href="/register?type=tech"
                  className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-br from-tech-500 to-tech-600 text-white shadow-xl shadow-tech-500/30 hover:shadow-tech-500/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs font-medium text-tech-100 mb-0.5">Je porte un projet</div>
                    <div className="text-base sm:text-lg font-bold">Candidater — Profil Tech</div>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>

                <Link
                  href="/register?type=business"
                  className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-br from-biz-500 to-biz-600 text-white shadow-xl shadow-biz-500/30 hover:shadow-biz-500/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-xs font-medium text-biz-100 mb-0.5">Je porte un projet</div>
                    <div className="text-base sm:text-lg font-bold">Candidater — Profil Business</div>
                  </div>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              </div>
            </div>
          )}

          {/* Garanties */}
          <div className="inline-flex flex-col sm:flex-row gap-2 sm:gap-4 mt-8 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
            {selectionProcess.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-600 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profils selon onglet */}
      {tab === "cherche" ? (
        <>
          {/* Section Profils Techniques */}
          <section className="py-14 sm:py-20 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tech-50 border border-tech-400/30 text-tech-700 text-xs font-bold mb-3">
                    <Code2 className="w-3.5 h-3.5" />
                    PROFILS TECHNIQUES
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                    Les meilleurs experts IA
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base max-w-lg">
                    IA générative, agents IA, automatisation n8n, vibe coders — ils cherchent un co-fondateur business.
                  </p>
                </div>
                <Link
                  href="/profiles?type=tech"
                  className="flex-shrink-0 inline-flex items-center gap-2 text-tech-600 font-semibold text-sm hover:gap-3 transition-all"
                >
                  Voir tous les profils tech <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {techProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
              <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-tech-50 to-tech-50/30 border border-tech-400/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tech-500 flex items-center justify-center flex-shrink-0">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">Tu es un profil Tech ?</div>
                    <div className="text-slate-500 text-xs sm:text-sm">Rejoins les meilleurs développeurs IA de France.</div>
                  </div>
                </div>
                <Link
                  href="/register?type=tech"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-tech-500 hover:bg-tech-600 text-white font-bold text-sm transition-colors shadow-md shadow-tech-500/25 active:scale-95 w-full sm:w-auto justify-center"
                >
                  Candidater — Profil Tech <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Section Profils Business */}
          <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-biz-50 border border-biz-400/30 text-biz-700 text-xs font-bold mb-3">
                    <TrendingUp className="w-3.5 h-3.5" />
                    PROFILS BUSINESS
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                    Les meilleurs commerciaux & entrepreneurs
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base max-w-lg">
                    SMMA, cold callers, closers B2B — ils cherchent un co-fondateur tech.
                  </p>
                </div>
                <Link
                  href="/profiles?type=business"
                  className="flex-shrink-0 inline-flex items-center gap-2 text-biz-600 font-semibold text-sm hover:gap-3 transition-all"
                >
                  Voir tous les profils business <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {bizProfiles.map((profile) => (
                  <ProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
              <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-biz-50 to-biz-50/30 border border-biz-400/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-biz-500 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">Tu es un profil Business ?</div>
                    <div className="text-slate-500 text-xs sm:text-sm">Rejoins les meilleurs entrepreneurs et commerciaux IA.</div>
                  </div>
                </div>
                <Link
                  href="/register?type=business"
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-biz-500 hover:bg-biz-600 text-white font-bold text-sm transition-colors shadow-md shadow-biz-500/25 active:scale-95 w-full sm:w-auto justify-center"
                >
                  Candidater — Profil Business <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Onglet "Je porte un projet" — comment ça marche + CTA inscription */
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Comment ça marche ?
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
                3 étapes pour soumettre ton projet et accéder aux meilleurs co-fondateurs de France.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              {[
                {
                  step: "01",
                  title: "Soumets ton profil",
                  desc: "Décris ton projet, tes réalisations chiffrées et ce que tu cherches chez un associé.",
                  icon: <Zap className="w-6 h-6 text-brand-500" />,
                },
                {
                  step: "02",
                  title: "Validation sous 48h",
                  desc: "Notre équipe vérifie chaque profil manuellement. Seuls les meilleurs sont publiés.",
                  icon: <ShieldCheck className="w-6 h-6 text-brand-500" />,
                },
                {
                  step: "03",
                  title: "Rencontre ton associé",
                  desc: "Accède aux profils compatibles et lance les échanges directement.",
                  icon: <Users className="w-6 h-6 text-brand-500" />,
                },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
                    {s.icon}
                  </div>
                  <div className="text-3xl font-black text-brand-500 mb-1">{s.step}</div>
                  <div className="font-bold text-slate-900 mb-2">{s.title}</div>
                  <div className="text-slate-500 text-sm leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register?type=tech"
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-br from-tech-500 to-tech-600 text-white shadow-xl shadow-tech-500/30 hover:-translate-y-0.5 transition-all font-bold"
              >
                <Code2 className="w-5 h-5" />
                Candidater — Profil Tech
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
              </Link>
              <Link
                href="/register?type=business"
                className="group flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-br from-biz-500 to-biz-600 text-white shadow-xl shadow-biz-500/30 hover:-translate-y-0.5 transition-all font-bold"
              >
                <TrendingUp className="w-5 h-5" />
                Candidater — Profil Business
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
