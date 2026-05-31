'use client';

import { motion } from 'framer-motion';

interface Skill { name: string; level: number; tags?: string[] }
interface Group { category: string; kana: string; color: string; skills: Skill[] }

const GROUPS: Group[] = [
  {
    category: 'Cryptography', kana: '暗号学', color: '#7c3aed',
    skills: [
      { name: 'RSA & variants',          level: 92, tags: ['CRT', 'Coppersmith', 'Wiener'] },
      { name: 'Elliptic Curves (ECC)',    level: 88, tags: ['ECDH', 'ECDSA', 'Pairings'] },
      { name: 'Lattices',                 level: 82, tags: ['LWE', 'CVP', 'NTRU'] },
      { name: 'Isogenies',               level: 78, tags: ['SIDH', 'CSIDH'] },
      { name: 'Zero-Knowledge Proofs',   level: 72, tags: ['ZK-SNARKs', 'Sigma'] },
      { name: 'Symmetric Ciphers',       level: 85, tags: ['AES', 'Block ciphers'] },
      { name: 'Hash Functions',          level: 80, tags: ['SHA', 'Length extension'] },
      { name: 'Diffie-Hellman',          level: 86, tags: ['DLP', 'DLOG attacks'] },
    ],
  },
  {
    category: 'Network Security', kana: 'ネットワーク', color: '#06b6d4',
    skills: [
      { name: 'Protocol Analysis',  level: 85, tags: ['Wireshark', 'Scapy'] },
      { name: 'XMPP Security',      level: 80, tags: ['Auth recovery'] },
      { name: 'SNMP Exploitation',  level: 78, tags: ['SNMPv3'] },
      { name: 'Web Vulns',          level: 75, tags: ['OWASP Top 10'] },
    ],
  },
  {
    category: 'Programming', kana: 'プログラミング', color: '#a78bfa',
    skills: [
      { name: 'Python',       level: 90, tags: ['pwntools', 'SageMath'] },
      { name: 'SageMath',     level: 82, tags: ['Number theory'] },
      { name: 'C / C++',      level: 72, tags: ['Systems'] },
      { name: 'TypeScript',   level: 68, tags: ['Next.js', 'React'] },
      { name: 'Bash / Shell', level: 75, tags: ['Automation'] },
    ],
  },
  {
    category: 'CTF Platforms', kana: 'プラットフォーム', color: '#7c3aed',
    skills: [
      { name: 'CryptoHack', level: 95, tags: ['Rank #329', '11 040 pts'] },
      { name: 'Root-Me',    level: 80, tags: ['Multi-category'] },
      { name: 'YesWeHack',  level: 72, tags: ['Bug bounty'] },
    ],
  },
];

const TOOLS = [
  'pwntools','SageMath','Wireshark','Scapy','Burp Suite',
  'nmap','Ghidra','Python','Docker','Git','CyberChef',
  'hashcat','John the Ripper','LaTeX','KaTeX',
];

function SkillBar({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  return (
    <motion.div
      style={{ marginBottom: 18 }}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', color: '#e2e8f0' }}>
          {skill.name}
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color }}>
          {skill.level}%
        </span>
      </div>

      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {skill.tags && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 5 }}>
          {skill.tags.map(t => (
            <span key={t} className="tag" style={{ fontSize: '0.58rem' }}>{t}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function SkillsPage() {
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
            スキルセット / SKILL SET
          </p>
          <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, color: '#e2e8f0', marginBottom: 12 }}>
            EXPERTISE
          </h1>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 520 }}>
            Compétences acquises à travers CTF, bug bounty, et projets personnels.
          </p>
        </motion.div>

        {/* Skill groups grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: 24, marginBottom: 56 }}>
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              className="panel"
              style={{ padding: '28px 32px' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08, duration: 0.4 }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 22 }}>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', color: '#e2e8f0' }}>
                  {group.category}
                </span>
                <span style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '0.65rem', color: '#475569' }}>
                  {group.kana}
                </span>
              </div>
              {group.skills.map((s, si) => (
                <SkillBar key={s.name} skill={s} color={group.color} index={si} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Toolbox */}
        <div className="ame-divider" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', color: '#4c1d95', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 18 }}>
            — Toolbox
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {TOOLS.map(t => (
              <span key={t} className="tag tag-cyber" style={{ padding: '4px 10px' }}>{t}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
