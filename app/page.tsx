"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight, Zap, CheckCircle, ShieldCheck,
  TrendingUp, ChevronRight, Star, X, ArrowLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const salesRoleOptions = [
  { id: "closer", label: "Closer", icon: "🎯", desc: "Je close les deals, je négocie et je finalise les ventes" },
  { id: "setter", label: "Setter", icon: "📞", desc: "Je qualifie les leads et prends des RDV pour les closers" },
  { id: "cold_email", label: "Cold Email", icon: "✉️", desc: "Je génère des leads via campagnes d'emails à froid" },
  { id: "physique", label: "Prospection physique", icon: "🤝", desc: "Terrain, networking, salons, portes à portes" },
  { id: "cold_call", label: "Cold Call", icon: "📱", desc: "Prospection téléphonique, appels sortants" },
  { id: "autre", label: "Autre", icon: "💡", desc: "Mon profil ne rentre pas dans ces catégories" },
];

const heroRoles = [
  { id: "closer", label: "Je suis Closer", icon: "🎯" },
  { id: "setter", label: "Je suis Setter", icon: "📞" },
  { id: "cold_email", label: "Je fais du Cold Email", icon: "✉️" },
  { id: "physique", label: "Je prospecte en physique", icon: "🤝" },
  { id: "cold_call", label: "Je fais du Cold Call", icon: "📱" },
];

const benefits = [
  {
    icon: "💼",
    title: "Projets IA high ticket",
    desc: "Accède à des missions sur des solutions IA à forte valeur — automatisation, agents IA, LLMs. Des projets sérieux avec des fondateurs tech qui ont déjà leur produit.",
  },
  {
    icon: "🎯",
    title: "Matching sur-mesure",
    desc: "On te met en relation avec les fondateurs dont le projet correspond à ton style de vente et ton secteur.",
  },
  {
    icon: "🏆",
    title: "Communauté sélective",
    desc: "Rejoins une communauté de profils sales vérifiés. Pas de débutants, pas de ghosters — seulement des profils sérieux.",
  },
  {
    icon: "📈",
    title: "Commission attractive",
    desc: "Négocie tes conditions directement avec les fondateurs. Les projets IA affichent des marges élevées.",
  },
];

const testimonials = [
  {
    name: "Julien M.",
    role: "Closer indépendant",
    avatar: "JM",
    quote: "En 3 mois j'ai closé 4 projets d'automatisation IA. Des deals entre 8k et 25k€. La qualité des projets est vraiment différente.",
    amount: "87k€ closés",
  },
  {
    name: "Sarah L.",
    role: "SDR — Setter",
    avatar: "SL",
    quote: "Les fondateurs tech savent ce qu'ils font mais ne savent pas vendre. J'ai trouvé ma niche : les accompagner sur la prospection B2B.",
    amount: "12 RDV/semaine",
  },
  {
    name: "Thomas R.",
    role: "Business Developer",
    avatar: "TR",
    quote: "La sélection garantit que les projets sont sérieux. Pas de temps perdu avec des fondateurs sans traction ni budget.",
    amount: "×3 sur ses revenus",
  },
];

const faqs = [
  {
    q: "Qu'est-ce qu'un projet IA high ticket ?",
    a: "Ce sont des solutions d'automatisation, d'agents IA ou d'intégration LLM vendues aux PME et ETI. Les projets sont sélectionnés pour leur sérieux et leur valeur ajoutée — on ne travaille pas avec des projets sans budget ni traction.",
  },
  {
    q: "Suis-je salarié ou indépendant ?",
    a: "Tu restes indépendant. La plateforme te met en relation avec les fondateurs qui cherchent un partenaire commercial. Les modalités (commission, rémunération fixe, portage) sont à définir avec chaque fondateur.",
  },
  {
    q: "Combien de temps prend la vérification ?",
    a: "Notre équipe examine chaque candidature manuellement. Compte 2 à 4 semaines pour recevoir une réponse. On préfère prendre le temps de bien vérifier plutôt que d'accepter en masse.",
  },
  {
    q: "Quels profils sont acceptés ?",
    a: "Closers, Setters, SDR, Business Developers avec une expérience avérée en vente B2B. Idéalement avec des résultats chiffrés. Débutants non acceptés.",
  },
];

// ---- Inline form ----
type Step = 1 | 2 | 3;

