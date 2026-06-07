'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import type { PostMeta } from '@/lib/markdown';

export default function ArticlesClient({ initialPosts }: { initialPosts: PostMeta[] }) {
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
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
              <div style={{ width: 4, height: 52, background: 'linear-gradient(180deg,#7c3aed,#a78bfa)', borderRadius: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '0.68rem', color: '#475569', letterSpacing: '0.22em', marginBottom: 6 }}>
                  記事 / ARTICLES
                </p>
                <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 900, color: '#e2e8f0', letterSpacing: '0.02em', lineHeight: 1 }}>
                  ARTICLES
                </h1>
              </div>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 560, marginLeft: 20 }}>
              Écrits techniques — cryptographie, mathématiques, sécurité réseau.
              Des explications approfondies, pas des solutions de challenges.
            </p>
          </div>
        </motion.div>

        {/* Search + tags */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <div style={{ marginBottom: 36 }}>
            <div style={{ position: 'relative', maxWidth: 600, marginBottom: 14 }}>
              <svg
                viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#475569" strokeWidth="2"
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(10,10,18,0.75)',
                  border: '1px solid rgba(124,58,237,0.25)',
                  borderRadius: 10,
                  outline: 'none',
                  color: '#e2e8f0',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.88rem',
                  padding: '12px 16px 12px 44px',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(124,58,237,0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.08)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(124,58,237,0.25)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {allTags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button onClick={() => setActiveTag(null)} className="tag" style={{ cursor: 'pointer', background: !activeTag ? 'rgba(124,58,237,0.18)' : undefined, borderColor: !activeTag ? 'rgba(167,139,250,0.5)' : undefined, color: !activeTag ? '#c4b5fd' : undefined }}>
                  Tous
                </button>
                {allTags.map(tag => (
                  <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className="tag" style={{ cursor: 'pointer', background: activeTag === tag ? 'rgba(124,58,237,0.18)' : undefined, borderColor: activeTag === tag ? 'rgba(167,139,250,0.5)' : undefined, color: activeTag === tag ? '#c4b5fd' : undefined }}>
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
            {initialPosts.length === 0 ? 'Aucun article pour le moment — bientôt.' : 'Aucun résultat.'}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}>
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} type="articles" index={i} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
