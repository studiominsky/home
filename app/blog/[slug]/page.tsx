// app/blog/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/notion';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // ← await params before destructuring
  const { slug } = await params;

  const { frontMatter, html } = await getPost(slug);

  return (
    <article className="container mx-auto px-4 py-8 prose lg:prose-xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {frontMatter.title}
        </h1>
        <p className="text-gray-600">{frontMatter.description}</p>
        <time className="text-sm text-gray-500">
          Published on{' '}
          {new Date(frontMatter.date).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </header>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {frontMatter.headings.length > 0 && (
        <nav className="mt-12">
          <h2 className="font-semibold mb-2">On this page</h2>
          <ul className="list-disc list-inside">
            {frontMatter.headings.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  );
}
