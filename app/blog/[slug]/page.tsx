import Header from '@/components/Header';
import { getPost, getPosts } from '@/lib/notion';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { BlogPostMeta } from '@/types/blog';
import TableOfContents from '@/components/TableOfContent';
import PostContent from '@/components/PostContent';

export async function generateStaticParams(): Promise<
  { slug: string }[]
> {
  const posts: BlogPostMeta[] = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  const { frontMatter, html } = await getPost(slug);

  return (
    <>
      <Header />

      <article className="mt-[80px] container mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 mt-auto">
            <h1 className="text-[75px] font-geometric leading-20 uppercase font-bold mb-3">
              {frontMatter.title}
            </h1>

            <time className="text-sm text-gray-500">
              Published on{' '}
              {new Date(frontMatter.date).toLocaleDateString(
                'en-EN',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )}
            </time>
          </div>

          {frontMatter.coverImage && (
            <div className="flex-shrink-0 w-full lg:w-1/2">
              <Image
                src={frontMatter.coverImage}
                alt={frontMatter.title}
                width={800}
                height={500}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          )}
        </header>

        {frontMatter.description && (
          <section
            aria-label="Summary"
            className="relative my-10 pl-5 border-l-3 border-primary"
          >
            <p className="m-0 text-2xl leading-8 text-foreground/90">
              {frontMatter.description}
            </p>
          </section>
        )}

        <div className="flex gap-20 justify-between w-full">
          <div className="blog-text prose lg:prose-xl w-2/3">
            <PostContent
              html={html}
              headings={frontMatter.headings}
            />
          </div>

          <aside className="hidden lg:block sticky top-[100px] text-end self-start max-h-[70vh] overflow-auto w-1/3">
            <TableOfContents
              headings={frontMatter.headings}
              title="On this page"
            />
          </aside>
        </div>
      </article>
    </>
  );
}
