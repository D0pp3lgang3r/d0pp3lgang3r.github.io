'use client';

import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const linkStyle: React.CSSProperties = {
  color: '#a78bfa',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(124,58,237,0.4)',
};

const ACHIEVEMENTS = [
  { label: '1st place — DEADFACE 2024',      href: 'https://ctftime.org/event/2443'                                                                                                                                                                                                                                                          },
  { label: 'Top 5 — Midnight CTF',            href: 'https://ctftime.org/event/2687'                                                                                                                                                                                                                                                         },
  { label: 'Top 2 — HackUTT CTF 2025',        href: 'https://www.linkedin.com/posts/hackutt_cybersaezcuritaez-ctf-hackutt-activity-7342118952438841345-L9Z-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC5P-gwBHDlW9qPduSIzzdqIvay1PShQl0U' },
  { label: 'Red Team Trophy — CHE 2026',      href: 'https://cyberhumanumest.com/'                                                                                                                                                                                                                                                            },
];

export default function WhoamiPage() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: 72, paddingBottom: 80 }}>
      <div className="narrow-container">

        {/* Header */}
        <motion.div {...fade(0)}>
          <div style={{ marginBottom: 52 }}>
            <p style={{ fontFamily: "'Noto Sans JP',sans-serif", fontSize: '0.68rem', color: '#475569', letterSpacing: '0.22em', marginBottom: 10 }}>
              素性 / WHOAMI
            </p>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, color: '#e2e8f0', marginBottom: 10 }}>
              WHO AM I
            </h1>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 480 }}>
              5th-year student at Polytech Nancy, specializing in cybersecurity.
            </p>
          </div>
        </motion.div>

        {/* About */}
        <motion.div {...fade(0.08)}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.9, marginBottom: 40 }}>
            I&apos;m <span style={{ color: '#e2e8f0', fontWeight: 600 }}>D0pp3lgang3r</span>, a French engineering student
            passionate about <span style={{ color: '#e2e8f0' }}>web app pentesting, cryptanalysis and reverse engineering</span>.
            I spend most of my free time on CTFs, malware analysis and bug bounty.
          </p>
        </motion.div>

        {/* CTF */}
        <motion.div {...fade(0.14)}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
            — CTF
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.9, marginBottom: 24 }}>
            I competed with{' '}
            <a href="https://ctftime.org/team/358981/" target="_blank" rel="noopener noreferrer" style={linkStyle}>
              PsychoBash
            </a>
            {' '}and{' '}
            <span style={{ color: '#e2e8f0' }}>IA2R Owner</span>
            {' '}a team with my classmates. I played a lot of jeopardy-style CTFs with a focus on crypto, web and reverse engineering.
          </p>

          <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#334155', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>
            CTF achievements
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
            {ACHIEVEMENTS.map(a => (
              <div key={a.label} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ color: '#ef4444', fontSize: '0.7rem', flexShrink: 0 }}>▸</span>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.88rem',
                    color: '#e2e8f0',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(124,58,237,0.25)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {a.label}
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Blog */}
        <motion.div {...fade(0.2)}>
          <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.6rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>
            — This blog
          </p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.9, marginBottom: 0 }}>
            I share <span style={{ color: '#e2e8f0' }}>CTF writeups</span> after competitions end,
            along with personal research, things like malware reversing, vulnerability research,
            and offensive tooling development. Think of it as a public notebook for anything
            security-related I find worth documenting.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
