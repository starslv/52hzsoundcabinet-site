import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { StructuredDataPlaceholder } from "./components/structured-data-placeholder";

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
  { href: "/contact", label: "Contact" }
];

export const metadata: Metadata = {
  metadataBase: new URL("https://52hzsoundcabinet.org"),
  title: {
    default: "52Hz Sound Cabinet",
    template: "%s | 52Hz Sound Cabinet"
  },
  description:
    "A sound art research initiative founded by Chinese sound artist Xingyu Li, focused on spatial audio, field recording, and ocean bioacoustics.",
  keywords: [
    "sound art",
    "research collective",
    "immersive spatial audio",
    "field recording",
    "ocean bioacoustics",
    "sound installation"
  ],
  openGraph: {
    title: "52Hz Sound Cabinet",
    description:
      "Sound art research initiative exploring immersive spatial audio, environmental recording, and acoustic space.",
    type: "website",
    url: "https://52hzsoundcabinet.org"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <p className="site-title">
              <Link href="/">52Hz Sound Cabinet</Link>
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
            <p>© {new Date().getFullYear()} 52Hz Sound Cabinet</p>
          </footer>
        </div>
        <StructuredDataPlaceholder />
      </body>
    </html>
  );
}
