'use client';

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import Image from 'next/image';
import clsx from 'clsx';
import { useTranslations, useLocale } from 'next-intl';
import { Info } from 'lucide-react';
import type { BlogPostMeta } from '@/types/blog';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const t = useTranslations('Blog');
  const locale = useLocale(); // Get the current locale
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [articles, setArticles] = useState<BlogPostMeta[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/posts');
        const json = await res.json();
        const posts: BlogPostMeta[] = json.posts || [];
        posts.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setArticles(posts.slice(0, 4));
      } catch (err) {
        console.error('Failed to load posts', err);
      }
    }
    fetchArticles();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cards = contentRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    if (!section || !cards.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      tl.to([headerRef.current, paragraphRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      });

      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.2,
        },
        '-=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, [articles]);

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-30 bg-background"
    >
      <Container>
        <div className="overflow-hidden">
          <span className="font-mono border-b border-gray-300 py-3 text-sm block">
            04 {t('preTitle')}
          </span>
          <div className="flex flex-col lg:flex-row justify-between pt-10">
            <h1
              ref={headerRef}
              className="font-geometric text-5xl md:text-[75px] w-full lg:w-2/5 opacity-0 translate-y-8"
            >
              {t('title')}
            </h1>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl w-full lg:w-1/3 text-foreground opacity-0 translate-y-8"
            >
              {t('description')}
            </p>
          </div>

          {locale === 'de' && (
            <div className="mt-12 flex items-center gap-3">
              <span className="px-3 flex gap-1 items-center py-1 w-fit rounded-full text-xs font-bold font-mono transition-colors border bg-primary text-background border-primary">
                <Info size={18} /> <span>Info</span>
              </span>
              <div className="text-md text-foreground">
                {t('englishOnlyNotice')}
              </div>
            </div>
          )}

          <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {articles.map((post, i) => (
              <div
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                className="opacity-0 translate-y-8"
                key={post.slug}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  passHref
                  className="block"
                >
                  <div
                    className={clsx(
                      `post-card div${i + 1}`,
                      'cursor-pointer p-6 transition-transform duration-300 hover:-translate-y-2'
                    )}
                  >
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="rounded mb-4 object-cover w-full h-auto"
                      />
                    )}
                    <h2 className="text-2xl font-bold mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {post.description}
                    </p>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </time>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Link
            href="/blog"
            className={clsx(
              'm-auto mt-10 cursor-pointer text-card z-99 max-w-[230px] bg-background-inverted font-sans px-5 py-3 flex items-center justify-center rounded-full text-center',
              'text-[0.875rem] leading-[1.25rem] font-medium opacity-100',
              'text-[var(--ds-background-100)] transition-transform hover:scale-105'
            )}
            style={{
              letterSpacing: 'initial',
            }}
          >
            {t('seeAll')}
          </Link>
        </div>
      </Container>
    </section>
  );
}
