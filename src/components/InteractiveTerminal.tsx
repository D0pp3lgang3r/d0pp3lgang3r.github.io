'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface Line {
  type: 'input' | 'output' | 'success' | 'error' | 'info' | 'dim' | 'blank';
  text: string;
}

const COMMANDS: Record<string, () => Line[]> = {
  help: () => [
    { type: 'info',    text: 'Available commands:' },
    { type: 'dim',     text: '  whoami       —  Who am I' },
    { type: 'dim',     text: '  skills       —  Technical skills' },
    { type: 'dim',     text: '  links        —  Social profiles' },
    { type: 'dim',     text: '  ls articles  —  List articles' },
    { type: 'dim',     text: '  ls writeups  —  List CTF writeups' },
    { type: 'dim',     text: '  neofetch     —  System info' },
    { type: 'dim',     text: '  clear        —  Clear terminal' },
    { type: 'blank',   text: '' },
  ],
  whoami: () => [
    { type: 'success', text: 'D0pp3lgang3r' },
    { type: 'output',  text: 'French Polytech student — hacking stuff for fun.' },
    { type: 'output',  text: 'Focus: Cryptography · Network Security · CTF · Bug Bounty' },
    { type: 'blank',   text: '' },
    { type: 'dim',     text: 'CryptoHack Rank #329 · 11 040 pts · 160+ challenges' },
    { type: 'dim',     text: 'Root-Me CTF competitor' },
    { type: 'dim',     text: 'YesWeHack Bug Bounty Hunter' },
    { type: 'blank',   text: '' },
  ],
  about: () => COMMANDS.whoami(),
  skills: () => [
    { type: 'info',    text: '── Cryptography ──────────────────' },
    { type: 'output',  text: '  RSA, Elliptic Curves, Lattices, Isogenies' },
    { type: 'output',  text: '  Zero-Knowledge Proofs, Diffie-Hellman, Hash Functions' },
    { type: 'blank',   text: '' },
    { type: 'info',    text: '── Network Security ──────────────' },
    { type: 'output',  text: '  XMPP, SNMP, Protocol Analysis, Web Vulns' },
    { type: 'blank',   text: '' },
    { type: 'info',    text: '── Languages ─────────────────────' },
    { type: 'output',  text: '  Python, SageMath, C, TypeScript' },
    { type: 'blank',   text: '' },
  ],
  links: () => [
    { type: 'info',    text: 'Profiles:' },
    { type: 'success', text: '  GitHub      →  github.com/D0pp3lgang3r' },
    { type: 'success', text: '  CryptoHack  →  cryptohack.org/user/D0pp3lgang3r/' },
    { type: 'success', text: '  Root-Me     →  root-me.org/D0pp3lgang3r' },
    { type: 'success', text: '  YesWeHack   →  yeswehack.com/hunters/D0pp3lgang3r' },
    { type: 'blank',   text: '' },
  ],
  'ls articles': () => [
    { type: 'info',    text: 'content/articles/' },
    { type: 'output',  text: '  introduction-rsa.md   —  Introduction à RSA — Mathématiques et Attaques' },
    { type: 'blank',   text: '' },
  ],
  'ls writeups': () => [
    { type: 'info',    text: 'content/writeups/' },
    { type: 'output',  text: '  cryptohack-rsa-challenge.md   —  Crossed Wires (RSA Broadcast)' },
    { type: 'blank',   text: '' },
  ],
  ls: () => [
    { type: 'dim',     text: 'Hint: try  ls articles  or  ls writeups' },
    { type: 'blank',   text: '' },
  ],
  neofetch: () => [
    { type: 'success', text: '     ████████    d0pp3lgang3r@amegakure' },
    { type: 'success', text: '    ██      ██   ─────────────────────────' },
    { type: 'success', text: '   ██  雨の ██   OS:      Amegakure Linux 雨' },
    { type: 'success', text: '   ██  里  ██   Host:    Polytech Grenoble' },
    { type: 'success', text: '    ██      ██   Kernel:  5.∞.0-pain' },
    { type: 'success', text: '     ████████    Uptime:  always raining' },
    { type: 'blank',   text: '' },
    { type: 'info',    text: '                 Crypto:  CryptoHack #329 · 11040pts' },
    { type: 'info',    text: '                 CTF:     Root-Me · YesWeHack' },
    { type: 'info',    text: '                 Shell:   /bin/sage' },
    { type: 'blank',   text: '' },
    { type: 'dim',     text: '  ████ ████ ████ ████ ████ ████ ████' },
    { type: 'blank',   text: '' },
  ],
  date: () => [
    { type: 'output', text: new Date().toUTCString() },
    { type: 'blank',  text: '' },
  ],
  pwd: () => [
    { type: 'output', text: '/home/d0pp3lgang3r' },
    { type: 'blank',  text: '' },
  ],
  uname: () => [
    { type: 'output', text: 'AmeOS amegakure 雨.0.1-PAIN #∞ SMP PREEMPT Naruto/Pain x86_64' },
    { type: 'blank',  text: '' },
  ],
  'uname -a': () => COMMANDS.uname(),
};

