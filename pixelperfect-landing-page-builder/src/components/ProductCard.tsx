/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "../types";
import { Language, formatProductPrice, TRANSLATIONS } from "../utils/lang";

interface ProductCardProps {
  key?: React.Key | string;
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  lang: Language;
}

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  lang,
}: ProductCardProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl p-4 flex flex-col justify-between h-full transition-all relative overflow-hidden"
      id={`product-card-${product.id}`}
    >
      {/* BADGES & WISHLIST ABSOLUTE TRIGGERS */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10" id="card-badges-actions">
        {/* Dynamic Badge layout */}
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span
              className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-md tracking-wider leading-none shadow-sm ${
                product.badge === "New Arrival"
                  ? "bg-amber-400 text-slate-900"
                  : product.badge === "Best Seller"
                  ? "bg-teal-500 text-white"
                  : "bg-[#0E7490] text-white"
              }`}
            >
              {lang === "ID" && product.badge === "New Arrival" ? "Edisi Baru" : 
               lang === "ID" && product.badge === "Best Seller" ? "Sangat Laris" : 
               lang === "ID" && product.badge === "Hot Pick" ? "Rekomendasi" : product.badge}
            </span>
          )}
          {product.discountPercent && (
            <span className="bg-rose-500 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md w-fit shadow-xs">
              -{product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Favorite Bookmark */}
        <button
          onClick={() => onToggleWishlist(product)}
          className="p-2 bg-white/90 hover:bg-white text-gray-400 hover:text-rose-500 rounded-full shadow-xs hover:shadow-md border border-gray-100/50 transition-all focus:outline-none"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          id={`wishlist-btn-${product.id}`}
        >
          <Heart
            className={`h-4.5 w-4.5 ${
              isWishlisted ? "fill-rose-500 text-rose-500 scale-110" : "text-gray-400"
            } transition-all`}
          />
        </button>
      </div>

      {/* PRODUCT PICTURE CONTAINER */}
      <div className="h-44 sm:h-48 w-full flex items-center justify-center p-2 mb-4 relative overflow-hidden rounded-xl bg-slate-50/50" id="card-img-block">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Rating overlay bottom left */}
        {product.rating && (
          <div className="absolute bottom-2 left-2 bg-white/90 px-1.5 py-0.5 rounded-md text-[10px] font-bold text-gray-700 flex items-center gap-0.5 shadow-xs border border-gray-100">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* METADATA CONTENT */}
      <div className="space-y-2 text-left flex-1 flex flex-col justify-between" id="card-meta">
        <div>
          {/* Brand & Badge row */}
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#0891B2] font-black block">
            {product.brand}
          </span>
          {/* Main Name exactly centered & sized */}
          <h3 className="font-sans font-bold text-sm text-brand-primary line-clamp-2 min-h-[40px] leading-tight hover:text-cyan-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="pt-2 border-t border-gray-50 space-y-3">
          <div className="flex items-baseline justify-between" id="card-pricing-row">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-base font-black text-brand-primary">
                {formatProductPrice(product.price, lang)}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-gray-400 line-through">
                  {formatProductPrice(product.originalPrice, lang)}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons matching "ADD TO CART" block in image */}
          <div className="space-y-2">
            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-[#0E7490] hover:bg-cyan-700 active:bg-cyan-800 text-white py-2.5 px-4 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm group cursor-pointer"
              id={`add-cart-cta-${product.id}`}
            >
              <ShoppingCart className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>{t.addToCart}</span>
            </button>
            
            {/* "Available in Branches" label matching reference layout */}
            <div className="flex items-center gap-1 text-[10px] text-[#0A5C36] font-semibold justify-center py-0.5" id="branch-status">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>{t.availableInBranches}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
