import { getAllPosts } from '@/lib/markdown';
import ArticlesClient from './ArticlesClient';

export default function ArticlesPage() {
  const posts = getAllPosts('articles');
  return <ArticlesClient initialPosts={posts} />;
}
