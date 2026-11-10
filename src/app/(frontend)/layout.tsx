
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "../globals.css";

import { Providers } from "@/components/global/Providers";
import { Header } from "@/components/global/Header";
import { Footer } from "@/components/global/Footer";
import { SkipLink } from "@/components/global/SkipLink";
import { FloatingWhatsApp } from "@/components/global/FloatingWhatsApp";


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#507D2A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { sanityFetch } from '@/sanity/lib/client'
import { settingsQuery, navigationQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<any>({ query: settingsQuery })
  
  const siteTitle = settings?.title || 'Dietitian & Nutritionist | Holistic Wellness'
  const siteDescription = settings?.description || 'Evidence-based, personalized nutrition and lifestyle coaching to help you achieve holistic wellness and feel your best.'
  
  let ogImage = '/og-image.jpg'
  if (settings?.seoImage) {
    ogImage = urlForImage(settings.seoImage)?.width(1200).height(630).url() || '/og-image.jpg'
  }

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com'),
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`,
    },
    description: siteDescription,
    keywords: ['Dietitian', 'Nutritionist', 'Holistic Health', 'Wellness', 'Nutrition Coaching'],
    authors: [{ name: 'Dietitian Name' }],
    creator: siteTitle,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: '/',
      siteName: siteTitle,
      title: siteTitle,
      description: siteDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${siteTitle} Holistic Wellness`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description: siteDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await sanityFetch<any>({ query: settingsQuery })
  const navData = await sanityFetch<any>({ query: navigationQuery })

  return (
    <html
      lang="en"
      className={`${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <SkipLink />
          <Header settings={settings} navData={navData} />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer settings={settings} navData={navData} />
          <FloatingWhatsApp settings={settings} />
        </Providers>
      </body>
    </html>
  );
}
