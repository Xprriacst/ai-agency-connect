"use client";

import Link from "next/link";
import { MapPin, Code2, TrendingUp, CheckCircle, Lock, ArrowRight } from "lucide-react";
import { Profile } from "@/lib/profiles";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const isTech = profile.type === "tech";

  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl border overflow-hidden card-hover",
        isTech
          ? "border-tech-400/30 shadow-md shadow-tech-500/8"
          : "border-biz-400/30 shadow-md shadow-biz-500/8"
      )}
    >
      {/* Top color strip */}
      <div
        className={cn(
          "h-1.5 w-full",
          isTech ? "gradient-tech" : "gradient-biz"
        )}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-4">
          {/* Avatar */}
          {profile.photo ? (
            <div className="flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-xl mb-3">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div
              className={cn(
                "flex-shrink-0 w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-xl mb-3",
                isTech
                  ? "bg-gradient-to-br from-tech-500 to-tech-600 shadow-tech-500/30"
                  : "bg-gradient-to-br from-biz-500 to-biz-600 shadow-biz-500/30"
              )}
            >
              {profile.avatar}
            </div>
          )}

          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">{profile.name}</h3>
            {profile.isVerified && (
              <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0" />
            )}
          </div>

          {/* Badge type */}
          <div
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold mt-1",
              isTech
                ? "bg-tech-50 text-tech-700"
                : "bg-biz-50 text-biz-700"
            )}
          >
            {isTech ? (
              <Code2 className="w-3 h-3" />
            ) : (
              <TrendingUp className="w-3 h-3" />
            )}
            {isTech ? "Profil Technique" : "Profil Business"}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{profile.location}</span>
        </div>

        {/* 3 bullets */}
        <ul className="mb-5 space-y-2">
          {profile.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
              <span
                className={cn(
                  "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-0.5",
                  isTech ? "bg-tech-500" : "bg-biz-500"
                )}
              >
                {i + 1}
              </span>
              <span className="leading-snug">{bullet}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {profile.isVerified ? (
          <Link
            href={`/profiles/${profile.id}`}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95",
              isTech
                ? "bg-tech-500 hover:bg-tech-600 text-white shadow-md shadow-tech-500/25"
                : "bg-biz-500 hover:bg-biz-600 text-white shadow-md shadow-biz-500/25"
            )}
          >
            Voir le profil complet
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-400 cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            Profil en cours de validation
          </button>
        )}
      </div>
    </div>
  );
}
