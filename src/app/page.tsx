'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import InteractiveTerminal from '@/components/InteractiveTerminal';
import RootMeStats from '@/components/RootMeStats';

const fade    = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z"/>
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
);
const BugIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20 8h-2.81c-.45-.78-1.07-1.45-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C13 5.06 12.51 5 12 5s-1 .06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.88 6.55 7.26 7.22 6.81 8H4v2h2.09c-.05.33-.09.66-.09 1v1H4v2h2v1c0 .34.04.67.09 1H4v2h2.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H20v-2h-2.09c.05-.33.09-.66.09-1v-1h2v-2h-2v-1c0-.34-.04-.67-.09-1H20V8zm-6 8h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
  </svg>
);

const PLATFORMS = [
  { name: 'GitHub',     stat: '12 repos',            color: '#e2e8f0', url: 'https://github.com/D0pp3lgang3r',                    icon: <GithubIcon /> },
  { name: 'Root-Me',    stat: 'Top 25 · 20 010 pts', color: '#ef4444', url: 'https://www.root-me.org/D0pp3lgang3r',              icon: <ShieldIcon /> },
  { name: 'CryptoHack', stat: '#329 · 11 040 pts',   color: '#a78bfa', url: 'https://cryptohack.org/user/D0pp3lgang3r/',         icon: <LockIcon />   },
  { name: 'YesWeHack',  stat: 'Bug bounty hunter',   color: '#06b6d4', url: 'https://yeswehack.com/hunters/D0pp3lgang3r',        icon: <BugIcon />    },
];

const STATS = [
  { val: 'Top 25',  label: 'Root-Me',        sub: '20 010 pts'          },
  { val: '#329',    label: 'CryptoHack',      sub: '11 040 pts'          },
  { val: '1 000+',  label: 'CTF Challenges',  sub: 'Solved across platforms' },
  { val: '12',      label: 'GitHub Repos',    sub: 'Open source tools'   },
];

export default function Home() {
  return (
    <div style={{ paddingBottom: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 48,
            paddingTop: 72,
            paddingBottom: 48,
          }}>
            {/* Left */}
            <div>
              <motion.div variants={fade}>
                <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: '0.68rem', color: '#475569', letterSpacing: '0.22em', marginBottom: 14 }}>
                  雨隠れの里 / AMEGAKURE NO SATO
                </p>
              </motion.div>

              <motion.div variants={fade}>
                <span
                  className="glitch"
                  data-text="D0PP3LGANG3R"
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: 'clamp(2.2rem, 6.5vw, 4.8rem)',
                    fontWeight: 900, color: '#e2e8f0',
                    letterSpacing: '-0.01em', display: 'block',
                    marginBottom: 14,
                  }}
                >
                  D0PP3LGANG3R
                </span>
              </motion.div>

              <motion.div variants={fade}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.86rem', color: '#64748b', marginBottom: 5, maxWidth: 480 }}>
                  <span style={{ color: '#06b6d4' }}>$</span>&nbsp;French Polytech student — hacking stuff for fun.
                </p>
                <p className="cursor" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.74rem', color: '#475569', marginBottom: 28 }}>
                  Cryptography · Network Security · CTF · Bug Bounty
                </p>
              </motion.div>

              <motion.div variants={fade}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {[
                    { href: '/writeups', label: 'WRITEUPS', primary: true  },
                    { href: '/articles', label: 'ARTICLES', primary: false },
                    { href: '/skills',   label: 'SKILLS',   primary: false },
                  ].map(btn => (
                    <Link key={btn.href} href={btn.href} style={{
                      fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', fontWeight: 700,
                      letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none',
                      padding: '9px 20px',
                      background: btn.primary ? '#7c3aed' : 'transparent',
                      color: btn.primary ? '#050508' : '#a78bfa',
                      border: '1px solid', borderColor: btn.primary ? '#7c3aed' : 'rgba(124,58,237,0.35)',
                    }}>
                      {btn.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: avatar */}
            <motion.div variants={fade}>
              <div style={{ position: 'relative', width: 190, height: 190, flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', inset: -3, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #7c3aed, #a78bfa, #06b6d4, #7c3aed)',
                  animation: 'spin-slow 8s linear infinite',
                }} />
                <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: '#050508' }} />
                <div style={{ position: 'absolute', inset: 4, borderRadius: '50%', overflow: 'hidden' }}>
                  <Image src="/images/doppel.jpeg" alt="D0pp3lgang3r" fill style={{ objectFit: 'cover' }} priority />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Stats strip ───────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div style={{ marginBottom: 48 }}>
            <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {STATS.map((s, i) => (
                <div key={s.label} style={{
                  padding: '18px 16px', textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(124,58,237,0.12)' : 'none',
                }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(0.95rem, 2.2vw, 1.45rem)', fontWeight: 800, color: '#a78bfa', marginBottom: 4 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', marginBottom: 2 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Profils + Root-Me ─────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <div style={{ marginBottom: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>

            {/* Platform cards */}
            <div>
              <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
                — Profils
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {PLATFORMS.map(p => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                    className="panel platform-card"
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', textDecoration: 'none' }}
                  >
                    <div style={{ color: p.color, flexShrink: 0 }}>{p.icon}</div>
                    <div>
                      <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.68rem', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.06em' }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#475569', marginTop: 1 }}>
                        {p.stat}
                      </div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: '#4c1d95', fontSize: '0.75rem' }}>↗</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Root-Me stats block */}
            <div>
              <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
                — Root-Me Stats
              </p>
              <RootMeStats />
            </div>
          </div>
        </motion.div>

        <div className="ame-divider" />

        {/* ── Terminal ──────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
              — Terminal interactif
            </p>
            <InteractiveTerminal />
          </div>
        </motion.div>

        {/* ── Quick nav ─────────────────────────────────────────── */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
            {[
              { href: '/skills',   en: 'SKILLS',   jp: 'スキル',  desc: 'Stack & expertise'  },
              { href: '/articles', en: 'ARTICLES',  jp: '記事',   desc: 'Technical writings' },
              { href: '/writeups', en: 'WRITEUPS',  jp: '解答',   desc: 'CTF solutions'       },
              { href: '/contact',  en: 'CONTACT',   jp: '連絡先', desc: 'Get in touch'        },
            ].map(item => (
              <motion.div key={item.href} variants={fade}>
                <Link href={item.href} className="panel" style={{ display: 'block', padding: '16px 18px', textDecoration: 'none' }}>
                  <div style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: '0.62rem', color: '#475569', marginBottom: 3 }}>{item.jp}</div>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: '#e2e8f0', marginBottom: 3 }}>{item.en}</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#475569' }}>{item.desc}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
