"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">CV Analyzer</h3>
            <p className="text-slate-400 text-xs mt-0.5">
              AI-powered CV analysis
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </div>

          {/* Copyright */}
          <p className="text-slate-400 text-xs">
            &copy; {new Date().getFullYear()} CV Analyzer
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="hover:text-white transition-colors">
      {children}
    </Link>
  );
}
