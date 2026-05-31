import { notFound } from 'next/navigation';
import { getPost, getAllPosts } from '@/lib/markdown';
import PostLayout from '@/components/PostLayout';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts('writeups').map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const post = getPost('writeups', params.slug);
  if (!post) return {};
  return {
    title:       `${post.title} | D0pp3lgang3r`,
    description: post.description,
  };
}

export default function WriteupDetailPage({ params }: Props) {
  const post = getPost('writeups', params.slug);
  if (!post) notFound();

  return <PostLayout post={post} type="writeups" />;
}
