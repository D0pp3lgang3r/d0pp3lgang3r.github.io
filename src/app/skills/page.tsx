'use client';

import { motion } from 'framer-motion';

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

/* ── Crypto sub-topics ── */
const CRYPTO_TOPICS = [
  { label: 'RSA',             note: 'Coppersmith · Wiener · CRT'        },
  { label: 'Elliptic Curves', note: 'ECDH · ECDSA · Pairings'           },
  { label: 'Lattices',        note: 'LWE · CVP · NTRU'                  },
  { label: 'Isogenies',       note: 'SIDH · CSIDH'                      },
  { label: 'ZK Proofs',       note: 'SNARKs · Sigma protocols'           },
  { label: 'Diffie-Hellman',  note: 'DLP · DLOG attacks'                },
  { label: 'Hash Functions',  note: 'Length extension · Collisions'     },
  { label: 'Symmetric',       note: 'AES · Block cipher modes · Padding'},
];

/* ── Other skill sections ── */
const SECTIONS = [
  {
    title: 'Network Security',
    kana:  'ネットワーク',
    color: '#06b6d4',
    items: [
      { name: 'Protocol Analysis', lvl: 85 },
      { name: 'XMPP Security',     lvl: 80 },
      { name: 'SNMP Exploitation', lvl: 78 },
      { name: 'Web Vulns / OWASP', lvl: 75 },
      { name: 'Recon & Enum',      lvl: 72 },
    ],
  },
  {
    title: 'Programming',
    kana:  'プログラミング',
    color: '#a78bfa',
    items: [
      { name: 'Python',       lvl: 90 },
      { name: 'SageMath',     lvl: 82 },
      { name: 'C / C++',      lvl: 72 },
      { name: 'TypeScript',   lvl: 68 },
      { name: 'Bash / Shell', lvl: 75 },
    ],
  },
  {
    title: 'CTF Platforms',
    kana:  'コンペティション',
    color: '#ef4444',
    items: [
      { name: 'CryptoHack',  lvl: 95 },
      { name: 'Root-Me',     lvl: 90 },
      { name: 'YesWeHack',   lvl: 72 },
    ],
  },
];

const TOOLS = [
  'pwntools','SageMath','Wireshark','Scapy','Burp Suite',
  'nmap','Ghidra','Python','Docker','Git',
  'CyberChef','hashcat','John the Ripper','LaTeX','KaTeX',
  'GDB','radare2','objdump','z3','sympy',
];

function LvlBar({ lvl, color }: { lvl: number; color: string }) {
  return (
    <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', background: color, borderRadius: 1 }}
        initial={{ width: 0 }}
        whileInView={{ width: `${lvl}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 72, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* Page header */}
        <motion.div initial="hidden" animate="show" variants={fade}>
          <div style={{ marginBottom: 56 }}>
            <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: '0.68rem', color: '#475569', letterSpacing: '0.22em', marginBottom: 10 }}>
              スキルセット / SKILL SET
            </p>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, color: '#e2e8f0', marginBottom: 10 }}>
              EXPERTISE
            </h1>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 500 }}>
              Compétences acquises à travers des CTF, du bug bounty et des projets personnels.
            </p>
          </div>
        </motion.div>

        {/* ── Cryptography spotlight ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ marginBottom: 48 }}>
            <div className="panel" style={{
              padding: '32px 36px',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(10,10,18,0.9) 60%)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Big background text */}
              <div style={{
                position: 'absolute', right: -10, top: -20,
                fontFamily: 'Orbitron, monospace', fontWeight: 900,
                fontSize: 'clamp(5rem,12vw,10rem)',
                color: 'rgba(124,58,237,0.06)',
                letterSpacing: '-0.04em',
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                CRYPTO
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 6 }}>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', color: '#7c3aed', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    PRIMARY DOMAIN
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'rgba(124,58,237,0.2)' }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#7c3aed' }}>
                    CryptoHack #329 · 11 040 pts
                  </span>
                </div>

                <h2 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, color: '#e2e8f0', marginBottom: 24, letterSpacing: '-0.01em' }}>
                  CRYPTOGRAPHY
                </h2>

                {/* Topic grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                  {CRYPTO_TOPICS.map((t, i) => (
                    <motion.div
                      key={t.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <div style={{
                        padding: '10px 14px',
                        background: 'rgba(124,58,237,0.08)',
                        border: '1px solid rgba(124,58,237,0.18)',
                        borderRadius: 8,
                      }}>
                        <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 700, color: '#c4b5fd', marginBottom: 3 }}>
                          {t.label}
                        </div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#475569' }}>
                          {t.note}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Other sections ────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 48 }}>
          {SECTIONS.map((sec, si) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.1, duration: 0.4 }}
            >
              <div className="panel" style={{ padding: '24px 28px', height: '100%' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <span style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: '0.62rem', color: '#475569', display: 'block', marginBottom: 4 }}>
                      {sec.kana}
                    </span>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', letterSpacing: '0.06em' }}>
                      {sec.title}
                    </span>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: `${sec.color}18`, border: `1px solid ${sec.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: sec.color }} />
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {sec.items.map(item => (
                    <div key={item.name}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#cbd5e1' }}>
                          {item.name}
                        </span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.68rem', color: sec.color }}>
                          {item.lvl}%
                        </span>
                      </div>
                      <LvlBar lvl={item.lvl} color={sec.color} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Toolbox ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.62rem', color: '#4c1d95', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                — Toolbox
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(124,58,237,0.12)' }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {TOOLS.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.25 }}
                  className="tag tag-cyber"
                  style={{ padding: '5px 12px', fontSize: '0.68rem', borderRadius: 20 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
