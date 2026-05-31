import { getAllPosts } from '@/lib/markdown';
import WriteupsClient from './WriteupsClient';

export default function WriteupsPage() {
  const posts = getAllPosts('writeups');
  return <WriteupsClient initialPosts={posts} />;
}
