'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';

gsap.registerPlugin(ScrollTrigger);

function Info() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setStyle } = useHeaderStyle();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 40px',
      onEnter: () => setStyle('light'),
      onLeaveBack: () => setStyle('dark'),
    });

    return () => {
      trigger.kill();
    };
  }, [setStyle]);

  return (
    <div
      ref={sectionRef}
      className="mx-[200px] min-h-screen bg-[#F6F6F0] mt-[-1px]"
    >
      <h1 className="font-geometric pt-20 text-center text-[120px] text-black">
        Studio Minsky
      </h1>
      <p className="text-lg">
        Studio Minsky builds the digital tools that drive business
        growth. From websites that turn visitors into customers, to
        custom software that streamlines your operations, every
        product is designed to increase your impact and efficiency.
        Automated chatbots engage your audience 24/7, while clear data
        visualizations empower you to make smarter, data-driven
        decisions.
      </p>
    </div>
  );
}

export default Info;
