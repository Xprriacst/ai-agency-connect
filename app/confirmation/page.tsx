"use client";

import Link from "next/link";
import { CheckCircle, Clock, Mail, Zap, Sparkles } from "lucide-react";

const nextSteps = [
  {
    icon: Clock,
    title: "Validation sous 48h",
    description: "Notre équipe vérifie chaque profil manuellement pour garantir la qualité de la communauté.",
  },
  {
    icon: Mail,
    title: "Email de confirmation",
    description: "Tu recevras un email dès que ton profil sera validé et visible par les autres fondateurs.",
  },
  {
    icon: Zap,
    title: "Mise en relation",
    description: "Une fois validé, tu pourras contacter les profils qui t'intéressent directement.",
  },
];

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg">AI Agency Connect</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center animate-slide-up">
          {/* Success icon */}
          <div className="relative inline-flex mb-8">
            <div className="w-24 h-24 rounded-3xl gradient-brand flex items-center justify-center shadow-2xl shadow-brand-500/40">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-tech-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Profil soumis avec succès !
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto mb-12">
            Ton profil est en cours de validation par notre équipe.
            Tu recevras un email dans les <span className="font-semibold text-slate-700">48 prochaines heures</span>.
          </p>
        </div>

        {/* Status badge */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-semibold">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Profil en cours de validation
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
            <h2 className="font-bold text-slate-900">Prochaines étapes</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {nextSteps.map((step, i) => (
              <div key={step.title} className="flex items-start gap-4 p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-md shadow-brand-500/20">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Home link */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
