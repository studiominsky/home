'use client';

import React, { useLayoutEffect, useRef } from 'react';
import {
  Zap,
  Smartphone,
  TrendingUp,
  UserRound,
  Sparkles,
  BrainCircuit,
  Cpu,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import { gsap } from 'gsap';
import { Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
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

// Interface and other components remain unchanged
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

  // Data for Radial Bar Chart
  const radialChartData = [
    {
      browser: 'chrome',
      visitors: 275,
      fill: 'rgba(var(--color-primary-rgb), 1)',
    },
    {
      browser: 'safari',
      visitors: 200,
      fill: 'rgba(var(--color-primary-rgb), 0.8)',
    },
    {
      browser: 'firefox',
      visitors: 187,
      fill: 'rgba(var(--color-primary-rgb), 0.6)',
    },
    {
      browser: 'edge',
      visitors: 173,
      fill: 'rgba(var(--color-primary-rgb), 0.4)',
    },
    {
      browser: 'other',
      visitors: 90,
      fill: 'rgba(var(--color-primary-rgb), 0.2)',
    },
  ];

  const radialChartConfig = {
    visitors: {
      label: 'Visitors',
    },
    chrome: {
      label: 'Chrome',
      color: 'rgba(var(--color-primary-rgb), 1)',
    },
    safari: {
      label: 'Safari',
      color: 'rgba(var(--color-primary-rgb), 0.8)',
    },
    firefox: {
      label: 'Firefox',
      color: 'rgba(var(--color-primary-rgb), 0.6)',
    },
    edge: {
      label: 'Edge',
      color: 'rgba(var(--color-primary-rgb), 0.4)',
    },
    other: {
      label: 'Other',
      color: 'rgba(var(--color-primary-rgb), 0.2)',
    },
  } satisfies ChartConfig;

  // Data for Calendar
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const selectedDays = [11, 12, 13, 14, 15];

  // Data for employee pie charts
  const employeeData = [
    {
      name: 'Alice Johnson',
      role: 'Project Manager',
      data: [
        {
          name: 'Completed',
          value: 80,
          fill: 'var(--color-primary)',
        },
        { name: 'Pending', value: 20, fill: 'var(--color-border)' },
      ],
    },
    {
      name: 'Bob Williams',
      role: 'Lead Engineer',
      data: [
        {
          name: 'Completed',
          value: 65,
          fill: 'var(--color-primary)',
        },
        { name: 'Pending', value: 35, fill: 'var(--color-border)' },
      ],
    },
    {
      name: 'Charlie Brown',
      role: 'UX Designer',
      data: [
        {
          name: 'Completed',
          value: 90,
          fill: 'var(--color-primary)',
        },
        { name: 'Pending', value: 10, fill: 'var(--color-border)' },
      ],
    },
  ];

  return (
    <div
      className="data-viz-container w-full h-full rounded-lg p-7" // Applies the background gradient style
    >
      <div
        ref={vizRef}
        className="w-full h-full grid grid-cols-3 grid-rows-3 gap-7"
      >
        {/* Main Viz: Radial Bar Chart with Gradient */}
        <div className="gradient-card col-span-2 row-span-2 bg-card border border-border rounded-md p-4 flex flex-col">
          <div className="text-center z-10">
            <h4 className="font-semibold text-foreground">
              Radial Chart - Browser Share
            </h4>
            <p className="text-sm text-foreground/60">
              January - June 2025
            </p>
          </div>
          <div className="flex-grow h-0 pb-4 z-10">
            <ChartContainer
              config={radialChartConfig}
              className="mx-auto aspect-square max-h-[350px] h-full"
            >
              <RadialBarChart
                data={radialChartData}
                innerRadius={30}
                outerRadius={140}
              >
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      nameKey="browser"
                    />
                  }
                />
                <RadialBar
                  dataKey="visitors"
                  background={{
                    fill: 'rgba(var(--color-primary-rgb), 0.25)',
                  }}
                />
              </RadialBarChart>
            </ChartContainer>
          </div>
          <div className="flex-col gap-2 text-sm text-center z-10">
            <div className="flex items-center justify-center gap-2 font-medium">
              Trending up by 5.2% this month
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Top-Right Widget: KPI Card */}
        <div className="col-start-3 bg-card border border-border rounded-md p-4 flex flex-col items-center justify-center text-center">
          <h4 className="font-semibold text-foreground/80 text-sm">
            Conversion Rate
          </h4>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-4xl font-bold text-foreground">
              2.57%
            </span>
          </div>
          <div className="flex items-center gap-1 text-positive font-medium text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+10%</span>
          </div>
        </div>

        {/* Middle-Right Widget: Calendar Viz */}
        <div className="col-start-3 row-start-2 bg-card border border-border rounded-md p-4 flex flex-col">
          <h4 className="font-semibold text-sm text-foreground text-center">
            Key Dates
          </h4>
          <div className="text-center font-medium text-xs text-foreground/80 mt-2">
            August 2025
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-foreground/60 mt-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {/* Empty cells for calendar alignment */}
            <div />
            <div />
            <div />
            <div />
            <div />
            {calendarDays.map((day) => (
              <div
                key={day}
                className={`flex items-center justify-center text-xs w-6 h-6 rounded-full ${
                  selectedDays.includes(day)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/80'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM SECTION: Split into 2 columns --- */}
        <div className="col-span-3 grid grid-cols-2 gap-7">
          {/* Horizontal Bar Chart -- UPDATED */}
          <div className="bg-card border border-border rounded-md p-4 flex flex-col">
            <h4 className="font-semibold text-foreground mb-4">
              Performance Metrics
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>Usability</span>
                  <span>92%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 92%, rgba(var(--color-primary-rgb), 0.25) 92%)`,
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>Speed</span>
                  <span>88%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 88%, rgba(var(--color-primary-rgb), 0.25) 88%)`,
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>Accessibility</span>
                  <span>95%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 95%, rgba(var(--color-primary-rgb), 0.25) 95%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Employee Task Distribution -- NEW */}
          <div className="bg-card border border-border rounded-md p-4 flex flex-col">
            <h4 className="font-semibold text-foreground mb-3">
              Employee Task Distribution
            </h4>
            <div className="space-y-3">
              {employeeData.map((employee) => (
                <div
                  key={employee.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <UserRound className="w-5 h-5 text-foreground/60" />
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {employee.name}
                      </p>
                      <p className="text-xs text-foreground/70">
                        {employee.role}
                      </p>
                    </div>
                  </div>
                  <ChartContainer config={{}} className="w-10 h-10">
                    <PieChart>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent
                            hideLabel
                            hideIndicator
                          />
                        }
                      />
                      <Pie
                        data={employee.data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={18}
                        strokeWidth={2}
                      />
                    </PieChart>
                  </ChartContainer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- UPDATED AiVisual COMPONENT ---
const AiVisual: React.FC = () => {
  const aiRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = aiRef.current;
    if (!el) return;
    gsap.fromTo(
      '.ai-element',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.2,
      }
    );
  }, []);

  const aspects = [
    {
      icon: Zap,
      title: 'Automation',
      text: 'Automate repetitive tasks to free up employees for strategic work.',
    },
    {
      icon: BrainCircuit,
      title: 'Enhanced Decision-Making',
      text: 'Analyze large datasets to identify patterns and enable more informed decisions.',
    },
    {
      icon: UserRound,
      title: 'Personalized Experiences',
      text: 'Offer tailored recommendations and customized support.',
    },
  ];

  // Create capitalized variables for the icons to fix JSX error
  const AspectIcon1 = aspects[0].icon;
  const AspectIcon2 = aspects[1].icon;
  const AspectIcon3 = aspects[2].icon;

  return (
    <div
      ref={aiRef}
      className="gradient-card w-full h-full p-7 bg-card border border-border rounded-lg relative flex items-center justify-center overflow-hidden"
    >
      {/* Positioned Title */}
      <div className="ai-element absolute top-7 left-7">
        <h3 className="text-2xl font-bold font-geometric text-foreground">
          AI Integration for Business
        </h3>
      </div>

      {/* Central Core */}
      <div className="relative flex items-center justify-center w-64 h-64 z-10">
        <div className="absolute w-full h-full border-2 border-primary/20 rounded-full animate-spin-slow" />
        <div className="absolute w-2/3 h-2/3 border-2 border-primary/20 rounded-full animate-spin-slow animation-delay-[-2s]" />
        <div className="w-16 h-16 bg-primary rounded-full animate-pulse shadow-2xl shadow-primary/50 flex items-center justify-center">
          <Cpu className="w-8 h-8 text-primary-foreground" />
        </div>
      </div>

      {/* Surrounding Aspect Cards */}
      <div className="ai-element absolute top-[20%] left-[25%] w-56 bg-card/60 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-7 h-7 bg-primary/10 text-primary rounded-md flex items-center justify-center mt-1">
            <AspectIcon1 className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-foreground">
              {aspects[0].title}
            </h5>
            <p className="text-xs text-foreground/60">
              {aspects[0].text}
            </p>
          </div>
        </div>
      </div>
      <div className="ai-element absolute top-[40%] right-[15%] w-56 bg-card/60 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-7 h-7 bg-primary/10 text-primary rounded-md flex items-center justify-center mt-1">
            <AspectIcon2 className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-foreground">
              {aspects[1].title}
            </h5>
            <p className="text-xs text-foreground/60">
              {aspects[1].text}
            </p>
          </div>
        </div>
      </div>
      <div className="ai-element absolute bottom-[20%] left-[30%] w-56 bg-card/60 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-7 h-7 bg-primary/10 text-primary rounded-md flex items-center justify-center mt-1">
            <AspectIcon3 className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-semibold text-sm text-foreground">
              {aspects[2].title}
            </h5>
            <p className="text-xs text-foreground/60">
              {aspects[2].text}
            </p>
          </div>
        </div>
      </div>

      {/* JSON Example */}
      <div className="ai-element absolute bottom-8 right-8 w-64 bg-card/60 backdrop-blur-sm border border-border rounded-lg p-3 font-mono text-[10px] shadow-lg">
        <p className="font-sans font-semibold text-xs mb-1 text-foreground">
          Example: Data Enrichment
        </p>
        <p>{'{'}</p>
        <p className="pl-2">
          <span className="text-positive">feedback</span>:{' '}
          <span className="text-foreground/80">
            The service was amazing!
          </span>
          ,
        </p>
        <p className="pl-2">
          <span className="text-positive">sentiment</span>:{' '}
          <span className="text-foreground/90 font-semibold bg-primary/20 px-1 rounded">
            Positive
          </span>
          ,
        </p>
        <p>{'}'}</p>
      </div>
    </div>
  );
};

// --- UPDATED ChatbotVisual COMPONENT ---
const ChatbotVisual: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    gsap.fromTo(
      '.chat-message',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 1.2, // Increased stagger for a more conversational feel
        delay: 0.2,
      }
    );
  }, []);

  const conversation = [
    { type: 'ai', text: 'Hello! How can I assist you today?' },
    { type: 'user', text: "I'd like to start a project." },
    {
      type: 'ai',
      text: 'Of course! What kind of project are you envisioning?',
    },
    { type: 'user', text: 'Web Application' },
    {
      type: 'ai',
      text: 'Great choice! To help us get started, could you tell me a bit about your target audience?',
      options: [
        'General Public',
        'Business (B2B)',
        'Internal Employees',
      ],
    },
    { type: 'user', text: 'Business (B2B)' },
    {
      type: 'ai',
      text: "Understood. We specialize in B2B applications that boost efficiency. We'll be in touch to discuss the details. Thank you!",
    },
    {
      type: 'ai',
      text: 'How was your experience with me?',
      feedback: true,
    },
  ];

  return (
    <div className="w-full h-full bg-card rounded-lg p-4 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 p-2">
        <div className="relative">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-positive rounded-full border-2 border-card" />
        </div>
        <div>
          <h5 className="font-semibold">AI Assistant</h5>
          <p className="text-xs text-foreground/60">Online</p>
        </div>
      </div>

      {/* Message Area */}
      <div
        ref={chatRef}
        className="flex-grow p-4 flex flex-col gap-4 overflow-y-auto"
      >
        {conversation.map((msg, index) => (
          <div key={index} className="chat-message flex flex-col">
            {msg.type === 'user' && (
              <div className="p-3 text-primary-foreground rounded-lg self-end max-w-xs text-sm">
                {msg.text}
              </div>
            )}
            {msg.type === 'ai' && (
              <div className="p-3 rounded-lg self-start max-w-xs text-sm">
                {msg.text}
              </div>
            )}
            {msg.options && (
              <div className="flex gap-2 justify-start flex-wrap mt-2 self-start">
                {msg.options.map((option) => (
                  <div
                    key={option}
                    className="text-xs py-1.5 px-3 rounded-lg bg-card hover:bg-muted transition-colors cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            {msg.feedback && (
              <div className="p-3 rounded-lg self-start text-sm">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Frown className="w-6 h-6 text-foreground/40 hover:text-red-500 transition-colors cursor-pointer" />
                  <Meh className="w-6 h-6 text-foreground/40 hover:text-yellow-500 transition-colors cursor-pointer" />
                  <Smile className="w-6 h-6 text-primary fill-primary/20 cursor-pointer" />
                </div>
                <p className="text-xs text-foreground/70 pt-2 mt-2 text-center">
                  AI assistants can collect valuable user feedback
                  24/7.
                </p>
              </div>
            )}
          </div>
        ))}
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
