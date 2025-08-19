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

declare global {
  interface Window {
    gsap?: GSAP;
  }
}

const AiVisual: React.FC = () => {
  const aiRef = useRef<HTMLDivElement>(null);
  const cpuContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animatedOnce = useRef(false);

  const [isGsapReady, setIsGsapReady] = useState(false);
  const [linePaths, setLinePaths] = useState<string[]>([]);

  useEffect(() => {
    const s = document.createElement('script');
    s.src =
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    s.onload = () => setIsGsapReady(true);
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  useLayoutEffect(() => {
    const containerEl = aiRef.current;
    const centerEl = cpuContainerRef.current;
    const cards = cardRefs.current.filter(
      Boolean
    ) as HTMLDivElement[];
    if (!containerEl || !centerEl || cards.length !== 4) return;

    let rafId: number | null = null;

    const computeNow = () => {
      const containerRect = containerEl.getBoundingClientRect();
      const centerRect = centerEl.getBoundingClientRect();
      const centerPoint = {
        x:
          centerRect.left + centerRect.width / 2 - containerRect.left,
        y: centerRect.top + centerRect.height / 2 - containerRect.top,
      };

      const cornerRadius = 15;
      const cpuCircleRadius = centerRect.width / 2; // start at outer ring edge

      const newPaths = [cards[0], cards[1]].map((cardEl, index) => {
        const cardRect = cardEl.getBoundingClientRect();
        const cardPoint = {
          x: cardRect.left + cardRect.width / 2 - containerRect.left,
          y: cardRect.top - containerRect.top,
        };

        const startX =
          index === 0
            ? centerPoint.x - cpuCircleRadius - 6
            : centerPoint.x + cpuCircleRadius + 6;

        const path = `
          M ${startX} ${centerPoint.y}
          L ${cardPoint.x + (index === 0 ? cornerRadius : -cornerRadius)} ${centerPoint.y}
          Q ${cardPoint.x} ${centerPoint.y} ${cardPoint.x} ${centerPoint.y + cornerRadius}
          L ${cardPoint.x} ${cardPoint.y}
        `;
        return path.trim();
      });

      const same =
        newPaths.length === linePaths.length &&
        newPaths.every((p, i) => p === linePaths[i]);

      if (!same) setLinePaths(newPaths);
    };

    const scheduleCompute = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        computeNow();
      });
    };

    scheduleCompute();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => scheduleCompute());
    }

    const ro = new ResizeObserver(() => scheduleCompute());
    ro.observe(containerEl);
    ro.observe(centerEl);
    cards.forEach((c) => ro.observe(c));

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, [isGsapReady, linePaths]);

  useEffect(() => {
    if (
      !isGsapReady ||
      !window.gsap ||
      animatedOnce.current ||
      linePaths.length === 0
    )
      return;

    const gsap = window.gsap;
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      '.ai-center-element',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' }
    )
      .fromTo(
        '.ai-card-element',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.12,
        },
        '-=0.4'
      )
      .fromTo(
        '.connecting-line',
        { strokeDashoffset: 500 },
        {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          stagger: 0.12,
        },
        '-=0.4'
      );

    animatedOnce.current = true;
  }, [isGsapReady, linePaths]);

  const cards = [
    {
      type: 'list',
      icon: Zap,
      title: 'What is AI Integration?',
      content: [
        'Automating tasks for more strategic work.',
        'Enhancing decision-making with data insights.',
        'Personalizing customer experiences.',
      ],
    },
    {
      type: 'list',
      icon: TrendingUp,
      title: 'Benefits of AI Integration',
      content: [
        'Increased efficiency and productivity.',
        'Reduced costs through automation.',
        'Enhanced customer satisfaction and loyalty.',
        'A significant competitive advantage.',
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
              />
            </div>
          </div>
          <div>
            <span>40% Conversion Uplift</span>
            <div className="w-full bg-muted rounded-full h-2 mt-1">
              <div
                className="bg-primary/70 h-2 rounded-full"
                style={{ width: '40%' }}
              />
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
      className="relative gradient-card w-full h-full p-7 bg-card border border-border rounded-lg flex flex-col items-center justify-center overflow-hidden"
    >
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {linePaths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke="var(--color-primary)"
            strokeOpacity="1"
            strokeWidth="0.5"
            fill="transparent"
            className="connecting-line"
            strokeDasharray="500"
          />
        ))}
      </svg>

      <div className="relative flex flex-col items-center ai-center-element z-10">
        <h3 className="text-2xl font-bold font-geometric text-foreground mb-4">
          AI Integration for Business
        </h3>
        <div
          ref={cpuContainerRef}
          className="relative flex items-center justify-center w-40 h-40"
        >
          <div className="absolute w-full h-full bg-primary/10 rounded-full animate-pulse" />
          <div className="absolute w-full h-full border border-primary/50 rounded-full animate-spin-slow" />
          <div className="absolute w-2/3 h-2/3 border border-primary/30 rounded-full animate-spin-slow [animation-delay:-2s]" />
          <div className="w-16 h-16 bg-primary/20 rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center">
            <Cpu className="w-8 h-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16 z-10">
        {cards.map((card, index) => {
          const CardIcon = card.icon;
          return (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="ai-card-element feature-item flex items-start gap-4 p-4 bg-card/60 border border-border rounded-lg backdrop-blur-sm"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <CardIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {card.title}
                </h4>
                <div className="text-sm text-foreground/60 mt-2">
                  {Array.isArray(card.content) ? (
                    <ul className="space-y-2 list-disc pl-4">
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
    </div>
  );
};

export default AiVisual;
