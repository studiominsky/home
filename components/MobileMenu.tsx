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

    gsap.set(menu, { yPercent: -100, autoAlpha: 0 });
    gsap.set(overlay, { autoAlpha: 0 });

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
        { autoAlpha: 1, duration: 0.4, ease: 'power2.out' },
        0
      )
      .to(
        menu,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power2.out',
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
        '-=0.3'
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
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        className="relative z-50 flex h-8 w-8 items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <Menu
          className={clsx(
            'absolute h-6 w-6 transition-all duration-300 ease-in-out',
            isOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
          )}
        />
        <X
          className={clsx(
            'absolute h-6 w-6 transition-all duration-300 ease-in-out',
            isOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'
          )}
        />
      </button>

      <div
        className="menu-overlay fixed inset-0 bg-black/30 backdrop-blur-sm z-30 hidden"
        onClick={() => setIsOpen(false)}
      />

      <div className="mobile-menu fixed top-0 left-0 right-0 h-screen sm:h-[70vh] bg-background z-40 hidden flex-col border-b border-border p-6">
        <div className="flex justify-between items-center mb-10 menu-item">
          <Logo className="w-40" />
        </div>

        <div className="flex flex-col items-start flex-grow space-y-6 mt-20">
          <Link
            href="/#services"
            className="menu-item text-3xl font-geometric"
            onClick={handleLinkClick}
          >
            {t('services')}
          </Link>
          <Link
            href="/#projects"
            className="menu-item text-3xl font-geometric"
            onClick={handleLinkClick}
          >
            {t('projects')}
          </Link>
          <Link
            href="/#process"
            className="menu-item text-3xl font-geometric"
            onClick={handleLinkClick}
          >
            {t('process')}
          </Link>
          <Link
            href="/blog"
            className="menu-item text-3xl font-geometric"
            onClick={handleLinkClick}
          >
            {t('blog')}
          </Link>
          <Link
            href="/#contact"
            className="menu-item text-3xl font-geometric"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              onContactClick();
            }}
          >
            {t('contact')}
          </Link>
        </div>
        <div className="space-y-2 menu-item">
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
