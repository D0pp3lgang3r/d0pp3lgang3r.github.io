'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0 },
};

const LINKS = [
  {
    platform: 'GitHub',
    kana:     'ギットハブ',
    handle:   'D0pp3lgang3r',
    url:      'https://github.com/D0pp3lgang3r',
    desc:     'Open-source tools & projects',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    platform: 'CryptoHack',
    kana:     'クリプトハック',
    handle:   'D0pp3lgang3r',
    url:      'https://cryptohack.org/user/D0pp3lgang3r/',
    desc:     'Rank #329 · 11 040 pts · 160+ challs',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
  },
  {
    platform: 'Root-Me',
    kana:     'ルートミー',
    handle:   'D0pp3lgang3r',
    url:      'https://www.root-me.org/D0pp3lgang3r',
    desc:     'CTF challenges · Multi-category',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
      </svg>
    ),
  },
  {
    platform: 'YesWeHack',
    kana:     'バグバウンティ',
    handle:   'D0pp3lgang3r',
    url:      'https://yeswehack.com/hunters/D0pp3lgang3r',
    desc:     '#1 Bug Bounty Platform Europe · Active hunter',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.5 3.5 0 0 0-3.433 2.813l1.962.393A1.5 1.5 0 1 1 13 11a1 1 0 0 0-1 1v1h2v-.645z"/>
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] Message from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:D0pp3lgang3rEva@protonmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={fadeUp} className="text-ame-muted text-sm font-jp tracking-widest block mb-4">
            連絡先 / CONTACT
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-orbitron font-black text-ame-text mb-4"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            GET IN TOUCH
          </motion.h1>
          <motion.p variants={fadeUp} className="text-ame-muted font-mono text-sm max-w-xl">
            CTF collab, bug bounty tips, research, or just say hi — je suis dispo.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Social links */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-orbitron font-bold text-sm tracking-widest text-ame-muted mb-6"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              PROFILS
            </motion.h2>

            <div className="space-y-4">
              {LINKS.map(link => (
                <motion.a
                  key={link.platform}
                  variants={fadeUp}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel p-4 flex items-center gap-4 group block hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="text-ame-muted group-hover:text-ame-rain transition-colors duration-300 flex-shrink-0">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-ame-muted text-xs font-jp mb-0.5">{link.kana}</div>
                    <div
                      className="font-orbitron font-bold text-xs text-ame-text group-hover:text-ame-rain transition-colors duration-300 tracking-wider"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {link.platform}
                    </div>
                    <div className="text-ame-dim text-xs font-mono truncate">{link.desc}</div>
                  </div>
                  <div className="text-ame-purple/50 group-hover:text-ame-rain transition-colors text-xs">
                    ↗
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2
              className="font-orbitron font-bold text-sm tracking-widest text-ame-muted mb-6"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              MESSAGE
            </h2>

            {sent ? (
              <div className="panel p-8 text-center">
                <div className="text-4xl mb-4">☁️</div>
                <p className="font-orbitron font-bold text-ame-rain text-sm mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>
                  MESSAGE ENVOYÉ
                </p>
                <p className="text-ame-muted font-mono text-xs">
                  Ton client mail s&apos;est ouvert. À bientôt.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-ame-purple text-xs font-mono hover:text-ame-rain transition-colors"
                >
                  ← Nouveau message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="panel p-6 space-y-5">
                {[
                  { id: 'name',    label: 'NOM',     type: 'text',  placeholder: 'Your name' },
                  { id: 'email',   label: 'EMAIL',   type: 'email', placeholder: 'your@email.com' },
                ].map(field => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-ame-muted text-xs font-mono mb-1.5 tracking-widest"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={form[field.id as keyof typeof form]}
                      onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                      className="w-full bg-ame-black/60 border border-ame-steel/60 focus:border-ame-purple/60 outline-none text-ame-text font-mono text-sm px-4 py-2.5 transition-colors duration-200 placeholder:text-ame-dim"
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-ame-muted text-xs font-mono mb-1.5 tracking-widest"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-ame-black/60 border border-ame-steel/60 focus:border-ame-purple/60 outline-none text-ame-text font-mono text-sm px-4 py-2.5 resize-none transition-colors duration-200 placeholder:text-ame-dim"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 font-orbitron font-bold text-xs tracking-widest text-ame-black bg-ame-purple hover:bg-ame-rain transition-all duration-300"
                  style={{
                    fontFamily: 'Orbitron, monospace',
                    clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
                  }}
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
