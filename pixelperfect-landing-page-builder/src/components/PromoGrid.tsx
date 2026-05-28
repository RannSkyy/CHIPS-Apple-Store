/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { PROMO_CATEGORIES } from "../data";

interface PromoGridProps {
  onSelectBrandFilter: (brandName: string) => void;
}

export default function PromoGrid({ onSelectBrandFilter }: PromoGridProps) {
  return (
    <section className="bg-white py-8 px-4" id="promo-grid-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="promo-tiles-grid">
          {PROMO_CATEGORIES.map((promo) => (
            <div
              key={promo.id}
              onClick={() => onSelectBrandFilter(promo.brand)}
              className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer bg-slate-100 transition-all border border-gray-100"
              id={`promo-col-${promo.id}`}
            >
              {/* Image with fallback & referrer attributes */}
              <img
                src={promo.imageUrl}
                alt={promo.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Tint overlay for contrast readability */}
              <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/45 transition-colors duration-300" />

              {/* Content text alignment bottom-left exactly */}
              <div className="absolute bottom-4 left-4 right-4 text-left space-y-1 z-10" id="promo-heading-meta">
                <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300">
                  {promo.brand}
                </span>
                <h3 className="font-sans font-bold text-sm sm:text-base text-white leading-snug drop-shadow-sm">
                  {promo.title}
                </h3>
                
                <span className="inline-block text-[10px] font-bold text-white/95 group-hover:text-cyan-200 uppercase tracking-widest pt-1 border-b border-transparent group-hover:border-cyan-300 transition-all">
                  Shop Brand &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
