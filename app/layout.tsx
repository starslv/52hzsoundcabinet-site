import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "52Hz Sound Cabinet";
const SITE_URL = "https://52hzsoundcabinet.com";
const SITE_DESCRIPTION =
  "A sound art research initiative founded by Chinese sound artist Xingyu Li, focused on immersive spatial audio, environmental field recording, ocean bioacoustics, and architectural sound installation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
