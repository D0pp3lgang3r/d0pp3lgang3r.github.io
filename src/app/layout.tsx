import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import Navbar from "@/components/Navbar";
import RainCanvas from "@/components/RainCanvas";

export const metadata: Metadata = {
  metadataBase: new URL("https://d0pp3lgang3r.github.io"),
  title: "D0pp3lgang3r | Cybersecurity & CTF",
  description:
    "French Polytech student — Cryptography, Network Security, CTF player. CryptoHack #329. Root-Me. YesWeHack bug bounty hunter.",
  keywords: ["cybersecurity", "CTF", "cryptography", "bug bounty", "D0pp3lgang3r"],
  authors: [{ name: "D0pp3lgang3r" }],
  openGraph: {
    title: "D0pp3lgang3r",
    description: "Cybersecurity portfolio — Amegakure style",
    type: "website",
  },
};

const FOOTER_LINKS = [
  { label: 'GitHub',     href: 'https://github.com/D0pp3lgang3r' },
  { label: 'Root-Me',    href: 'https://www.root-me.org/D0pp3lgang3r' },
  { label: 'CryptoHack', href: 'https://cryptohack.org/user/D0pp3lgang3r/' },
  { label: 'YesWeHack',  href: 'https://yeswehack.com/hunters/D0pp3lgang3r' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {/* Amegakure background */}
        <div className="ame-bg" aria-hidden="true" />
        <div className="ame-overlay" aria-hidden="true" />

        {/* Rain canvas */}
        <RainCanvas />

        {/* Navigation */}
        <Navbar />

        {/* Page content */}
        <main style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            position: 'relative',
            zIndex: 10,
            borderTop: '1px solid rgba(124,58,237,0.12)',
            marginTop: 80,
            padding: '28px 0',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              padding: '0 28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '0.75rem', color: '#4c1d95' }}>
              雨隠れの里 — Hidden Rain Village
            </span>

            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {FOOTER_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: '#2d3748' }}>
              © {new Date().getFullYear()} D0pp3lgang3r
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
