'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import {
  Phone,
  FileText,
  Code,
  MessageSquare,
  LifeBuoy,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

function Process() {
  const t = useTranslations('Process');
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      title: t('step1Title'),
      titleDescription: t('step1TitleDescription'),
      description: t('step1Description'),
      icon: Phone,
    },
    {
      title: t('step2Title'),
      titleDescription: t('step2TitleDescription'),
      description: t('step2Description'),
      icon: FileText,
    },
    {
      title: t('step3Title'),
      titleDescription: t('step3TitleDescription'),
      description: t('step3Description'),
      icon: Code,
    },
    {
      title: t('step4Title'),
      titleDescription: t('step4TitleDescription'),
      description: t('step4Description'),
      icon: MessageSquare,
    },
    {
      title: t('step5Title'),
      titleDescription: t('step5TitleDescription'),
      description: t('step5Description'),
      icon: LifeBuoy,
    },
  ];

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
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

      if (!section || !container || !track || !dot) return;
      if (
        titles.length !== steps.length ||
        contents.length !== steps.length
      )
        return;

      const totalSteps = steps.length;
      let lastActiveStep = 0;

      const revealAllStatic = () => {
        gsap.set([headerRef.current, paragraphRef.current], {
          opacity: 1,
          y: 0,
          clearProps: 'all',
        });
        titles.forEach((t, i) => {
          t.classList.add('text-foreground');
          t.classList.remove('text-foreground/30');
          gsap.set(t, {
            opacity: 1,
            x: i === 0 ? 12 : 0,
            clearProps: 'transform',
          });
        });
        contents.forEach((c) =>
          gsap.set(c, { autoAlpha: 1, x: 0, y: 0, clearProps: 'all' })
        );
        gsap.set(track, { height: '100%' });
        gsap.set(dot, { top: 'calc(100% - 10px)' });
      };

      let introTl: gsap.core.Timeline | null = null;
      let pinTL: gsap.core.Timeline | null = null;
      let stepST: ScrollTrigger | null = null;

      const ctx = gsap.context(() => {
        gsap.set([headerRef.current, paragraphRef.current], {
          opacity: 0,
          y: 30,
        });
        gsap.set(titles, { opacity: 0, x: -30 });
        gsap.set(contents, { opacity: 0 });

        introTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        });

        introTl.to([headerRef.current, paragraphRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
        });

        introTl.to(
          titles,
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            onComplete: () => {
              gsap.set(titles[0], { x: 12 });
              titles[0].classList.add('text-foreground');
              titles[0].classList.remove('text-foreground/30');
            },
          },
          '-=0.5'
        );

        introTl.to(
          contents[0],
          { opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.7'
        );

        pinTL = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top 100px',
            end: () => `+=${window.innerHeight * (totalSteps - 1)}`,
            pin: true,
            scrub: 1,
          },
        });

        pinTL.to(track, { height: '100%', ease: 'none' }, 0);
        pinTL.to(dot, { top: 'calc(100% - 10px)', ease: 'none' }, 0);

        stepST = ScrollTrigger.create({
          trigger: container,
          start: 'top 100px',
          end: () => `+=${window.innerHeight * (totalSteps - 1)}`,
          scrub: 1,
          onUpdate: (self) => {
            const currentStep = Math.round(
              self.progress * (totalSteps - 1)
            );
            if (currentStep === lastActiveStep) return;

            titles.forEach((title, index) => {
              const isActive = index === currentStep;
              title.classList.toggle('text-foreground', isActive);
              title.classList.toggle('text-foreground/30', !isActive);
              gsap.to(title, {
                x: isActive ? 12 : 0,
                duration: 0.5,
                ease: 'back.out(1.7)',
              });
            });

            if (self.direction === 1) {
              gsap.fromTo(
                contents[currentStep],
                { autoAlpha: 0, x: -30 },
                {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.5,
                  ease: 'power3.out',
                }
              );
            } else if (lastActiveStep > -1) {
              gsap.to(contents[lastActiveStep], {
                autoAlpha: 0,
                x: 0,
                y: 0,
                duration: 0.3,
              });
            }

            lastActiveStep = currentStep;
          },
        });

        const disableOnResize = () => {
          stepST?.kill(true);
          pinTL?.scrollTrigger?.kill(true);
          introTl?.scrollTrigger?.kill(true);
          ctx.revert();
          revealAllStatic();
        };

        window.addEventListener('resize', disableOnResize, {
          passive: true,
          once: true,
        });
        window.addEventListener(
          'orientationchange',
          disableOnResize,
          { passive: true, once: true }
        );
      }, section);

      return () => {
        ctx.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, [t]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-16 lg:py-20 xl:py-30 bg-background"
    >
      <Container>
        <div ref={containerRef} className="overflow-hidden">
          <span className="font-mono border-b border-gray-300 py-3 text-sm block">
            03 {t('preTitle')}
          </span>
          <div className="flex flex-col lg:flex-row justify-between pt-10">
            <h1
              ref={headerRef}
              className="font-geometric text-5xl md:text-6xl lg:text-6xl xl:text-[75px] w-full lg:w-2/5"
            >
              {t('title')}
            </h1>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl w-full lg:w-1/3 text-foreground"
            >
              {t('description')}
            </p>
          </div>

          <div className="mt-12 lg:mt-16 xl:mt-20">
            <div className="hidden lg:flex gap-10 md:gap-20">
              <div className="relative w-1/3">
                <div className="absolute left-2 top-0 w-0.5 bg-gray-200 h-full" />
                <div
                  ref={lineRef}
                  className="absolute left-2 top-0 w-0.5 bg-primary origin-top"
                  style={{ height: 0 }}
                />
                <div
                  ref={dotRef}
                  className="absolute left-[4px] top-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2"
                />
                <div className="flex flex-col justify-between xl:min-h-[400px] 2xl:min-h-[700px]">
                  {steps.map((s, i) => (
                    <div key={s.title} className="relative pl-8 py-2">
                      <h3
                        ref={(el) => {
                          titleRefs.current[i] = el;
                        }}
                        className="text-foreground/30 font-geometric text-2xl lg:text-2xl xl:text-3xl transition-colors duration-300"
                      >
                        {s.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-2/3">
                <div className="flex flex-col justify-between xl:min-h-[400px] 2xl:min-h-[700px]">
                  {steps.map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <div
                        key={s.titleDescription}
                        ref={(el) => {
                          contentRefs.current[i] = el;
                        }}
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-foreground text-xl font-semibold mb-2">
                            {s.titleDescription}
                          </h3>
                          <p className="text-lg text-foreground/40">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:hidden space-y-10">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.title}
                    className="flex items-start gap-6 border-b border-border pb-8 last:border-b-0 last:pb-0"
                  >
                    <div className="mt-1 flex-shrink-0 w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-geometric text-foreground mb-2">
                        {step.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-foreground/80 mb-2">
                        {step.titleDescription}
                      </h4>
                      <p className="text-md text-foreground/60">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Process;
