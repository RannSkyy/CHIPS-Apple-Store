import React, { useState } from "react";
import { Send, Phone, Mail, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Language } from "../utils/lang";

interface ContactFormProps {
  lang: Language;
}

export default function ContactForm({ lang }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "support",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [refCode, setRefCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    // Simulate API storage latency
    setTimeout(() => {
      const code = "iBOX-" + Math.floor(100000 + Math.random() * 900000);
      setRefCode(code);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "support", message: "" });
    }, 1500);
  };

  return (
    <section className="bg-slate-50 py-12 px-4 border-y border-gray-100" id="contact-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid-wrapper">
          
          {/* Support Channels & Social info Column (Left 5-Columns) */}
          <div className="lg:col-span-5 text-left space-y-8" id="contact-faq-column">
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0891B2]">
                {lang === "ID" ? "DUKUNGAN PELANGGAN" : "CUSTOMER SUPPORT"}
              </span>
              <h2 className="font-sans font-black text-3xl text-brand-primary tracking-tight">
                {lang === "ID" ? "Hubungi iBox & CHIPS" : "Get In Touch With CHIPS"}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md font-sans">
                {lang === "ID" 
                  ? "Punya pertanyaan tentang Garansi Resmi Apple iBox Anda, pesanan hadiah massal, atau ketersediaan stok MacBook Pro? Hubungi perwakilan teknis ahli kami secara instan."
                  : "Have questions about your Apple Warranty, a gift card order, or custom strap fittings? Submit a claim or reach out directly to our expert technical representatives."}
              </p>
            </div>

            {/* Quick Channel Lists */}
            <div className="space-y-4" id="contact-channels-list">
              <div className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
                <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-primary">
                    {lang === "ID" ? "Hotline 24/7 Kami" : "Our 24/7 Hotline"}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === "ID" ? "Hubungi kapan saja aman dari penipuan" : "Call us anytime inside Kuwait"}
                  </p>
                  <a href="tel:22289111" className="text-sm font-semibold text-brand-teal hover:underline block mt-1 font-mono">
                    {lang === "ID" ? "+62 21 72781111" : "+965 22289111"}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
                <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-primary">
                    {lang === "ID" ? "Alamat Email Langsung" : "Direct Email Address"}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === "ID" ? "Untuk pertanyaan kerja sama institusi, B2B, dan keluhan umum" : "For B2B orders and generic support enquiries"}
                  </p>
                  <a href="mailto:support@chips.com.kw" className="text-sm font-semibold text-brand-teal hover:underline block mt-1 font-mono">
                    {lang === "ID" ? "support@ibox.co.id" : "support@chips.com.kw"}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-xs">
                <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 flex-shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-brand-primary">
                    {lang === "ID" ? "Jam Operasional Toko" : "Opening Hours"}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5 font-semibold">
                    {lang === "ID" ? "Setiap Hari Senin s.d Minggu (Termasuk Hari Libur)" : "Everyday (Including Friday)"}
                  </p>
                  <span className="text-sm font-medium text-slate-700 block mt-1">
                    {lang === "ID" ? "10:00 AM s.d 10:00 PM (WIB)" : "09:00 AM to 10:00 PM (KST)"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Input Form Container Column (Right 7-Columns) */}
          <div className="lg:col-span-7" id="contact-form-column">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 relative overflow-hidden" id="contact-form-card">
              
              {status === "success" ? (
                /* Success Layout */
                <div className="text-center py-8 space-y-4" id="feedback-success">
                  <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-xs">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="font-sans font-black text-2xl text-brand-primary">
                    {lang === "ID" ? "Pesan Terkirim dengan Sukses!" : "Message Sent Successfully!"}
                  </h3>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl max-w-md mx-auto space-y-1">
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wide">
                      {lang === "ID" ? "KODE REFERENSI TIKET" : "Your Reference Code"}
                    </span>
                    <p className="font-mono text-lg font-black text-brand-teal">{refCode}</p>
                    <p className="text-xs text-gray-500">
                      {lang === "ID" 
                        ? "Tim dukungan iBox kami akan mengirimkan email atau menghubungi Anda kembali dalam waktu maksimal 2 jam kerja."
                        : "Our support desk will email or call you within 2 business hours."}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-4 px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg font-sans text-xs font-bold transition-all shadow-sm"
                    id="back-contact-btn"
                  >
                    {lang === "ID" ? "Kirim Pesan Lain" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                /* Main Form layout */
                <form onSubmit={handleSubmit} className="space-y-4 text-left" id="support-contact-form">
                  <h3 className="font-sans font-bold text-lg text-brand-primary border-b border-gray-50 pb-2">
                    {lang === "ID" ? "Kirimkan Pesan Bantuan" : "Send Us an Inquiry"}
                  </h3>

                  {status === "error" && (
                    <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 flex items-center gap-2 text-rose-600 text-xs font-semibold" id="contact-error-banner">
                      <AlertCircle className="h-4 w-4" />
                      <span>{lang === "ID" ? "Harap lengkapi semua kolom yang wajib diisi (*)." : "Please complete all required fields (*)."}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-grid-names">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide block">
                        {lang === "ID" ? "Nama Lengkap" : "Full Name"} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === "ID" ? "misal: Ahmadullah Al-Farsi" : "e.g. Ahmadullah Al-Farsi"}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full text-sm bg-slate-50 border border-slate-100 hover:border-gray-200 focus:border-cyan-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all text-gray-800"
                        id="contact-name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide block">
                        {lang === "ID" ? "Alamat Email" : "Email Address"} <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. customer@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full text-sm bg-slate-50 border border-slate-100 hover:border-gray-200 focus:border-cyan-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all text-gray-800"
                        id="contact-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="form-grid-phones">
                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide block">
                        {lang === "ID" ? "Nomor Handphone" : "Mobile Phone"}
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +62 812-3456-7890"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full text-sm bg-slate-50 border border-slate-100 hover:border-gray-200 focus:border-cyan-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all text-gray-800 font-mono"
                        id="contact-phone"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide block">
                        {lang === "ID" ? "Subjek / Bidang Masalah" : "Department / Inquiry Subject"}
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full text-sm bg-slate-50 border border-slate-100 hover:border-gray-200 focus:border-cyan-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all text-gray-800 cursor-pointer"
                        id="contact-subject"
                      >
                        <option value="support">{lang === "ID" ? "Dukungan Pelanggan Umum" : "General Customer Support"}</option>
                        <option value="warranty">{lang === "ID" ? "Klaim Garansi Resmi Apple iBox" : "Apple Official Warranty Claim"}</option>
                        <option value="corporate">{lang === "ID" ? "Pesanan Institusi & Massal" : "Corporate & Bulk Business Orders"}</option>
                        <option value="feedback">{lang === "ID" ? "Umpan Balik Layanan iBox" : "Store Experience Feedback"}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1" id="form-block-msg">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide block">
                      {lang === "ID" ? "Tuliskan Pertanyaan Anda" : "Explain Your Concern"} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={lang === "ID" ? "Jelaskan dengan detail keluhan Anda, model iPhone, atau nomor IMEI jika ada..." : "Explain your problem, product model, serial number..."}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full text-sm bg-slate-50 border border-slate-100 hover:border-gray-200 focus:border-cyan-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none transition-all text-gray-800 resize-none font-sans"
                      id="contact-msg-body"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#0E7490] hover:bg-cyan-700 disabled:bg-slate-300 text-white py-3.5 px-4 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md mt-6 cursor-pointer"
                    id="contact-submit-btn"
                  >
                    <span>{status === "loading" ? (lang === "ID" ? "SEDANG MANGIRIM..." : "TRANSMITTING MESSAGE...") : (lang === "ID" ? "KIRIM PESAN" : "SEND MESSAGE")}</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
