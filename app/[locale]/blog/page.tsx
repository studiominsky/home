import FilteredBlogPosts from '@/components/FilteredPosts';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Link } from '@/i18n/navigation';
import { getPosts } from '@/lib/notion';
import type { BlogPostMeta } from '@/types/blog';
import { Info } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const allPosts: BlogPostMeta[] = await getPosts();
  const t = await getTranslations({ locale, namespace: 'BlogPage' });

  const posts = allPosts
    .filter((post) => post.date)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return (
    <>
      <Header />
      <main className="mt-[120px] pb-20 sm:pb-32 md:pb-50 container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/80 mb-8 group"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          {t('backToHome')}
        </Link>

        {locale !== 'en' && (
          <div className="flex items-center mb-8 gap-3">
            <span className="px-3 flex gap-1 items-center py-1 w-fit rounded-full text-xs font-bold font-mono transition-colors border bg-primary text-background border-primary">
              <Info size={18} /> <span>Info</span>
            </span>
            <div className="text-md text-foreground">
              {t('englishOnlyNotice')}
            </div>
          </div>
        )}

        <FilteredBlogPosts posts={posts} />
      </main>
      <Footer />
    </>
  );
}
