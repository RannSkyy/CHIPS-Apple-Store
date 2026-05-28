import React, { useState } from "react";
import { MapPin, Phone, Clock, ArrowUpRight, Compass, X, Navigation } from "lucide-react";
import { STORES } from "../data";
import { Store } from "../types";
import { Language } from "../utils/lang";

interface StoreLocationsProps {
  lang: Language;
}

export default function StoreLocations({ lang }: StoreLocationsProps) {
  const [selectedRouteStore, setSelectedRouteStore] = useState<Store | null>(null);
  const [startPoint, setStartPoint] = useState("");
  const [simulatedRoute, setSimulatedRoute] = useState("");

  const handleSimulateDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startPoint) return;
    
    // Simulate routes inside Jakarta or Kuwait City depending on language
    const ID_routes = [
      `Keluar Tol Dalam Kota menuju gerbang Semanggi. Lurus ke arah Jl. Jend. Sudirman. ETA 12 mnt.`,
      `Via Jl. Arteri Pondok Indah, belok kiri setelah halte TransJakarta. Kondisi jalan lancar. ETA 15 mnt.`,
      `Tetap di jalur kiri Jl. Asia Afrika, masuk melalui pintu akses utama Mall Senayan City. ETA 10 mnt.`,
    ];
    const EN_routes = [
      `Head Nord towards 5th Ring Road. Continue over Ghazali Expy. ETA 12 mins.`,
      `Via Kuwait City 40 Highway, take the Exit to Faris Al Waqayan St. Traffic light clear. ETA 15 mins.`,
      `Merge onto Al-Ghazali St path. Follow route signs for Trade Center malls. ETA 10 mins.`,
    ];

    const routeList = lang === "ID" ? ID_routes : EN_routes;
    setSimulatedRoute(routeList[Math.floor(Math.random() * routeList.length)]);
  };

  return (
    <section className="bg-white py-14 px-4 border-t border-gray-100" id="stores-section">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section title */}
        <div className="text-left space-y-1.5 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#0891B2]">
            {lang === "ID" ? "KUNJUNGI GERAI KAMI" : "VISIT OUR STORES"}
          </span>
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-brand-primary tracking-tight">
            {lang === "ID" ? "Produk Orisinal di Dekat Anda" : "Original Products Near You"}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed font-sans">
            {lang === "ID" 
              ? "Kunjungi gerai fisik iBox kami di Indonesia untuk merasakan langsung genggaman lini iPhone 15 Pro, mencoba kedalaman spatial Apple Watch Ultra 2, atau melakukan klaim asuransi resmi."
              : "Stop by any of our physical outlets in Kuwait to experience the premium build of our straps, try out the spatial depth of the Apple Vision Pro, or pick up a gift card."}
          </p>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="stores-list-wrapper">
          {STORES.map((store) => (
            <div
              key={store.id}
              className="bg-slate-50/70 border border-gray-100/80 rounded-3xl overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all flex flex-col justify-between"
              id={`store-card-${store.id}`}
            >
              {/* Image block */}
              <div className="h-56 w-full relative">
                <img
                  src={store.imageUrl}
                  alt={store.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-102"
                />
                <div className="absolute top-4 left-4 bg-[#0F172A] text-white px-3.5 py-1.5 rounded-xl font-sans text-xs font-extrabold uppercase tracking-widest shadow-md">
                  {lang === "ID" ? `Cabang ${store.name_id || store.name}` : `${store.name} Branch`}
                </div>
              </div>

              {/* Text content details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between text-left space-y-6">
                <div className="space-y-4">
                  <h3 className="font-sans font-black text-xl text-brand-primary">
                    {lang === "ID" ? (store.name_id || store.name) : store.name}
                  </h3>

                  <div className="space-y-3 font-sans text-xs sm:text-sm text-gray-600">
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="h-4.5 w-4.5 text-brand-teal flex-shrink-0 mt-0.5" />
                      <span>{lang === "ID" ? (store.address_id || store.address) : store.address}</span>
                    </div>

                    <div className="flex gap-2.5 items-center">
                      <Phone className="h-4.5 w-4.5 text-brand-teal flex-shrink-0" />
                      <a href={`tel:${store.phone}`} className="hover:underline text-brand-teal font-semibold font-mono">
                        {store.phone}
                      </a>
                    </div>

                    <div className="flex gap-2.5 items-center">
                      <Clock className="h-4.5 w-4.5 text-brand-teal flex-shrink-0" />
                      <div>
                        <span>{lang === "ID" ? "Jam Operasional: " : "Daily Hours: "}</span>
                        <span className="font-bold text-brand-primary">{store.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Simulated "GET DIRECTION" matching e-commerce layout */}
                <button
                  onClick={() => setSelectedRouteStore(store)}
                  className="w-full sm:w-fit px-6 py-3 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-xl font-sans font-extrabold text-xs tracking-wider transition-all uppercase flex items-center justify-center gap-2 group cursor-pointer"
                  id={`get-directions-${store.id}`}
                >
                  <Compass className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
                  <span>{lang === "ID" ? "PETUNJUK ARAH" : "GET DIRECTIONS"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Directions simulated overlay */}
        {selectedRouteStore && (
          <div className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative border border-gray-100 shadow-2xl animate-scale-up text-left">
              <button
                onClick={() => {
                  setSelectedRouteStore(null);
                  setStartPoint("");
                  setSimulatedRoute("");
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-slate-50 p-1.5 rounded-full-wrapper"
                id="close-directions-btn"
                style={{ borderRadius: "100%", padding: "5px" }}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-teal">
                  {lang === "ID" ? "NAVIGASI SIMULASI" : "ROUTING NAVIGATOR"}
                </span>
                <h3 className="font-sans font-black text-xl text-brand-primary">
                  {lang === "ID" ? `Rute Menuju ${selectedRouteStore.name_id || selectedRouteStore.name}` : `Let's Navigate to ${selectedRouteStore.name}`}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === "ID" ? "Simulasikan rute mobil optimal Anda dari mana saja di Jakarta." : "Simulate your optimal car route from any starting point in Kuwait."}
                </p>
              </div>

              <form onSubmit={handleSimulateDirections} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
                    {lang === "ID" ? "Lokasi Keberangkatan Anda" : "Starting Location in Kuwait"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "ID" ? "misal: Kemang, Sudirman, Pondok Indah, Bekasi..." : "e.g. Salmiya, Hawally, Sabah Al Salem..."}
                    value={startPoint}
                    onChange={(e) => {
                      setStartPoint(e.target.value);
                      setSimulatedRoute("");
                    }}
                    className="w-full text-sm border border-gray-200 focus:border-cyan-500 rounded-xl px-4 py-3 focus:outline-none"
                    id="directions-start-input"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0E7490] hover:bg-cyan-700 text-white font-sans font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>{lang === "ID" ? "HITUNG ESTIMASI WAKTU" : "CALCULATE ROUTE TIMING"}</span>
                </button>
              </form>

              {simulatedRoute && (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1 animate-fade-in">
                  <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#0891B2]">
                    {lang === "ID" ? "Rekomendasi Jalur Tercepat" : "Optimal Path Directions"}
                  </span>
                  <p className="text-sm font-semibold text-gray-800 leading-relaxed font-sans">
                    {simulatedRoute}
                  </p>
                  <div className="flex gap-4 pt-2 font-sans text-[11px] text-gray-400 font-medium">
                    <span>{lang === "ID" ? "Keberangkatan: Sekarang" : "Departure: Now"}</span>
                    <span>{lang === "ID" ? "Jarak: Sekitar 10.4 Km" : "Distance: Approx 12.3 km"}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
