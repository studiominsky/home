'use client';

import { useState, useMemo, useRef, useLayoutEffect } from 'react';
import type { BlogPostMeta } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  posts: BlogPostMeta[];
};

export default function FilteredBlogPosts({ posts }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const component = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const filtersRef = useRef(null);
  const isInitialRender = useRef(true);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach((post) =>
      post.tags?.forEach((tag) => tags.add(tag))
    );
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
      tl.to(
        [titleRef.current, paragraphRef.current, filtersRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
        }
      );
      tl.to(
        '.post-card-animate',
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.5'
      );
    }, component);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.post-card-animate',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.1,
        }
      );
    }, component);
    return () => ctx.revert();
  }, [filteredPosts]);

  return (
    <div ref={component}>
      <header className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
        <div className="lg:w-1/2">
          <h1
            ref={titleRef}
            className="text-5xl md:text-[75px] font-geometric uppercase font-bold opacity-0 translate-y-8"
          >
            Our Blog
          </h1>
          <p
            ref={paragraphRef}
            className="max-w-xl text-lg text-foreground/80 mt-4 opacity-0 translate-y-8"
          >
            A collection of our thoughts on design, development, and
            collaboration. Use the tags to filter articles by topic.
          </p>
        </div>

        <aside
          ref={filtersRef}
          className="w-full lg:w-auto lg:max-w-md p-6 bg-background/50 opacity-0 translate-y-8"
        >
          <h3 className="font-bold text-xl mb-4">All topics</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={clsx(
                'px-3 py-1 cursor-pointer rounded-full text-xs font-bold font-mono transition-colors border',
                !selectedTag
                  ? 'bg-primary text-background border-primary'
                  : 'bg-primary/20 border-primary text-primary hover:bg-primary/30'
              )}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={clsx(
                  'px-3 py-1 cursor-pointer rounded-full text-xs font-bold font-mono transition-colors capitalize border',
                  selectedTag === tag
                    ? 'bg-primary text-background border-primary'
                    : 'bg-primary/20 border-primary text-primary hover:bg-primary/30'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </aside>
      </header>

      <div>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                passHref
                className="block post-card-animate opacity-0 translate-y-8"
              >
                <div className="post-card cursor-pointer h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                  {post.coverImage && (
                    <div className="overflow-hidden rounded-md mb-5">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={600}
                        height={300}
                        className="object-cover w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-foreground/70 mb-4 flex-grow">
                      {post.description}
                    </p>
                    <time className="text-sm text-gray-500 mt-auto">
                      {new Date(post.date).toLocaleDateString(
                        'en-EN',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }
                      )}
                    </time>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border rounded-md">
            <h3 className="text-xl font-bold">
              No posts found for &quot;{selectedTag}&quot;
            </h3>
            <p className="text-foreground/70 mt-2">
              Try selecting another tag.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
