'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  variant?: 'articles' | 'writeups';
}

const customStyle = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: '#1e1e2e',
    border: '1px solid rgba(124,58,237,0.22)',
    borderRadius: '6px',
    margin: '1.5rem 0',
    padding: '1.2rem 1.4rem',
    fontSize: '0.82rem',
    lineHeight: '1.65',
    fontFamily: "'JetBrains Mono', monospace",
    overflowX: 'auto' as const,
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'none',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '0.82rem',
  },
};

const components: Components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code({ className, children, ...props }: any) {
    const match   = /language-(\w+)/.exec(className ?? '');
    const lang    = match?.[1] ?? '';
    const code    = String(children).replace(/\n$/, '');
    const isBlock = !!match || code.includes('\n');

    if (isBlock && match) {
      return (
        <div style={{ position: 'relative' }}>
          {lang && (
            <span style={{
              position: 'absolute', top: 8, right: 12, zIndex: 1,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.55rem',
              color: '#4c1d95',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>
              {lang}
            </span>
          )}
          <SyntaxHighlighter
            language={lang || 'text'}
            style={customStyle}
            PreTag="div"
            customStyle={{
              background: '#1e1e2e',
              border: '1px solid rgba(124,58,237,0.22)',
              borderRadius: 6,
              margin: '1.5rem 0',
              padding: '1.2rem 1.4rem',
              fontSize: '0.82rem',
              lineHeight: '1.65',
              fontFamily: "'JetBrains Mono', monospace",
              overflowX: 'auto',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );
    }

    if (isBlock) {
      return (
        <pre style={{
          background: '#1e1e2e',
          border: '1px solid rgba(124,58,237,0.22)',
          borderRadius: 6,
          margin: '1.5rem 0',
          padding: '1.2rem 1.4rem',
          fontSize: '0.82rem',
          lineHeight: '1.65',
          fontFamily: "'JetBrains Mono', monospace",
          overflowX: 'auto',
          whiteSpace: 'pre',
          color: '#e2e8f0',
        }}>
          <code style={{ background: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', padding: 0, border: 'none', borderRadius: 0 }}>
            {code}
          </code>
        </pre>
      );
    }

    return (
      <code
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          background: 'rgba(124,58,237,0.09)',
          border: '1px solid rgba(124,58,237,0.18)',
          color: '#06b6d4',
          padding: '1px 5px',
          fontSize: '0.83em',
          borderRadius: 3,
        }}
        {...props}
      >
        {children}
      </code>
    );
  },

  img({ src, alt }) {
    if (!src) return null;
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt ?? ''}
        style={{
          maxWidth: '55%',
          width: 'auto',
          height: 'auto',
          borderRadius: 6,
          border: '1px solid rgba(124,58,237,0.2)',
          margin: '1.75rem auto',
          display: 'block',
        }}
      />
    );
  },

  a({ href, children }) {
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    );
  },

  pre({ children }) {
    return <>{children}</>;
  },
};

export default function MarkdownRenderer({ content, variant }: MarkdownRendererProps) {
  const cls = variant === 'writeups' ? 'markdown-content writeup-content' : 'markdown-content';
  return (
    <div className={cls}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
