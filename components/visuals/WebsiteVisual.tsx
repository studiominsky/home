'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Zap, Smartphone, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';

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
        <button className="hero-cta mt-8 bg-primary text-black font-semibold py-3 px-8 rounded-full">
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

export default WebsiteVisual;
