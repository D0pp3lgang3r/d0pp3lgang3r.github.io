'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const fade = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const PGP_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

[Remplace ce bloc par ta vraie clé PGP publique.
 Génère-la avec : gpg --full-generate-key
 Exporte-la avec : gpg --armor --export ton@email.com]

-----END PGP PUBLIC KEY BLOCK-----`;

const CHANNELS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
    label:  'Discord',
    value:  'd0pp3lgang3r',
    detail: 'Réponse rapide',
    color:  '#5865F2',
    copy:   true,
    href:   null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    label:  'Email',
    value:  'D0pp3lgang3rEva@protonmail.com',
    detail: 'Pour les sujets formels',
    color:  '#a78bfa',
    copy:   true,
    href:   'mailto:D0pp3lgang3rEva@protonmail.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
    label:  'GitHub',
    value:  'D0pp3lgang3r',
    detail: 'Code & projets',
    color:  '#e2e8f0',
    copy:   false,
    href:   'https://github.com/D0pp3lgang3r',
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
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = encodeURIComponent(`[Portfolio] Message from ${form.name}`);
    const b = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:D0pp3lgang3rEva@protonmail.com?subject=${s}&body=${b}`);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(10,10,18,0.7)',
    border: '1px solid rgba(124,58,237,0.18)', borderRadius: 8,
    outline: 'none', color: '#e2e8f0',
    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
    padding: '10px 14px', transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 72, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40 }}>

          {/* Left: channels + PGP */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>

            {/* Channels */}
            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
              — Canaux
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 40 }}>
              {CHANNELS.map(ch => (
                <div key={ch.label} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(124,58,237,0.08)',
                }}>
                  <div style={{ color: ch.color, flexShrink: 0, width: 20, display: 'flex' }}>{ch.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.68rem', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.06em', marginBottom: 2 }}>
                      {ch.label}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: ch.color, display: 'flex', alignItems: 'center', gap: 4 }}>
                      {ch.href ? (
                        <a href={ch.href} target="_blank" rel="noopener noreferrer" style={{ color: ch.color, textDecoration: 'none' }}>{ch.value}</a>
                      ) : (
                        <span>{ch.value}</span>
                      )}
                      {ch.copy && <CopyButton text={ch.value} />}
                    </div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#475569', marginTop: 1 }}>
                      {ch.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PGP */}
            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
              — Clé PGP publique
            </p>
            <div style={{
              background: 'rgba(5,5,8,0.85)',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              {/* PGP header bar */}
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
              {/* Key content */}
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

          {/* Right: form */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
              — Message
            </p>

            {sent ? (
              <div className="panel" style={{ padding: '40px 28px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.78rem', color: '#a78bfa', marginBottom: 8 }}>
                  MESSAGE ENVOYÉ
                </p>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#475569', marginBottom: 20 }}>
                  Client mail ouvert. À bientôt.
                </p>
                <button onClick={() => setSent(false)} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer' }}>
                  ← Nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { id: 'name',  label: 'NOM',   type: 'text',  ph: 'Your name' },
                  { id: 'email', label: 'EMAIL', type: 'email', ph: 'your@email.com' },
                ].map(f => (
                  <div key={f.id}>
                    <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {f.label}
                    </label>
                    <input
                      id={f.id} type={f.type} required placeholder={f.ph}
                      value={form[f.id as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.07)'; }}
                      onBlur={e  => { e.target.style.borderColor = 'rgba(124,58,237,0.18)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    MESSAGE
                  </label>
                  <textarea
                    required rows={5} placeholder="Your message..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.07)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'rgba(124,58,237,0.18)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    fontFamily: 'Orbitron, monospace', fontSize: '0.68rem', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    padding: '12px 0', background: '#7c3aed', color: '#050508',
                    border: 'none', borderRadius: 8, cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.background = '#a78bfa')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.background = '#7c3aed')}
                >
                  ENVOYER ↗
                </button>

                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#2d3748', textAlign: 'center' }}>
                  Ou chiffre ton message avec ma clé PGP ↗
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
