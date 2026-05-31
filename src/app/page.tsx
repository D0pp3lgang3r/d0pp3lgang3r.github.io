'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const STATS = [
  { label: 'CryptoHack Rank', value: '#329', sub: '11 040 pts' },
  { label: 'Challenges Solved', value: '160+', sub: 'Crypto focused' },
  { label: 'GitHub Repos', value: '12', sub: 'Public tools' },
  { label: 'Platform', value: 'Root-Me', sub: 'Bug bounty hunter' },
];

const FEATURED = [
  {
    icon: '⬡',
    title: 'Cryptography',
    desc: 'RSA, ECC, Lattices, Isogenies, Zero-Knowledge Proofs — deep crypto puzzle solving on CryptoHack.',
    color: 'ame-purple',
  },
  {
    icon: '⬡',
    title: 'Network Security',
    desc: 'Custom tools for XMPP & SNMP authentication recovery. Protocol-level offensive research.',
    color: 'ame-cyber',
  },
  {
    icon: '⬡',
    title: 'Bug Bounty',
    desc: 'Active hunter on YesWeHack — vulnerability research on real-world targets.',
    color: 'ame-rain',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <motion.section
          className="mb-24"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Kana header */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="text-ame-muted text-sm font-jp tracking-widest">
              雨隠れの里 / AMEGAKURE NO SATO
            </span>
          </motion.div>

          {/* Name glitch */}
          <motion.h1
            variants={fadeUp}
            className="font-orbitron font-black tracking-tight mb-4 leading-none"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            <span
              className="glitch text-5xl md:text-7xl lg:text-8xl text-ame-text"
              data-text="D0PP3LGANG3R"
            >
              D0PP3L
            </span>
            <br />
            <span
              className="glitch text-5xl md:text-7xl lg:text-8xl text-ame-purple"
              data-text="GANG3R"
            >
              GANG3R
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={fadeUp}
            className="text-ame-muted font-mono text-sm md:text-base max-w-xl mb-2 leading-relaxed"
          >
            <span className="text-ame-cyber">$</span>{' '}
            French Polytech student — hacking stuff for fun.
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-ame-dim font-mono text-xs md:text-sm max-w-xl mb-10 leading-relaxed cursor"
          >
            Cryptography · Network Security · CTF · Bug Bounty
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              href="/writeups"
              className="px-6 py-3 font-orbitron text-xs font-bold tracking-widest text-ame-black bg-ame-purple hover:bg-ame-rain transition-all duration-300 clip-path-none"
              style={{
                fontFamily: 'Orbitron, monospace',
                clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
              }}
            >
              WRITEUPS
            </Link>
            <Link
              href="/skills"
              className="px-6 py-3 font-orbitron text-xs font-bold tracking-widest text-ame-rain border border-ame-purple/50 hover:border-ame-rain hover:bg-ame-purple/10 transition-all duration-300"
              style={{
                fontFamily: 'Orbitron, monospace',
                clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
              }}
            >
              SKILLS
            </Link>
            <a
              href="https://github.com/D0pp3lgang3r"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 font-orbitron text-xs font-bold tracking-widest text-ame-muted border border-ame-steel hover:border-ame-purple/40 hover:text-ame-text transition-all duration-300"
              style={{
                fontFamily: 'Orbitron, monospace',
                clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
              }}
            >
              GITHUB
            </a>
          </motion.div>
        </motion.section>

        {/* ── Stats ───────────────────────────────────────────────────────── */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(stat => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="panel p-5 text-center hover:scale-105 transition-transform duration-300"
              >
                <div
                  className="text-3xl md:text-4xl font-orbitron font-black text-ame-rain mb-1"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {stat.value}
                </div>
                <div className="text-ame-text text-xs font-mono font-semibold mb-1 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-ame-muted text-xs font-mono">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="ame-divider" />

        {/* ── Featured areas ──────────────────────────────────────────────── */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <span className="tag mb-3">Focus</span>
            <h2
              className="text-2xl md:text-3xl font-orbitron font-bold text-ame-text mt-3"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              DOMAINES D&apos;EXPERTISE
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="panel p-6 group cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-3xl mb-4 text-ame-purple group-hover:text-ame-rain transition-colors duration-300 font-mono">
                  {item.icon}
                </div>
                <h3
                  className="font-orbitron font-bold text-sm tracking-wider text-ame-text mb-3 group-hover:text-ame-rain transition-colors duration-300"
                  style={{ fontFamily: 'Orbitron, monospace' }}
                >
                  {item.title}
                </h3>
                <p className="text-ame-muted text-xs font-mono leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Terminal block ──────────────────────────────────────────────── */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="panel p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-ame-blood/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-ame-muted text-xs font-mono">whoami</span>
            </div>
            <div className="font-mono text-sm text-ame-muted space-y-1.5">
              <p>
                <span className="text-ame-purple">d0pp3lgang3r</span>
                <span className="text-ame-dim">@</span>
                <span className="text-ame-cyber">amegakure</span>
                <span className="text-ame-dim">:~$</span>{' '}
                <span className="text-ame-text">whoami</span>
              </p>
              <p className="text-ame-rain pl-4">
                French Polytech student passionate about cybersecurity
              </p>
              <p className="pt-2">
                <span className="text-ame-purple">d0pp3lgang3r</span>
                <span className="text-ame-dim">@</span>
                <span className="text-ame-cyber">amegakure</span>
                <span className="text-ame-dim">:~$</span>{' '}
                <span className="text-ame-text">cat interests.txt</span>
              </p>
              <div className="pl-4 space-y-0.5 text-xs">
                <p><span className="text-ame-purple">■</span> Cryptography — RSA, ECC, Lattices, Isogenies, ZK-Proofs</p>
                <p><span className="text-ame-purple">■</span> Network Security — Protocol analysis, XMPP, SNMP</p>
                <p><span className="text-ame-purple">■</span> CTF competitions — CryptoHack Rank #329 | Root-Me</p>
                <p><span className="text-ame-purple">■</span> Bug Bounty — YesWeHack active hunter</p>
                <p><span className="text-ame-purple">■</span> Anime — Naruto / Amegakure no Sato enthusiast</p>
              </div>
              <p className="pt-2">
                <span className="text-ame-purple">d0pp3lgang3r</span>
                <span className="text-ame-dim">@</span>
                <span className="text-ame-cyber">amegakure</span>
                <span className="text-ame-dim">:~$</span>
                <span className="cursor" />
              </p>
            </div>
          </div>
        </motion.section>

        {/* ── Quick nav ───────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { href: '/skills',   label: 'SKILLS',   kana: 'スキル',   desc: 'Tech stack & expertise' },
              { href: '/articles', label: 'ARTICLES',  kana: '記事',     desc: 'Technical writings' },
              { href: '/writeups', label: 'WRITEUPS',  kana: '解答',     desc: 'CTF solutions' },
              { href: '/contact',  label: 'CONTACT',   kana: '連絡先',   desc: 'Get in touch' },
            ].map(item => (
              <motion.div key={item.href} variants={fadeUp}>
                <Link
                  href={item.href}
                  className="panel p-5 block group hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-ame-muted text-xs font-jp mb-1 group-hover:text-ame-purple transition-colors">{item.kana}</div>
                  <div
                    className="text-ame-text font-orbitron font-bold text-sm tracking-wider group-hover:text-ame-rain transition-colors duration-300"
                    style={{ fontFamily: 'Orbitron, monospace' }}
                  >
                    {item.label}
                  </div>
                  <div className="text-ame-muted text-xs font-mono mt-1">{item.desc}</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
