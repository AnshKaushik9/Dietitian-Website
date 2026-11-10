
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/shared/Buttons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const FALLBACK_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export function Header({ settings, navData }: { settings?: any; navData?: any }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Handle route change
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Safely construct navigation from Sanity or fallback
  const rawNav = navData?.headerNav && navData.headerNav.length > 0 ? navData.headerNav : FALLBACK_NAV_LINKS;
  const navLinks = rawNav
    .filter((item: any) => item.enabled !== false)
    .sort((a: any, b: any) => {
      const orderA = typeof a.displayOrder === 'number' ? a.displayOrder : 999;
      const orderB = typeof b.displayOrder === 'number' ? b.displayOrder : 999;
      return orderA - orderB;
    });

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-border/40 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between h-24 relative">
        {/* Logo */}
        <div className="flex-shrink-0 z-10">
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="BRAND NAME - Home"
          >
            <span className="font-heading text-2xl font-bold tracking-tight text-primary">
              {settings?.brandName || "BRAND NAME"}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <nav>
            <ul className="flex items-center gap-8">
            {navLinks.map((link: any, idx: number) => {
              const safeHref = link.href || "#";
              const isActive = pathname === safeHref;
              return (
                <li key={`${safeHref}-${idx}`}>
                  <Link
                    href={safeHref}
                    target={link.openInNewTab ? "_blank" : undefined}
                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                    className={`group relative px-1 py-1 text-base font-semibold transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      isActive ? "text-primary" : "text-foreground/80"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute -bottom-1.5 left-0 h-0.5 w-full bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
            </ul>
          </nav>
        </div>

        {/* CTA */}
        <div className="hidden lg:block flex-shrink-0 z-10">
          <CTAButton href={navData?.headerCtaLink || "/book-consultation"} className="w-auto">
            {navData?.headerCtaText || "Book your Consultation"}
          </CTAButton>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex-shrink-0 z-10">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-muted"
                  aria-label="Open main menu"
                  aria-controls="mobile-menu"
                />
              }
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent id="mobile-menu" side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left font-heading text-xl font-bold text-primary">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link: any, idx: number) => {
                  const safeHref = link.href || "#";
                  const isActive = pathname === safeHref;
                  return (
                    <Link
                      key={`${safeHref}-${idx}`}
                      href={safeHref}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      className={`block rounded-md px-4 py-3 text-lg font-medium transition-colors hover:bg-muted hover:text-primary ${isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground"
                        }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-6 px-4">
                  <CTAButton href={navData?.headerCtaLink || "/book-consultation"} className="w-full text-center justify-center flex">
                    {navData?.headerCtaText || "Book your Consultation"}
                  </CTAButton>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
