'use client';

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from 'react';
import { TrendingUp, UserRound } from 'lucide-react';
import { Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  ChartContainer,
  type ChartConfig,
} from '@/components/ui/chart';

declare global {
  interface Window {
    gsap?: GSAP;
  }
}
const DataVizVisual: React.FC = () => {
  const vizRef = useRef<HTMLDivElement>(null);
  const [isGsapReady, setIsGsapReady] = useState(false);

  useEffect(() => {
    if (document.querySelector('script[src*="gsap.min.js"]')) {
      setIsGsapReady(true);
      return;
    }
    const s = document.createElement('script');
    s.src =
      'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    s.async = true;
    s.onload = () => setIsGsapReady(true);
    document.body.appendChild(s);
    return () => {
      document.body.removeChild(s);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isGsapReady || !window.gsap || !vizRef.current) return;

    const gsap = window.gsap;
    const el = vizRef.current;

    if (gsap.getProperty(el.children[0], 'opacity') === 0) {
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
    }
  }, [isGsapReady]);

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
    visitors: { label: 'Visitors' },
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

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const selectedDays = [11, 12, 13];

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
    <div className="data-viz-container w-full h-full rounded-lg p-4 sm:p-7">
      <div
        ref={vizRef}
        className="w-full h-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-7"
      >
        <div className="md:col-span-4 lg:col-span-4 lg:row-span-2 gradient-card bg-card border border-border rounded-md p-4 flex flex-col">
          <div className="text-center z-10">
            <h4 className="font-semibold text-foreground">
              Radial Chart - Browser Share
            </h4>
            <p className="text-sm text-foreground/60">
              January - June 2025
            </p>
          </div>
          <div className="relative z-10 mt-2 flex-1 min-h-[260px] sm:min-h-[300px] lg:min-h-[350px] pb-4">
            <ChartContainer
              config={radialChartConfig}
              className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px] lg:max-h-[350px] h-full"
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
          <div className="flex-col gap-2 text-sm text-center z-10 mt-auto">
            <div className="flex items-center justify-center gap-2 font-medium">
              Trending up by 5.2% this month
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-md p-4 flex flex-col items-center justify-center text-center">
          <h4 className="font-semibold text-foreground/80 text-sm">
            Conversion Rate
          </h4>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-[38px] font-bold text-foreground">
              2.57%
            </span>
          </div>
          <div className="flex items-center gap-1 text-positive font-medium text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+10%</span>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-md p-4 flex flex-col">
          <h4 className="font-semibold text-sm text-foreground text-center">
            Key Dates
          </h4>
          <div className="grid grid-cols-7 gap-y-1 text-center text-xs text-foreground/60 mt-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 mt-1">
            {calendarDays.map((day) => (
              <div
                key={day}
                className={`flex items-center justify-center text-xs w-15 md:w-full aspect-square rounded-full ${selectedDays.includes(day) ? 'bg-primary text-background' : 'text-foreground/80'}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7">
          <div className="bg-card border border-border rounded-md p-4 flex flex-col">
            <h4 className="font-semibold text-foreground mb-4">
              Performance Metrics
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>Speed</span>
                  <span>95%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-positive) 95%, rgba(var(--color-primary-rgb), 0.25) 95%)`,
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>Usability</span>
                  <span>82%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 82%, rgba(var(--color-primary-rgb), 0.25) 82%)`,
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

export default DataVizVisual;
