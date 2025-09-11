'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Zap, Smartphone, TrendingUp } from 'lucide-react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';

export function WebsiteVisual() {
  const t = useTranslations('Visuals.Website');
  const visualRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    requestAnimationFrame(() =>
      el.setAttribute('data-mounted', 'true')
    );

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
      className="w-full h-full web-card p-4 sm:p-6 flex flex-col bg-card overflow-hidden"
    >
      <header className="flex justify-between items-center p-4">
        <div className="nav-item w-5 h-5 rounded-full bg-primary" />
        <nav className="hidden sm:flex gap-6 text-sm text-foreground/80">
          <span className="nav-item">{t('navHome')}</span>
          <span className="nav-item">{t('navAbout')}</span>
          <span className="nav-item">{t('navServices')}</span>
          <span className="nav-item">{t('navContact')}</span>
        </nav>
      </header>

      <div className="flex-grow flex flex-col items-center mt-8 sm:mt-16 text-center px-4 pb-10 sm:pb-16">
        <h1 className="hero-title text-3xl sm:text-5xl font-bold font-geometric max-w-2xl leading-tight text-foreground">
          {t('heroTitle')}
        </h1>
        <p className="hero-subtitle text-base sm:text-lg text-foreground/70 mt-4 max-w-xl">
          {t('heroSubtitle')}
        </p>
        <button className="hero-cta mt-8 bg-positive text-background font-semibold py-3 px-8 rounded-full">
          {t('cta')}
        </button>

        <div className="w-full max-w-3xl mx-auto mt-[7.5rem] sm:mt-24 md:mt-52">
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="feature-item flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {t('feature1Title')}
                </h4>
                <p className="text-sm  text-foreground/60 mt-1">
                  {t('feature1Description')}
                </p>
              </div>
            </div>
            <div className="feature-item flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {t('feature2Title')}
                </h4>
                <p className="text-sm text-foreground/60 mt-1">
                  {t('feature2Description')}
                </p>
              </div>
            </div>
            <div className="feature-item flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">
                  {t('feature3Title')}
                </h4>
                <p className="text-sm text-foreground/60 mt-1">
                  {t('feature3Description')}
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
