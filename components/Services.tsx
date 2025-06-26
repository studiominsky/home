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
    <section
      ref={sectionRef}
      className="py-26 min-h-screen bg-[#F6F6F0] mt-[-1px]"
    >
      <Container>
        <div className="flex flex-col pt-10">
          <div className="flex justify-between gap-10">
            <h1 className="font-geometric text-[75px] text-black flex items-center gap-5 w-1/3">
              <span>01</span>
              <span>SERVICES</span>
            </h1>
            <p className="text-lg w-1/3">
              Studio Minsky builds the digital tools that drive
              business growth. From websites that turn visitors into
              customers, to custom software that streamlines your
              operations, every product is designed to increase your
              impact and efficiency. Automated chatbots engage your
              audience 24/7, while clear data visualizations empower
              you to make smarter, data-driven decisions.
            </p>
          </div>
          <div className="flex flex-col pt-20 w-fit">
            <div className="font-geometric border-b-1 border-[#bdbdbd] flex gap-3 mt-3 items-center py-5">
              <div className="inline-block w-4 h-4 rounded-full bg-[#D3704A]" />
              <h3 className="text-[45px] uppercase">
                Web Applications
              </h3>
            </div>
            <div className="font-geometric border-b-1 border-[#bdbdbd] flex gap-3 mt-3 items-center py-5">
              <h3 className="text-[45px] uppercase">Websites</h3>
            </div>
            <div className="font-geometric border-b-1 border-[#bdbdbd] flex gap-3 mt-3 items-center py-5">
              <h3 className="text-[45px] uppercase">
                Data Visualizations
              </h3>
            </div>
            <div className="font-geometric border-b-1 border-[#bdbdbd] flex gap-3 mt-3 items-center py-5">
              <h3 className="text-[45px] uppercase">
                AI Integrations
              </h3>
            </div>
            <div className="font-geometric border-b-1 border-[#bdbdbd] flex gap-3 mt-3 items-center py-5">
              <h3 className="text-[45px] uppercase">Chatbots</h3>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Services;
