'use client';

import React, { useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import { Phone, FileText, Code, MessageSquare, LifeBuoy } from 'lucide-react';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

function Process() {
  const t = useTranslations('Process');

  const mainRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(
    () => [
      { title: t('step1Title'), titleDescription: t('step1TitleDescription'), description: t('step1Description'), icon: Phone },
      { title: t('step2Title'), titleDescription: t('step2TitleDescription'), description: t('step2Description'), icon: FileText },
      { title: t('step3Title'), titleDescription: t('step3TitleDescription'), description: t('step3Description'), icon: Code },
      { title: t('step4Title'), titleDescription: t('step4TitleDescription'), description: t('step4Description'), icon: MessageSquare },
      { title: t('step5Title'), titleDescription: t('step5TitleDescription'), description: t('step5Description'), icon: LifeBuoy },
    ],
    [t]
  );

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    let ro: ResizeObserver | null = null;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headerRef.current, paragraphRef.current],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );

      mm.add('(min-width: 1024px)', () => {
        const container = stepsContainerRef.current;
        const dot = dotRef.current;
        const line = lineRef.current;
        if (!container || !dot || !line) return;

        const titles = titleRefs.current.filter(Boolean) as HTMLHeadingElement[];
        const contents = contentRefs.current.filter(Boolean) as HTMLDivElement[];

        gsap.set(titles, { opacity: 0, x: -24 });
        gsap.set(contents, { opacity: 0, y: 28 });

        const qDotTop = gsap.quickTo(dot, 'top', { duration: 0.35, ease: 'power2.out' });
        const qLineH = gsap.quickTo(line, 'height', { duration: 0.35, ease: 'power2.out' });

        const getOffsets = () => {
          const topAbs = container.getBoundingClientRect().top + window.scrollY;
          return titles.map((el) => {
            const r = el.getBoundingClientRect();
            return Math.max(8, r.top + window.scrollY - topAbs + r.height / 2);
          });
        };
        let offsets = getOffsets();

        let currentActive = -1;
        const activate = (i: number) => {
          if (i === currentActive) return;
          currentActive = i;

          titles.forEach((el, idx) => {
            const isActive = idx === i;
            el.classList.toggle('text-foreground', isActive);
            el.classList.toggle('text-foreground/30', !isActive);
            gsap.to(el, {
              x: isActive ? 12 : 0,
              duration: 0.4, ease: 'back.out(1.6)',
            });
          });

          contents.forEach((el, idx) => {
            gsap.to(el, {
              opacity: idx === i ? 1 : 0.4,
              duration: 0.4,
              ease: 'power3.out',
            });
          });

          if (offsets.length) {
            qDotTop(offsets[i]);
            qLineH(offsets[i]);
          }
        };

        const stepRows = gsap.utils.toArray<HTMLElement>('.process-step');
        stepRows.forEach((row, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: row,
              start: 'top 84%',
              toggleActions: 'play none none reverse',
            },
          });
          tl.to(titles[i], { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' });
          tl.to(contents[i], { opacity: 0.4, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35');

          ScrollTrigger.create({
            trigger: row,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => self.isActive && activate(i),
          });
        });

        const refreshPositions = () => {
          offsets = getOffsets();
          ScrollTrigger.refresh();
        };

        if (document.fonts?.ready) {
          document.fonts.ready.finally(() => requestAnimationFrame(refreshPositions));
        }

        ro = new ResizeObserver(() => requestAnimationFrame(refreshPositions));
        ro.observe(container);
      });
    }, mainRef);

    return () => {
      ro?.disconnect();
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={mainRef} id="process" className="py-16 md:py-40 bg-background">
      <Container>
        <span className="font-mono border-b border-border py-3 text-sm w-full block">
          03 {t('preTitle')}
        </span>
        <div className="flex flex-col pt-10">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <h1 ref={headerRef} className="font-geometric text-5xl md:text-6xl lg:text-[75px] w-full lg:w-2/5 opacity-0">
              {t('title')}
            </h1>
            <p ref={paragraphRef} className="text-lg md:text-xl w-full lg:w-1/3 text-foreground opacity-0">
              {t('description')}
            </p>
          </div>
        </div>
        <div className="mt-16 lg:mt-24">
          <div className="hidden lg:block">
            <div ref={stepsContainerRef} className="relative pl-8 pt-2">
              <div className="absolute left-0 top-0 w-0.5 h-full bg-border" />
              <div ref={lineRef} className="absolute left-0 top-0 w-0.5 bg-primary origin-top" style={{ height: 0 }} />
              <div ref={dotRef} className="absolute left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2" style={{ top: '8px' }} />
              <div className="flex flex-col gap-20 xl:gap-24">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="process-step flex gap-16 xl:gap-20 items-center">
                      <div className="w-1/3 process-step-title">
                        <h3 ref={(el) => { titleRefs.current[i] = el; }} className="font-geometric text-3xl uppercase text-foreground/30 transition-colors duration-300">
                          {s.title}
                        </h3>
                      </div>
                      <div ref={(el) => { contentRefs.current[i] = el; }} className="w-2/3 flex items-start gap-5 process-step-content">
                        <div className="mt-1 flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-foreground text-xl font-semibold mb-2">{s.titleDescription}</h4>
                          <p className="text-lg text-foreground/60">{s.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="lg:hidden space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="process-step flex flex-col gap-6 border-b border-border pb-10 last:border-b-0 last:pb-0">
                  <div className="process-step-title">
                    <h3 className="text-2xl font-geometric uppercase text-foreground">{step.title}</h3>
                  </div>
                  <div className="process-step-content flex items-start gap-6">
                    <div className="mt-1 flex-shrink-0 w-12 h-12 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground/80 mb-2">{step.titleDescription}</h4>
                      <p className="text-md text-foreground/60">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Process;