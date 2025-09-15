'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [currentHash, setCurrentHash] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const scrollToIdRef = useRef<string | null>(null);
  const scrollPosRef = useRef<number>(0);

  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const updateHash = () => {
      if (typeof window === 'undefined') return;
      setCurrentHash(window.location.hash.replace(/^#/, ''));
    };
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, [pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const menu = document.querySelector(
        '.mobile-menu'
      ) as HTMLElement | null;
      const overlay = document.querySelector(
        '.menu-overlay'
      ) as HTMLElement | null;
      const links = gsap.utils.toArray<HTMLElement>(
        '.mobile-menu a.menu-item, .mobile-menu div.menu-item'
      );
      if (!menu || !overlay) return;

      gsap.set(menu, {
        yPercent: -100,
        autoAlpha: 0,
        display: 'none',
      });
      gsap.set(overlay, { autoAlpha: 0, display: 'none' });
      gsap.set(links, { clearProps: 'all' });

      const tl = gsap
        .timeline({
          paused: true,
          onStart: () => {
            gsap.set(menu, { display: 'flex' });
            gsap.set(overlay, { display: 'block' });
          },
          onReverseComplete: () => {
            gsap.set(menu, { display: 'none', yPercent: -100 });
            gsap.set(overlay, { display: 'none' });
            gsap.set(links, { clearProps: 'all' });
            document.body.style.overflow = '';

            if (scrollToIdRef.current) {
              const id = scrollToIdRef.current;
              scrollToIdRef.current = null;

              history.pushState(null, '', `#${id}`);
              const el = document.getElementById(id);
              if (el)
                el.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
            } else {
              window.scrollTo(0, scrollPosRef.current);
            }
          },
        })
        .to(
          overlay,
          { autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
          0
        )
        .to(
          menu,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.4,
            ease: 'expo.out',
          },
          0
        )
        .set(
          links,
          {
            opacity: 0,
            y: 16,
            filter: 'blur(4px)',
            pointerEvents: 'none',
          },
          0
        )
        .to(
          links,
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 0.5,
            ease: 'expo.out',
            stagger: 0.05,
          },
          0.15
        );

      tlRef.current = tl;
    }, containerRef);

    setIsOpen(false);

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
      ctx.revert();
    };
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      scrollPosRef.current = window.scrollY || 0;
      document.body.style.overflow = 'hidden';
      tlRef.current?.play(0);
    } else {
      tlRef.current?.reverse();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const rawHref = e.currentTarget.getAttribute('href') || '';
    const url = new URL(rawHref, window.location.origin);
    const samePage = url.pathname === window.location.pathname;
    const hash = url.hash.replace(/^#/, '');

    if (samePage && hash) {
      e.preventDefault();
      scrollToIdRef.current = hash;
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        className="relative z-50 flex h-8 w-8 cursor-pointer items-center justify-center"
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
        className="mobile-menu fixed left-0 right-0 top-0 z-40 hidden h-dvh flex-col overflow-y-auto border-b border-border bg-background p-6"
        role="dialog"
        aria-modal="true"
      >
        <div className="menu-item mb-10 flex items-center justify-between">
          <Logo className="w-40" />
        </div>

        <div className="mt-12 flex flex-grow flex-col items-start space-y-6">
          <Link
            href={{ pathname: '/', hash: 'services' }}
            className="menu-item font-geometric text-3xl transition-transform duration-300 ease-out hover:translate-x-2"
            onClick={handleLinkClick}
          >
            {t('services')}
          </Link>
          <Link
            href={{ pathname: '/', hash: 'projects' }}
            className="menu-item font-geometric text-3xl transition-transform duration-300 ease-out hover:translate-x-2"
            onClick={handleLinkClick}
          >
            {t('projects')}
          </Link>
          <Link
            href={{ pathname: '/', hash: 'process' }}
            className="menu-item font-geometric text-3xl transition-transform duration-300 ease-out hover:translate-x-2"
            onClick={handleLinkClick}
          >
            {t('process')}
          </Link>
          <Link
            href="/blog"
            className="menu-item font-geometric text-3xl transition-transform duration-300 ease-out hover:translate-x-2"
            onClick={handleLinkClick}
          >
            {t('blog')}
          </Link>
          <Link
            href={{ pathname: '/', hash: 'contact' }}
            className="menu-item font-geometric text-3xl transition-transform duration-300 ease-out hover:translate-x-2"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              onContactClick();
            }}
          >
            {t('contact')}
          </Link>
        </div>

        <div className="menu-item mt-auto space-y-2">
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
              {[
                { code: 'en', name: 'English' },
                { code: 'de', name: 'Deutsch' },
              ].map((lang) => (
                <Link
                  key={lang.code}
                  href={{ pathname, hash: currentHash || undefined }}
                  locale={lang.code}
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
