import Link from "next/link";
import {
  Code2, TrendingUp, ArrowRight, Zap, CheckCircle,
  ShieldCheck, Star, ChevronRight,
} from "lucide-react";
import { fakeProfiles } from "@/lib/profiles";
import ProfileCard from "@/components/ProfileCard";
import RotatingText from "@/components/RotatingText";

const selectionProcess = [
  "Vérification manuelle de chaque candidature sous 48h",
  "Contrôle des réalisations concrètes et des chiffres clés",
  "Seuls les profils avec preuves solides sont publiés",
];

const techProfiles = fakeProfiles.filter((p) => p.type === "tech").slice(0, 3);
const bizProfiles = fakeProfiles.filter((p) => p.type === "business").slice(0, 3);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-base sm:text-lg">AI Agency Connect</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/profiles"
              className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Explorer les profils
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-700 transition-all text-sm shadow-md shadow-brand-600/25 active:scale-95"
            >
              Rejoindre
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute top-16 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-brand-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-tech-50/50 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge exclusivité */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 flex-shrink-0" />
            Seulement 10% des candidatures sont acceptées
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-5 sm:mb-6">
            Trouve ton partenaire{" "}
            <RotatingText />
            <span className="block mt-1 text-slate-900">
              pour développer ton agence IA
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400 mt-2">
              parmi le top 10% des fondateurs
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto mb-4 leading-relaxed px-2">
            La plateforme exclusive qui connecte les meilleurs fondateurs tech et business
            pour créer les agences IA de demain.
          </p>

          {/* Selection process */}
          <div className="inline-flex flex-col sm:flex-row gap-2 sm:gap-4 mb-10 sm:mb-12 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white border border-slate-100 shadow-sm text-left">
            {selectionProcess.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-600 font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Two main CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <Link
              href="/register?type=tech"
              className="group flex items-center gap-3 sm:gap-4 px-5 sm:px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-br from-tech-500 to-tech-600 text-white shadow-xl shadow-tech-500/30 hover:shadow-tech-500/50 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-left flex-1">
                <div className="text-xs font-medium text-tech-100 mb-0.5">Je suis un fondateur</div>
                <div className="text-base sm:text-lg font-bold">Profil Technique</div>
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
                <div className="text-xs font-medium text-biz-100 mb-0.5">Je suis un fondateur</div>
                <div className="text-base sm:text-lg font-bold">Profil Business</div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm text-slate-400">
              Tu as les deux casquettes ?{" "}
              <Link href="/register?type=both" className="text-brand-600 font-medium underline underline-offset-2 hover:text-brand-700 transition-colors">
                Les deux
              </Link>
            </p>
            <p className="text-xs sm:text-sm text-slate-400">
              Déjà membre ?{" "}
              <Link href="/profiles" className="text-brand-600 font-medium hover:underline">
                Explorer les profils disponibles
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* KPI bar */}
      <section className="py-6 sm:py-8 border-y border-slate-100 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-500 flex-shrink-0" />
              <span className="text-sm sm:text-base font-semibold text-slate-700">
                Nous n'acceptons que <span className="text-brand-600 font-extrabold">10%</span> des candidatures
              </span>
            </div>
            <span className="hidden sm:block text-slate-300">·</span>
            <span className="text-xs sm:text-sm text-slate-500">Chaque profil est vérifié manuellement sous 48h</span>
          </div>
        </div>
      </section>

      {/* Section Profils Techniques */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tech-50 border border-tech-400/30 text-tech-700 text-xs font-bold mb-3">
                <Code2 className="w-3.5 h-3.5" />
                PROFILS TECHNIQUES
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Les meilleurs développeurs IA
              </h2>
              <p className="text-slate-500 text-sm sm:text-base max-w-lg">
                Experts IA gen, automatisation n8n, agents IA et vibe coders sélectionnés sur dossier.
                Ils cherchent un co-fondateur business pour passer à l&apos;échelle.
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

          {/* CTA tech */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-tech-50 to-tech-50/30 border border-tech-400/20 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-tech-500 flex items-center justify-center flex-shrink-0">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm sm:text-base">Tu es un profil Tech ?</div>
                <div className="text-slate-500 text-xs sm:text-sm">Rejoins les meilleurs ingénieurs IA de France.</div>
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

      {/* Séparateur "Processus de sélection" */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-5">
            <ShieldCheck className="w-3.5 h-3.5" />
            PROCESSUS DE SÉLECTION RIGOUREUX
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
            Pourquoi seulement 10% des candidats sont acceptés
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Nous ne voulons pas une plateforme de plus. Chaque profil est vérifié, chaque
            parcours validé. Tu ne rencontreras ici que des fondateurs sérieux, avec des
            réalisations concrètes et une vision claire.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Candidature", desc: "Tu soumets ton profil avec tes réalisations et ta vision." },
              { step: "02", title: "Vérification", desc: "Notre équipe vérifie chaque information sous 48h." },
              { step: "03", title: "Validation", desc: "Seulement les meilleurs profils sont publiés sur la plateforme." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-3xl font-black text-brand-500 mb-2">{s.step}</div>
                <div className="font-bold text-slate-900 mb-1.5">{s.title}</div>
                <div className="text-slate-500 text-xs sm:text-sm leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Profils Business */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
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
                Ex-consultants, directeurs commerciaux et entrepreneurs aguerris.
                Ils ont le réseau et la vision pour scaler une agence IA.
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

          {/* CTA business */}
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

      {/* CTA final */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-600 to-brand-500 p-8 sm:p-12 overflow-hidden shadow-2xl shadow-brand-500/30 text-center">
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-semibold mb-5">
                <CheckCircle className="w-3.5 h-3.5" />
                Candidature gratuite · Réponse sous 48h
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
                Prêt à postuler ?
              </h2>
              <p className="text-brand-100 text-sm sm:text-lg mb-7 max-w-xl mx-auto leading-relaxed">
                Soumets ta candidature. Si ton profil est retenu, tu accèdes
                aux meilleurs co-fondateurs de France.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/register?type=tech"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white text-tech-600 font-bold hover:bg-tech-50 transition-colors shadow-lg text-sm sm:text-base active:scale-95"
                >
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Je suis Tech
                </Link>
                <Link
                  href="/register?type=business"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/15 text-white font-bold hover:bg-white/25 transition-colors border border-white/30 text-sm sm:text-base active:scale-95"
                >
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  Je suis Business
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 sm:px-6 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-slate-700">AI Agency Connect</span>
          </div>
          <span>© 2025 AI Agency Connect — Tous droits réservés</span>
        </div>
      </footer>
    </div>
  );
}
