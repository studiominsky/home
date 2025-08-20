import FilteredBlogPosts from '@/components/FilteredPosts';
import Header from '@/components/Header';
import { getPosts } from '@/lib/notion';
import type { BlogPostMeta } from '@/types/blog';
import Link from 'next/link';

export default async function BlogListPage() {
  const posts: BlogPostMeta[] = await getPosts();

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <Header />
      <main className="mt-[120px] container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors mb-8 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to Home
        </Link>

        <FilteredBlogPosts posts={posts} />
      </main>
    </>
  );
}
