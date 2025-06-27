'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- Type Definitions ---
interface ServiceVisualProps {
  activeIndex: number;
}

// --- Individual Visual Components ---

const WebAppVisual: React.FC = () => (
  <div className="w-full h-full bg-white p-6 rounded-lg flex flex-col gap-3">
    <div>Dashboard</div>
  </div>
);

const WebsiteVisual: React.FC = () => (
  <div className="w-full h-full bg-white p-4 rounded-lg">
    <div>123</div>
    <div className="w-1/3 h-5 bg-orange-200 rounded mb-4" />
    <div className="w-full h-20 bg-orange-100 rounded-lg" />
    <div className="w-3/4 h-4 bg-gray-200 rounded mt-4" />
    <div className="w-1/2 h-4 bg-gray-200 rounded mt-2" />
    <p className="text-sm text-slate-400 mt-6 text-center">
      A clean and modern layout representing a corporate website.
    </p>
  </div>
);

const DataVizVisual: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chartRef.current) {
      const bars = chartRef.current.children;
      gsap.fromTo(
        bars,
        { scaleY: 0, transformOrigin: 'bottom' },
        {
          scaleY: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.2,
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-lg p-6">
      <div
        ref={chartRef}
        className="w-4/5 h-3/5 flex items-end justify-around gap-3"
      >
        <div className="w-full h-[60%] bg-sky-300 rounded-t-sm" />
        <div className="w-full h-[80%] bg-sky-400 rounded-t-sm" />
        <div className="w-full h-[40%] bg-sky-300 rounded-t-sm" />
        <div className="w-full h-[90%] bg-sky-500 rounded-t-sm" />
        <div className="w-full h-[70%] bg-sky-400 rounded-t-sm" />
      </div>
      <p className="text-sm text-slate-400 mt-4 text-center">
        A bar chart animating in, showing data insights.
      </p>
    </div>
  );
};

const AiVisual: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <p className="text-center font-mono">
      <br />
      AI is revolutionizing how we interact with technology.
    </p>
  </div>
);

const ChatbotVisual: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chatRef.current) {
      const bubbles = chatRef.current.children;
      gsap.fromTo(
        bubbles,
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
    }
  }, []);

  return (
    <div className="w-full h-full bg-white rounded-lg p-6 flex flex-col justify-end">
      <div ref={chatRef} className="flex flex-col gap-3">
        <div className="p-3 bg-gray-200 rounded-lg self-start max-w-xs">
          Hello! How can I help you?
        </div>
        <div className="p-3 bg-[#D3704A] text-white rounded-lg self-end max-w-xs">
          I&#39;d like to start a project.
        </div>
        <div className="p-3 w-12 bg-gray-200 rounded-lg self-start flex items-center justify-center gap-1">
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '0s' }}
          />
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          />
          <span
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          />
        </div>
      </div>
    </div>
  );
};

// The main "switcher" component with typed props
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
