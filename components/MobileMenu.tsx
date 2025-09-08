'use client';

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X, GlobeIcon } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import { ThemeToggle } from './ThemeToggle';
import { ColorSelector } from './ColorSelector';
import clsx from 'clsx';
import Logo from './Logo';

type Props = {
  onContactClick: () => void;
};

export default function MobileMenu({ onContactClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  const locales = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const menu = container.querySelector('.mobile-menu');
    const overlay = container.querySelector('.menu-overlay');
    const links = gsap.utils.toArray('.menu-item');

    gsap.set(menu, { yPercent: -100, autoAlpha: 0, display: 'none' });
    gsap.set(overlay, { autoAlpha: 0, display: 'none' });

    timeline.current = gsap
      .timeline({
        paused: true,
        onStart: () => {
          gsap.set(menu, { display: 'flex' });
          gsap.set(overlay, { display: 'block' });
        },
        onReverseComplete: () => {
          gsap.set(menu, { display: 'none' });
          gsap.set(overlay, { display: 'none' });
        },
      })
      .to(
        overlay,
        { autoAlpha: 1, duration: 0.35, ease: 'power2.out' },
        0
      )
      .to(
        menu,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'cubic-bezier(0.16,1,0.3,1)',
        },
        0
      )
      .from(
        links,
        {
          opacity: 0,
          y: 20,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
        },
        '-=0.25'
      );
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      timeline.current?.play();
    } else {
      timeline.current?.reverse();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('/#')) {
      e.preventDefault();
      const id = href.substring(2);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        className="relative z-30 flex h-8 w-8 cursor-pointer items-center justify-center"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
      >
        <Menu
          className={clsx(
            'absolute h-6 w-6 transition-all duration-300 ease-out',
            isOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
          )}
        />
        <X
          className={clsx(
            'absolute h-6 w-6 transition-all duration-300 ease-out',
            isOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
          )}
        />
      </button>

      <div
        className="menu-overlay fixed inset-0 z-40 hidden bg-black/30 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      <div
        id="mobile-menu-panel"
        className="mobile-menu fixed left-0 right-0 top-0 z-50 hidden h-screen flex-col border-b border-border bg-background p-6 sm:h-[70vh]"
        role="dialog"
        aria-modal="true"
      >
        <div className="menu-item mb-10 flex items-center justify-between">
          <Logo className="w-40" />
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="rounded-md p-2 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-12 flex flex-grow flex-col items-start space-y-6">
          <Link
            href="/#services"
            className="menu-item font-geometric text-3xl"
            onClick={handleLinkClick}
          >
            {t('services')}
          </Link>
          <Link
            href="/#projects"
            className="menu-item font-geometric text-3xl"
            onClick={handleLinkClick}
          >
            {t('projects')}
          </Link>
          <Link
            href="/#process"
            className="menu-item font-geometric text-3xl"
            onClick={handleLinkClick}
          >
            {t('process')}
          </Link>
          <Link
            href="/blog"
            className="menu-item font-geometric text-3xl"
            onClick={handleLinkClick}
          >
            {t('blog')}
          </Link>
          <Link
            href="/#contact"
            className="menu-item font-geometric text-3xl"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              onContactClick();
            }}
          >
            {t('contact')}
          </Link>
        </div>

        <div className="menu-item space-y-2">
          <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium">{t('theme')}</span>
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium">{t('color')}</span>
            <ColorSelector />
          </div>
          <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium">
              <GlobeIcon className="size-5" />
            </span>
            <div className="flex gap-2">
              {locales.map((lang) => (
                <Link
                  href={pathname}
                  locale={lang.code}
                  key={lang.code}
                  className={clsx(
                    'p-2 text-sm',
                    locale === lang.code && 'font-bold'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {lang.code.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
