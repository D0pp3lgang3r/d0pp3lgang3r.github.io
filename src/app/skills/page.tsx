'use client';

import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

interface Skill {
  name: string;
  level: number;
  tags?: string[];
}

interface SkillGroup {
  category: string;
  kana: string;
  icon: string;
  color: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Cryptography',
    kana: '暗号学',
    icon: '🔐',
    color: 'ame-purple',
    skills: [
      { name: 'RSA & variants',            level: 92, tags: ['CRT', 'Coppersmith', 'Wiener'] },
      { name: 'Elliptic Curves (ECC)',      level: 88, tags: ['ECDH', 'ECDSA', 'Pairings'] },
      { name: 'Lattices',                   level: 82, tags: ['LWE', 'CVP', 'SVP', 'NTRU'] },
      { name: 'Isogenies',                  level: 78, tags: ['SIDH', 'CSIDH'] },
      { name: 'Zero-Knowledge Proofs',      level: 72, tags: ['ZK-SNARKs', 'Sigma protocols'] },
      { name: 'Symmetric Ciphers',          level: 85, tags: ['AES', 'Block ciphers', 'Padding'] },
      { name: 'Hash Functions',             level: 80, tags: ['SHA', 'Length extension', 'Collisions'] },
      { name: 'Diffie-Hellman',             level: 86, tags: ['DLP', 'DLOG attacks'] },
    ],
  },
  {
    category: 'Network Security',
    kana: 'ネットワーク',
    icon: '🌐',
    color: 'ame-cyber',
    skills: [
      { name: 'Protocol Analysis',   level: 85, tags: ['Wireshark', 'Scapy'] },
      { name: 'XMPP Security',       level: 80, tags: ['Authentication', 'Password recovery'] },
      { name: 'SNMP Exploitation',   level: 78, tags: ['SNMPv3', 'Auth cracking'] },
      { name: 'Web Vulnerabilities', level: 75, tags: ['OWASP Top 10', 'Bug Bounty'] },
      { name: 'Penetration Testing', level: 72, tags: ['Recon', 'Exploitation'] },
    ],
  },
  {
    category: 'Programming',
    kana: 'プログラミング',
    icon: '⌨️',
    color: 'ame-rain',
    skills: [
      { name: 'Python',      level: 90, tags: ['pwntools', 'SageMath', 'Crypto libs'] },
      { name: 'C / C++',     level: 72, tags: ['Systems', 'Matrix ops'] },
      { name: 'TypeScript',  level: 68, tags: ['Next.js', 'React'] },
      { name: 'SageMath',    level: 82, tags: ['Number theory', 'Algebra'] },
      { name: 'Bash / Shell',level: 75, tags: ['Automation', 'CTF scripting'] },
    ],
  },
  {
    category: 'CTF Platforms',
    kana: 'プラットフォーム',
    icon: '🏆',
    color: 'ame-purple',
    skills: [
      { name: 'CryptoHack',  level: 95, tags: ['Rank #329', '11 040 pts', '160+ challs'] },
      { name: 'Root-Me',     level: 80, tags: ['Multi-category'] },
      { name: 'YesWeHack',   level: 72, tags: ['Bug bounty', 'Web'] },
    ],
  },
];

interface SkillBarProps {
  skill: Skill;
  color: string;
  index: number;
}

function SkillBar({ skill, color, index }: SkillBarProps) {
  const colorMap: Record<string, string> = {
    'ame-purple': '#7c3aed',
    'ame-cyber':  '#06b6d4',
    'ame-rain':   '#a78bfa',
  };
  const hex = colorMap[color] ?? '#7c3aed';

  return (
    <motion.div
      className="mb-5"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-ame-text text-xs font-mono font-semibold">{skill.name}</span>
        <span className="text-xs font-mono" style={{ color: hex }}>{skill.level}%</span>
      </div>

      {/* Bar track */}
      <div className="h-1 bg-ame-steel/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${hex}99, ${hex})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06 + 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>

      {/* Tags */}
      {skill.tags && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {skill.tags.map(tag => (
            <span key={tag} className="tag" style={{ fontSize: '0.6rem' }}>{tag}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-ame-muted text-sm font-jp tracking-widest block mb-4">
            スキルセット / SKILL SET
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-orbitron font-black text-ame-text mb-4"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            EXPERTISE
          </motion.h1>
          <motion.p variants={fadeUp} className="text-ame-muted font-mono text-sm max-w-xl">
            Compétences acquises à travers des CTF, du bug bounty et des projets perso.
            Focus sur la cryptographie avancée et la sécurité réseau.
          </motion.p>
        </motion.div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              className="panel p-6 md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.5 }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{group.icon}</span>
                <div>
                  <div className="text-ame-muted text-xs font-jp">{group.kana}</div>
                  <h2
                    className="font-orbitron font-bold text-sm tracking-wider text-ame-text"
                    style={{ fontFamily: 'Orbitron, monospace' }}
                  >
                    {group.category}
                  </h2>
                </div>
              </div>

              {/* Skills */}
              <div>
                {group.skills.map((skill, si) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    color={group.color}
                    index={si}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools section */}
        <motion.section
          className="mt-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <span className="tag mb-3">ツールボックス</span>
            <h2
              className="text-2xl font-orbitron font-bold text-ame-text mt-3"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              TOOLBOX
            </h2>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {[
              'pwntools','SageMath','Wireshark','Scapy','Burp Suite',
              'nmap','Ghidra','IDA Pro','Python','Docker',
              'Git','VSCode','KaTeX','LaTeX','CyberChef',
              'hashcat','John the Ripper','Metasploit',
            ].map(tool => (
              <motion.span
                key={tool}
                variants={fadeUp}
                className="tag-cyber tag text-xs px-3 py-1.5"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
