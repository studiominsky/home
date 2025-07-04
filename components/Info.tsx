'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

function Info() {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
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
    <div className="bg-primary">
      <Container>
        <h4
          ref={textRef}
          className="text-black text-center py-50 font-geometric text-[72px]"
        >
          Digital products for today’s world. Available for new
          projects Studio Minsky builds the digital tools that drive
          business growth. From websites
        </h4>
      </Container>
    </div>
  );
}

export default Info;
