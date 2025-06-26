'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

function Services() {
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
      className="min-h-screen bg-[#F6F6F0] mt-[-1px]"
    >
      <Container>
        <div className="flex justify-between pt-10">
          <div className="max-w-[70%]">
            <h1 className="font-geometric text-[75px] text-black">
              SERVICES
            </h1>
            <div>
              <span className="font-geometric border-b-1 border-[#bdbdbd] mb-10 flex items-center gap-4">
                <span className="text-[23px]">01</span>
                <span className="text-[45px] uppercase">
                  Web Applications
                </span>
              </span>
              <span className="font-geometric border-b-1 border-[#bdbdbd] mb-10 flex items-center gap-4">
                <span className="text-[23px]">02</span>
                <span className="text-[45px] uppercase">
                  Websites
                </span>
              </span>
              <span className="font-geometric border-b-1 border-[#bdbdbd] mb-10 flex items-center gap-4">
                <span className="text-[23px]">03</span>
                <span className="text-[45px] uppercase">
                  Data Visualizations
                </span>
              </span>
              <span className="font-geometric border-b-1 border-[#bdbdbd] mb-10 flex items-center gap-4">
                <span className="text-[23px]">04</span>
                <span className="text-[45px] uppercase">
                  AI Integrations
                </span>
              </span>
              <span className="font-geometric border-b-1 border-[#bdbdbd] mb-10 flex items-center gap-4">
                <span className="text-[23px]">05</span>
                <span className="text-[45px] uppercase">
                  Chatbots
                </span>
              </span>
            </div>
            <p className="text-lg">
              Studio Minsky builds the digital tools that drive
              business growth. From websites that turn visitors into
              customers, to custom software that streamlines your
              operations, every product is designed to increase your
              impact and efficiency. Automated chatbots engage your
              audience 24/7, while clear data visualizations empower
              you to make smarter, data-driven decisions.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Services;
