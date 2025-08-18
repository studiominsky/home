'use client';

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  Zap,
  TrendingUp,
  Cpu,
  FileJson2,
  BarChart3,
} from 'lucide-react';

const AiVisual: React.FC = () => {
  const aiRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [isGsapReady, setIsGsapReady] = useState(false);
  const [linePaths, setLinePaths] = useState<string[]>([]);

  // Effect to dynamically load the GSAP animation library from a CDN
  useEffect(() => {
    const gsapScript = document.createElement('script');
    gsapScript.src =
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    gsapScript.onload = () => {
      // Set state to true once the script is loaded
      setIsGsapReady(true);
    };
    document.body.appendChild(gsapScript);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(gsapScript);
    };
  }, []);

  useLayoutEffect(() => {
    // Ensure the component is mounted, GSAP is loaded, and the global gsap object is available
    if (
      !aiRef.current ||
      !isGsapReady ||
      typeof window.gsap === 'undefined'
    )
      return;

    const gsap = window.gsap; // Use the global gsap object
    const centerEl = centerRef.current;
    const cardElements = cardRefs.current.filter(
      Boolean
    ) as HTMLDivElement[];
    const containerEl = aiRef.current;

    if (!centerEl || cardElements.length !== 4) return;

    // Calculate line paths dynamically based on element positions
    const containerRect = containerEl.getBoundingClientRect();
    const centerRect = centerEl.getBoundingClientRect();
    const centerPoint = {
      x: centerRect.left + centerRect.width / 2 - containerRect.left,
      y: centerRect.top + centerRect.height / 2 - containerRect.top,
    };

    const newPaths = cardElements.map((cardEl) => {
      const cardRect = cardEl.getBoundingClientRect();
      // Connect to the top-center point on the card's edge
      const cardPoint = {
        x: cardRect.left + cardRect.width / 2 - containerRect.left,
        y: cardRect.top - containerRect.top,
      };
      // Create a smooth quadratic bezier curve
      return `M ${centerPoint.x} ${centerPoint.y} Q ${centerPoint.x} ${cardPoint.y} ${cardPoint.x} ${cardPoint.y}`;
    });

    setLinePaths(newPaths);

    // GSAP Animation Timeline
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      '.ai-center-element',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }
    );

    tl.fromTo(
      '.ai-card-element',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15,
      },
      '-=0.5'
    );

    // Animate the drawing of the connecting lines after cards appear
    tl.fromTo(
      '.connecting-line',
      { strokeDashoffset: 500 },
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.15,
      },
      '-=0.5'
    );
  }, [isGsapReady, linePaths]); // Rerun when GSAP is ready or paths are calculated

  const cards = [
    {
      type: 'list',
      icon: Zap,
      title: 'What is AI Integration?',
      content: [
        'Automate tasks for strategic work.',
        'Streamline workflows for efficiency.',
        'Enhance decisions with data insights.',
        'Personalize customer experiences.',
      ],
    },
    {
      type: 'list',
      icon: TrendingUp,
      title: 'Benefits of AI Integration',
      content: [
        'Boost productivity and efficiency.',
        'Reduce costs through automation.',
        'Make smarter, data-backed decisions.',
        'Gain a competitive advantage.',
      ],
    },
    {
      type: 'json',
      icon: FileJson2,
      title: 'AI in Action: Product Recommendation',
      content: (
        <div className="font-mono text-[10px]">
          <p>{'{'}</p>
          <p className="pl-2">
            <span className="text-blue-400">&quot;userId&quot;</span>:{' '}
            <span className="text-foreground/80">
              &quot;user-12345&quot;
            </span>
            ,
          </p>
          <p className="pl-2">
            <span className="text-blue-400">
              &quot;recommendations&quot;
            </span>
            : [
          </p>
          <p className="pl-4">{'{'}</p>
          <p className="pl-6">
            <span className="text-blue-400">
              &quot;productName&quot;
            </span>
            :{' '}
            <span className="text-foreground/80">
              &quot;Wireless Headphones&quot;
            </span>
            ,
          </p>
          <p className="pl-6">
            <span className="text-blue-400">
              &quot;confidenceScore&quot;
            </span>
            : <span className="text-green-400">0.92</span>,
          </p>
          <p className="pl-4">{'}'}</p>
          <p className="pl-2">{']'}</p>
          <p>{'}'}</p>
        </div>
      ),
    },
    {
      type: 'chart',
      icon: BarChart3,
      title: 'AI-Powered Data Analysis',
      content: (
        <div className="space-y-3 text-xs text-foreground/70">
          <div>
            <span>75% Engagement Growth</span>
            <div className="w-full bg-muted rounded-full h-2 mt-1">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
          <div>
            <span>40% Conversion Uplift</span>
            <div className="w-full bg-muted rounded-full h-2 mt-1">
              <div
                className="bg-primary/70 h-2 rounded-full"
                style={{ width: '40%' }}
              ></div>
            </div>
          </div>
          <p className="text-sm pt-1 font-semibold text-foreground">
            AI identifies key trends for growth.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div
      ref={aiRef}
      className="gradient-card w-full h-full p-7 bg-card border border-border rounded-lg flex flex-col items-center justify-center overflow-hidden relative"
    >
      <div
        ref={centerRef}
        className="relative flex flex-col items-center ai-center-element"
      >
        <h3 className="text-2xl font-bold font-geometric text-foreground mb-4">
          AI Integration for Business
        </h3>
        <div className="relative flex items-center justify-center w-40 h-40 z-10">
          <div className="absolute w-full h-full bg-primary/10 rounded-full" />
          <div className="absolute w-full h-full border-1 border-primary rounded-full animate-spin-slow" />
          <div className="absolute w-2/3 h-2/3 border-1 border-primary rounded-full animate-spin-slow animation-delay-[-2s]" />
          <div className="w-16 h-16 bg-primary rounded-full animate-pulse shadow-2xl shadow-primary/50 flex items-center justify-center">
            <Cpu className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16">
        {cards.map((card, index) => {
          const CardIcon = card.icon;
          return (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="ai-card-element feature-item flex items-start gap-4 p-4 bg-card/50 border border-border rounded-lg"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <CardIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {card.title}
                </h4>
                <div className="text-sm text-foreground/60 mt-2">
                  {Array.isArray(card.content) ? (
                    <ul className="space-y-2">
                      {card.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    card.content
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {linePaths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="var(--border)"
            strokeWidth="1.5"
            fill="transparent"
            className="connecting-line"
            strokeDasharray="500"
          />
        ))}
      </svg>
    </div>
  );
};

export default AiVisual;
