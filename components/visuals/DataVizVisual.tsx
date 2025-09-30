'use client';

import React, { useLayoutEffect, useRef } from 'react';
import {
  TrendingUp,
  UserRound,
  CheckCircle2,
  Clock,
  Smile,
} from 'lucide-react';
import { Pie, PieChart, RadialBar, RadialBarChart } from 'recharts';
import {
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  ChartContainer,
  type ChartConfig,
} from '@/components/ui/chart';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const DataVizVisual: React.FC = () => {
  const t = useTranslations('Visuals.DataViz');
  const vizRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!vizRef.current) return;
    const el = vizRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, vizRef);
    return () => ctx.revert();
  }, []);

  const radialChartData = [
    { stage: 'Qualification', value: 110, fill: 'rgba(var(--color-primary-rgb), 1)' },
    { stage: 'Needs Analysis', value: 105, fill: 'rgba(var(--color-primary-rgb), 0.8)' },
    { stage: 'Proposal', value: 130, fill: 'rgba(var(--color-primary-rgb), 0.6)' },
    { stage: 'Negotiation', value: 105, fill: 'rgba(var(--color-primary-rgb), 0.4)' },
    { stage: 'Closed Won', value: 75, fill: 'rgba(var(--color-primary-rgb), 0.2)' },
  ];

  const radialChartConfig = {
    value: { label: 'Deals' },
    Qualification: { label: 'Qualification', color: 'rgba(var(--color-primary-rgb), 1)' },
    'Needs Analysis': { label: 'Needs Analysis', color: 'rgba(var(--color-primary-rgb), 0.8)' },
    Proposal: { label: 'Proposal', color: 'rgba(var(--color-primary-rgb), 0.6)' },
    Negotiation: { label: 'Negotiation', color: 'rgba(var(--color-primary-rgb), 0.4)' },
    'Closed Won': { label: 'Closed Won', color: 'rgba(var(--color-primary-rgb), 0.2)' },
  } satisfies ChartConfig;

  const employeeData = [
    {
      name: 'Elena Rodriguez',
      role: 'Sales Lead',
      data: [
        { name: 'Completed', value: 80, fill: 'var(--color-primary)' },
        { name: 'Pending', value: 20, fill: 'var(--color-border)' },
      ],
    },
    {
      name: 'Ben Carter',
      role: 'Support Engineer',
      data: [
        { name: 'Completed', value: 65, fill: 'var(--color-primary)' },
        { name: 'Pending', value: 35, fill: 'var(--color-border)' },
      ],
    },
    {
      name: 'Aisha Khan',
      role: 'Product Designer',
      data: [
        { name: 'Completed', value: 90, fill: 'var(--color-primary)' },
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
              {t('chartTitle')}
            </h4>
            <p className="text-sm text-foreground/60">
              {t('chartSubtitle')}
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
                      nameKey="stage"
                    />
                  }
                />
                <RadialBar
                  dataKey="value"
                  background={{
                    fill: 'rgba(var(--color-primary-rgb), 0.25)',
                  }}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </RadialBarChart>
            </ChartContainer>
          </div>
          <div className="flex-col gap-2 text-sm text-center z-10 mt-auto">
            <div className="flex items-center justify-center gap-2 font-medium">
              {t('trendingUp')}
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-md p-4 flex flex-col items-center justify-center text-center">
          <h4 className="font-semibold text-foreground/80 text-sm">
            {t('conversionRate')}
          </h4>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl sm:text-6xl font-bold text-foreground">
              3.14%
            </span>
          </div>
          <div className="flex items-center gap-1 text-positive font-medium text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+12%</span>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-2 bg-card border border-border rounded-md p-4 flex flex-col justify-center">
          <h4 className="font-semibold text-sm text-foreground text-center mb-4">
            {t('supportMetrics')}
          </h4>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-positive" />
              <div>
                <p className="text-xs text-foreground/70">{t('ticketsSolved')}</p>
                <p className="text-lg font-bold">1,204</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-foreground/70">{t('avgResponseTime')}</p>
                <p className="text-lg font-bold">1.2h</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Smile className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-foreground/70">{t('csat')}</p>
                <p className="text-lg font-bold">92%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-7">
          <div className="bg-card border border-border rounded-md p-4 flex flex-col">
            <h4 className="font-semibold text-foreground mb-4">
              {t('operationalStatus')}
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>{t('apiUptime')}</span>
                  <span>99.9%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-positive) 99.9%, rgba(var(--color-primary-rgb), 0.25) 99.9%)`,
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>{t('dbLoad')}</span>
                  <span>45%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 45%, rgba(var(--color-primary-rgb), 0.25) 45%)`,
                  }}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-foreground/80">
                  <span>{t('errorRate')}</span>
                  <span>0.8%</span>
                </div>
                <div
                  className="w-full rounded-full h-2.5"
                  style={{
                    background: `linear-gradient(to right, var(--color-negative) 0.8%, rgba(var(--color-primary-rgb), 0.25) 0.8%)`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-md p-4 flex flex-col">
            <h4 className="font-semibold text-foreground mb-3">
              {t('employeeTasks')}
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