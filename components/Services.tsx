'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';
import Container from './Container';
import ServiceVisual from './ServiceVisuals'; // Import the typed component

gsap.registerPlugin(ScrollTrigger);

// --- Type and Data Definitions ---
interface ServiceDataItem {
  title: string;
}

const serviceData: ServiceDataItem[] = [
  { title: 'Web Applications' },
  { title: 'Websites' },
  { title: 'Data Visualizations' },
  { title: 'AI Integrations' },
  { title: 'Chatbots' },
];

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setStyle } = useHeaderStyle();

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const browserContentRef = useRef<HTMLDivElement>(null);

  // Effect for the header style change on scroll
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

  // Main Animation for switching content
  useLayoutEffect(() => {
    if (browserContentRef.current) {
      gsap.fromTo(
        browserContentRef.current, // Animate the whole container
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [activeIndex]);

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      ref={sectionRef}
      className="py-26 min-h-screen bg-[#F6F6F0] mt-[-1px]"
    >
      <Container>
        <span className="font-mono border-b-1 border-gray-400/50 py-3 text-sm w-full block">
          01 WHAT WE OFFER
        </span>
        <div className="flex flex-col pt-10">
          <div className="flex justify-between gap-10">
            <h1 className="font-geometric text-[75px] text-black flex items-center gap-5 w-2/5">
              <span>SERVICES</span>
            </h1>
            <p className="text-lg w-1/3 text-black/70">
              Studio Minsky builds the digital tools that drive
              business growth. From websites that turn visitors into
              customers, to custom software that streamlines your
              operations, every product is designed to increase your
              impact and efficiency.
            </p>
          </div>

          <div className="flex pt-20 gap-5">
            <div className="w-1/3 flex flex-col">
              {serviceData.map((service, index) => (
                <div
                  key={service.title}
                  className="font-geometric flex gap-4 items-center pb-10 cursor-pointer group"
                  onClick={() => handleServiceClick(index)}
                >
                  <div
                    className={`
                    inline-block w-4 h-4 rounded-full transition-colors duration-300
                    ${
                      activeIndex === index
                        ? 'bg-[#D3704A]'
                        : 'bg-transparent group-hover:bg-[#D3704A]/50'
                    }
                  `}
                  />
                  <h3
                    className={`
                    text-[25px] uppercase transition-colors duration-300
                    ${
                      activeIndex === index
                        ? 'text-black'
                        : 'text-black/40 group-hover:text-black/80'
                    }
                  `}
                  >
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="w-2/3 ">
              <span className="font-mono text-sm py-2 block  ">
                1.0 Fin wins every head-to-head test ON RESOLUTION
                RATE
              </span>
              <div className="backdrop-blur-sm overflow-hidden border-1 border-gray-400/50 rounded-md">
                <div ref={browserContentRef} className="aspect-[4/3]">
                  <ServiceVisual activeIndex={activeIndex} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
