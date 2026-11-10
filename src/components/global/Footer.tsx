"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const FALLBACK_QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
];

const FALLBACK_RESOURCES_LINKS = [
  { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
];

const FALLBACK_CONTACT_SUPPORT_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Technical Support", href: "/support" },
];

const FALLBACK_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer({ settings, navData }: { settings?: any; navData?: any }) {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  return (
    <footer className="bg-muted pt-20 pb-10 md:pt-28 md:pb-12 border-t border-border/40">
      <div className="container mx-auto">
        <div className="grid gap-12 md:gap-8 lg:grid-cols-12">
          {/* Brand & Bio */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:pr-12">
            <span className="font-heading text-3xl font-bold tracking-tight text-primary">
              {settings?.brandName || "BRAND NAME"}
            </span>
            <p className="text-base leading-relaxed text-muted-foreground">
              {settings?.footerDescription || "Evidence-based, personalized nutrition and lifestyle coaching to help you achieve holistic wellness and feel your best."}
            </p>
            <div className="flex items-center gap-5 pt-4">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block"
                  aria-label="Instagram"
                >
                  IG
                </a>
              )}
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block"
                  aria-label="Facebook"
                >
                  FB
                </a>
              )}
              {settings?.linkedin && (
                <a
                  href={settings.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block"
                  aria-label="LinkedIn"
                >
                  IN
                </a>
              )}
              {settings?.twitter && (
                <a
                  href={settings.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block"
                  aria-label="Twitter"
                >
                  X
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-y-0.5 inline-block"
                  aria-label="YouTube"
                >
                  YT
                </a>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">
                Quick Links
              </h3>
              <ul className="flex flex-col gap-3.5">
                {(navData?.footerQuickLinks?.length > 0 ? navData.footerQuickLinks : FALLBACK_QUICK_LINKS)
                  .filter((item: any) => item.enabled !== false)
                  .sort((a: any, b: any) => (typeof a.displayOrder === 'number' ? a.displayOrder : 999) - (typeof b.displayOrder === 'number' ? b.displayOrder : 999))
                  .map((link: any, idx: number) => {
                    const safeHref = link.href || "#";
                    return (
                      <li key={`${safeHref}-${idx}`}>
                        <Link
                          href={safeHref}
                          target={link.openInNewTab ? "_blank" : undefined}
                          rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                          onClick={(e) => {
                            if (safeHref === "/" && pathname === "/") {
                              e.preventDefault();
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className="group relative inline-block text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {link.label}
                          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">
                Resources
              </h3>
              <ul className="flex flex-col gap-3.5">
                {(navData?.footerResources?.length > 0 ? navData.footerResources : FALLBACK_RESOURCES_LINKS)
                  .filter((item: any) => item.enabled !== false)
                  .sort((a: any, b: any) => (typeof a.displayOrder === 'number' ? a.displayOrder : 999) - (typeof b.displayOrder === 'number' ? b.displayOrder : 999))
                  .map((link: any, idx: number) => {
                    const safeHref = link.href || "#";
                    return (
                      <li key={`${safeHref}-${idx}`}>
                        <Link
                          href={safeHref}
                          target={link.openInNewTab ? "_blank" : undefined}
                          rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                          onClick={(e) => {
                            if (safeHref === "/" && pathname === "/") {
                              e.preventDefault();
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className="group relative inline-block text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {link.label}
                          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">
                Contact & Support
              </h3>
              <ul className="flex flex-col gap-3.5">
                {(navData?.footerContactSupport?.length > 0 ? navData.footerContactSupport : FALLBACK_CONTACT_SUPPORT_LINKS)
                  .filter((item: any) => item.enabled !== false)
                  .sort((a: any, b: any) => (typeof a.displayOrder === 'number' ? a.displayOrder : 999) - (typeof b.displayOrder === 'number' ? b.displayOrder : 999))
                  .map((link: any, idx: number) => {
                    const safeHref = link.href || "#";
                    return (
                      <li key={`${safeHref}-${idx}`}>
                        <Link
                          href={safeHref}
                          target={link.openInNewTab ? "_blank" : undefined}
                          rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                          onClick={(e) => {
                            if (safeHref === "/" && pathname === "/") {
                              e.preventDefault();
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className="group relative inline-block text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {link.label}
                          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-border/60 pt-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground/80">
            {(navData?.footerLegal?.length > 0 ? navData.footerLegal : FALLBACK_LEGAL_LINKS)
              .filter((item: any) => item.enabled !== false)
              .sort((a: any, b: any) => (typeof a.displayOrder === 'number' ? a.displayOrder : 999) - (typeof b.displayOrder === 'number' ? b.displayOrder : 999))
              .map((link: any, idx: number, arr: any[]) => {
                const safeHref = link.href || "#";
                return (
                  <span key={`${safeHref}-${idx}`} className="flex items-center gap-3">
                    <Link
                      href={safeHref}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (safeHref === "/" && pathname === "/") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                    {idx < arr.length - 1 && <span>|</span>}
                  </span>
                );
              })}
          </div>
          <p className="text-sm text-muted-foreground/80">
            &copy; {currentYear} {settings?.copyrightText || (settings?.brandName || "BRAND NAME") + ". All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
