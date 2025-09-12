'use client';

import React, { useLayoutEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

type Stat = {
  value: string;
  label: string;
};

type ContentBlockProps = {
  children: ReactNode;
  stats?: Stat[];
};

export default function ContentBlock({
  children,
  stats,
}: ContentBlockProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      tl.fromTo(
        textRef.current,
        { opacity: 0, scale: 0.75 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        }
      );

      if (stats?.length) {
        tl.fromTo(
          statRefs.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.2,
          },
          '-=0.5'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <div ref={sectionRef} className="bg-primary py-20 md:py-40">
      <Container>
        <h4
          ref={textRef}
          className="text-black text-center font-geometric text-4xl sm:text-5xl md:text-6xl lg:text-7xl  mb-8 leading-tight md:leading-23"
        >
          {children}
        </h4>

        {stats && (
          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-8 md:gap-20">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => {
                  statRefs.current[i] = el;
                }}
                className="flex flex-col items-center justify-center size-28 sm:size-36 md:size-48 bg-background rounded-full text-foreground text-center p-4 opacity-0"
              >
                <span className="font-geometric text-2xl sm:text-3xl md:text-4xl">
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-wider mt-1 opacity-70">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
