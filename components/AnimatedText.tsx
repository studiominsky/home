'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
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

function AnimatedText({
  children,
  wrapperClassName = defaultWrapperClasses,
  textClassName = defaultTextClasses,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = textRef.current;

    if (!element) return;

    const anim = gsap.from(element, {
      opacity: 0,
      scale: 0.75,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });

    return () => {
      anim.kill();
    };
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

export default AnimatedText;
