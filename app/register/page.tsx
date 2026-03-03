"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Code2,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Zap,
  CheckCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3;
type ProfileType = "tech" | "business" | "both";

const techSkillsSuggestions = [
  "Python", "LangChain", "OpenAI API", "RAG", "Fine-tuning", "LLMs",
  "NLP", "Computer Vision", "MLOps", "Hugging Face", "PyTorch", "TensorFlow",
  "Node.js", "React", "FastAPI", "Docker", "AWS", "Azure AI",
  "Agents IA", "n8n", "Make/Zapier", "Prompt Engineering", "Data Science",
];

const bizSkillsSuggestions = [
  "Vente B2B", "Growth Marketing", "Fundraising", "Stratégie Go-to-Market",
  "Account Management", "Direction commerciale", "Partenariats",
  "Marketing digital", "SEO/SEA", "Copywriting", "Leadership",
  "Gestion de projet", "Conseil en stratégie", "Finance", "RH",
  "Secteur public", "LegalTech", "Retail", "Industrie", "SaaS",
];

const agencyStages = [
  "Idée / en exploration",
  "Idée / recherche d'associé",
  "MVP en cours",
  "Premiers clients",
  "Pré-seed / amorçage",
  "Actif / cherche associé",
];

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rawType = searchParams.get("type");
  const initialType = (rawType === "tech" || rawType === "business" || rawType === "both" ? rawType : null) as ProfileType | null;

  const [step, setStep] = useState<Step>(initialType ? 2 : 1);
  const [profileType, setProfileType] = useState<ProfileType | null>(initialType);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    reason1: "",
    reason2: "",
    reason3: "",
    bizReason1: "",
    bizReason2: "",
    bizReason3: "",
    skills: [] as string[],
    skillInput: "",
    hasAgency: false,
    agencyName: "",
    agencyDescription: "",
    agencyStage: "",
    lookingFor: "",
    linkedin: "",
    website: "",
    photoPreview: "",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateForm("photoPreview", ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const updateForm = (key: string, value: string | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/submit-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: profileType,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          location: form.location,
          bio: [
            ...([form.reason1, form.reason2, form.reason3].filter(Boolean)),
            ...(isBoth ? [form.bizReason1, form.bizReason2, form.bizReason3].filter(Boolean) : []),
          ].join(' | '),
          skills: form.skills,
          linkedin: form.linkedin,
          website: form.website,
          agencyName: form.agencyName,
          agencyDescription: form.agencyDescription,
          agencyStage: form.agencyStage,
          lookingFor: form.lookingFor,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la soumission");
      }
      router.push("/confirmation");
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isTech = profileType === "tech";
  const isBoth = profileType === "both";

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
          <Link href="/profiles" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
            Explorer les profils
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Step 1 — Choisir le type */}
        {step === 1 && (
          <div className="animate-slide-up">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                Quel est ton profil ?
              </h1>
              <p className="text-slate-500 text-lg">
                Sélectionne le type de profil qui te correspond le mieux.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <button
                onClick={() => { setProfileType("tech"); setStep(2); }}
                className="group relative flex flex-col items-center gap-5 p-8 rounded-2xl bg-white border-2 border-tech-400/40 hover:border-tech-500 shadow-md hover:shadow-xl hover:shadow-tech-500/20 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-left"
              >
                <div className="w-16 h-16 rounded-2xl gradient-tech flex items-center justify-center shadow-lg shadow-tech-500/30 group-hover:scale-110 transition-transform">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2 text-center">Profil Technique</div>
                  <p className="text-slate-500 text-sm leading-relaxed text-center">
                    Tu es développeur IA, data scientist, ML engineer ou expert en automatisation.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {["LLMs, RAG, Fine-tuning", "Développement IA / ML", "Automatisation & Agents", "Architecture technique"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle className="w-3.5 h-3.5 text-tech-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-tech-500" />
                </div>
              </button>

              <button
                onClick={() => { setProfileType("business"); setStep(2); }}
                className="group relative flex flex-col items-center gap-5 p-8 rounded-2xl bg-white border-2 border-biz-400/40 hover:border-biz-500 shadow-md hover:shadow-xl hover:shadow-biz-500/20 transition-all duration-300 hover:-translate-y-1 active:scale-95 text-left"
              >
                <div className="w-16 h-16 rounded-2xl gradient-biz flex items-center justify-center shadow-lg shadow-biz-500/30 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-slate-900 mb-2 text-center">Profil Business</div>
                  <p className="text-slate-500 text-sm leading-relaxed text-center">
                    Tu as un background commercial, marketing, stratégie ou entrepreneurial.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {["Vente B2B & Go-to-Market", "Marketing & Growth", "Levée de fonds", "Management & Ops"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle className="w-3.5 h-3.5 text-biz-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-biz-500" />
                </div>
              </button>
            </div>

            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-slate-500">
                Tu as les deux casquettes ?{" "}
                <button
                  onClick={() => { setProfileType("both"); setStep(2); }}
                  className="text-brand-600 font-semibold underline underline-offset-2 hover:text-brand-700 transition-colors"
                >
                  Les deux
                </button>
              </p>
              <p className="text-xs text-slate-400">Tu peux modifier ton profil à tout moment après validation.</p>
            </div>
          </div>
        )}

        {/* Step 2 — Infos personnelles */}
        {step === 2 && profileType && (
          <div className="animate-slide-up">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Étape 1 sur 2</span>
                  <span>50%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full">
                  <div className={cn("h-full rounded-full transition-all", isBoth ? "bg-gradient-to-r from-tech-500 to-biz-500" : isTech ? "gradient-tech" : "gradient-biz")} style={{ width: "50%" }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isBoth ? "bg-gradient-to-br from-tech-500 to-biz-500" : isTech ? "gradient-tech" : "gradient-biz")}>
                {isBoth ? <Zap className="w-5 h-5 text-white" /> : isTech ? <Code2 className="w-5 h-5 text-white" /> : <TrendingUp className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Tes informations</h1>
                <p className="text-slate-500 text-sm">
                  Profil {isBoth ? "Tech + Business" : isTech ? "Technique" : "Business"} — Parle-nous de toi
                </p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setStep(3); }} className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-5">
                <h2 className="font-bold text-slate-900">Informations personnelles</h2>

                {/* Photo upload */}
                <div>
                  <label className="label">Ta photo <span className="text-slate-400 font-normal">(optionnel)</span></label>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md",
                      form.photoPreview ? "" : isTech ? "gradient-tech" : "gradient-biz"
                    )}>
                      {form.photoPreview
                        ? <img src={form.photoPreview} alt="preview" className="w-full h-full object-cover" />
                        : <span className="text-white text-xl font-bold">{form.firstName?.[0] || "?"}</span>
                      }
                    </div>
                    <label className={cn(
                      "cursor-pointer flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed text-sm font-medium transition-colors",
                      isTech ? "border-tech-300 text-tech-600 hover:bg-tech-50" : "border-biz-300 text-biz-600 hover:bg-biz-50"
                    )}>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                      Choisir une photo
                    </label>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">Prénom</label>
                    <input
                      type="text"
                      placeholder="Thomas"
                      value={form.firstName}
                      onChange={(e) => updateForm("firstName", e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="label">Nom</label>
                    <input
                      type="text"
                      placeholder="Renard"
                      value={form.lastName}
                      onChange={(e) => updateForm("lastName", e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Email professionnel *</label>
                  <input
                    required
                    type="email"
                    placeholder="thomas@example.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="label">Ville / Région <span className="text-slate-400 font-normal">(optionnel)</span></label>
                  <input
                    type="text"
                    placeholder="Paris, France"
                    value={form.location}
                    onChange={(e) => updateForm("location", e.target.value)}
                    className="input-field"
                  />
                </div>

                {/* Réalisations tech */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-slate-900">
                      {isBoth ? "3 réalisations techniques *" : "3 raisons de te sélectionner *"}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-400 -mt-2 mb-3">
                    {!isBoth && (isTech
                      ? "Expériences, projets livrés, certifications — sois précis et chiffré."
                      : "Réseau actionnable, deals closés, résultats mesurables — sois précis et chiffré.")}
                    {isBoth && "Projets IA livrés, compétences techniques, certifications — sois chiffré."}
                  </p>
                  {(["reason1", "reason2", "reason3"] as const).map((key, i) => (
                    <div key={key} className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-2.5 ${isBoth ? "bg-tech-500" : isTech ? "bg-tech-500" : "bg-biz-500"}`}>
                        {i + 1}
                      </span>
                      <textarea
                        required
                        rows={2}
                        placeholder={
                          (isTech || isBoth)
                            ? ["Dev full-stack 5 ans d'expérience, spécialiste LLMs et NLP", "3 projets d'automatisation déployés chez des clients PME", "Certification OpenAI + AWS ML Engineer"][i]
                            : ["Réseau de 10+ PME actionnables dans mon secteur", "3 ans de prospection, 150 cold calls réalisés", "+30% de CA généré sur mon dernier poste"][i]
                        }
                        value={form[key]}
                        onChange={(e) => updateForm(key, e.target.value)}
                        className="input-field resize-none flex-1"
                      />
                    </div>
                  ))}
                </div>

                {/* Réalisations business (profil both uniquement) */}
                {isBoth && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <h2 className="font-bold text-slate-900">3 réalisations commerciales *</h2>
                      <p className="text-xs text-slate-400 mt-1 mb-3">Réseau actionnable, deals closés, résultats mesurables — sois chiffré.</p>
                    </div>
                    {(["bizReason1", "bizReason2", "bizReason3"] as const).map((key, i) => (
                      <div key={key} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-2.5 bg-biz-500">
                          {i + 1}
                        </span>
                        <textarea
                          required
                          rows={2}
                          placeholder={["Réseau de 10+ PME actionnables dans mon secteur", "3 ans de prospection, 150 cold calls réalisés", "+30% de CA généré sur mon dernier poste"][i]}
                          value={form[key]}
                          onChange={(e) => updateForm(key, e.target.value)}
                          className="input-field resize-none flex-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>


              {/* Links */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
                <h2 className="font-bold text-slate-900">Liens (optionnel)</h2>
                <div>
                  <label className="label">LinkedIn</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/ton-profil"
                    value={form.linkedin}
                    onChange={(e) => updateForm("linkedin", e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label">Site web / Portfolio</label>
                  <input
                    type="url"
                    placeholder="https://ton-site.com"
                    value={form.website}
                    onChange={(e) => updateForm("website", e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base shadow-xl transition-all duration-200 active:scale-95",
                  isTech
                    ? "gradient-tech shadow-tech-500/30 hover:shadow-tech-500/50"
                    : "gradient-biz shadow-biz-500/30 hover:shadow-biz-500/50"
                )}
              >
                Continuer — Mon projet
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Step 3 — Infos agence/projet */}
        {step === 3 && profileType && (
          <div className="animate-slide-up">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-8">
              <button onClick={() => setStep(2)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                  <span>Étape 2 sur 2</span>
                  <span>100%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full">
                  <div className={cn("h-full rounded-full transition-all", isTech ? "gradient-tech" : "gradient-biz")} style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", isTech ? "gradient-tech" : "gradient-biz")}>
                {isTech ? <Code2 className="w-5 h-5 text-white" /> : <TrendingUp className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Ton projet</h1>
                <p className="text-slate-500 text-sm">Parle-nous de ton projet ou agence</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Agency toggle */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-bold text-slate-900">As-tu déjà un projet ou agence ?</h2>
                    <p className="text-slate-500 text-sm mt-0.5">Si oui, partage les détails pour donner envie.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateForm("hasAgency", !form.hasAgency)}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors duration-200",
                      form.hasAgency
                        ? isTech ? "bg-tech-500" : "bg-biz-500"
                        : "bg-slate-200"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
                        form.hasAgency ? "translate-x-7" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>

                {form.hasAgency && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="label">Nom du projet / agence</label>
                      <input
                        type="text"
                        placeholder="NeuraFlow, ContentAI..."
                        value={form.agencyName}
                        onChange={(e) => updateForm("agencyName", e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label">Description courte</label>
                      <textarea
                        rows={2}
                        placeholder="Automatisation des processus métier par l'IA pour les ETI..."
                        value={form.agencyDescription}
                        onChange={(e) => updateForm("agencyDescription", e.target.value)}
                        className="input-field resize-none"
                      />
                    </div>
                    <div>
                      <label className="label">Stade actuel</label>
                      <select
                        value={form.agencyStage}
                        onChange={(e) => updateForm("agencyStage", e.target.value)}
                        className="input-field"
                      >
                        <option value="">Sélectionner...</option>
                        {agencyStages.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Looking for */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                <h2 className="font-bold text-slate-900 mb-1">Ce que tu recherches *</h2>
                <p className="text-slate-500 text-sm mb-4">
                  Décris précisément le profil de ton futur associé idéal.
                </p>
                <textarea
                  required
                  rows={4}
                  placeholder={
                    isTech
                      ? "Ex : Un profil commercial avec réseau dans les ETI/PME pour développer les ventes et structurer l'offre commerciale..."
                      : "Ex : Un développeur IA solide sur les LLMs et l'automatisation, idéalement avec des réalisations concrètes en production..."
                  }
                  value={form.lookingFor}
                  onChange={(e) => updateForm("lookingFor", e.target.value)}
                  className="input-field resize-none"
                />
              </div>

              {/* Info validation */}
              <div className="flex gap-3 p-4 rounded-xl bg-brand-50 border border-brand-200">
                <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-brand-800">
                  <span className="font-semibold">Validation sous 48h.</span> Notre équipe vérifiera ton profil avant publication. Tu recevras un email de confirmation.
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
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed",
                  isTech
                    ? "gradient-tech shadow-tech-500/30 hover:shadow-tech-500/50"
                    : "gradient-biz shadow-biz-500/30 hover:shadow-biz-500/50"
                )}
              >
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Envoi en cours...</>
                ) : (
                  <>Soumettre mon profil <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
