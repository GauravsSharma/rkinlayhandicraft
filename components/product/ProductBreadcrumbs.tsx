"use client";

import Link from "next/link";
import { CollectionItem } from "@/data/collectionsContent";

export default function ProductBreadcrumbs({ item }: { item: CollectionItem }) {
  return (
    <nav className="w-full bg-surface pt-6 pb-4 border-b border-surface-container-highest">
      <div className="w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin">
        <ol className="flex flex-wrap items-center gap-2 font-label-caps text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Archive
            </Link>
          </li>
          <li className="text-secondary/60">/</li>
          <li>
            <Link href="/collections" className="hover:text-primary transition-colors">
              Collections
            </Link>
          </li>
          <li className="text-secondary/60">/</li>
          <li>
            <span className="hover:text-primary transition-colors cursor-pointer">
              {item.categoryLabel}
            </span>
          </li>
          <li className="text-secondary/60">/</li>
          <li className="text-primary font-bold truncate max-w-[200px] sm:max-w-none">
            {item.title}
          </li>
        </ol>
      </div>
    </nav>
  );
}
