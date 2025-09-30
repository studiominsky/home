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
        const stepRows = gsap.utils.toArray<HTMLElement>('.process-step');

        gsap.from(stepRows, {
          opacity: 0,
          x: -30,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        gsap.set(contents, { opacity: 0.4, y: 0 });

        const qDot = gsap.quickTo(dot, 'top', { duration: 0.45, ease: 'power3.out' });
        const qLine = gsap.quickTo(line, 'height', { duration: 0.45, ease: 'power3.out' });

        const DOT_SIZE = 16;
        const DOT_RADIUS = DOT_SIZE / 2;

        const getOffsets = () => {
          const topAbs = container.getBoundingClientRect().top + window.scrollY;
          return titles.map((el) => {
            const r = el.getBoundingClientRect();
            return r.top + window.scrollY - topAbs + r.height / 2;
          });
        };

        let offsets = getOffsets();
        let active = -1;

        const setActive = (i: number, dir: number) => {
          if (i === active) return;
          const prev = active;
          active = i;

          titles.forEach((el, idx) => {
            const isActive = idx === i;
            el.classList.toggle('text-foreground', isActive);
            el.classList.toggle('text-foreground/30', !isActive);
            gsap.to(el, {
              x: isActive ? 12 : 0,
              duration: 0.38,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          });

          contents.forEach((el, idx) => {
            if (idx === i) {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.42, ease: 'power3.out', overwrite: 'auto' });
            } else if (idx === prev && prev !== -1) {
              gsap.to(el, {
                opacity: 0.4, y: dir > 0 ? -6 : 6, duration: 0.3, ease: 'power2.out',
                onComplete: () => {
                  gsap.to(el, { y: 0, duration: 0.2 });
                },
                overwrite: 'auto',
              });
            } else {
              gsap.to(el, { opacity: 0.4, duration: 0.25, ease: 'power2.out', overwrite: 'auto' });
            }
          });
        };

        const LEAD_IN_FRAC = 0.4;

        const st = ScrollTrigger.create({
          trigger: container,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (!offsets.length) return;

            let p = self.progress;
            if (p <= LEAD_IN_FRAC) p = 0;
            else p = (p - LEAD_IN_FRAC) / (1 - LEAD_IN_FRAC);

            const railStart = DOT_RADIUS;
            const railEnd = container.clientHeight - DOT_RADIUS;
            const y = railStart + (railEnd - railStart) * p;

            qDot(y);
            qLine(y);

            let nearest = 0;
            let best = Number.POSITIVE_INFINITY;
            offsets.forEach((oy, idx) => {
              const d = Math.abs(oy - y);
              if (d < best) { best = d; nearest = idx; }
            });

            if (self.progress > 0 || active === -1) {
              setActive(nearest, self.direction);
            }
          },
        });

        const refresh = () => {
          offsets = getOffsets();

          const railStart = DOT_RADIUS;
          gsap.set(dot, { top: railStart });
          gsap.set(line, { height: 0 });

          setActive(0, 1);
          st.refresh();
        };

        if (document.fonts?.ready) {
          document.fonts.ready.finally(() => requestAnimationFrame(refresh));
        }

        ro = new ResizeObserver(() => requestAnimationFrame(refresh));
        ro.observe(container);

        requestAnimationFrame(refresh);
      });
    }, mainRef);

    return () => {
      ro?.disconnect();
      mm.revert();
      ctx.revert();
    };
  }, [t]);

  return (
    <section ref={mainRef} id="process" className="py-16 md:py-40 bg-background">
      <Container>
        <div>
          <span className="font-mono border-b border-border py-3 text-sm w-full block">03 {t('preTitle')}</span>

          <div className="flex flex-col lg:flex-row justify-between pt-10">
            <h1
              ref={headerRef}
              className="font-geometric text-5xl md:text-6xl lg:text-6xl xl:text-[75px] w-full lg:w-2/5 opacity-0"
            >
              {t('title')}
            </h1>
            <p ref={paragraphRef} className="text-lg md:text-xl w-full lg:w-1/3 text-foreground mt-4 lg:mt-0 opacity-0">
              {t('description')}
            </p>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="hidden lg:block">
            <div ref={stepsContainerRef} className="relative pl-8 pt-2">
              <div className="absolute left-0 top-0 w-0.5 h-full bg-border" />
              <div ref={lineRef} className="absolute left-0 top-0 w-0.5 bg-primary origin-top" style={{ height: 0 }} />
              <div
                ref={dotRef}
                className="absolute left-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 -translate-y-1/2"
              />
              <div className="flex flex-col gap-20 xl:gap-24">
                {steps.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="process-step flex gap-16 xl:gap-20 items-center">
                      <div className="w-1/3 process-step-title">
                        <h3
                          ref={(el) => { titleRefs.current[i] = el; }}
                          className="font-geometric text-2xl xl:text-3xl uppercase text-foreground/30 transition-colors duration-300"
                        >
                          {s.title}
                        </h3>
                      </div>
                      <div
                        ref={(el) => { contentRefs.current[i] = el; }}
                        className="w-2/3 flex items-start gap-5 process-step-content"
                      >
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