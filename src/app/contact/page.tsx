'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const LINKS = [
  {
    platform: 'GitHub',
    kana:     'ギットハブ',
    url:      'https://github.com/D0pp3lgang3r',
    desc:     'Open-source tools · 12 repos',
  },
  {
    platform: 'CryptoHack',
    kana:     'クリプトハック',
    url:      'https://cryptohack.org/user/D0pp3lgang3r/',
    desc:     'Rank #329 · 11 040 pts · 160+ challs',
  },
  {
    platform: 'Root-Me',
    kana:     'ルートミー',
    url:      'https://www.root-me.org/D0pp3lgang3r',
    desc:     'CTF challenges · multi-category',
  },
  {
    platform: 'YesWeHack',
    kana:     'バグバウンティ',
    url:      'https://yeswehack.com/hunters/D0pp3lgang3r',
    desc:     'Bug bounty · EU #1 platform',
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = encodeURIComponent(`[Portfolio] Message from ${form.name}`);
    const b = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:D0pp3lgang3rEva@protonmail.com?subject=${s}&body=${b}`);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(10,10,18,0.7)',
    border: '1px solid rgba(124,58,237,0.18)',
    outline: 'none',
    color: '#e2e8f0',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '0.82rem',
    padding: '10px 14px',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: 100, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* Header */}
        <motion.div
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '0.7rem', color: '#475569', letterSpacing: '0.2em', marginBottom: 12 }}>
            連絡先 / CONTACT
          </p>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, color: '#e2e8f0', marginBottom: 12 }}>
            GET IN TOUCH
          </h1>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 520 }}>
            CTF collab, bug bounty, research, ou juste bonjour.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>

          {/* Profiles */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
              — Profils
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.platform}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '16px',
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(124,58,237,0.09)',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: '#e2e8f0', minWidth: 100 }}>
                      {link.platform}
                    </span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#475569', flex: 1 }}>
                      {link.desc}
                    </span>
                    <span style={{ color: '#4c1d95', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>↗</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 20 }}>
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
                <button
                  onClick={() => setSent(false)}
                  style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.72rem', color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  ← Nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="panel" style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  { id: 'name',  label: 'NOM',   type: 'text',  ph: 'Your name' },
                  { id: 'email', label: 'EMAIL', type: 'email', ph: 'your@email.com' },
                ].map(f => (
                  <div key={f.id}>
                    <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                      {f.label}
                    </label>
                    <input
                      id={f.id} type={f.type} required placeholder={f.ph}
                      value={form[f.id as keyof typeof form]}
                      onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.45)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.18)')}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>
                    MESSAGE
                  </label>
                  <textarea
                    required rows={5} placeholder="Your message..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.45)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.18)')}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    padding: '11px 0',
                    background: '#7c3aed',
                    color: '#050508',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    width: '100%',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.background = '#a78bfa')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.background = '#7c3aed')}
                >
                  ENVOYER ↗
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
