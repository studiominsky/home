import { getPosts } from '@/lib/notion';
import HeaderClient from './HeaderClient';

export default async function Header() {
  const posts = await getPosts();
  const latest = posts[0] ?? null;
  const recent = posts.slice(0, 4);

  return <HeaderClient posts={recent} latest={latest} />;
}
