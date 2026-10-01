"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isCollections = pathname === "/collections";
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all duration-300">
      <div className="h-20 w-full max-w-[1440px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-gutter">
        <Link className="group flex flex-col justify-center select-none" href="/">
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none group-hover:text-secondary transition-colors duration-300">
            RK INLAY
          </span>
          <span className="font-label-caps text-label-caps text-secondary tracking-[0.22em] mt-space-xs uppercase">
            Handicraft • Agra
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-space-lg">
          <Link
            aria-current={isHome ? "page" : undefined}
            className={`relative py-1 font-label-md text-label-md transition-colors duration-200 uppercase tracking-widest after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-secondary after:transition-all after:duration-300 ${
              isHome
                ? "text-primary font-medium after:w-full"
                : "text-on-surface-variant hover:text-primary after:w-0 hover:after:w-full"
            }`}
            href="/"
          >
            Home
          </Link>
          <Link
            aria-current={isCollections ? "page" : undefined}
            className={`relative py-1 font-label-md text-label-md transition-colors duration-200 uppercase tracking-widest after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-secondary after:transition-all after:duration-300 ${
              isCollections
                ? "text-primary font-medium after:w-full"
                : "text-on-surface-variant hover:text-primary after:w-0 hover:after:w-full"
            }`}
            href="/collections"
          >
            Collections
          </Link>
          <Link
            aria-current={isAbout ? "page" : undefined}
            className={`relative py-1 font-label-md text-label-md transition-colors duration-200 uppercase tracking-widest after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-secondary after:transition-all after:duration-300 ${
              isAbout
                ? "text-primary font-medium after:w-full"
                : "text-on-surface-variant hover:text-primary after:w-0 hover:after:w-full"
            }`}
            href="/about"
          >
            About
          </Link>
          <Link
            aria-current={isContact ? "page" : undefined}
            className={`relative py-1 font-label-md text-label-md transition-colors duration-200 uppercase tracking-widest after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-secondary after:transition-all after:duration-300 ${
              isContact
                ? "text-primary font-medium after:w-full"
                : "text-on-surface-variant hover:text-primary after:w-0 hover:after:w-full"
            }`}
            href="/contact"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-space-md">
          <a
            className="group inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-full bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary transition-all duration-300 shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            href="https://wa.me/917351586553"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[16px] leading-none group-hover:scale-110 transition-transform duration-300">
              chat
            </span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider">
              WhatsApp
            </span>
            <span className="material-symbols-outlined text-[14px] leading-none group-hover:translate-x-0.5 transition-transform duration-300">
              arrow_forward
            </span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-primary focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-surface-container-highest px-margin-mobile py-space-md shadow-lg">
          <nav className="flex flex-col space-y-space-sm">
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`font-label-md text-label-md py-2 border-b border-surface-container ${
                isHome ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`}
              href="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`font-label-md text-label-md py-2 border-b border-surface-container ${
                isCollections
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
              href="/collections"
            >
              Collections
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`font-label-md text-label-md py-2 border-b border-surface-container ${
                isAbout ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`}
              href="/about"
            >
              About
            </Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className={`font-label-md text-label-md py-2 ${
                isContact ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
              }`}
              href="/contact"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
