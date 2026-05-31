'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';

const JP_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん零一二三四五六七八九十';

function useJapaneseDecoder(text: string) {
  const [displayed, setDisplayed] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef(0);

  const start = useCallback(() => {
    frameRef.current = 0;
    const maxFrames = text.length * 4;

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;
      const decoded = Math.floor(frameRef.current / 4);

      setDisplayed(
        text
          .split('')
          .map((char, i) => {
            if (i < decoded) return char;
            return JP_CHARS[Math.floor(Math.random() * JP_CHARS.length)];
          })
          .join('')
      );

      if (frameRef.current >= maxFrames) {
        clearInterval(intervalRef.current!);
        setDisplayed(text);
      }
    }, 40);
  }, [text]);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayed(text);
  }, [text]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return { displayed, start, stop };
}

interface NavItemProps {
  href: string;
  label: string;
  active: boolean;
}

function NavItem({ href, label, active }: NavItemProps) {
  const { displayed, start, stop } = useJapaneseDecoder(label);

  return (
    <Link
      href={href}
      className={`nav-link font-jp${active ? ' active' : ''}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      style={{ fontFamily: 'Orbitron, monospace', minWidth: `${label.length}ch` }}
    >
      {displayed}
    </Link>
  );
}

const NAV_LINKS = [
  { href: '/',         label: 'HOME' },
  { href: '/skills',   label: 'SKILLS' },
  { href: '/articles', label: 'ARTICLES' },
  { href: '/writeups', label: 'WRITEUPS' },
  { href: '/contact',  label: 'CONTACT' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ame-black/90 backdrop-blur-md border-b border-ame-purple/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 rounded-full border-2 border-ame-purple/60 group-hover:border-ame-rain transition-colors duration-300" />
            <div className="absolute inset-1 rounded-full bg-ame-purple/20 group-hover:bg-ame-purple/35 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-ame-rain font-orbitron font-bold text-xs">雨</span>
            </div>
          </div>
          <span
            className="font-orbitron font-bold text-sm tracking-widest text-ame-text group-hover:text-ame-rain transition-colors"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            D0PP3LGANG3R
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.filter(l => l.href !== '/').map(link => (
            <NavItem
              key={link.href}
              href={link.href}
              label={link.label}
              active={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
            />
          ))}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className={`block h-px bg-ame-rain transition-all duration-300 ${
                i === 0 ? (menuOpen ? 'w-6 translate-y-2.5 rotate-45' : 'w-6') :
                i === 1 ? (menuOpen ? 'w-0 opacity-0' : 'w-4') :
                (menuOpen ? 'w-6 -translate-y-2.5 -rotate-45' : 'w-5')
              }`}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-ame-void/95 backdrop-blur-lg border-t border-ame-purple/20 px-6 py-4 flex flex-col gap-5">
          {NAV_LINKS.filter(l => l.href !== '/').map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm ${pathname === link.href ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
