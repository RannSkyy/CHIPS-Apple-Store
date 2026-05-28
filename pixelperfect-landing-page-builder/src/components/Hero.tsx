import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Apple, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CAROUSEL_SLIDES } from "../data";
import { Language } from "../utils/lang";

interface HeroProps {
  onScrollToSection: (elementId: string) => void;
  lang: Language;
}

export default function Hero({ onScrollToSection, lang }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto play slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const slide = CAROUSEL_SLIDES[currentSlide];
  
  const displayTitle = lang === "ID" && slide.title_id ? slide.title_id : slide.title;
  const displaySubtitle = lang === "ID" && slide.subtitle_id ? slide.subtitle_id : slide.subtitle;
  const displayBadge = lang === "ID" && slide.badge_id ? slide.badge_id : slide.badge;
  const displayCta = lang === "ID" && slide.ctaText_id ? slide.ctaText_id : slide.ctaText;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-teal-50 to-cyan-100/60" id="hero-banner-carousel">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-16 relative min-h-[460px] lg:min-h-[580px] flex items-center">
        
        {/* Animated Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full"
            id={`hero-slide-${slide.id}`}
          >
            {/* Text description on Left */}
            <div className="lg:col-span-5 space-y-5 text-left z-10" id="hero-text-block">
              {displayBadge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 rounded-full border border-teal-100 text-[10px] font-extrabold text-brand-teal uppercase tracking-widest leading-none shadow-sm">
                  <Apple className="h-3 w-3 fill-brand-teal text-brand-teal" />
                  <span>{displayBadge}</span>
                </span>
              )}
              
              <h1 className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl text-brand-primary leading-[1.1] tracking-tight">
                {displayTitle.split(" ").map((word, i) => (
                  <span key={i} className={i >= 2 ? "text-[#0891B2] block lg:inline" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h1>

              <p className="font-sans text-gray-500 text-sm sm:text-base max-w-md leading-relaxed">
                {displaySubtitle}
              </p>

              {/* Action Link Button exactly matches reference outline style */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onScrollToSection("hot-picks-section")}
                  className="px-8 py-3.5 border-2 border-brand-primary text-brand-primary font-sans font-bold text-sm rounded-full bg-transparent hover:bg-brand-primary hover:text-white transition-all shadow-sm flex items-center gap-2 group cursor-pointer"
                  id="hero-shop-cta"
                >
                  <span>{displayCta}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Img Section on Right - High End Showcase aligned carefully */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end items-center relative" id="hero-img-showcase">
              {/* Abstract decorative accent circle */}
              <div className="absolute h-72 w-72 sm:h-[420px] sm:w-[420px] rounded-full bg-cyan-200/40 blur-3xl z-0 pointer-events-none"></div>
              
              <img
                src={slide.imageUrl}
                alt={displayTitle}
                referrerPolicy="no-referrer"
                className="max-h-[300px] sm:max-h-[440px] z-10 drop-shadow-2xl object-contain border-0 p-2 transform hover:scale-[1.02] transition-transform duration-500"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicator dots bottom-left */}
        <div className="absolute bottom-6 left-4 lg:left-8 flex gap-2 z-20" id="carousel-dots-tracker">
          {CAROUSEL_SLIDES.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-brand-teal" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Left/Right manual sliders */}
        <div className="absolute bottom-6 right-4 lg:right-8 flex gap-2 z-20" id="carousel-nav-arrows">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-white hover:bg-slate-50 text-gray-700 shadow-sm border border-gray-100 hover:text-brand-primary transition-all cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-white hover:bg-slate-50 text-gray-700 shadow-sm border border-gray-100 hover:text-brand-primary transition-all cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
