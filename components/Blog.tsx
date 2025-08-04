'use client';

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react';
import Link from 'next/link'; // ← import Link
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
};

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch('/api/posts');
        const json = await res.json();
        const posts: Article[] = json.posts || [];
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
      gsap.set([headerRef.current, paragraphRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(cards, { opacity: 0, y: 30 });

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
    <section ref={sectionRef} className="py-24 bg-background">
      <Container>
        <div className="overflow-hidden">
          <span className="font-mono border-b border-gray-300 py-3 text-sm block">
            02 SOME TEXT HERE
          </span>
          <div className="flex justify-between pt-10">
            <h1
              ref={headerRef}
              className="font-geometric text-5xl md:text-[75px] w-2/5"
            >
              BLOG
            </h1>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl w-1/3 text-foreground"
            >
              Our Blog is designed for clarity and collaboration,
              ensuring every project is a partnership that leads to
              exceptional results. Try deploy.
            </p>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                passHref
              >
                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="cursor-pointer p-6 transition-transform hover:-translate-y-1"
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
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
