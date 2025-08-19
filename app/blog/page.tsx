// app/blog/page.tsx
import Link from 'next/link';
import { getPosts } from '@/lib/notion';

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-white dark:bg-gray-900">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-2 text-gray-900 dark:text-gray-100">
          The Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          All my thoughts, organized for your reading pleasure.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 bg-gray-50 dark:bg-gray-800 border rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 group"
          >
            <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {post.description}
            </p>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(post.date).toLocaleDateString('en-EN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </Link>
        ))}
      </div>
    </div>
  );
}
