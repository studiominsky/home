'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { UserRound } from 'lucide-react';
import { gsap } from 'gsap';
import { ChartAreaGradient } from '../Chart'; // Assuming path
import InvoiceTable from '../Table'; // Assuming path

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

export default WebAppVisual;
