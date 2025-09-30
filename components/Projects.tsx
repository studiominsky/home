'use client';

import React, {
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import { ThemedImage } from './ThemedImage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDataItem {
  id: number;
  title: string;
  logoLight: string;
  logoDark: string;
  description: string;
  features: string[];
  techStack: string[];
  status: 'statusFinished' | 'statusInDevelopment' | 'statusEarlyPhase';
  testimonial?: {
    quote: string;
    author: string;
  };
  liveUrl?: string;
  caseStudyUrl?: string;
}

export default function Projects() {
  const t = useTranslations('Projects');

  const projectData: ProjectDataItem[] = useMemo(
    () => [
      {
        id: 1,
        title: 'Fine Interface',
        logoLight: '/logos/fineinterface-light.svg',
        logoDark: '/logos/fineinterface-dark.svg',
        description: t('fineInterfaceDescription'),
        features: [
          t('fineInterfaceFeature1'),
          t('fineInterfaceFeature2'),
          t('fineInterfaceFeature3'),
          t('fineInterfaceFeature5'),
        ],
        techStack: [
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Firebase',
          'shadcn/ui',
        ],
        status: 'statusFinished',
        liveUrl: 'https://fineinterface.com',
      },
      {
        id: 2,
        title: 'Panellio',
        logoLight: '/logos/panellio-light.svg',
        logoDark: '/logos/panellio-dark.svg',
        description: t('panellioDescription'),
        features: [
          t('panellioFeature1'),
          t('panellioFeature2'),
          t('panellioFeature3'),
          t('panellioFeature4'),
          t('panellioFeature5'),
        ],
        techStack: [
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Firebase',
          'shadcn/ui',
          'Stripe',
        ],
        status: 'statusFinished',
        liveUrl: 'https://panellio.com',
      },
      {
        id: 3,
        title: 'Word Inventory',
        logoLight: '/logos/wordinventory-light.svg',
        logoDark: '/logos/wordinventory-dark.svg',
        description: t('wordInventoryDescription'),
        features: [
          t('wordInventoryFeature1'),
          t('wordInventoryFeature2'),
          t('wordInventoryFeature3'),
          t('wordInventoryFeature4'),
        ],
        techStack: [
          'Next.js',
          'TypeScript',
          'Tailwind CSS',
          'Firebase',
          'shadcn/ui',
          'OpenAI',
        ],
        status: 'statusInDevelopment',
        liveUrl: '#',
      },
    ],
    [t]
  );

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const projectListRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useLayoutEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
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
          stagger: 0.2,
        }
      ).fromTo(
        projectListRef.current,
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

  const handleMouseEnter = (index: number) => {
    if (index === activeIndex) return;
    setHoveredIndex(index);
    gsap.to(circleRefs.current[index], {
      x: 12,
      duration: 0.5,
      ease: 'back.out(1.2)',
    });
    gsap.to(titleRefs.current[index], {
      x: 12,
      duration: 0.5,
      ease: 'back.out(1.2)',
      delay: 0.075,
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    gsap.to(titleRefs.current[index], {
      x: 0,
      duration: 0.5,
      ease: 'back.out(1.2)',
    });
    gsap.to(circleRefs.current[index], {
      x: 0,
      duration: 0.5,
      ease: 'back.out(1.2)',
      delay: 0.075,
    });
  };

  const activeProject = projectData[activeIndex];

  const getStatusClass = (status: ProjectDataItem['status']) => {
    switch (status) {
      case 'statusFinished':
        return 'bg-green-200/20 border-green-500 text-green-500';
      case 'statusInDevelopment':
        return 'bg-blue-300/20 border-blue-500 text-blue-500';
      case 'statusEarlyPhase':
        return 'bg-gray-300/20 border-gray-500 text-gray-500';
      default:
        return 'bg-foreground/20 border-border text-foreground';
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 md:py-30 min-h-screen"
    >
      <Container>
        <span className="font-mono border-b border-border py-3 text-sm w-full block">
          {t('preTitle')}
        </span>
        <div className="flex flex-col pt-10">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <h1
              ref={headerRef}
              className="font-geometric text-5xl md:text-6xl lg:text-[75px] w-full lg:w-2/5 opacity-0"
            >
              {t('title')}
            </h1>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl w-full lg:w-1/3 text-foreground opacity-0"
            >
              {t('description')}
            </p>
          </div>

          <div className="hidden lg:flex pt-20 gap-10">
            <div className="w-1/3 flex flex-col">
              {projectData.map((project, index) => (
                <div
                  ref={(el) => {
                    projectListRef.current[index] = el;
                  }}
                  key={project.id}
                  className="font-geometric pb-10 cursor-pointer opacity-0"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                >
                  <div className="flex gap-4 items-center">
                    <div
                      ref={(el) => {
                        circleRefs.current[index] = el;
                      }}
                      className={`
                        inline-block w-4 h-4 rounded-full border transition-colors duration-300
                        ${activeIndex === index || hoveredIndex === index
                          ? 'bg-primary border-primary'
                          : 'bg-foreground/30 border-border'
                        }
                      `}
                    />
                    <h3
                      ref={(el) => {
                        titleRefs.current[index] = el;
                      }}
                      className={`
                        text-3xl uppercase transition-colors duration-300
                        ${activeIndex === index || hoveredIndex === index
                          ? 'text-foreground'
                          : 'text-foreground/30'
                        }
                      `}
                    >
                      {project.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-2/3">
              {activeProject && (
                <div ref={contentRef} className="flex flex-col">
                  <div className="flex items-center gap-6 mb-6">
                    <ThemedImage
                      srcLight={activeProject.logoLight}
                      srcDark={activeProject.logoDark}
                      alt={`${activeProject.title} logo`}
                      width={200}
                      height={100}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>

                  <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                    {activeProject.description}
                  </p>

                  <div className="my-6">
                    <h4 className="font-mono text-sm uppercase text-foreground/60 mb-3">
                      {t('keyFeatures')}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-foreground/80">
                      {activeProject.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  {activeProject.testimonial && (
                    <blockquote className="my-6 border-l-2 border-primary pl-4 italic text-foreground/90">
                      <p>
                        &quot;{activeProject.testimonial.quote}&quot;
                      </p>
                      <cite className="mt-2 block not-italic text-sm text-foreground/60">
                        – {activeProject.testimonial.author}
                      </cite>
                    </blockquote>
                  )}

                  <div className="my-6">
                    <h4 className="font-mono text-sm uppercase text-foreground/60 mb-3">
                      {t('status')}
                    </h4>
                    <span
                      className={`px-3 py-1 border rounded-full text-xs font-bold font-mono ${getStatusClass(
                        activeProject.status
                      )}`}
                    >
                      {t(activeProject.status)}
                    </span>
                  </div>

                  <div className="my-6">
                    <h4 className="font-mono text-sm uppercase text-foreground/60 mb-3">
                      {t('stack')}
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {activeProject.techStack.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/20 border border-primary text-primary rounded-full text-xs font-bold font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    {activeProject.status === 'statusFinished' &&
                      activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer text-card z-99 max-w-[230px] bg-background-inverted font-sans px-5 py-3 flex items-center justify-center rounded-full text-center text-[0.875rem] leading-[1.25rem] font-medium opacity-100 transition-transform hover:scale-105"
                        >
                          {t('viewLiveSite')}
                        </a>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="lg:hidden mt-12">
            <Accordion type="multiple">
              {projectData.map((project, index) => (
                <AccordionItem value={`item-${index}`} key={project.id}>
                  <AccordionTrigger className="text-2xl font-geometric uppercase">
                    {project.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-6 mb-6">
                        <ThemedImage
                          srcLight={project.logoLight}
                          srcDark={project.logoDark}
                          alt={`${project.title} logo`}
                          width={200}
                          height={100}
                          className="max-h-12 w-auto object-contain"
                        />
                      </div>

                      <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="my-6">
                        <h4 className="font-mono text-sm uppercase text-foreground/60 mb-3">
                          {t('keyFeatures')}
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-foreground/80">
                          {project.features.map((feature) => (
                            <li key={feature}>{feature}</li>
                          ))}
                        </ul>
                      </div>

                      {project.testimonial && (
                        <blockquote className="my-6 border-l-2 border-primary pl-4 italic text-foreground/90">
                          <p>&quot;{project.testimonial.quote}&quot;</p>
                          <cite className="mt-2 block not-italic text-sm text-foreground/60">
                            – {project.testimonial.author}
                          </cite>
                        </blockquote>
                      )}

                      <div className="my-6">
                        <h4 className="font-mono text-sm uppercase text-foreground/60 mb-3">
                          {t('status')}
                        </h4>
                        <span
                          className={`px-3 py-1 border rounded-full text-xs font-bold font-mono ${getStatusClass(
                            project.status
                          )}`}
                        >
                          {t(project.status)}
                        </span>
                      </div>

                      <div className="my-6">
                        <h4 className="font-mono text-sm uppercase text-foreground/60 mb-3">
                          {t('stack')}
                        </h4>
                        <div className="flex gap-2 flex-wrap">
                          {project.techStack.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-primary/20 border border-primary text-primary rounded-full text-xs font-bold font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-6">
                        {project.status === 'statusFinished' &&
                          project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cursor-pointer text-card z-20 max-w-[230px] bg-background-inverted font-sans px-5 py-3 flex items-center justify-center rounded-full text-center text-[0.875rem] leading-[1.25rem] font-medium opacity-100 transition-transform hover:scale-105"
                            >
                              {t('viewLiveSite')}
                            </a>
                          )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </section>
  );
}