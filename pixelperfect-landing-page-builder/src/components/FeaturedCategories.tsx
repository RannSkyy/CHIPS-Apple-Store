import React from "react";
import * as Icons from "lucide-react";
import { Category } from "../types";
import { Language } from "../utils/lang";

interface FeaturedCategoriesProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  onScrollToSection: (elementId: string) => void;
  lang: Language;
}

// Icon dictionary mapper for TS dynamic access
const ICON_MAP: Record<string, React.ReactNode> = {
  Smartphone: <Icons.Smartphone className="h-6 w-6 text-[#0E7490]" />,
  Watch: <Icons.Watch className="h-6 w-6 text-[#0E7490]" />,
  Gamepad2: <Icons.Gamepad2 className="h-6 w-6 text-[#0E7490]" />,
  Laptop: <Icons.Laptop className="h-6 w-6 text-[#0E7490]" />,
  Headphones: <Icons.Headphones className="h-6 w-6 text-[#0E7490]" />,
  Zap: <Icons.Zap className="h-6 w-6 text-[#0E7490]" />,
  Keyboard: <Icons.Keyboard className="h-6 w-6 text-[#0E7490]" />,
  Cpu: <Icons.Cpu className="h-6 w-6 text-[#0E7490]" />,
  Sparkles: <Icons.Sparkles className="h-6 w-6 text-[#0E7490]" />,
};

export default function FeaturedCategories({
  categories,
  activeCategory,
  onSelectCategory,
  onScrollToSection,
  lang,
}: FeaturedCategoriesProps) {
  return (
    <section className="bg-white py-12 px-4" id="categories-section">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Title exactly matching styled headers */}
        <div className="flex justify-between items-end border-b border-gray-100 pb-4">
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0891B2]">
              {lang === "ID" ? "TEMUKAN GADGET ANDA" : "FIND YOUR GEAR"}
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl text-brand-primary tracking-tight">
              {lang === "ID" ? "Belanja Berdasarkan Kategori" : "Shop by Category"}
            </h2>
          </div>
          
          <button
            onClick={() => onScrollToSection("hot-picks-section")}
            className="text-xs font-bold text-[#0E7490] hover:text-cyan-700 transition-colors uppercase tracking-wider cursor-pointer"
          >
            {lang === "ID" ? "Lihat Semua Produk →" : "See All Items →"}
          </button>
        </div>

        {/* Categories Bento Column/Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4" id="categories-list-grid">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onScrollToSection("hot-picks-section");
                }}
                className={`group p-5 rounded-2xl border text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
                  isActive
                    ? "bg-[#FCFDFE] border-brand-teal shadow-md ring-1 ring-brand-teal/20"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"
                }`}
                id={`category-card-${cat.id}`}
              >
                {/* Dynamically retrieved Icon overlay */}
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                  isActive ? "bg-cyan-50/80" : "bg-slate-50 group-hover:bg-cyan-50"
                }`} id={`category-icon-wrapper`}>
                  {ICON_MAP[cat.iconName] || <Icons.Boxes className="h-6 w-6 text-[#0E7490]" />}
                </div>

                {/* Name */}
                <div id="category-text-meta">
                  <h3 className="font-sans font-bold text-xs text-brand-primary line-clamp-1">
                    {lang === "ID" ? cat.name_id : cat.name}
                  </h3>
                  {cat.count && (
                    <span className="text-[9px] font-mono font-medium text-gray-400 mt-0.5 block">
                      {cat.count} {lang === "ID" ? "Produk" : "Items"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
