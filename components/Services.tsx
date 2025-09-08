'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef, useState } from 'react';
import Container from './Container';
import ServiceVisual from './visuals/ServiceVisuals';

gsap.registerPlugin(ScrollTrigger);

interface ServiceDataItem {
  title: string;
  description: string;
  tags: string[];
  additional: string;
}

const serviceData: ServiceDataItem[] = [
  {
    title: 'Web Applications',
    description:
      'We build robust and scalable web applications tailored to your business needs. We build robust and scalable web applications tailored to your business needs. From complex dashboards to interactive platforms, we deliver high-performance solutions. From complex dashboards to interactive platforms, we deliver high-performance solutions. ',
    tags: ['React', 'Next.js', 'Node.js', 'Databases'],
    additional:
      '1.0 Our applications have proven to increase user engagement by an average of 40%.',
  },
  {
    title: 'Websites',
    description:
      "Your website is your digital storefront. We create beautiful, responsive, and SEO-friendly websites that capture your brand's essence and convert visitors into customers.",
    tags: ['Webflow', 'Wordpress', 'Shopify', 'SEO'],
    additional:
      '2.0 We focus on a mobile-first approach, ensuring a seamless experience on all devices.',
  },
  {
    title: 'Data Visualizations',
    description:
      'We transform complex data into clear and compelling visual stories. Our interactive charts and maps help you uncover insights and make data-driven decisions.',
    tags: ['D3.js', 'Tableau', 'PowerBI', 'Charts'],
    additional:
      '3.0 Our visualizations have been featured in several industry-leading publications.',
  },
  {
    title: 'AI Integrations',
    description:
      'Leverage the power of AI to automate processes and enhance user experiences. We integrate cutting-edge AI models into your products and workflows.',
    tags: ['OpenAI', 'LangChain', 'Embeddings', 'Automation'],
    additional:
      '4.0 Automate up to 80% of your customer support inquiries with our AI-powered chatbots.',
  },
  {
    title: 'Chatbots',
    description:
      'Engage your audience with intelligent and conversational chatbots. We design and build custom chatbots for customer support, lead generation, and more.',
    tags: ['Dialogflow', 'Botpress', 'NLP', 'Conversational AI'],
    additional:
      '5.0 Our chatbots are available 24/7, providing instant support to your customers.',
  },
];

const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    null
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const browserContentRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const serviceListRef = useRef<(HTMLDivElement | null)[]>([]);
  const serviceContentRef = useRef<(HTMLDivElement | null)[]>([]);

  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);

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

  useLayoutEffect(() => {
    serviceContentRef.current.forEach((content, index) => {
      if (!content) return;

      gsap.to(content, {
        height: index === activeIndex ? 'auto' : 0,
        opacity: index === activeIndex ? 1 : 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    });
  }, [activeIndex]);

  const handleServiceClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    if (index === activeIndex) return;

    setHoveredIndex(index);

    gsap.killTweensOf([
      circleRefs.current[index],
      titleRefs.current[index],
    ]);

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

    gsap.killTweensOf([
      circleRefs.current[index],
      titleRefs.current[index],
    ]);

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 md:py-30 min-h-screen"
    >
      <Container>
        <span className="font-mono border-b border-border py-3 text-sm w-full block">
          01 WHAT WE OFFER
        </span>
        <div className="flex flex-col pt-10">
          <div className="flex flex-col lg:flex-row justify-between gap-10">
            <h1
              ref={headerRef}
              className="font-geometric text-5xl md:text-6xl lg:text-[75px] flex items-center gap-5 w-full lg:w-2/5"
            >
              <span>SERVICES</span>
            </h1>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl w-full lg:w-1/3"
            >
              Studio Minsky builds the digital tools that drive
              business growth. From websites that turn visitors into
              customers, to custom software that streamlines your
              operations, every product is designed to increase your
              impact and efficiency.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row pt-12 md:pt-20 gap-10">
            <div className="w-full lg:w-1/3 flex flex-col">
              {serviceData.map((service, index) => (
                <div
                  ref={(el) => {
                    serviceListRef.current[index] = el;
                  }}
                  key={service.title}
                  className="font-geometric pb-8 md:pb-12 cursor-pointer"
                  onClick={() => handleServiceClick(index)}
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
                        ${
                          activeIndex === index ||
                          hoveredIndex === index
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
                        text-2xl md:text-3xl lg:text-[32px] uppercase transition-colors duration-300
                        ${
                          activeIndex === index ||
                          hoveredIndex === index
                            ? 'text-foreground'
                            : 'text-foreground/30'
                        }
                      `}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <div
                    ref={(el) => {
                      serviceContentRef.current[index] = el;
                    }}
                    className="pl-8 overflow-hidden h-0 opacity-0"
                  >
                    <p className="mt-4 font-sans text-md text-foreground/60">
                      {service.description}
                    </p>
                    <div className="flex gap-2 flex-wrap mt-4">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary text-card rounded-full text-[12px] font-bold font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-2/3 h-[600px] lg:h-[850px] flex flex-col">
              <span className="font-mono text-sm py-2 block min-h-[40px]">
                {serviceData[activeIndex].additional}
              </span>
              <div className="flex-grow backdrop-blur-sm overflow-hidden border border-border rounded-md">
                <div ref={browserContentRef} className="h-full">
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
