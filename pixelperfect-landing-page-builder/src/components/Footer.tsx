import React, { useState } from "react";
import { Send, CheckCircle, Apple, Award } from "lucide-react";
import { Language } from "../utils/lang";

interface FooterProps {
  onScrollToSection: (elementId: string) => void;
  lang: Language;
}

export default function Footer({ onScrollToSection, lang }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 font-sans text-sm" id="main-footer">
      
      {/* Upper columns sector */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12" id="footer-uppermain">
        
        {/* Brand identity (Left 4-Columns) */}
        <div className="lg:col-span-4 text-left space-y-6" id="footer-column-brandinfo">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-black tracking-tight text-white flex items-center gap-1">
              <span>{lang === "ID" ? "iBOX" : "CHIPS"}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {lang === "ID" 
                ? "Destinasi terkemuka dan distributor resmi Indonesia untuk perangkat Apple orisinal, asuransi iBox Care+, MacBook, Apple Watch, serta aksesoris gadget premium buatan global."
                : "Kuwait's leading authorized destination for premium smart wearable straps, spatial computer devices, and custom-fitted gadget defense. Enjoy same-day delivery nationwide."}
            </p>
          </div>

          {/* Badges of trust */}
          <div className="space-y-2.5 pt-2" id="footer-trust-badges">
            <div className="flex gap-2 items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <Award className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <span>{lang === "ID" ? "100% Produk Resmi & Bergaransi" : "100% Authorized Products"}</span>
            </div>
            <div className="flex gap-2 items-center text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <Apple className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <span>{lang === "ID" ? "Mitra Utama Resmi Apple" : "Apple Certified Partner"}</span>
            </div>
          </div>
        </div>

        {/* Menu columns (Mid 5-Columns) */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-4 sm:gap-6 text-left" id="footer-menu-links">
          {/* Col 1 */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
              {lang === "ID" ? "Perusahaan" : "Company"}
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
              <li><button onClick={() => onScrollToSection("contact-section")} className="hover:text-cyan-400">{lang === "ID" ? "Hubungi Kami" : "Contact Us"}</button></li>
              <li><button onClick={() => onScrollToSection("stores-section")} className="hover:text-cyan-400">{lang === "ID" ? "Toko Gerai" : "Our Shops"}</button></li>
              <li><a href="#about" className="hover:text-cyan-400">{lang === "ID" ? "Tentang Kami" : "About Us"}</a></li>
              <li><a href="#faqs" className="hover:text-cyan-400">FAQs</a></li>
              <li><a href="#terms" className="hover:text-cyan-400">{lang === "ID" ? "Syarat & Ketentuan" : "Terms & Conditions"}</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
              Produk
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
              <li><a href="#mobiles" className="hover:text-cyan-400">iPhone Series</a></li>
              <li><a href="#macbooks" className="hover:text-cyan-400">MacBook</a></li>
              <li><a href="#watches" className="hover:text-cyan-400">Smart Watches</a></li>
              <li><a href="#accessories" className="hover:text-cyan-400">{lang === "ID" ? "Aksesoris" : "Accessories"}</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
              {lang === "ID" ? "Layanan Kami" : "Our Services"}
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-xs font-medium">
              <li><button onClick={() => onScrollToSection("categories-section")} className="hover:text-cyan-400">{lang === "ID" ? "Kategori Pilihan" : "Popular Catalog"}</button></li>
              <li><a href="#shipping" className="hover:text-cyan-400">{lang === "ID" ? "Asuransi iBox Care" : "iBox Care Warranty"}</a></li>
              <li><a href="#careers" className="hover:text-cyan-400">{lang === "ID" ? "Karir / Lowongan" : "Careers"}</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription Column (Right 3-Columns) */}
        <div className="lg:col-span-3 text-left space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800" id="footer-newsletter">
          <h4 className="text-white text-xs font-extrabold uppercase tracking-widest block">
            {lang === "ID" ? "Berlangganan Buletin" : "Subscribe To Our Newsletter"}
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed font-sans">
            {lang === "ID" 
              ? "Dapatkan info rilis produk terbaru, diskon musiman gila-gilaan, dan promo cashback eksklusif." 
              : "Subscribe to be the first to hear about special discount offers and new product drops."}
          </p>

          {isSubscribed ? (
            <div className="bg-emerald-950/40 border border-emerald-900 rounded-xl p-3 flex items-start gap-2 text-emerald-400 text-xs" id="news-success">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{lang === "ID" ? "Berhasil Berlangganan!" : "Successfully Subscribed!"}</p>
                <p className="text-[10px] text-emerald-500 mt-0.5">{lang === "ID" ? "Terima kasih, penawaran menarik segera dikirim." : "We will keep you informed of exclusive offers."}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2" id="newsletter-form">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder={lang === "ID" ? "Alamat Email Anda" : "Your Email Address"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs bg-slate-800 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 placeholder-slate-500 text-white focus:outline-none transition-colors"
                  id="newsletter-email-input"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-700 hover:bg-cyan-600 active:bg-cyan-800 text-white font-sans font-bold text-xs py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                id="newsletter-subscribe-btn"
              >
                <span>{lang === "ID" ? "BERLANGGANAN" : "SUBSCRIBE NOW"}</span>
                <Send className="h-3 w-3" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Extreme bottom row credit & copyright details */}
      <div className="border-t border-slate-800/80 bg-[#070D19]/40 py-6 px-4" id="footer-subbar border-t">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="text-center sm:text-left font-sans">
            <span>&copy; {new Date().getFullYear()} {lang === "ID" ? "iBOX - Erajaya Group & CHIPS Indonesia. Hak cipta dilindungi." : "CHIPS Kuwait. Designed & Engineered with precision inside Google AI Studio. "}</span>
            <span className="text-[#0891B2] font-semibold block sm:inline">{lang === "ID" ? " Distributor Resmi Apple." : " Authorized Dealer."}</span>
          </div>

          <div className="flex gap-4 font-sans" id="subbar-links">
            <a href="#payment-methods" className="hover:text-slate-400">
              {lang === "ID" ? "Pembayaran Aman: Kartu Debit/Kredit, QRIS, Apple Pay, BCA KlikPay" : "Payment Methods Supported: K-Net, Credit Card, Apple Pay"}
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
