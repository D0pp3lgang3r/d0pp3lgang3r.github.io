'use client';

import { motion } from 'framer-motion';

interface Category {
  name: string;
  logo: string;
  pct: number;
  color: string;
}

const CATEGORIES: Category[] = [
  { name: 'App - Script',     logo: '/images/rootmelogos/app_script.svg',   pct: 100,  color: '#10b981' },
  { name: 'PWN',              logo: '/images/rootmelogos/pwn.svg',           pct: 45,  color: '#f59e0b' },
  { name: 'Cracking',         logo: '/images/rootmelogos/cracking.svg',      pct: 98, color: '#7c3aed' },
  { name: 'Cryptanalyse',     logo: '/images/rootmelogos/cryptography.svg',  pct: 100, color: '#10b981' },
  { name: 'Forensic',         logo: '/images/rootmelogos/forensic.svg',      pct: 89, color: '#7c3aed' },
  { name: 'Programmation',    logo: '/images/rootmelogos/programmation.svg', pct: 72,  color: '#7c3aed' },
  { name: 'Pentest / Réaliste',logo: '/images/rootmelogos/pentest.svg',      pct: 95,  color: '#7c3aed' },
  { name: 'Réseau',           logo: '/images/rootmelogos/network.svg',       pct: 94,  color: '#7c3aed' },
  { name: 'Stéganographie',   logo: '/images/rootmelogos/steganography.svg', pct: 100, color: '#10b981' },
  { name: 'Web - Client',     logo: '/images/rootmelogos/web_client.svg',    pct: 88,  color: '#7c3aed' },
  { name: 'Web - Serveur',    logo: '/images/rootmelogos/web_server.svg',    pct: 100,  color: '#10b981' },
];

const BOTTOM_STATS = [
  { label: 'Rang',     value: 'Top 25'   },
  { label: 'Score',    value: '20 010'   },
  { label: 'Flagged',  value: '533'      },
  { label: 'Completion', value: '87%'    },
];

export default function RootMeStats() {
  return (
    <div style={{
      background: 'rgba(8, 6, 18, 0.92)',
      border: '1px solid rgba(124,58,237,0.25)',
      backdropFilter: 'blur(12px)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '14px 18px',
        borderBottom: '1px solid rgba(124,58,237,0.15)',
        background: 'rgba(124,58,237,0.08)',
      }}>
        <div style={{ width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/rootmelogo.svg" alt="Root-Me" width={28} height={28} style={{ display: 'block' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.72rem', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.08em' }}>
            Root-Me.org · Stats
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: '#475569', marginTop: 1 }}>
            Hacking and Information Security
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {CATEGORIES.map((cat, i) => (
          <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Logo */}
            <div style={{
              width: 22, height: 22, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0.85,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.logo}
                alt={cat.name}
                width={20}
                height={20}
                style={{ display: 'block' }}
              />
            </div>

            {/* Name */}
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem', color: '#94a3b8',
              minWidth: 130, whiteSpace: 'nowrap',
            }}>
              {cat.name} — <span style={{ color: cat.color }}>{cat.pct}%</span>
            </div>

            {/* Bar */}
            <div style={{ flex: 1, height: 4, background: 'rgba(124,58,237,0.12)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', borderRadius: 2, background: cat.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${cat.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(124,58,237,0.15)',
        background: 'rgba(124,58,237,0.06)',
      }}>
        {BOTTOM_STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: '10px 12px', textAlign: 'center',
            borderRight: i < 3 ? '1px solid rgba(124,58,237,0.1)' : 'none',
          }}>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.78rem', fontWeight: 800, color: '#a78bfa' }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: '#475569', marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