function SalesForm({ initialRole, onRoleChange }: { initialRole: string; onRoleChange: (role: string) => void }) {
  const [step, setStep] = useState<Step>(1);
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);

  useEffect(() => {
    if (initialRole) setSelectedRole(initialRole);
  }, [initialRole]);

  const selectRole = (role: string) => {
    setSelectedRole(role);
    onRoleChange(role);
  };
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedin: "",
    result1: "",
    result2: "",
    result3: "",
    avgDealSize: "",
    sectors: "",
  });

  const update = (key: string, value: string) =>
    setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/submit-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "business",
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          linkedin: form.linkedin,
          bio: [form.result1, form.result2, form.result3].filter(Boolean).join(" | "),
          skills: [selectedRole, form.sectors].filter(Boolean),
          lookingFor: `Taille moyenne de deal : ${form.avgDealSize}. Secteurs : ${form.sectors}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la soumission");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-biz-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-biz-500" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Candidature reçue 🎉</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Notre équipe examine ta candidature. Tu recevras une réponse sous <strong>2 à 4 semaines</strong>.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                step > s
                  ? "bg-biz-500 text-white"
                  : step === s
                  ? "bg-biz-500 text-white ring-4 ring-biz-100"
                  : "bg-slate-100 text-slate-400"
              )}
            >
              {step > s ? <CheckCircle className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div className={cn("flex-1 h-1 rounded-full transition-all", step > s ? "bg-biz-400" : "bg-slate-100")} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1 — Rôle */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">Quel est ton rôle ?</h3>
          <p className="text-slate-500 text-sm mb-6">Sélectionne le profil qui te correspond le mieux.</p>
          <div className="space-y-3 mb-6">
            {salesRoleOptions.map((role) => (
              <button
                key={role.id}
                onClick={() => selectRole(role.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                  selectedRole === role.id
                    ? "border-biz-500 bg-biz-50"
                    : "border-slate-200 hover:border-biz-300 hover:bg-slate-50"
                )}
              >
                <span className="text-2xl flex-shrink-0">{role.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm">{role.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{role.desc}</div>
                </div>
                {selectedRole === role.id && (
                  <CheckCircle className="w-5 h-5 text-biz-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!selectedRole}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white gradient-biz shadow-lg shadow-biz-500/25 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continuer
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Step 2 — Coordonnées */}
      {step === 2 && (
        <div>
          <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">Tes coordonnées</h3>
          <p className="text-slate-500 text-sm mb-6">On a juste besoin des essentiels pour l&apos;instant.</p>
          <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Prénom *</label>
                <input required type="text" placeholder="Thomas" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="label">Nom</label>
                <input type="text" placeholder="Renard" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} className="input-field" />
              </div>
            </div>
            <div>
              <label className="label">Email professionnel *</label>
              <input required type="email" placeholder="thomas@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">LinkedIn <span className="text-slate-400 font-normal">(recommandé)</span></label>
              <input type="url" placeholder="https://linkedin.com/in/ton-profil" value={form.linkedin} onChange={(e) => update("linkedin", e.target.value)} className="input-field" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white gradient-biz shadow-lg shadow-biz-500/25 transition-all active:scale-95">
              Continuer <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Step 3 — Résultats */}
      {step === 3 && (
        <div>
          <button onClick={() => setStep(2)} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </button>
          <h3 className="text-xl font-extrabold text-slate-900 mb-1">Tes résultats</h3>
          <p className="text-slate-500 text-sm mb-6">Sois précis et chiffré — c&apos;est ce qui fait la différence.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-3">
              <label className="label">3 résultats commerciaux concrets *</label>
              {(["result1", "result2", "result3"] as const).map((key, i) => (
                <div key={key} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-biz-500 flex items-center justify-center text-white text-xs font-bold mt-2.5">{i + 1}</span>
                  <textarea
                    required
                    rows={2}
                    placeholder={[
                      "Ex : Closé 12 deals SaaS B2B en 6 mois pour 180k€ de CA total",
                      "Ex : Taux de closing 35% sur appels qualifiés, cycle de vente moyen 3 semaines",
                      "Ex : Mis en place une séquence cold email à 8% de taux de réponse sur 500 prospects",
                    ][i]}
                    value={form[key]}
                    onChange={(e) => update(key, e.target.value)}
                    className="input-field resize-none flex-1"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="label">Taille moyenne de tes deals</label>
              <input type="text" placeholder="Ex : 8 000€ — 25 000€" value={form.avgDealSize} onChange={(e) => update("avgDealSize", e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="label">Secteurs / cibles habituels</label>
              <input type="text" placeholder="Ex : PME industrie, ETI retail, startups SaaS" value={form.sectors} onChange={(e) => update("sectors", e.target.value)} className="input-field" />
            </div>

            <div className="flex gap-3 p-4 rounded-xl bg-brand-50 border border-brand-200">
              <ShieldCheck className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-brand-800">
                <span className="font-semibold">Vérification sous 2-4 semaines.</span> Notre équipe examine chaque candidature manuellement avant publication.
              </div>
            </div>

            {submitError && (
              <div className="flex gap-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white gradient-biz shadow-lg shadow-biz-500/25 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi...</>
              ) : (
                <>Soumettre ma candidature <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// ---- Main page ----
export default function SalesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-600 to-brand-400 flex items-center justify-center shadow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-base sm:text-lg">AI Agency Connect</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/trouver"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm"
            >
              Je dépose un projet IA
            </Link>
            <a
              href="#postuler"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-white bg-biz-500 hover:bg-biz-600 transition-all text-sm shadow-md shadow-biz-500/25 active:scale-95"
            >
              Postuler
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-over menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <span className="font-bold text-slate-900">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
              <a href="#postuler" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-biz-50 border border-biz-200 hover:bg-biz-100 transition-colors text-biz-800 font-semibold text-sm">
                <TrendingUp className="w-4 h-4 text-biz-500" />
                Postuler comme profil Sales
              </a>
              <div className="pt-4 border-t border-slate-100">
                <Link href="/trouver" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors text-slate-500 font-medium text-sm">
                  <Zap className="w-4 h-4 text-slate-400" />
                  Je cherche un profil Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-biz-50/60 via-white to-white" />
        <div className="absolute top-16 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-biz-100/40 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-biz-50 border border-biz-200 text-biz-800 text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
            <Star className="w-3.5 h-3.5 fill-biz-500 text-biz-500 flex-shrink-0" />
            Sélection rigoureuse · Top 10% des profils acceptés
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-5 sm:mb-6">
            Rejoins le top 10%{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-biz-500 to-biz-400">
              des profils sales
            </span>
            <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-700">
              pour décrocher les meilleurs projets IA
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto mb-8 leading-relaxed px-2">
            Des fondateurs tech qui ont déjà leur solution IA cherchent des Closers, Setters et SDR pour la vendre. Postule et accède à des projets sérieux, sélectionnés.
          </p>

          {/* Role pills */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-8">
            {heroRoles.map((role) => (
              <a
                key={role.id}
                href="#postuler"
                onClick={() => setSelectedRole(role.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm shadow-lg transition-all active:scale-95",
                  selectedRole === role.id
                    ? "bg-biz-700 text-white shadow-biz-500/50 ring-2 ring-biz-300"
                    : "bg-biz-500 text-white shadow-biz-500/30 hover:bg-biz-600 hover:shadow-biz-500/50 hover:-translate-y-0.5"
                )}
              >
                <span>{role.icon}</span>
                {role.label}
                <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="py-6 sm:py-8 border-y border-slate-100 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
            {[
              { value: "High ticket", label: "Projets IA sélectionnés" },
              { value: "2-4 sem.", label: "Délai de vérification" },
              { value: "100%", label: "Profils vérifiés manuellement" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <span className="text-xl sm:text-2xl font-extrabold text-biz-600">{stat.value}</span>
                <span className="text-xs sm:text-sm text-slate-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Pourquoi rejoindre la plateforme ?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Des projets sérieux, des fondateurs qui ont déjà leur solution tech. Il ne manque que toi.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-biz-300 hover:shadow-md transition-all">
                <span className="text-2xl flex-shrink-0 mt-0.5">{b.icon}</span>
                <div>
                  <div className="font-bold text-slate-900 mb-1.5">{b.title}</div>
                  <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-biz-50 border border-biz-200 text-biz-700 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              PROCESSUS DE CANDIDATURE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              Comment ça marche ?
            </h2>
          </div>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: "01", icon: "📝", title: "Tu postules", desc: "Remplis le formulaire en 3 minutes — rôle, coordonnées, résultats." },
              { step: "02", icon: "🔍", title: "On vérifie", desc: "Notre équipe examine ton parcours et tes résultats manuellement sous 2-4 semaines." },
              { step: "03", icon: "✅", title: "Tu es accepté", desc: "Ton profil est publié et visible par les fondateurs d'agences IA." },
              { step: "04", icon: "🚀", title: "Tu closes", desc: "Les fondateurs te contactent pour leurs projets. Tu négocies et tu vends." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="text-3xl mb-2">{s.icon}</span>
                <div className="text-2xl font-black text-biz-400 mb-1">{s.step}</div>
                <div className="font-bold text-slate-900 mb-1.5 text-sm">{s.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Ils ont rejoint la plateforme
            </h2>
            <p className="text-slate-500 text-sm">Des profils sales qui vendent des solutions IA.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <div key={t.name} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-biz flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 rounded-full bg-biz-50 text-biz-700 text-xs font-semibold border border-biz-200">{t.amount}</span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-biz-400 text-biz-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form section */}
      <section id="postuler" className="py-14 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-biz-50/40 to-white border-t border-biz-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-biz-100 border border-biz-200 text-biz-800 text-xs font-semibold mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              CANDIDATURE GRATUITE
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Postule maintenant
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
              3 minutes pour soumettre ta candidature. Notre équipe revient vers toi sous 2 à 4 semaines.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
            <SalesForm initialRole={selectedRole} onRoleChange={setSelectedRole} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6 text-center">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                  <ChevronRight className={cn("w-4 h-4 text-slate-400 flex-shrink-0 transition-transform", openFaq === i && "rotate-90")} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-slate-500 text-sm mb-4">Candidature gratuite · Vérification manuelle · Projets high ticket</p>
          <a
            href="#postuler"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-biz text-white font-bold text-base shadow-xl shadow-biz-500/25 hover:shadow-biz-500/40 transition-all hover:-translate-y-0.5 active:scale-95"
          >
            Postuler comme profil Sales
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-xs text-slate-400">
            Tu es porteur de projet IA ?{" "}
            <Link href="/trouver" className="text-brand-600 font-medium hover:underline">
              Par ici →
            </Link>
          </p>
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
