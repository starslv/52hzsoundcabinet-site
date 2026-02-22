import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_NAME = "52Hz Sound Cabinet";
const SITE_URL = "https://52hzsoundcabinet.com";
const SITE_DESCRIPTION =
  "A sound art research initiative founded by Chinese sound artist Xingyu Li, focused on immersive spatial audio, environmental field recording, ocean bioacoustics, and architectural sound installation.";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/immersive-performances", label: "Immersive Performances" },
  { href: "/field-expeditions", label: "Field Expeditions" },
  { href: "/press", label: "Press" },
  { href: "/publications", label: "Publications" },
  { href: "/lectures", label: "Lectures" },
  { href: "/media-kit", label: "Media Kit" },
  { href: "/contact", label: "Contact" },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "sound art",
    "research collective",
    "immersive spatial audio",
    "spatial audio",
    "field recording",
    "environmental recording",
    "ocean bioacoustics",
    "bioacoustics",
    "ambisonics",
    "Dolby Atmos",
    "sound installation",
    "architectural acoustics",
    "Xingyu Li",
    "Whale Circus",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    // Helps some crawlers understand it's OK to snippet/preview
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
};

function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    // If you later add a logo, put its absolute URL here:
    // logo: `${SITE_URL}/logo.png`,
    founder: {
      "@type": "Person",
      name: "Xingyu Li",
    },
    // Add your official profiles here later (recommended):
    // sameAs: [
    //   "https://en.wikipedia.org/wiki/...",
    //   "https://www.wikidata.org/wiki/Q....",
    //   "https://www.instagram.com/...",
    //   "https://open.spotify.com/artist/...",
    // ],
    sameAs: [SITE_URL],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = getStructuredData();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // JSON-LD must be a string; suppress hydration warnings in Next app router
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>

      <body>
        <div className="site-shell">
          <header className="site-header">
            <p className="site-title">
              <Link href="/">{SITE_NAME}</Link>
            </p>
            <p className="site-tagline">Sound art research initiative by Xingyu Li</p>
            <nav className="site-nav" aria-label="Primary">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>

          <main>{children}</main>

          <footer className="site-footer">
            <p>© {new Date().getFullYear()} {SITE_NAME}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}