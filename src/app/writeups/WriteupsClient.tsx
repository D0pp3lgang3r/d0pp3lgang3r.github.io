'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import type { PostMeta } from '@/lib/markdown';

export default function WriteupsClient({ initialPosts }: { initialPosts: PostMeta[] }) {
  const [filter,    setFilter]    = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags  = Array.from(new Set(initialPosts.flatMap(p => p.tags)));
  const filtered = initialPosts.filter(p => {
    const matchText = !filter ||
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase());
    const matchTag = !activeTag || p.tags.includes(activeTag);
    return matchText && matchTag;
  });

  return (
    <div style={{ minHeight: '100vh', paddingTop: 72, paddingBottom: 80 }}>
      <div className="page-container">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <div style={{ width: 4, height: 52, background: 'linear-gradient(180deg,#ef4444,#f97316)', borderRadius: 2, flexShrink: 0 }} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '0.68rem', color: '#475569', letterSpacing: '0.22em' }}>
                    解答 / WRITEUPS
                  </p>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
                    fontWeight: 700, letterSpacing: '0.1em',
                    padding: '2px 8px', borderRadius: 4,
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.32)',
                    color: '#ef4444',
                    textTransform: 'uppercase',
                  }}>
                    CTF only
                  </span>
                </div>
                <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900, color: '#e2e8f0', letterSpacing: '0.02em', lineHeight: 1 }}>
                  WRITEUPS
                </h1>
              </div>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 560, marginLeft: 20 }}>
              Solutions de quelques challenges de CTF...
            </p>
          </div>
        </motion.div>

        {/* Search + tags */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ position: 'relative', maxWidth: 600, marginBottom: 14 }}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="#ef4444"
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.6 }}>
                <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
              </svg>
              <input
                type="text"
                placeholder="Rechercher un writeup, challenge, plateforme..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(10,10,18,0.75)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  borderRadius: 10,
                  outline: 'none',
                  color: '#e2e8f0',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.88rem',
                  padding: '12px 16px 12px 44px',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(239,68,68,0.5)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.07)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(239,68,68,0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {allTags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button onClick={() => setActiveTag(null)} className="tag" style={{ cursor: 'pointer', borderColor: !activeTag ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.2)', color: !activeTag ? '#fca5a5' : '#64748b', background: !activeTag ? 'rgba(239,68,68,0.1)' : undefined }}>
                  Tous
                </button>
                {allTags.map(tag => (
                  <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className="tag" style={{ cursor: 'pointer', borderColor: activeTag === tag ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.2)', color: activeTag === tag ? '#fca5a5' : '#64748b', background: activeTag === tag ? 'rgba(239,68,68,0.1)' : undefined }}>
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: '#475569', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem' }}>
            {initialPosts.length === 0 ? 'Aucun writeup pour le moment — bientôt.' : 'Aucun résultat.'}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}>
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} type="writeups" index={i} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
