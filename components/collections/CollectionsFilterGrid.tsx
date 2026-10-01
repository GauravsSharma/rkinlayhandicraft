"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CATEGORY_TABS,
  COLLECTION_ITEMS,
  CollectionCategory,
} from "@/data/collectionsContent";

function CollectionsFilterGridInner() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState<CollectionCategory>("ALL");

  useEffect(() => {
    if (categoryParam) {
      const upper = categoryParam.toUpperCase();
      let normalized: CollectionCategory = "ALL";
      if (upper === "FLOOR" || upper === "FLOORS") normalized = "FLOOR";
      else if (upper === "TABLE" || upper === "TABLES") normalized = "TABLE";
      else if (upper === "STAIRS" || upper === "STAIR") normalized = "STAIRS";
      else if (upper === "TEMPLE" || upper === "TEMPLES") normalized = "TEMPLE";
      else if (upper === "WALLS" || upper === "WALL") normalized = "WALLS";
      else if (upper === "MARBLE" || upper === "SLABS") normalized = "MARBLE";
      else if (upper === "ALL") normalized = "ALL";

      if (normalized !== "ALL") {
        setActiveCategory(normalized);
      }
    }
  }, [categoryParam]);

  const filteredItems =
    activeCategory === "ALL"
      ? COLLECTION_ITEMS
      : COLLECTION_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="catalog" className="w-full bg-surface-container-low py-12 lg:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        {/* Category Filter Pills & Indicator */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-surface-container-highest">
          {/* 6 Categories + All Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full font-label-caps text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : "bg-surface hover:bg-surface-container text-on-surface-variant hover:text-primary border border-surface-container-highest"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 text-[10px] ${
                      isActive ? "text-secondary-fixed" : "text-on-surface-variant/70"
                    }`}
                  >
                    ({tab.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Indicator Badge */}
          <div className="hidden sm:inline-flex items-center gap-2 text-on-surface-variant text-xs font-sans">
            <span className="material-symbols-outlined text-secondary text-[16px]">
              filter_list
            </span>
            <span className="tracking-wide">
              Showing{" "}
              <strong className="text-primary font-semibold">
                {filteredItems.length}
              </strong>{" "}
              masterworks
            </span>
          </div>
        </div>

        {/* Dynamic Items Grid */}
        <motion.div layout className="space-y-8">
          {activeCategory === "ALL" ? (
            /* EXACT EDITORIAL LAYOUT MATCHING MOCKUP */
            <div className="space-y-8">
              {/* Row 1: Floor Palace Medallion & Celestial Table */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {COLLECTION_ITEMS.slice(0, 2).map((item) => (
                  <CollectionCard key={item.id} item={item} isFeatured />
                ))}
              </div>

              {/* Row 2: Wall Panel & Helical Stairs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {COLLECTION_ITEMS.slice(2, 4).map((item) => (
                  <CollectionCard key={item.id} item={item} isFeatured />
                ))}
              </div>

              {/* Row 3: Temple Home Mandir & Gayatri Sunburst Backsplash */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {COLLECTION_ITEMS.slice(4, 6).map((item) => (
                  <CollectionCard key={item.id} item={item} isFeatured />
                ))}
              </div>

              {/* Row 4: 3-column (Floor border, Floor runner, Mughal alcove) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLLECTION_ITEMS.slice(6, 9).map((item) => (
                  <CollectionCard key={item.id} item={item} />
                ))}
              </div>

              {/* Row 5: 3-column (Stair risers, Octagonal table, Palatial console) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLLECTION_ITEMS.slice(9, 12).map((item) => (
                  <CollectionCard key={item.id} item={item} />
                ))}
              </div>

              {/* Row 6: Marble Slabs & Gemstones */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {COLLECTION_ITEMS.slice(12, 14).map((item) => (
                  <CollectionCard key={item.id} item={item} isFeatured />
                ))}
              </div>
            </div>
          ) : (
            /* FILTERED VIEW: SMOOTH RESPONSIVE GRID FOR FILTERED CATEGORY */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <CollectionCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function CollectionCard({
  item,
  isFeatured = false,
}: {
  item: (typeof COLLECTION_ITEMS)[0];
  isFeatured?: boolean;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col rounded-2xl bg-surface border border-surface-container-highest overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300"
    >
      {/* Image Container with Badges */}
      <Link
        href={`/collections/${item.id}`}
        className={`relative w-full block overflow-hidden bg-surface-container ${
          isFeatured ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={
            isFeatured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Top-left Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 font-label-caps text-[10px] tracking-[0.18em] uppercase text-white font-semibold">
            {item.badge}
          </span>
        </div>
      </Link>

      {/* Content Details */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center justify-between pb-2.5 border-b border-surface-container mb-3">
            <span className="font-label-caps text-[10px] tracking-[0.2em] uppercase text-secondary font-semibold">
              {item.categoryLabel}
            </span>
            <span className="font-sans text-xs text-primary font-bold">
              {item.price}
            </span>
          </div>

          <Link href={`/collections/${item.id}`} className="block group/title">
            <h3
              className={`font-serif text-primary group-hover/title:text-secondary transition-colors font-normal tracking-tight mb-2.5 ${
                isFeatured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {item.title}
            </h3>
          </Link>

          <p className="font-body-sm text-xs sm:text-[13px] text-on-surface-variant leading-relaxed mb-6">
            {item.description}
          </p>
        </div>

        {/* Spec Row & Actions */}
        <div className="pt-4 border-t border-surface-container-highest flex items-center justify-between gap-3">
          <span className="font-label-caps text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
            {item.spec}
          </span>

          <Link
            href={`/collections/${item.id}`}
            className="inline-flex items-center gap-1 font-label-caps text-[10px] tracking-widest uppercase text-primary hover:text-secondary font-bold group/link transition-colors shrink-0"
          >
            <span>View Details</span>
            <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionsFilterGrid() {
  return (
    <Suspense
      fallback={
        <div className="w-full py-16 text-center text-on-surface-variant font-sans text-xs tracking-wider uppercase">
          Loading Collections Catalogue...
        </div>
      }
    >
      <CollectionsFilterGridInner />
    </Suspense>
  );
}
