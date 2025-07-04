'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: '01. Discovery Call',
    description:
      'We start by understanding your needs and goals in a complimentary discovery call, ensuring we are perfectly aligned.',
  },
  {
    title: '02. Proposal',
    description:
      'Based on our call, we craft a tailored proposal outlining the project scope, timeline, and a transparent investment breakdown.',
  },
  {
    title: '03. Development',
    description:
      'Our team brings the plan to life, building your solution with precision, quality, and regular updates to keep you in the loop.',
  },
  {
    title: '04. Feedback',
    description:
      'We review progress with you at key milestones, gathering feedback and iterating until the result is exactly what you envisioned.',
  },
  {
    title: '05. Support',
    description:
      'After a successful launch, we provide ongoing support and maintenance packages to ensure your digital product continues to thrive.',
  },
];

function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = lineRef.current;
    const dot = dotRef.current;
    const titles = titleRefs.current.filter(
      (el): el is HTMLHeadingElement => el !== null
    );
    const contents = contentRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    if (
      !section ||
      !container ||
      !track ||
      !dot ||
      titles.length !== steps.length ||
      contents.length !== steps.length
    ) {
      return;
    }

    const totalSteps = steps.length;
    let lastActiveStep = -1;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${window.innerHeight * (totalSteps - 1)}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const currentStep = Math.round(
              self.progress * (totalSteps - 1)
            );

            if (currentStep !== lastActiveStep) {
              gsap.to(titles, {
                color: (i) =>
                  i === currentStep ? '#000000' : '#a1a1aa',
                duration: 0.3,
                overwrite: 'auto',
              });

              if (self.direction === 1) {
                gsap.to(contents[currentStep], {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.4,
                });
              } else {
                if (lastActiveStep > currentStep) {
                  gsap.to(contents[lastActiveStep], {
                    autoAlpha: 0,
                    y: 20,
                    duration: 0.4,
                  });
                }
              }
              lastActiveStep = currentStep;
            }
          },
        },
      });

      tl.to(track, { height: '100%', ease: 'none' }, 0);
      tl.to(dot, { top: '100%', ease: 'none' }, 0);

      gsap.set(contents, { autoAlpha: 0, y: 20 });
      gsap.set(titles, { color: '#a1a1aa' });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <Container>
        <div ref={containerRef} className="overflow-hidden">
          <span className="font-mono border-b border-gray-300 py-3 text-sm block">
            02 HOW WE DO IT
          </span>
          <div className="flex justify-between pt-10">
            <h1 className="font-geometric text-5xl md:text-[75px] w-2/5">
              PROCESS
            </h1>
            <p className="text-lg md:text-xl w-1/3 text-gray-600">
              Our process is designed for clarity and collaboration,
              ensuring every project is a partnership that leads to
              exceptional results.
            </p>
          </div>
          <div className="mt-30">
            <div className="flex py-10 gap-10 md:gap-20">
              <div className="relative w-1/3">
                <div className="absolute left-3 top-0 w-0.5 bg-gray-200 h-full" />
                <div
                  ref={lineRef}
                  className="absolute left-3 top-0 w-0.5 bg-primary origin-top"
                  style={{ height: 0 }}
                />
                <div
                  ref={dotRef}
                  className="absolute left-3 top-0 w-5 h-5 rounded-full bg-primary  z-99 transform -translate-x-1/2 -translate-y-1/2"
                />
                <div
                  className="flex flex-col justify-between"
                  style={{ minHeight: '700px' }}
                >
                  {steps.map((s, i) => (
                    <div key={s.title} className="relative pl-8">
                      <h3
                        ref={(el) => {
                          titleRefs.current[i] = el;
                        }}
                        className="font-geometric text-2xl md:text-3xl"
                      >
                        {s.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-2/3">
                <div
                  className="flex flex-col justify-between"
                  style={{ minHeight: '700px' }}
                >
                  {steps.map((s, i) => (
                    <div
                      key={s.title}
                      ref={(el) => {
                        contentRefs.current[i] = el;
                      }}
                      className=""
                    >
                      <h3 className="text-xl font-semibold mb-2">
                        {s.title}
                      </h3>
                      <p className="text-lg text-gray-700">
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Process;
