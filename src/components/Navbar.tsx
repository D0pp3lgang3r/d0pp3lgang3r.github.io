'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';

const JP = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン零一二三四五六七八九';

function JpDecoder({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const frame = useRef(0);

  const start = useCallback(() => {
    frame.current = 0;
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      frame.current++;
      const locked = Math.floor(frame.current / 3);
      setDisplay(text.split('').map((c, i) =>
        i < locked ? c : JP[Math.floor(Math.random() * JP.length)]
      ).join(''));
      if (locked >= text.length) { clearInterval(timer.current!); setDisplay(text); }
    }, 35);
  }, [text]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    setDisplay(text);
  }, [text]);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  return (
    <span
      onMouseEnter={start}
      onMouseLeave={stop}
      style={{
        display: 'inline-block',
        fontFamily: 'Orbitron, monospace',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase' as const,
        color: active ? '#a78bfa' : '#475569',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 0.2s',
        minWidth: `${text.length}ch`,
        position: 'relative' as const,
        paddingBottom: 4,
        borderBottom: active ? '1px solid #7c3aed' : '1px solid transparent',
      }}
    >
      {display}
    </span>
  );
}

const LINKS = [
  { href: '/whoami',   label: 'WHOAMI'   },
  { href: '/articles', label: 'ARTICLES' },
  { href: '/writeups', label: 'WRITEUPS' },
  { href: '/contact',  label: 'CONTACT'  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(5,5,8,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(124,58,237,0.15)' : 'none',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      {/* Main bar */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        padding: '14px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          {/* Profile picture ring */}
          <div style={{
            position: 'relative', width: 34, height: 34, flexShrink: 0,
          }}>
            <div style={{
              position: 'absolute', inset: -2, borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #7c3aed, #a78bfa, #06b6d4, #7c3aed)',
              animation: 'spin-slow 8s linear infinite',
            }} />
            <div style={{ position: 'absolute', inset: 1, borderRadius: '50%', overflow: 'hidden' }}>
              <Image
                src="/images/doppel.jpeg"
                alt="D0pp3lgang3r"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
          <span style={{
            fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.14em', color: '#e2e8f0', textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            D0pp3lgang3r
          </span>
        </Link>

        {/* Desktop nav — hidden on small screens via CSS class */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {LINKS.map(l => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/');
            return (
              <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>
                <JpDecoder text={l.label} active={active} />
              </Link>
            );
          })}
        </nav>

        {/* Mobile burger — hidden on desktop via CSS */}
        <button
          className="nav-burger"
          onClick={() => setOpen(o => !o)}
          aria-label="Menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }}
        >
          {[20, open ? 0 : 14, 20].map((w, i) => (
            <span key={i} style={{
              display: 'block', height: 1, background: '#a78bfa', width: w,
              transition: 'all 0.25s',
              ...(open && i === 0 ? { transform: 'rotate(45deg) translateY(6px)', width: 20 } : {}),
              ...(open && i === 2 ? { transform: 'rotate(-45deg) translateY(-6px)', width: 20 } : {}),
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div style={{
        overflow: 'hidden', maxHeight: open ? 220 : 0, opacity: open ? 1 : 0,
        transition: 'max-height 0.3s, opacity 0.3s',
        background: 'rgba(5,5,8,0.96)',
        borderTop: open ? '1px solid rgba(124,58,237,0.14)' : 'none',
      }}>
        <div style={{ padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              style={{
                fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
                color: pathname === l.href ? '#a78bfa' : '#475569',
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
