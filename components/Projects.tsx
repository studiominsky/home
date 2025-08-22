'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import { ThemedImage } from './ThemedImage';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDataItem {
  id: number;
  title: string;
  logoLight: string;
  logoDark: string;
  description: string;
  features: string[];
  techStack: string[];
  testimonial?: {
    quote: string;
    author: string;
  };
  liveUrl?: string;
  caseStudyUrl?: string;
}

const projectData: ProjectDataItem[] = [
  {
    id: 1,
    title: 'Fine Interface',
    logoLight: '/logos/fineinterface-light.svg',
    logoDark: '/logos/fineinterface-dark.svg',
    description:
      'A robust web application for a leading AI startup, featuring a complex data visualization dashboard and a custom-built NLP engine for processing user queries in real-time.',
    features: [
      'Real-time data processing pipeline',
      'Interactive D3.js charting library',
      'Secure multi-user authentication',
      'Scalable cloud architecture on AWS',
    ],
    techStack: ['Next.js', 'TypeScript', 'D3.js', 'Python', 'AWS'],
    testimonial: {
      quote:
        'The platform has fundamentally changed how our researchers approach data analysis, increasing our efficiency by over 300%.',
      author: 'Dr. Alena Petrova, Head of Research at QuantumLeap',
    },
    liveUrl: '#',
    caseStudyUrl: '#',
  },
  {
    id: 2,
    title: 'Panellio',
    logoLight: '/logos/panellio-light.svg',
    logoDark: '/logos/panellio-dark.svg',
    description:
      'A beautiful and highly performant e-commerce website for a sustainable goods brand. We focused on a seamless mobile-first user experience and advanced SEO.',
    features: [
      'Custom Shopify theme development',
      ' headless architecture with React',
      'Advanced SEO & performance optimization',
      'Subscription model integration',
    ],
    techStack: ['Shopify', 'React', 'GraphQL', 'Tailwind CSS', 'SEO'],
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'Word Inventory',
    logoLight: '/logos/wordinventory-light.svg',
    logoDark: '/logos/wordinventory-dark.svg',
    description:
      'A secure and intuitive financial dashboard that allows users to track investments, manage portfolios, and visualize market trends with up-to-the-minute information.',
    features: [
      'Integration with multiple financial data APIs',
      'Custom portfolio performance charting',
      'Bank-level security and data encryption',
      'Automated PDF report generation',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'API'],
    testimonial: {
      quote:
        "The dashboard's clarity and reliability have made it an indispensable tool for our clients.",
      author: 'John Carter, CEO of Starlight Finance',
    },
    caseStudyUrl: '#',
  },
  {
    id: 4,
    title: 'Sprachenwald',
    logoLight: '/logos/fineinterface-light.svg',
    logoDark: '/logos/fineinterface-dark.svg',
    description:
      'A secure and intuitive financial dashboard that allows users to track investments, manage portfolios, and visualize market trends with up-to-the-minute information.',
    features: [
      'Integration with multiple financial data APIs',
      'Custom portfolio performance charting',
      'Bank-level security and data encryption',
      'Automated PDF report generation',
    ],
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'API'],
    testimonial: {
      quote:
        "The dashboard's clarity and reliability have made it an indispensable tool for our clients.",
      author: 'John Carter, CEO of Starlight Finance',
    },
    caseStudyUrl: '#',
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const projectListRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

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

  const activeProject = projectData[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-30 min-h-screen"
    >
      <Container>
        <span className="font-mono border-b border-border py-3 text-sm w-full block">
          02 SELECTED WORK
        </span>
        <div className="flex flex-col pt-10">
          <div className="flex justify-between gap-10">
            <h1
              ref={headerRef}
              className="font-geometric text-[75px] w-2/5 opacity-0"
            >
              PROJECTS
            </h1>
            <p
              ref={paragraphRef}
              className="text-xl w-1/3 text-foreground opacity-0"
            >
              Our process is designed for clarity and collaboration,
              ensuring every project is a partnership that leads to
              exceptional results.
            </p>
          </div>

          <div className="flex pt-20 gap-10">
            <div className="w-1/3 flex flex-col">
              {projectData.map((project, index) => (
                <div
                  ref={(el) => {
                    projectListRef.current[index] = el;
                  }}
                  key={project.id}
                  className="font-geometric pb-10 cursor-pointer opacity-0"
                  onClick={() => setActiveIndex(index)}
                >
                  <h3
                    className={`text-[32px] uppercase transition-colors duration-300 ${
                      activeIndex === index
                        ? 'text-foreground'
                        : 'text-foreground/30 hover:text-foreground/60'
                    }`}
                  >
                    {project.title}
                  </h3>
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
                      Key Features
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

                  <div className="flex gap-2 flex-wrap my-6">
                    {activeProject.techStack.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary/20 border border-primary text-primary rounded-full text-xs font-bold font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-6">
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer text-card z-99 max-w-[230px] bg-background-inverted font-sans px-5 py-3 flex items-center justify-center rounded-full text-center text-[0.875rem] leading-[1.25rem] font-medium opacity-100 transition-transform hover:scale-105"
                      >
                        View Live Site
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
