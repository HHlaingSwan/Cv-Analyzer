"use client";

import React from "react";
import Link from "next/link";
import { Brain, Mail, X, Link2, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-linear-to-b from-slate-900 to-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Review Cv</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transform your hiring workflow with AI-powered CV analysis. Make
              smarter decisions, faster.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#" icon={<X className="h-5 w-5" />} />
              <SocialLink href="#" icon={<Link2 className="h-5 w-5" />} />
              <SocialLink
                href="#"
                icon={<ExternalLink className="h-5 w-5" />}
              />
            </div>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Product</h4>
            <ul className="space-y-3">
              <FooterLink href="/features">Features</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/api">API</FooterLink>
              <FooterLink href="/integrations">Integrations</FooterLink>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Resources</h4>
            <ul className="space-y-3">
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/docs">Documentation</FooterLink>
              <FooterLink href="/help">Help Center</FooterLink>
              <FooterLink href="/status">Status</FooterLink>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/privacy">Privacy</FooterLink>
              <FooterLink href="/terms">Terms</FooterLink>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Review Cv. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Mail className="h-4 w-4" />
            <a
              href="mailto:hello@reviewcv.com"
              className="hover:text-white transition-colors"
            >
              hello@reviewcv.com
            </a>
          </div>
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
    <li>
      <Link
        href={href}
        className="text-slate-400 hover:text-white transition-colors text-sm"
      >
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="h-10 w-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
    >
      {icon}
    </a>
  );
}
