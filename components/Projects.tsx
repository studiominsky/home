'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

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
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-30 bg-background h-[1000px]"
    >
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
              PROJECTS
            </h1>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl w-1/3 text-foreground"
            >
              Our process is designed for clarity and collaboration,
              ensuring every project is a partnership that leads to
              exceptional results.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
