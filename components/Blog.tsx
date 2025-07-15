'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    const contents = contentRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    if (!section || !container) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([headerRef.current, paragraphRef.current], {
        opacity: 0,
        y: 30,
      });
      gsap.set(contents, { opacity: 0 });

      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      introTl.to([headerRef.current, paragraphRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      });

      introTl.to(
        contents[0],
        {
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
        },
        '-=0.7'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <Container>
        <div ref={containerRef} className="overflow-hidden">
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
              exceptional results.
            </p>
          </div>
          <div className="mt-20 h-[1000px]">Blog posts</div>
        </div>
      </Container>
    </section>
  );
}

export default Blog;
