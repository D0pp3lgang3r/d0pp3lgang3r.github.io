import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export interface PostMeta {
  slug:        string;
  title:       string;
  date:        string;
  description: string;
  tags:        string[];
  readingTime: string;
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: string;
}

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function getDir(type: 'articles' | 'writeups') {
  return path.join(CONTENT_ROOT, type);
}

function slugFromFile(filename: string) {
  return filename.replace(/\.md$/, '');
}

export function getAllPosts(type: 'articles' | 'writeups'): PostMeta[] {
  const dir = getDir(type);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

  return files
    .flatMap(filename => {
      try {
        const slug = slugFromFile(filename);
        const raw = fs.readFileSync(path.join(dir, filename), 'utf-8');
        const { data, content } = matter(raw);
        const rt = readingTime(content);

        return [{
          slug,
          title:       data.title ?? slug,
          date:        data.date ?? '',
          description: data.description ?? '',
          tags:        Array.isArray(data.tags) ? data.tags : [],
          readingTime: rt.text,
          coverImage:  data.coverImage ?? undefined,
        } satisfies PostMeta];
      } catch (err) {
        console.error(`[markdown] Failed to parse ${filename}:`, err);
        return [];
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(type: 'articles' | 'writeups', slug: string): Post | null {
  const filepath = path.join(getDir(type), `${slug}.md`);

  if (!fs.existsSync(filepath)) return null;

  let raw: string;
  let data: Record<string, unknown>;
  let content: string;
  try {
    raw = fs.readFileSync(filepath, 'utf-8');
    ({ data, content } = matter(raw));
  } catch (err) {
    console.error(`[markdown] getPost failed for ${slug}:`, err);
    return null;
  }
  const rt = readingTime(content);

  return {
    slug,
    content,
    title:       data.title ?? slug,
    date:        data.date ?? '',
    description: data.description ?? '',
    tags:        Array.isArray(data.tags) ? data.tags : [],
    readingTime: rt.text,
    coverImage:  data.coverImage ?? undefined,
  };
}
