import type { Metadata } from "next";
import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen">
        {/* Amegakure background */}
        <div className="ame-bg" aria-hidden="true" />
        <div className="ame-overlay" aria-hidden="true" />

        {/* Rain canvas overlay */}
        <RainCanvas />

        {/* Navigation */}
        <Navbar />

        {/* Page content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-ame-purple/15 mt-24 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-ame-muted text-xs font-mono">
              <span className="text-ame-purple">雨隠れの里</span>
              <span>—</span>
              <span>Hidden Rain Village</span>
            </div>
            <div className="flex items-center gap-6">
              {[
                { label: 'GitHub',     href: 'https://github.com/D0pp3lgang3r' },
                { label: 'Root-Me',    href: 'https://www.root-me.org/D0pp3lgang3r' },
                { label: 'CryptoHack', href: 'https://cryptohack.org/user/D0pp3lgang3r/' },
                { label: 'YesWeHack', href: 'https://yeswehack.com/hunters/D0pp3lgang3r' },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ame-muted hover:text-ame-rain text-xs font-mono transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-ame-muted/50 text-xs font-mono">
              © {new Date().getFullYear()} D0pp3lgang3r
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
