'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

import { ChartAreaGradient } from './Chart';
import InvoiceTable from './Table';

interface ServiceVisualProps {
  activeIndex: number;
}

const WebAppVisual: React.FC = () => (
  <div className="w-full p-7">
    <div
      className="w-full h-full grid grid-cols-3 grid-rows-3 gap-7"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="col-span-2 row-span-2 bg-card border border-border rounded-md p-4 flex flex-col">
        <h4 className="font-semibold text-foreground">Revenue</h4>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-4xl">$20.5K</span>
          <span className="flex flex-col">
            <span className="text-positive font-medium text-sm">
              +15%
            </span>
            <span className="text-gray-500 text-sm">($15,020)</span>
          </span>
        </div>
        <ChartAreaGradient />
      </div>

      <div className="col-start-3 bg-card p-4 border border-border rounded-md flex flex-col">
        <h4 className="font-semibold text-sm">Sidebar</h4>
        <div>123</div>
      </div>

      <div className="col-start-3 row-start-2 bg-card p-4 border-border rounded-md">
        <h4 className="font-semibold text-sm">Stats</h4>
        <div className="w-full h-8 mt-2 bg-muted rounded-md animate-pulse" />
      </div>

      <div className="col-span-3 bg-card p-4 border border-border rounded-md">
        <h4 className="font-semibold mb-4">Customers</h4>
        <InvoiceTable />
      </div>
    </div>
  </div>
);

export function WebsiteVisual() {
  return (
    <div className="w-full h-full web-card p-6 rounded-lg min-h-[800px] flex flex-col justify-between">
      <div className="h-full">
        <h4 className="text-4xl font-geometric text-center max-w-90 mt-23 mx-auto">
          Your amazing website in 3 weeks
        </h4>
      </div>
    </div>
  );
}

const DataVizVisual: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = chartRef.current;
    if (!el) return;
    gsap.fromTo(
      Array.from(el.children),
      { scaleY: 0, transformOrigin: 'bottom' },
      {
        scaleY: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.2,
      }
    );
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-lg p-6">
      <div
        ref={chartRef}
        className="w-4/5 h-3/5 flex items-end justify-around gap-3"
      >
        {[60, 80, 40, 90, 70].map((h, i) => (
          <div
            key={i}
            className="w-full bg-primary/50 rounded-t-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="text-sm text-foreground/40 mt-4 text-center">
        A bar chart animating in, showing data insights.
      </p>
    </div>
  );
};

const AiVisual: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <p className="text-center font-mono">
      <span className="text-primary animate-pulse">[AI]</span> is
      revolutionizing tech.
    </p>
  </div>
);

const ChatbotVisual: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    gsap.fromTo(
      Array.from(el.children),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.6,
        delay: 0.2,
      }
    );
  }, []);
  return (
    <div className="w-full h-full bg-card rounded-lg p-6 flex flex-col justify-end">
      <div ref={chatRef} className="flex flex-col gap-3">
        <div className="p-3 bg-muted rounded-lg self-start max-w-xs">
          Hello! How can I help you?
        </div>
        <div className="p-3 bg-primary text-primary-foreground rounded-lg self-end max-w-xs">
          I&apos;d like to start a project.
        </div>
        <div className="p-3 w-12 bg-muted rounded-lg self-start flex items-center justify-center gap-1">
          {[0, 100, 200].map((delay) => (
            <span
              key={delay}
              className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ServiceVisual: React.FC<ServiceVisualProps> = ({
  activeIndex,
}) => {
  switch (activeIndex) {
    case 0:
      return <WebAppVisual />;
    case 1:
      return <WebsiteVisual />;
    case 2:
      return <DataVizVisual />;
    case 3:
      return <AiVisual />;
    case 4:
      return <ChatbotVisual />;
    default:
      return <WebAppVisual />;
  }
};

export default ServiceVisual;