const INITIAL: Line[] = [
  { type: 'dim',    text: '  Amegakure Linux 雨  —  kernel 雨.0.1-PAIN' },
  { type: 'dim',    text: '  Type  help  to see available commands.' },
  { type: 'blank',  text: '' },
];

const PROMPT_USER = 'd0pp3lgang3r';
const PROMPT_HOST = 'amegakure';

export default function InteractiveTerminal() {
  const [lines, setLines]     = useState<Line[]>(INITIAL);
  const [input, setInput]     = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    const inputLine: Line = {
      type: 'input',
      text: cmd,
    };

    if (trimmed === 'clear') {
      setLines(INITIAL);
      setInput('');
      return;
    }

    const handler = COMMANDS[trimmed];
    const output: Line[] = handler
      ? handler()
      : [
          { type: 'error', text: `command not found: ${trimmed}` },
          { type: 'dim',   text: "Type  help  for available commands." },
          { type: 'blank', text: '' },
        ];

    setLines(prev => [...prev, inputLine, ...output]);
    setHistory(prev => [cmd, ...prev.filter(h => h !== cmd)].slice(0, 50));
    setHistIdx(-1);
    setInput('');
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (input.trim()) run(input);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) { setHistIdx(-1); setInput(''); }
      else { setHistIdx(next); setInput(history[next] ?? ''); }
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const lower = input.toLowerCase();
      const match = Object.keys(COMMANDS).find(c => c.startsWith(lower) && c !== lower);
      if (match) setInput(match);
    }
  };

  return (
    <div
      className="terminal"
      onClick={() => inputRef.current?.focus()}
      style={{ cursor: 'text' }}
    >
      {/* Header bar */}
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: '#ef4444' }} />
        <div className="terminal-dot" style={{ background: '#f59e0b' }} />
        <div className="terminal-dot" style={{ background: '#10b981' }} />
        <span style={{ marginLeft: 8, color: '#475569', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace' }}>
          {PROMPT_USER}@{PROMPT_HOST}:~
        </span>
      </div>

      {/* Output */}
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => {
          if (line.type === 'blank') return <div key={i} style={{ height: 4 }} />;
          if (line.type === 'input') return (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 2 }}>
              <span className="terminal-user">{PROMPT_USER}</span>
              <span style={{ color: '#475569' }}>@</span>
              <span className="terminal-host">{PROMPT_HOST}</span>
              <span style={{ color: '#475569' }}>:~$</span>
              <span style={{ color: '#e2e8f0' }}>{line.text}</span>
            </div>
          );
          return (
            <div key={i} className={`terminal-output ${line.type}`}>
              {line.text}
            </div>
          );
        })}

        {/* Active input */}
        <div className="terminal-input-line">
          <span className="terminal-user">{PROMPT_USER}</span>
          <span style={{ color: '#475569' }}>@</span>
          <span className="terminal-host">{PROMPT_HOST}</span>
          <span style={{ color: '#475569' }}>:~$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
