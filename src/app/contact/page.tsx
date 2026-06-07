'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const PGP_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=3j+H
-----END PGP PUBLIC KEY BLOCK-----`;

const CHANNELS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
    label: 'Discord',
    value: 'd0pp3lgang3r',
    color: '#5865F2',
    copy:  true,
    href:  null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    label: 'Email',
    value: 'D0pp3lgang3rEva@protonmail.com',
    color: '#a78bfa',
    copy:  true,
    href:  'mailto:D0pp3lgang3rEva@protonmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    label: 'GitHub',
    value: 'D0pp3lgang3r',
    color: '#e2e8f0',
    copy:  false,
    href:  'https://github.com/D0pp3lgang3r',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={copy}
      style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem',
        color: copied ? '#10b981' : '#475569',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '2px 8px',
        transition: 'color 0.2s',
      }}
    >
      {copied ? '✓ copié' : 'copier'}
    </button>
  );
}

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 72, paddingBottom: 80 }}>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 28px' }}>

        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={fade}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: '0.68rem', color: '#475569', letterSpacing: '0.22em', marginBottom: 10 }}>
              連絡先 / CONTACT
            </p>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, color: '#e2e8f0', marginBottom: 10 }}>
              GET IN TOUCH
            </h1>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 480 }}>
              CTF collab, bug bounty, recherche, ou juste bonjour.
            </p>
          </div>
        </motion.div>

        {/* Channels */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
            — Chanels
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 48 }}>
            {CHANNELS.map(ch => (
              <div key={ch.label} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 0',
                borderBottom: '1px solid rgba(124,58,237,0.08)',
              }}>
                <div style={{ color: ch.color, flexShrink: 0, width: 20, display: 'flex' }}>{ch.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.76rem', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.06em', marginBottom: 4 }}>
                    {ch.label}
                  </div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: ch.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {ch.href ? (
                      <a href={ch.href} target="_blank" rel="noopener noreferrer" style={{ color: ch.color, textDecoration: 'none' }}>{ch.value}</a>
                    ) : (
                      <span>{ch.value}</span>
                    )}
                    {ch.copy && <CopyButton text={ch.value} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PGP */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
            — PGP
          </p>
          <div style={{
            background: 'rgba(5,5,8,0.85)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 14px',
              background: 'rgba(124,58,237,0.08)',
              borderBottom: '1px solid rgba(124,58,237,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="#7c3aed">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#7c3aed' }}>
                  public-key.asc
                </span>
              </div>
              <CopyButton text={PGP_KEY} />
            </div>
            <pre style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
              color: '#475569', padding: '14px', margin: 0,
              overflowX: 'auto', lineHeight: 1.7,
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>
              {PGP_KEY}
            </pre>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
