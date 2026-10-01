"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CollectionItem } from "@/data/collectionsContent";

export default function ProductShowcaseSection({ item }: { item: CollectionItem }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedDimension, setSelectedDimension] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const currentImage = item.gallery[selectedImageIndex] || {
    url: item.image,
    label: "01. PRIMARY PERSPECTIVE",
  };

  const selectedDim = item.dimensions?.[selectedDimension];
  const selectedMat = item.materials?.[selectedMaterial];
  const fullImageUrl = origin ? `${origin}${currentImage.url}` : currentImage.url;

  const whatsappInquiryMessage = `*RK INLAY ATELIER - COMMISSION INQUIRY*
━━━━━━━━━━━━━━━━━━━━━
*Piece:* ${item.title}
*Archive Record:* ${item.archiveRecord}
*Category:* ${item.categoryLabel}
${selectedDim ? `*Selected Dimensions:* ${selectedDim.label} (${selectedDim.sublabel})` : ""}
${selectedMat ? `*Selected Marble Base:* ${selectedMat.name} (${selectedMat.subtext})` : ""}
*Benchmark Price:* ${item.price}
*Selected View:* ${currentImage.label}
*Image Reference:* ${fullImageUrl}
━━━━━━━━━━━━━━━━━━━━━
Hello RK Inlay, I am inquiring about commissioning this piece with the exact specifications and image reference above. Please provide delivery lead time, custom sizing options, and booking details.`;

  const whatsappInquiryUrl = `https://wa.me/917351586553?text=${encodeURIComponent(whatsappInquiryMessage)}`;

  return (
    <section className="w-full bg-surface py-8 lg:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ================= LEFT COLUMN: IMAGERY & CERTIFICATION ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl overflow-hidden shadow-xl border border-surface-container-highest bg-surface-container group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.url}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentImage.url}
                    alt={`${item.title} - ${currentImage.label}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className={`object-cover transition-transform duration-700 ${
                      isZoomed ? "scale-150 cursor-zoom-out" : "group-hover:scale-105 cursor-zoom-in"
                    }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Masterpiece Edition Tag top-left */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 font-label-caps text-[10px] tracking-[0.2em] uppercase text-white font-semibold">
                  {item.editionBadge}
                </span>
              </div>

              {/* Top-right Material Spec Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-black/10 font-label-caps text-[9px] tracking-wider uppercase text-primary font-bold">
                  MAKRANA GRADE-A • 98.6% CALCITE
                </span>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition-colors font-label-caps text-[10px] tracking-wider uppercase cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {isZoomed ? "zoom_out" : "zoom_in"}
                    </span>
                    <span>{isZoomed ? "RESET ZOOM" : "MACRO ZOOM"}</span>
                  </button>

                  <a
                    href={`https://wa.me/917351586553?text=${encodeURIComponent(
                      `Hello RK Inlay, please send 1:1 scale CAD (.DWG) drawing for ${item.title} (${item.archiveRecord}). Image reference: ${fullImageUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white hover:bg-black/90 transition-colors font-label-caps text-[10px] tracking-wider uppercase"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      architecture
                    </span>
                    <span>1:1 SCALE CAD</span>
                  </a>
                </div>

                <span className="font-sans text-[11px] text-white/80 font-medium hidden sm:inline">
                  {currentImage.label}
                </span>
              </div>
            </div>

            {/* Thumbnail Switcher (Supports 1, 2, or 3 images seamlessly) */}
            {item.gallery && item.gallery.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {item.gallery.map((img, idx) => {
                  const isSelected = selectedImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImageIndex(idx);
                        setIsZoomed(false);
                      }}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 text-left group cursor-pointer ${
                        isSelected
                          ? "border-secondary ring-2 ring-secondary/30 shadow-md"
                          : "border-surface-container-highest opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.url}
                        alt={img.label}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-2 inset-x-2 z-10">
                        <span className="font-label-caps text-[9px] uppercase tracking-wider text-white font-semibold truncate block">
                          {img.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Certified Parchin Kari Lapidary Art Guarantee Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container-highest shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span className="w-9 h-9 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                  <span className="material-symbols-outlined text-[20px]">
                    verified
                  </span>
                </span>
                <div>
                  <h4 className="font-serif text-base sm:text-lg text-primary font-bold tracking-tight">
                    Certified Parchin Kari Lapidary Art
                  </h4>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                    Authenticated under Master Lapidary Guild of Agra &amp; UNESCO Craft Intangible Heritage parameters.
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-secondary-fixed text-secondary font-label-caps text-[10px] uppercase tracking-widest font-bold shrink-0">
                GI REGISTERED
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: SPECS, PRICING & INQUIRY ================= */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Status Header Badge */}
              <div className="mb-3">
                <span className="font-label-caps text-[10px] tracking-[0.2em] uppercase text-secondary font-semibold">
                  AVAILABLE FOR COMMISSION • MADE TO ORDER IN TAJGANJ, AGRA
                </span>
              </div>

              {/* Archive Record Number */}
              <span className="font-label-caps text-[11px] uppercase tracking-[0.22em] text-on-surface-variant font-bold block mb-2">
                ARCHIVE RECORD • {item.archiveRecord}
              </span>

              {/* Title & Subtitle */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-primary tracking-tight leading-[1.12] mb-3">
                {item.title}
              </h1>

              <p className="font-serif italic text-base sm:text-lg text-secondary leading-relaxed mb-6">
                {item.italicSubtitle}
              </p>

              {/* Atelier Commission Benchmark Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-surface-container-highest shadow-sm mb-6">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest mb-3">
                  <span className="font-label-caps text-[10px] tracking-[0.2em] uppercase text-secondary font-bold">
                    ATELIER COMMISSION BENCHMARK
                  </span>
                  <span className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
                    GLOBAL PRIVILEGED FREIGHT
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-serif text-3xl sm:text-4xl text-primary font-normal">
                    {item.price}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant">
                    onwards (Ex-Agra Studio)
                  </span>
                </div>

                <p className="font-body-sm text-[12px] sm:text-xs text-on-surface-variant leading-relaxed">
                  {item.priceNote}
                </p>
              </div>

              {/* Diameter & Seating Capacity Selector */}
              {item.dimensions && item.dimensions.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between pb-2 border-b border-surface-container-highest mb-3">
                    <span className="font-label-caps text-[11px] tracking-[0.18em] uppercase text-secondary font-bold">
                      DIAMETER &amp; SEATING CAPACITY
                    </span>
                    <span className="font-sans text-xs text-on-surface-variant">
                      Standard Height: 76 cm (30 in)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.dimensions.map((dim, idx) => {
                      const isSelected = selectedDimension === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedDimension(idx)}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-surface-container border-primary shadow-xs"
                              : "bg-surface border-surface-container-highest hover:border-secondary"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-serif text-sm font-bold text-primary">
                              {dim.label}
                            </span>
                            <span className="font-label-caps text-[9px] uppercase tracking-wider text-secondary font-semibold">
                              {dim.sublabel}
                            </span>
                          </div>
                          {dim.capacity && (
                            <span className="font-sans text-[11px] text-on-surface-variant block">
                              {dim.capacity}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Marble Substrate Base Selector */}
              {item.materials && item.materials.length > 0 && (
                <div className="mb-6">
                  <span className="font-label-caps text-[11px] tracking-[0.18em] uppercase text-secondary font-bold block mb-3">
                    MARBLE SUBSTRATE BASE
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.materials.map((mat, idx) => {
                      const isSelected = selectedMaterial === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedMaterial(idx)}
                          className={`p-3 rounded-xl border flex items-center gap-3 transition-all duration-200 cursor-pointer text-left ${
                            isSelected
                              ? "bg-surface-container border-primary shadow-xs"
                              : "bg-surface border-surface-container-highest hover:border-secondary"
                          }`}
                        >
                          <span
                            className="w-7 h-7 rounded-lg border border-neutral-300 shadow-xs shrink-0"
                            style={{ backgroundColor: mat.colorHex }}
                          />
                          <div>
                            <span className="font-label-caps text-[10px] uppercase tracking-wider text-primary font-bold block">
                              {mat.name}
                            </span>
                            <span className="font-sans text-[11px] text-on-surface-variant block">
                              {mat.subtext}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Material & Craftsmanship Bullet Points */}
              <div className="space-y-3.5 mb-8 p-4 rounded-xl bg-surface-container-low border border-surface-container-highest">
                {item.bulletPoints.map((bp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">
                      verified
                    </span>
                    <span className="font-body-sm text-xs sm:text-[13px] text-on-surface-variant leading-relaxed">
                      {bp}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary transition-all duration-300 shadow-md group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chat
                  </span>
                  <span className="font-label-caps text-xs tracking-wider uppercase font-bold">
                    Enquire on WhatsApp (+91 7351586553)
                  </span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </a>

                <a
                  href={`mailto:akhan656500@gmail.com?subject=CAD%20Specification%20Request%20-%20${encodeURIComponent(item.title)}&body=Hello%20RK%20Inlay%2C%0A%0APlease%20provide%20the%20architectural%20CAD%20(.DWG)%20spec%20sheet%20and%20finish%20samples%20for%20${encodeURIComponent(item.title)}%20(${item.archiveRecord}).%0AImage%20Reference%3A%20${encodeURIComponent(fullImageUrl)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-high border border-surface-container-highest text-primary hover:bg-surface-container-highest transition-colors duration-200 font-label-caps text-[11px] tracking-wider uppercase font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    download
                  </span>
                  <span>Request Architectural Spec Sheet &amp; CAD (.DWG)</span>
                </a>
              </div>

              {/* Direct Concierge Line */}
              <p className="font-body-sm text-[11px] sm:text-xs text-on-surface-variant text-center">
                Direct Master Carver Concierge:{" "}
                <a href="tel:+917351586553" className="text-primary font-bold hover:underline">
                  +91 7351586553
                </a>{" "}
                •{" "}
                <a href="mailto:akhan656500@gmail.com" className="text-secondary font-bold hover:underline">
                  akhan656500@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
