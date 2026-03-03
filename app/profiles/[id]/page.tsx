"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Code2,
  TrendingUp,
  CheckCircle,
  Linkedin,
  Globe,
  Mail,
  Zap,
  Building2,
  Target,
  Sparkles,
} from "lucide-react";
import { fakeProfiles } from "@/lib/profiles";
import { cn } from "@/lib/utils";

export default function ProfileDetailPage() {
  const { id } = useParams();
  const profile = fakeProfiles.find((p) => p.id === id);

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Profil introuvable</h2>
          <Link href="/profiles" className="btn-primary mt-4 inline-flex">
            Retour aux profils
          </Link>
        </div>
      </div>
    );
  }

  const isTech = profile.type === "tech";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/profiles"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux profils
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile card */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
              <div className={cn("h-2", isTech ? "gradient-tech" : "gradient-biz")} />
              <div className="p-6 text-center">
                <div
                  className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 shadow-xl",
                    isTech
                      ? "bg-gradient-to-br from-tech-500 to-tech-600 shadow-tech-500/30"
                      : "bg-gradient-to-br from-biz-500 to-biz-600 shadow-biz-500/30"
                  )}
                >
                  {profile.avatar}
                </div>

                <div className="flex items-center justify-center gap-2 mb-1">
                  <h1 className="text-xl font-bold text-slate-900">{profile.name}</h1>
                  {profile.isVerified && (
                    <CheckCircle className="w-5 h-5 text-brand-500" />
                  )}
                </div>

                <div
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3",
                    isTech ? "bg-tech-50 text-tech-700" : "bg-biz-50 text-biz-700"
                  )}
                >
                  {isTech ? <Code2 className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                  {isTech ? "Profil Technique" : "Profil Business"}
                </div>

                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-sm mb-5">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>

                {/* Contact button */}
                <Link
                  href={`/register?contact=${profile.id}`}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 shadow-lg active:scale-95",
                    isTech
                      ? "bg-gradient-to-r from-tech-500 to-tech-600 text-white shadow-tech-500/30 hover:shadow-tech-500/50"
                      : "bg-gradient-to-r from-biz-500 to-biz-600 text-white shadow-biz-500/30 hover:shadow-biz-500/50"
                  )}
                >
                  <Mail className="w-4 h-4" />
                  Contacter {profile.name.split(" ")[0]}
                </Link>

                <p className="text-xs text-slate-400 mt-3">
                  Crée ton profil pour entrer en contact
                </p>
              </div>

              {/* Links */}
              {(profile.linkedin || profile.website) && (
                <div className="px-6 pb-6 flex gap-3">
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-300 text-sm font-medium transition-all"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                  {profile.website && (
                    <a
                      href={profile.website}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-brand-600 hover:border-brand-300 text-sm font-medium transition-all"
                    >
                      <Globe className="w-4 h-4" /> Site web
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className={cn("w-4 h-4", isTech ? "text-tech-500" : "text-biz-500")} />
                <h2 className="font-bold text-slate-900">Compétences</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-semibold",
                      isTech ? "bg-tech-50 text-tech-700" : "bg-biz-50 text-biz-700"
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
              <h2 className="font-bold text-slate-900 text-lg mb-4">À propos</h2>
              <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
            </div>

            {/* Agency */}
            {profile.agencyName && (
              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className={cn("w-5 h-5", isTech ? "text-tech-500" : "text-biz-500")} />
                  <h2 className="font-bold text-slate-900 text-lg">Projet / Agence</h2>
                </div>
                <div
                  className={cn(
                    "rounded-xl p-4 mb-4",
                    isTech ? "bg-tech-50" : "bg-biz-50"
                  )}
                >
                  <div className="text-lg font-bold text-slate-900 mb-1">{profile.agencyName}</div>
                  {profile.agencyDescription && (
                    <p className={cn("text-sm leading-relaxed", isTech ? "text-tech-800" : "text-biz-800")}>
                      {profile.agencyDescription}
                    </p>
                  )}
                  {profile.agencyStage && (
                    <div className="mt-3">
                      <span className="text-xs font-semibold text-slate-500">Stade : </span>
                      <span
                        className={cn(
                          "text-xs font-bold",
                          isTech ? "text-tech-700" : "text-biz-700"
                        )}
                      >
                        {profile.agencyStage}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What they look for */}
            <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Target className={cn("w-5 h-5", isTech ? "text-tech-500" : "text-biz-500")} />
                <h2 className="font-bold text-slate-900 text-lg">Ce qu&apos;il/elle recherche</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">{profile.lookingFor}</p>
            </div>

            {/* CTA */}
            <div
              className={cn(
                "rounded-2xl p-7 text-white",
                isTech
                  ? "bg-gradient-to-br from-tech-500 to-tech-600 shadow-xl shadow-tech-500/25"
                  : "bg-gradient-to-br from-biz-500 to-biz-600 shadow-xl shadow-biz-500/25"
              )}
            >
              <h3 className="text-xl font-bold mb-2">
                {profile.name.split(" ")[0]} correspond à ce que tu cherches ?
              </h3>
              <p
                className={cn(
                  "text-sm mb-5 leading-relaxed",
                  isTech ? "text-tech-100" : "text-biz-100"
                )}
              >
                Crée ton profil pour entrer en contact et commencer à échanger.
              </p>
              <Link
                href={`/register?contact=${profile.id}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white font-bold text-slate-900 hover:bg-slate-50 transition-colors shadow-lg text-sm"
              >
                <Mail className="w-4 h-4" />
                Créer mon profil et contacter {profile.name.split(" ")[0]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
