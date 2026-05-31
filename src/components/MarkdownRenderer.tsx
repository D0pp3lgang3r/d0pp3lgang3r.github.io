'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const components: Components = {
  img({ src, alt }) {
    if (!src) return null;
    const isExternal = src.startsWith('http://') || src.startsWith('https://');
    if (isExternal) {
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={src} alt={alt ?? ''} style={{ maxWidth: '100%', borderRadius: 4 }} />;
    }
    return (
      <span style={{ display: 'block', position: 'relative', width: '100%', minHeight: 200 }}>
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </span>
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
    return <pre>{children}</pre>;
  },

  code({ className, children, ...props }) {
    const isBlock = !!className;
    if (isBlock) {
      const lang = (className ?? '').replace('language-', '');
      return (
        <div className="relative">
          {lang && (
            <span
              className="absolute top-2 right-3 text-ame-muted text-xs font-mono opacity-60"
            >
              {lang}
            </span>
          )}
          <code className={className} {...props}>
            {children}
          </code>
        </div>
      );
    }
    return <code className={className} {...props}>{children}</code>;
  },
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content">
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
