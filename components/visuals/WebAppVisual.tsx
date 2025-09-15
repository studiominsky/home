'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { ChartAreaGradient } from '../Chart';
import InvoiceTable from '../Table';
import { useTranslations } from 'next-intl';

const WebAppVisual: React.FC = () => {
  const t = useTranslations('Visuals.WebApp');
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
    <div className="w-full p-4 md:p-7">
      <div
        ref={gridRef}
        className="w-full h-full flex flex-col gap-4 md:grid md:grid-cols-3 md:grid-rows-3 md:gap-7"
      >
        <div className="md:col-span-2 md:row-span-2 bg-card border border-border rounded-md p-4 flex flex-col">
          <h4 className="font-semibold text-foreground">
            {t('revenue')}
          </h4>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-3xl md:text-4xl">$20.5K</span>
            <span className="flex flex-col">
              <span className="text-positive font-medium text-sm">
                +15%
              </span>
              <span className="text-gray-500 text-sm">($15,020)</span>
            </span>
          </div>
          <ChartAreaGradient />
        </div>
        <div className="md:col-start-3 bg-card border border-border rounded-md p-4 flex flex-col items-center justify-center text-center">
          <h4 className="font-semibold text-foreground/80 text-sm">
            {t('conversionRate')}
          </h4>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-5xl sm:text-6xl font-bold text-foreground">
              2.57%
            </span>
          </div>
          <div className="flex items-center gap-1 text-positive font-medium text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+10%</span>
          </div>
        </div>
        <div className="md:col-start-3 md:row-start-2 bg-card p-4 border border-border rounded-md flex flex-col justify-center">
          <h4 className="font-semibold text-foreground">
            {t('projectStatus')}
          </h4>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1 text-foreground/80">
                <span>{t('frontend')}</span>
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
                <span>{t('backend')}</span>
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
        <div className="md:col-span-3 bg-card p-4 border border-border rounded-md">
          <h4 className="font-semibold mb-4">{t('customers')}</h4>
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
};

export default WebAppVisual;
