'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Zap, Smartphone, TrendingUp, UserRound } from 'lucide-react';
import { BarChart, Bar, CartesianGrid, XAxis } from 'recharts';
import { gsap } from 'gsap';
import { PieChart, Pie, Sector } from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  ChartContainer,
  type ChartConfig,
} from '@/components/ui/chart';
import { ChartAreaGradient } from './Chart';
import InvoiceTable from './Table';
import type { PieSectorDataItem } from 'recharts/types/polar/Pie';
interface ServiceVisualProps {
  activeIndex: number;
}

const WebAppVisual: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div className="w-full p-7">
      <div
        ref={gridRef}
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
        <div className="col-start-3 bg-card p-4 border border-border rounded-md flex flex-col items-center text-center justify-center">
          <UserRound className="w-10 h-10 text-foreground mb-3" />
          <h5 className="font-semibold text-foreground">Jane Doe</h5>
          <p className="text-sm text-foreground/60">Lead Developer</p>
          <button className="mt-4 w-full bg-foreground text-background text-sm py-2 rounded-md hover:bg-foreground/90 transition-colors">
            View Profile
          </button>
        </div>
        <div className="col-start-3 row-start-2 bg-card p-4 border-border rounded-md flex flex-col justify-center">
          <h4 className="font-semibold text-foreground">
            Project Status
          </h4>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 text-foreground/80">
                <span>Frontend</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-positive rounded-full h-2"
                  style={{ width: '80%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1 text-foreground/80">
                <span>Backend</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary/80 rounded-full h-2"
                  style={{ width: '65%' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 bg-card p-4 border border-border rounded-md">
          <h4 className="font-semibold mb-4">Customers</h4>
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
};

export function WebsiteVisual() {
  const visualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      '.nav-item',
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }
    )
      .fromTo(
        '.hero-title',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      )
      .fromTo(
        '.feature-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.2,
        },
        '-=0.3'
      );
  }, []);

  return (
    <div
      ref={visualRef}
      className="w-full h-full web-card p-6 rounded-lg min-h-[800px] flex flex-col bg-card border border-border overflow-hidden"
    >
      <header className="flex justify-between items-center p-4">
        <div className="nav-item w-5 h-5 rounded-full bg-primary" />
        <nav className="flex gap-6 text-sm text-foreground/80">
          <span className="nav-item">Home</span>
          <span className="nav-item">About</span>
          <span className="nav-item">Services</span>
          <span className="nav-item">Contact</span>
        </nav>
      </header>

      <div className="flex-grow flex flex-col items-center mt-15 text-center px-4">
        <h1 className="hero-title text-5xl font-bold font-geometric max-w-2xl leading-tight text-foreground">
          Your Amazing Website
        </h1>
        <p className="hero-subtitle text-lg text-foreground/70 mt-4 max-w-xl">
          We build lightning-fast, visually stunning, and
          user-friendly websites that convert visitors into customers.
        </p>
        <button className="hero-cta mt-8 bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-full transition-transform hover:scale-105 active:scale-95">
          Get Started
        </button>

        <div className="w-full max-w-3xl mx-auto mt-50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Feature 1 */}
            <div className="feature-item flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  Lightning Fast
                </h4>
                <p className="text-sm text-foreground/60 mt-1">
                  Optimized for performance to ensure the best user
                  experience.
                </p>
              </div>
            </div>
            <div className="feature-item flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  Fully Responsive
                </h4>
                <p className="text-sm text-foreground/60 mt-1">
                  Looks perfect on all devices, from desktops to
                  smartphones.
                </p>
              </div>
            </div>
            <div className="feature-item flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  SEO Optimized
                </h4>
                <p className="text-sm text-foreground/60 mt-1">
                  Built to rank high on search engines and attract
                  more traffic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ActiveDonut = (props: PieSectorDataItem) => {
  const or = (props.outerRadius ?? 0) + 10;
  return <Sector {...props} outerRadius={or} />;
};

const DataVizVisual: React.FC = () => {
  const vizRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = vizRef.current;
    if (!el) return;
    gsap.fromTo(
      el.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.2,
      }
    );
  }, []);

  const c1 = 'rgba(var(--color-primary-rgb), 1)';
  const c2 = 'rgba(var(--color-primary-rgb), 0.8)';
  const c3 = 'rgba(var(--color-primary-rgb), 0.6)';
  const c4 = 'rgba(var(--color-primary-rgb), 0.45)';
  const c5 = 'rgba(var(--color-primary-rgb), 0.3)';

  const pieData1 = [
    { key: 'chrome', label: 'Chrome', visitors: 275, fill: c1 },
    { key: 'safari', label: 'Safari', visitors: 200, fill: c2 },
    { key: 'firefox', label: 'Firefox', visitors: 187, fill: c3 },
    { key: 'edge', label: 'Edge', visitors: 173, fill: c4 },
    { key: 'other', label: 'Other', visitors: 90, fill: c5 },
  ];
  const pieCfg1: ChartConfig = {
    chrome: { label: 'Chrome', color: c1 },
    safari: { label: 'Safari', color: c2 },
    firefox: { label: 'Firefox', color: c3 },
    edge: { label: 'Edge', color: c4 },
    other: { label: 'Other', color: c5 },
  };

  const pieData2 = [
    { key: 'desktop', label: 'Desktop', visitors: 540, fill: c1 },
    { key: 'mobile', label: 'Mobile', visitors: 360, fill: c3 },
    { key: 'tablet', label: 'Tablet', visitors: 120, fill: c5 },
  ];
  const pieCfg2: ChartConfig = {
    desktop: { label: 'Desktop', color: c1 },
    mobile: { label: 'Mobile', color: c3 },
    tablet: { label: 'Tablet', color: c5 },
  };

  const barData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 },
  ];
  const barCfg: ChartConfig = {
    desktop: { label: 'Desktop', color: c1 },
    mobile: { label: 'Mobile', color: c3 },
  };

  return (
    <div
      ref={vizRef}
      className="data-viz-container w-full h-full rounded-lg p-7 grid grid-cols-3 grid-rows-3 gap-7"
    >
      <div className="bg-card border border-border rounded-md p-4 flex flex-col">
        <ChartContainer
          config={pieCfg1}
          className="mx-auto w-full max-w-[260px] h-[260px] aspect-auto"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData1}
              dataKey="visitors"
              nameKey="key"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={ActiveDonut}
              isAnimationActive
              animationBegin={100}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="bg-card border border-border rounded-md p-4 flex flex-col">
        <ChartContainer
          config={pieCfg2}
          className="mx-auto w-full max-w-[260px] h-[260px] aspect-auto"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieData2}
              dataKey="visitors"
              nameKey="key"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={ActiveDonut}
              isAnimationActive
              animationBegin={100}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={6}
              isAnimationActive
              animationBegin={120}
              animationDuration={700}
              animationEasing="ease-out"
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={6}
              isAnimationActive
              animationBegin={150}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="bg-card border border-border rounded-md p-4 flex flex-col justify-center">
        <h4 className="font-semibold text-foreground/80 text-sm">
          Query Success
        </h4>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-bold text-foreground">
            98.7%
          </span>
          <span className="text-positive font-medium text-sm">
            +0.5%
          </span>
        </div>
        <p className="text-xs text-foreground/60 mt-1">
          vs. last 30 days
        </p>
      </div>

      {/* BOTTOM: Bar (rows 2–3 full width) */}
      <div className="col-span-3 row-start-2 row-span-2 bg-card border border-border rounded-md p-4 flex flex-col">
        <h4 className="font-semibold text-sm text-foreground">
          Device Traffic
        </h4>
        <p className="text-xs text-foreground/60 mb-2">
          January – June 2024
        </p>

        <ChartContainer
          config={barCfg}
          className="w-full h-[320px] aspect-auto"
        >
          <BarChart data={barData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(v) => String(v).slice(0, 3)}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={6}
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={6}
            />
          </BarChart>
        </ChartContainer>
      </div>
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
