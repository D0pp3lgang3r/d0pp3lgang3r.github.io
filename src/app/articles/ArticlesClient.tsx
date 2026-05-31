'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PostCard from '@/components/PostCard';
import type { PostMeta } from '@/lib/markdown';

export default function ArticlesClient({ initialPosts }: { initialPosts: PostMeta[] }) {
  const [filter,    setFilter]    = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(initialPosts.flatMap(p => p.tags)));

  const filtered = initialPosts.filter(p => {
    const matchText = !filter ||
      p.title.toLowerCase().includes(filter.toLowerCase()) ||
      p.description.toLowerCase().includes(filter.toLowerCase());
    const matchTag = !activeTag || p.tags.includes(activeTag);
    return matchText && matchTag;
  });

  return (
    <div style={{ minHeight: '100vh', paddingTop: 72, paddingBottom: 60 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: '0.7rem', color: '#475569', letterSpacing: '0.2em', marginBottom: 12 }}>
              記事 / ARTICLES
            </p>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, color: '#e2e8f0', marginBottom: 12 }}>
              ARTICLES
            </h1>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem', color: '#64748b', maxWidth: 520 }}>
              Écrits techniques — cryptographie, sécurité réseau, mathématiques.
            </p>
          </div>
        </motion.div>

        {/* Search + filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              background: 'rgba(10,10,18,0.6)',
              border: '1px solid rgba(124,58,237,0.2)',
              outline: 'none',
              color: '#e2e8f0',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8rem',
              padding: '8px 14px',
              maxWidth: 320,
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(124,58,237,0.5)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(124,58,237,0.2)')}
          />

          {allTags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <button
                onClick={() => setActiveTag(null)}
                className="tag"
                style={{
                  background: !activeTag ? 'rgba(124,58,237,0.18)' : undefined,
                  borderColor: !activeTag ? 'rgba(167,139,250,0.5)' : undefined,
                  color: !activeTag ? '#c4b5fd' : undefined,
                  cursor: 'pointer',
                }}
              >
                ALL
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className="tag"
                  style={{
                    background: activeTag === tag ? 'rgba(124,58,237,0.18)' : undefined,
                    borderColor: activeTag === tag ? 'rgba(167,139,250,0.5)' : undefined,
                    color: activeTag === tag ? '#c4b5fd' : undefined,
                    cursor: 'pointer',
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
          </div>
        </motion.div>

        {/* Column header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '7rem 1fr auto',
            gap: '1.5rem',
            padding: '6px 0 10px',
            borderBottom: '1px solid rgba(124,58,237,0.22)',
            marginBottom: 0,
          }}
        >
          {['DATE', 'TITRE', 'TAGS'].map(h => (
            <span
              key={h}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '0.6rem',
                color: '#4c1d95',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: '#475569', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem' }}>
            {initialPosts.length === 0
              ? 'Aucun article pour le moment — bientôt.'
              : 'Aucun résultat.'}
          </div>
        ) : (
          <div>
            {filtered.map((post, i) => (
              <PostCard key={post.slug} post={post} type="articles" index={i} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
