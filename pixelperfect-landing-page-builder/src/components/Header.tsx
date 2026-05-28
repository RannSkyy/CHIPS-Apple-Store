import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Bell,
  ChevronDown,
  PhoneCall,
  Globe,
  HelpCircle,
  Menu,
  X,
  MapPin,
} from "lucide-react";
import { Product, Category } from "../types";
import { Language, formatProductPrice, TRANSLATIONS } from "../utils/lang";

interface HeaderProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  products: Product[];
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onAddToCart: (product: Product) => void;
  onScrollToSection: (elementId: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  selectedIphoneModel: string;
  onSelectIphoneModel: (model: string) => void;
}

export default function Header({
  categories,
  activeCategory,
  onSelectCategory,
  products,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onAddToCart,
  onScrollToSection,
  lang,
  onLangChange,
  selectedIphoneModel,
  onSelectIphoneModel,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];

  // Close search suggestions on clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter products for suggestions based on query
  const suggestedProducts = searchQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white" id="main-header">
      {/* 1. TOP UTILITY BAR (Reference Blue/Teal background row) */}
      <div className="bg-[#0F172A] text-slate-300 text-[11px] py-1.5 px-4 tracking-wide font-sans font-medium border-b border-slate-800" id="top-utility-bar">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Quick links to scroll */}
          <div className="hidden md:flex items-center gap-5" id="top-bar-links">
            <button
              onClick={() => onScrollToSection("hot-picks-section")}
              className="hover:text-cyan-400 font-semibold uppercase transition-colors"
            >
              {lang === "ID" ? "Edisi Terbaik" : "CHIPS Hot Picks"}
            </button>
            <button
              onClick={() => onScrollToSection("new-arrivals-section")}
              className="hover:text-cyan-400 font-semibold uppercase transition-colors"
            >
              {lang === "ID" ? "Produk Terbaru" : "New Arrival"}
            </button>
            <button
              onClick={() => onScrollToSection("best-sellers-section")}
              className="hover:text-cyan-400 font-semibold uppercase transition-colors"
            >
              {lang === "ID" ? "Paling Laris" : "Best Seller"}
            </button>
            <button
              onClick={() => onScrollToSection("stores-section")}
              className="hover:text-cyan-400 font-semibold uppercase transition-colors"
            >
              {lang === "ID" ? "Lokasi Cabang" : "Store Locations"}
            </button>
          </div>

          <div className="flex items-center gap-1 md:hidden" id="mobile-top-tagline">
            <span className="text-cyan-400 font-bold uppercase">iBox Indonesia / CHIPS</span>
          </div>

          {/* Right contacts */}
          <div className="flex items-center gap-5 text-slate-300" id="top-bar-settings">
            <a href="tel:22289111" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <PhoneCall className="h-3 w-3 text-cyan-400" />
              <span>Tel: {lang === "ID" ? "+62 21 72781111" : "22289111"}</span>
            </a>
            <div className="h-3 w-[1px] bg-slate-700 hidden sm:block"></div>
            <div 
              onClick={() => onLangChange(lang === "EN" ? "ID" : "EN")}
              className="hidden sm:flex items-center gap-1 hover:text-cyan-400 cursor-pointer transition-colors"
            >
              <Globe className="h-3 w-3 text-cyan-400" />
              <span id="lang-selector-span">{lang === "EN" ? "Language: " : "Bahasa: "}<b>{lang === "EN" ? "English" : "Indonesia 🇮🇩"}</b></span>
              <ChevronDown className="h-2.5 w-2.5" />
            </div>
            <div className="h-3 w-[1px] bg-slate-700 hidden sm:block"></div>
            <button
              onClick={onOpenWishlist}
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <Heart className="h-3 w-3" />
              <span>{t.myWishlist}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <div className="border-b border-gray-100 py-4 px-4 bg-white" id="main-nav-bar">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Category Button on Desktop */}
          <div className="flex items-center gap-6" id="logo-block">
            <button
              onClick={() => {
                onSelectCategory("all");
                onSelectIphoneModel("All");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="font-serif text-3xl font-black tracking-tight text-brand-primary flex items-center gap-1 focus:outline-none"
            >
              <span>{lang === "ID" ? "iBOX" : "CHIPS"}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 self-end mb-2 animate-pulse"></span>
            </button>
          </div>

          {/* Search Box & Categories Selector in Mid (Reference Design) */}
          <div
            ref={searchContainerRef}
            className="hidden md:flex flex-1 max-w-xl relative items-center border-2 border-gray-100 focus-within:border-cyan-500 rounded-lg bg-gray-50/50 transition-all"
            id="search-box-block"
          >
            {/* Scoping Category Dropdown inside search */}
            <div className="flex items-center px-3 border-r border-gray-200">
              <select
                value={activeCategory}
                onChange={(e) => {
                  onSelectCategory(e.target.value);
                  onSelectIphoneModel("All");
                }}
                className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer py-1.5"
                id="search-category-scope"
              >
                <option value="all">{t.allCategories}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {lang === "ID" ? cat.name_id : cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Input query */}
            <div className="flex-1 flex items-center relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none font-sans font-medium"
                id="search-query-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Magnifying Search CTA */}
            <button className="bg-[#0E7490] text-white hover:bg-cyan-700 px-5 py-2.5 rounded-r-md self-stretch flex items-center justify-center transition-colors">
              <Search className="h-4 w-4" />
            </button>

            {/* Live Suggestion Dropdown */}
            {isSearchFocused && suggestedProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto p-2 divide-y divide-gray-50">
                {suggestedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                    onClick={() => {
                      onAddToCart(p);
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    id={`search-item-${p.id}`}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 object-cover bg-slate-100 rounded-md border border-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-sans font-semibold text-xs text-brand-primary truncate">{p.name}</p>
                      <span className="font-sans text-[10px] text-brand-teal font-bold">{p.brand}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-xs text-brand-primary">
                        {formatProductPrice(p.price, lang)}
                      </p>
                      {p.originalPrice && (
                        <p className="font-mono text-[9px] text-gray-400 line-through">
                          {formatProductPrice(p.originalPrice, lang)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Focused but empty results indicator */}
            {isSearchFocused && searchQuery && suggestedProducts.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-50 p-6 text-center text-gray-500 text-xs">
                {t.searchEmpty} "{searchQuery}"
              </div>
            )}
          </div>

          {/* User profile / notification & Cart layout */}
          <div className="flex items-center gap-4" id="header-right-meta">
            {/* User welcome on desktop (reference "Hello Ahmadullah!") */}
            <div className="hidden lg:flex items-center gap-2" id="username-avatar-row">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                className="h-8 w-8 rounded-full object-cover border border-cyan-100"
              />
              <div className="text-left leading-tight">
                <span className="text-[10px] text-gray-400 block font-semibold uppercase tracking-wider">
                  {lang === "ID" ? "Selamat Datang" : "Welcome Back"}
                </span>
                <span className="font-sans text-xs font-bold text-brand-primary block">Ahmadullah</span>
              </div>
            </div>

            {/* Bell Alarm indicator */}
            <div className="relative cursor-pointer p-2 text-gray-500 hover:text-brand-primary hover:bg-slate-50 rounded-full transition-colors hidden sm:block">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </div>

            {/* Heart Quick Indicator */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-gray-500 hover:text-brand-primary hover:bg-slate-50 rounded-full transition-colors"
              aria-label="Open Wishlist"
              id="top-wishlist-indicator"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Indicator */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-500 hover:text-brand-primary hover:bg-slate-50 rounded-full transition-colors flex items-center gap-1.5 font-semibold"
              aria-label="Open Shopping Cart"
              id="top-cart-indicator"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-600 text-white font-mono text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-white">
                    {cartCount}
                  </span>
                )}
              </div>
            </button>

            {/* Contact CTA on Header directly as prompt requests contact form */}
            <button
              onClick={() => onScrollToSection("contact-section")}
              className="hidden sm:inline-flex bg-brand-teal text-white hover:bg-brand-teal-dark font-sans font-bold text-xs px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              {t.contactUs}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => onLangChange(lang === "EN" ? "ID" : "EN")}
              className="md:hidden flex items-center gap-1 font-bold text-xs border border-gray-200 px-2 py-1 rounded"
            >
              <span>{lang === "EN" ? "EN" : "ID"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. CATEGORY SCROLL RIBBON (Exactly as referenced in light background below navigation) */}
      <div className="bg-[#F1F5F9] border-b border-gray-200/60 overflow-x-auto hide-scrollbar py-2.5 px-4 shadow-inner" id="category-scroller">
        <div className="max-w-7xl mx-auto flex flex-col gap-2">
          {/* Main category level selector track */}
          <div className="flex items-center gap-2 font-sans text-xs font-semibold whitespace-nowrap min-w-max">
            <button
              onClick={() => {
                onSelectCategory("all");
                onSelectIphoneModel("All");
              }}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeCategory === "all"
                  ? "bg-brand-teal text-white shadow-sm font-bold"
                  : "text-gray-600 hover:text-brand-primary hover:bg-slate-200/85"
              }`}
            >
              {t.allCategories}
            </button>
            <div className="h-4 w-[1.5px] bg-gray-300"></div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (cat.id !== "iphone") {
                    onSelectIphoneModel("All");
                  }
                }}
                className={`px-3.5 py-1.5 rounded-md transition-all ${
                  activeCategory === cat.id
                    ? "bg-brand-teal text-white shadow-sm font-bold"
                    : "text-gray-600 hover:text-brand-primary hover:bg-slate-200/85"
                }`}
                id={`cat-pill-${cat.id}`}
              >
                {lang === "ID" ? cat.name_id : cat.name}
              </button>
            ))}
          </div>

          {/* Sub menu: iPhone Models (7, 8, X, 11, 12, 13, 14, 15) as requested by user */}
          {activeCategory === "iphone" && (
            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-300/65 animate-fade-in whitespace-nowrap min-w-max text-[11px] font-sans">
              <span className="text-gray-500 font-extrabold uppercase tracking-wide pr-2 select-none">
                {lang === "ID" ? "Pilih Seri iPhone:" : "Filter iPhone Model:"}
              </span>
              {["All", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone X", "iPhone 8", "iPhone 7"].map((model) => (
                <button
                  key={model}
                  onClick={() => onSelectIphoneModel(model)}
                  className={`px-3 py-1 rounded-full transition-all font-bold ${
                    selectedIphoneModel === model
                      ? "bg-[#0E7490] text-white shadow-md"
                      : "bg-white text-gray-600 hover:text-brand-primary hover:bg-slate-50 border border-gray-100"
                  }`}
                >
                  {model}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
