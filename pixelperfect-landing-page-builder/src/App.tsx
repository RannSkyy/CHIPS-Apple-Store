import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PromoGrid from "./components/PromoGrid";
import FeaturedCategories from "./components/FeaturedCategories";
import ProductCard from "./components/ProductCard";
import StoreLocations from "./components/StoreLocations";
import ContactForm from "./components/ContactForm";
import BrandLogos from "./components/BrandLogos";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";

import { CATEGORIES, PRODUCTS } from "./data";
import { Product, CartItem } from "./types";
import { SlidersHorizontal, Trash2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Language, TRANSLATIONS } from "./utils/lang";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrandFilter, setActiveBrandFilter] = useState<string | null>(null);
  
  // Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Status message state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic localization and iPhone model filtering state
  const [lang, setLang] = useState<Language>("ID");
  const [selectedIphoneModel, setSelectedIphoneModel] = useState<string>("All");

  const t = TRANSLATIONS[lang];

  // Trigger brief alert-toast when item changes
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart Management
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const matchIndex = prev.findIndex((item) => item.product.id === product.id);
      if (matchIndex > -1) {
        const copy = [...prev];
        copy[matchIndex].quantity += 1;
        return copy;
      }
      return [...prev, { product, quantity: 1 }];
    });
    triggerToast(
      lang === "ID"
        ? `Berhasil ditambahkan: ${product.brand} - ${product.name.slice(0, 20)}... ke Keranjang!`
        : `Added ${product.brand} - ${product.name.slice(0, 20)}... to Cart!`
    );
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    triggerToast(lang === "ID" ? "Barang dihapus dari keranjang belanja" : "Item removed from your cart");
  };

  const handleClearCart = () => {
    setCart([]);
    triggerToast(lang === "ID" ? "Keranjang belanja dikosongkan" : "Cleared your shopping cart");
  };

  // Wishlist Handling
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const isBookmarked = prev.some((p) => p.id === product.id);
      if (isBookmarked) {
        triggerToast(lang === "ID" ? "Dihapus dari daftar keinginan" : "Removed from wishlist");
        return prev.filter((p) => p.id !== product.id);
      } else {
        triggerToast(lang === "ID" ? "Ditambahkan ke daftar keinginan! ❤️" : "Added to wishlist! ❤️");
        return [...prev, product];
      }
    });
  };

  // Scoping category / Filter reset
  const handleSelectCategory = (catId: string) => {
    setActiveCategory(catId);
    setActiveBrandFilter(null); // Reset brand scope on category selection for better usability
  };

  const handleSelectBrandFilter = (brandName: string) => {
    setActiveBrandFilter(brandName);
    setActiveCategory("all"); // Reset category on brand filter so users can view all accessories of that brand
  };

  const handleClearBrandFilter = () => {
    setActiveBrandFilter(null);
  };

  const handleScrollToSection = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Dynamic products classification
  const filteredProductsPool = PRODUCTS.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesBrand = !activeBrandFilter || p.brand.toLowerCase() === activeBrandFilter.toLowerCase();
    const matchesModel = activeCategory !== "iphone" || selectedIphoneModel === "All" || p.modelFamily === selectedIphoneModel;
    return matchesCategory && matchesBrand && matchesModel;
  });

  const hotPicks = PRODUCTS.filter((p) => p.badge === "Hot Pick");
  const newArrivals = PRODUCTS.filter((p) => p.badge === "New Arrival");
  const bestSellers = PRODUCTS.filter((p) => p.badge === "Best Seller");

  const totalCartCount = cart.reduce((acc, current) => acc + current.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-brand-primary selection:bg-cyan-100 selection:text-brand-primary" id="applet-container">
      
      {/* 1. BRAND GLOBAL HEADER */}
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        products={PRODUCTS}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onAddToCart={handleAddToCart}
        onScrollToSection={handleScrollToSection}
        lang={lang}
        onLangChange={setLang}
        selectedIphoneModel={selectedIphoneModel}
        onSelectIphoneModel={setSelectedIphoneModel}
      />

      {/* 2. MAIN PROMOTION SLIDER HERO & BRANDS */}
      {activeCategory === "all" && !activeBrandFilter && (
        <>
          <Hero onScrollToSection={handleScrollToSection} lang={lang} />
          <PromoGrid onSelectBrandFilter={handleSelectBrandFilter} />
        </>
      )}

      {/* 3. CORE ADAPTIVE APP VIEWER */}
      <main className="pb-16" id="main-content-flow">
        
        {/* CASE A: GRID RESULTS FILTER SHOWN (If filters are actively set by user) */}
        {(activeCategory !== "all" || activeBrandFilter) ? (
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-8" id="filter-results-catalog">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 text-left">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-teal uppercase tracking-widest">
                  <span>{lang === "ID" ? "Pusat Belanja" : "Shopping Hub"}</span>
                  <span>/</span>
                  <span className="text-gray-400">
                    {activeCategory !== "all" 
                      ? (lang === "ID" ? CATEGORIES.find((c) => c.id === activeCategory)?.name_id : CATEGORIES.find((c) => c.id === activeCategory)?.name)
                      : `Brand: ${activeBrandFilter}`}
                    {activeCategory === "iphone" && selectedIphoneModel !== "All" && ` (${selectedIphoneModel})`}
                  </span>
                </div>
                <h2 className="font-sans font-black text-3xl text-brand-primary tracking-tight mt-1">
                  {lang === "ID" ? "Eksplorasi Katalog Pilihan" : "Filtered Catalog Selection"}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  {lang === "ID" 
                    ? `Menampilkan ${filteredProductsPool.length} gadget & aksesoris terbaik untuk Anda.` 
                    : `Showing ${filteredProductsPool.length} premium accessories matching your filter.`}
                </p>
              </div>

              {/* Clear Controls */}
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setActiveBrandFilter(null);
                  setSelectedIphoneModel("All");
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50/50 hover:bg-rose-50 px-4 py-2 rounded-xl transition-all border border-rose-100/40 w-fit self-start cursor-pointer"
                id="reset-filter-btn"
              >
                <span>{lang === "ID" ? "Hapus Semua Filter" : "Clear All Filters"}</span>
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* If zero matches */}
            {filteredProductsPool.length === 0 ? (
              <div className="py-24 text-center space-y-4 max-w-sm mx-auto" id="results-empty-state">
                <div className="p-4 bg-slate-50 text-gray-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <SlidersHorizontal className="h-8 w-8" />
                </div>
                <p className="font-sans font-bold text-lg text-brand-primary">
                  {lang === "ID" ? "Produk Kosong atau Habis" : "No Matching Products"}
                </p>
                <p className="text-xs text-gray-400">
                  {lang === "ID" 
                    ? "Belum ada produk untuk seri iPhone yang Anda pilih. Silakan ganti model filter."
                    : "There are currently no items under this specific segment. Browse other categories."}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setActiveBrandFilter(null);
                    setSelectedIphoneModel("All");
                  }}
                  className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white font-sans text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  {lang === "ID" ? "Kembali ke Toko Utama" : "Return to Home Store"}
                </button>
              </div>
            ) : (
              /* Filtered Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="filtered-products-grid">
                {filteredProductsPool.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    isWishlisted={wishlist.some((w) => w.id === item.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* CASE B: PRESETED SECTIONS FOR HOMEPAGE DISPLAY (as requested in exact design reference) */
          <div className="space-y-16" id="homepage-scaffold">
            
            {/* Home Category Circular/Bento Hub */}
            <FeaturedCategories
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={handleSelectCategory}
              onScrollToSection={handleScrollToSection}
              lang={lang}
            />

            {/* Section A: CHIPS Hot Picks */}
            <section className="max-w-7xl mx-auto px-4 text-left space-y-6" id="hot-picks-section">
              <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0891B2]">
                    {lang === "ID" ? "PENAWARAN TERBAIK MINGGU INI" : "BEST OFFERINGS THIS WEEK"}
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-brand-primary tracking-tight">
                    {lang === "ID" ? "iBOX Edisi Rekomendasi" : "CHIPS Hot Picks"}
                  </h2>
                </div>
              </div>

              {/* Grid representation standard to image (5-columns or responsive) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4" id="hot-picks-grid">
                {hotPicks.map((item) => (
                  <div key={item.id} className="h-full">
                    <ProductCard
                      product={item}
                      isWishlisted={wishlist.some((w) => w.id === item.id)}
                      onToggleWishlist={handleToggleWishlist}
                      onAddToCart={handleAddToCart}
                      lang={lang}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Premium intermediate banner explaining services */}
            <section className="bg-slate-50 border-y border-slate-100 py-10 px-4" id="warranty-strip">
              <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="flex gap-4 items-start p-4">
                  <ShieldCheck className="h-10 w-10 text-cyan-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-brand-primary">
                      {lang === "ID" ? "Garansi Resmi iBox 1 Tahun" : "1 Year Official Warranty"}
                    </h4>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {lang === "ID" ? "Kerusakan pabrikasi ditanggung asuransi resmi Apple Authorized" : "Apple authorized & brand replacement services"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 border-y sm:border-y-0 sm:border-x border-slate-200">
                  <Truck className="h-10 w-10 text-cyan-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-brand-primary">
                      {lang === "ID" ? "Pengiriman Cepat Nasional" : "Fast Delivery Nationwide"}
                    </h4>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {lang === "ID" ? "Asuransi kirim instan tiba dalam beberapa jam saja" : "Delivered to your home in Kuwait within 2-4 hours"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4">
                  <RotateCcw className="h-10 w-10 text-cyan-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-brand-primary">
                      {lang === "ID" ? "Kemudahan Retur 14 Hari" : "Easy returns within 14 Days"}
                    </h4>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {lang === "ID" ? "Tinggal kunjungi cabang resmi iBox terdekat manapun" : "Simply return to one of our branches hassle-free"}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section B: New Arrival */}
            <section className="max-w-7xl mx-auto px-4 text-left space-y-6" id="new-arrivals-section">
              <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0891B2]">
                    {lang === "ID" ? "EDISI PRODUK TERBARU" : "NEW STRAPS & GADGET SENSATION"}
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-brand-primary tracking-tight">
                    {lang === "ID" ? "Koleksi Rilisan Baru" : "New Arrivals"}
                  </h2>
                </div>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="new-arrivals-grid">
                {newArrivals.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    isWishlisted={wishlist.some((w) => w.id === item.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    lang={lang}
                  />
                ))}
              </div>
            </section>

            {/* Brand Logo Slider section */}
            <BrandLogos
              onSelectBrandFilter={handleSelectBrandFilter}
              activeBrandFilter={activeBrandFilter}
              onClearBrandFilter={handleClearBrandFilter}
            />

            {/* Section C: Best Sellers */}
            <section className="max-w-7xl mx-auto px-4 text-left space-y-6" id="best-sellers-section">
              <div className="flex justify-between items-end border-b border-gray-100 pb-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0891B2]">
                    {lang === "ID" ? "SANGAT DIMINATI KONSUMEN" : "OVERWHELMINGLY ACCLAIMED"}
                  </span>
                  <h2 className="font-sans font-black text-2xl sm:text-3xl text-brand-primary tracking-tight">
                    {lang === "ID" ? "Kategori Paling Laris" : "Best Sellers"}
                  </h2>
                </div>
              </div>

              {/* Grid representation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="best-sellers-grid">
                {bestSellers.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    isWishlisted={wishlist.some((w) => w.id === item.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    lang={lang}
                  />
                ))}
              </div>
            </section>

          </div>
        )}

        {/* 4. PHYSICAL BRANCH LOCATIONS AT Malls */}
        <StoreLocations lang={lang} />

        {/* 5. USER CONTACT SUBMISSION REQUEST SECTION (Form Kontak) */}
        <ContactForm lang={lang} />

      </main>

      {/* 6. BRAND FOOTER (Newsletter Sign up details) */}
      <Footer onScrollToSection={handleScrollToSection} lang={lang} />

      {/* 7. SLIDEOUT CART DRAWER ELEMENT */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        lang={lang}
      />

      {/* 8. SLIDEOUT WISHLIST DRAWER ELEMENT */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        lang={lang}
      />

      {/* 9. TOAST ALERTS NOTIFIER */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 bg-slate-900 border border-slate-800 text-white font-sans text-xs font-bold px-4 py-3 rounded-xl shadow-2xl z-55 animate-slide-up flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
