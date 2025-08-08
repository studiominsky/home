'use client';

import React, { useLayoutEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

type AnimatedTextProps = {
  children: ReactNode;
  wrapperClassName?: string;
  textClassName?: string;
};

const defaultWrapperClasses = 'bg-primary';
const defaultTextClasses =
  'text-black text-center py-50 font-geometric text-[72px]';

export default function AnimatedText({
  children,
  wrapperClassName = defaultWrapperClasses,
  textClassName = defaultTextClasses,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, scale: 0.75 });

      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.75 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={wrapperClassName}>
      <Container>
        <h4 ref={textRef} className={textClassName}>
          {children}
        </h4>
      </Container>
    </div>
  );
}
