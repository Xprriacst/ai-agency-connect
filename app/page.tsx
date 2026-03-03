import Link from "next/link";
import { Zap, ChevronRight } from "lucide-react";
import { fakeProfiles } from "@/lib/profiles";
import HeroTabs from "@/components/HeroTabs";

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

      {/* KPI bar */}
      <div className="fixed top-[57px] sm:top-[65px] left-0 right-0 z-40 border-b border-amber-100 bg-amber-50/90 backdrop-blur-sm hidden sm:block">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2 text-center">
          <span className="text-sm font-semibold text-amber-800">
            Nous n&apos;acceptons que <span className="font-black">10%</span> des candidatures — chaque profil est vérifié manuellement.
          </span>
        </div>
      </div>

      {/* Hero + profils (gérés par HeroTabs) */}
      <HeroTabs techProfiles={techProfiles} bizProfiles={bizProfiles} />

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
