'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Container from './Container';
import ServiceVisual from './ServiceVisuals'; // Import the typed component

gsap.registerPlugin(ScrollTrigger);

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
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const browserContentRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const serviceListRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (browserContentRef.current) {
      gsap.fromTo(
        browserContentRef.current,
        { opacity: 0, scale: 0.98, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        }
      );
    }
  }, [activeIndex]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        [headerRef.current, paragraphRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.5,
        }
      ).fromTo(
        serviceListRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
        },
        '-=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} className="py-24 min-h-screen">
      <Container>
        <span className="font-mono border-b border-border py-3 text-sm w-full block">
          01 WHAT WE OFFER
        </span>
        <div className="flex flex-col pt-10">
          <div className="flex justify-between gap-10">
            <h1
              ref={headerRef}
              className="font-geometric text-[75px] flex items-center gap-5 w-2/5"
            >
              <span>SERVICES</span>
            </h1>
            <p ref={paragraphRef} className="text-xl w-1/3">
              Studio Minsky builds the digital tools that drive
              business growth. From websites that turn visitors into
              customers, to custom software that streamlines your
              operations, every product is designed to increase your
              impact and efficiency.
            </p>
          </div>

          <div className="flex pt-20 gap-10">
            <div className="w-1/3 flex flex-col">
              {serviceData.map((service, index) => (
                <div
                  ref={(el) => {
                    serviceListRef.current[index] = el;
                  }}
                  key={service.title}
                  className="font-geometric flex gap-4 items-center pb-10 cursor-pointer group"
                  onClick={() => handleServiceClick(index)}
                >
                  <div
                    className={`
                      inline-block w-4 h-4 rounded-full transition-colors duration-300
                      ${
                        activeIndex === index
                          ? 'bg-primary'
                          : 'bg-transparent border border-border group-hover:bg-primary/50'
                      }
                    `}
                  />
                  <h3
                    className={`
                      text-[28px] uppercase transition-colors duration-300
                      ${
                        activeIndex === index
                          ? 'text-foreground'
                          : 'text-foreground/40 group-hover:text-foreground'
                      }
                    `}
                  >
                    {service.title}
                  </h3>
                </div>
              ))}
            </div>

            <div className="w-2/3">
              <span className="font-mono text-sm py-2 block">
                1.0 Fin wins every head-to-head test ON RESOLUTION
                RATE
              </span>
              <div className="backdrop-blur-sm overflow-hidden border border-border rounded-md">
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
