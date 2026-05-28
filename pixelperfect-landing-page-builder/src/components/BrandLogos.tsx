/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BRANDS } from "../data";
import { Sparkles } from "lucide-react";

interface BrandLogosProps {
  onSelectBrandFilter: (brand: string) => void;
  activeBrandFilter: string | null;
  onClearBrandFilter: () => void;
}

export default function BrandLogos({
  onSelectBrandFilter,
  activeBrandFilter,
  onClearBrandFilter,
}: BrandLogosProps) {
  return (
    <section className="bg-white py-12 px-4" id="brands-section">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Title alignment */}
        <div className="text-center space-y-1.5 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 justify-center px-2.5 py-0.5 bg-cyan-50 border border-cyan-100 rounded-full text-[10px] font-black text-brand-teal uppercase tracking-widest">
            <Sparkles className="h-3 w-3" />
            <span>Authorized Retailer</span>
          </div>
          <h2 className="font-sans font-black text-xl sm:text-2xl text-brand-primary tracking-tight">
            The Best Brands All in One Place
          </h2>
          <p className="text-xs text-gray-400">
            Click on any authorized brand logo to filter and explore original accessories.
          </p>
        </div>

        {/* Brands Logo row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4" id="brands-list-row">
          {BRANDS.map((brand) => {
            const isActive = activeBrandFilter?.toLowerCase() === brand.name.toLowerCase();
            return (
              <button
                key={brand.id}
                onClick={() => onSelectBrandFilter(brand.name)}
                className={`py-3 px-6 rounded-xl border font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-all ${
                  isActive
                    ? "bg-[#0E7490] text-white border-brand-teal shadow-md shadow-cyan-100 scale-105"
                    : "bg-slate-50/50 hover:bg-white text-gray-500 hover:text-brand-primary border-gray-100 hover:border-gray-200"
                }`}
                id={`brand-logo-${brand.id}`}
              >
                <span>{brand.name}</span>
              </button>
            );
          })}

          {activeBrandFilter && (
            <button
              onClick={onClearBrandFilter}
              className="py-1 px-3 rounded-full bg-rose-50 text-rose-600 border border-rose-100 font-sans text-[11px] font-bold hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Clear Filter [x]
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
