'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FullWidth from './FullWidth';
import Link from 'next/link';
import clsx from 'clsx';
import { MessageCircleIcon } from 'lucide-react';
import { useTheme } from '@/providers/theme-provider';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const NUM_CIRCLES = 7;
const VB_WIDTH = 4893;
const VB_HEIGHT = 5099;

const INITIAL_CIRCLES = [
  { color: '#D3704A', xPct: 90, yPct: 20, sizeVw: 16, mapsTo: 0 },
  { color: '#90C360', xPct: 50, yPct: 25, sizeVw: 16, mapsTo: 3 },
  { color: '#90C360', xPct: 15, yPct: 100, sizeVw: 8, mapsTo: -1 },
  { color: '#B55DE4', xPct: 70, yPct: 0, sizeVw: 8, mapsTo: 2 },
  { color: '#6090C3', xPct: 88, yPct: 55, sizeVw: 8, mapsTo: 1 },
  { color: '#D3704A', xPct: 0, yPct: 30, sizeVw: 8, mapsTo: -1 },
  { color: '#B55DE4', xPct: 70, yPct: 75, sizeVw: 8, mapsTo: -1 },
];

const FINAL_SHAPES = [
  { x: 2666, y: 2481, width: 2031, height: 2031 },
  { x: 883, y: 3628, width: 1069, height: 1069 },
  { x: 2886, y: 347, width: 1069, height: 1069 },
  { x: 196, y: 586, width: 2031, height: 2031 },
];

const THEME_COLORS = [
  { name: 'orange', hex: '#D3704A' },
  { name: 'green', hex: '#90C360' },
  { name: 'blue', hex: '#6090C3' },
  { name: 'purple', hex: '#B55DE4' },
];

const debounce = (func: () => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

export default function Banner() {
  const { colorTheme } = useTheme();
  const t = useTranslations('Home');

  const prevColorTheme = useRef<string | null>(null);
  const pulseAnimation = useRef<gsap.core.Tween | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLSpanElement[]>([]);
  const textFullWidthRef = useRef<HTMLDivElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prevColorTheme.current === null) {
      prevColorTheme.current = colorTheme ?? null;
      return;
    }

    if (prevColorTheme.current === colorTheme) return;

    const selectedColor = THEME_COLORS.find(
      (c) => c.name === colorTheme
    );
    const targets = circlesRef.current;

    if (selectedColor && targets.length > 0) {
      if (pulseAnimation.current) {
        pulseAnimation.current.kill();
        pulseAnimation.current = null;
      }

      targets.forEach((el, i) => {
        gsap.set(el, {
          backgroundColor: INITIAL_CIRCLES[i].color,
          scale: 1,
        });
      });

      pulseAnimation.current = gsap.to(targets, {
        backgroundColor: selectedColor.hex,
        scale: 1.25,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1,
      });
    }

    prevColorTheme.current = colorTheme ?? null;
  }, [colorTheme]);

  useLayoutEffect(() => {
    const component = mainRef.current!;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 1.5,
          pinSpacing: true,
        },
      });

      const buildAnimation = () => {
        const childElements = [
          availabilityRef.current,
          descriptionRef.current,
          buttonsRef.current,
        ];

        gsap.killTweensOf([
          circlesRef.current,
          textFullWidthRef.current,
          ...childElements,
        ]);

        scrollTl.clear();

        const { width: Cw, height: Ch } =
          component.getBoundingClientRect();
        const scale = (Cw * 0.4875) / VB_WIDTH;
        const finalShapeWidth = VB_WIDTH * scale;
        const finalShapeHeight = VB_HEIGHT * scale;
        const PADDING = 45;
        const offsetX = Cw - finalShapeWidth - PADDING;
        const offsetY = Ch - finalShapeHeight - PADDING;

        const extras = [
          { x: -0.05 * Cw, y: 0.7 * Ch, size: 0.16 * Cw },
          { x: 0.3 * Cw, y: 0.0 * Ch, size: 0.12 * Cw },
          { x: 0.4 * Cw, y: 1.0 * Ch, size: 0.12 * Cw },
        ];

        let extraIdx = 0;
        circlesRef.current.forEach((el, i) => {
          const def = INITIAL_CIRCLES[i];
          const initX = (def.xPct / 100) * Cw;
          const initY = (def.yPct / 100) * Ch;
          const initSize = (def.sizeVw / 100) * Cw;

          gsap.set(el, {
            width: initSize,
            height: initSize,
            x: initX,
            y: initY,
            backgroundColor: def.color,
            borderRadius: '50%',
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0,
          });

          gsap.to(el, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2 + i * 0.1,
          });

          let finalX: number, finalY: number, finalSize: number;
          if (def.mapsTo > -1) {
            const shape = FINAL_SHAPES[def.mapsTo];
            finalX = offsetX + (shape.x + shape.width / 2) * scale;
            finalY = offsetY + (shape.y + shape.height / 2) * scale;
            finalSize = shape.width * scale;
          } else {
            const e = extras[extraIdx++];
            finalX = e.x;
            finalY = e.y;
            finalSize = e.size;
          }

          scrollTl.to(
            el,
            {
              x: finalX,
              y: finalY,
              width: finalSize,
              height: finalSize,
              ease: 'power3.inOut',
              xPercent: -50,
              yPercent: -50,
            },
            0
          );
        });

        if (textFullWidthRef.current) {
          const finalTopPadding = 250;
          const textBlockHeight =
            textFullWidthRef.current.offsetHeight;
          const initialBottomOffset = 10;
          const yTravelDistance =
            Ch -
            textBlockHeight -
            initialBottomOffset -
            finalTopPadding;

          gsap.set(textFullWidthRef.current, { y: 0, opacity: 1 });
          scrollTl.to(
            textFullWidthRef.current,
            { y: -yTravelDistance, ease: 'power3.inOut' },
            0
          );
        }

        if (childElements.every(Boolean)) {
          scrollTl.fromTo(
            childElements,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              ease: 'power3.out',
              stagger: 0.2,
            },
            0.2
          );
        }

        ScrollTrigger.refresh();
      };

      buildAnimation();

      const debouncedBuild = debounce(buildAnimation, 250);
      window.addEventListener('resize', debouncedBuild);

      return () => {
        window.removeEventListener('resize', debouncedBuild);
        scrollTl.kill();
      };
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={mainRef}
      className="relative h-screen min-h-screen w-full overflow-hidden border-b border-border"
    >
      <div className="bg-grid absolute inset-0 pointer-events-none overflow-hidden" />
      <div className="absolute inset-0">
        {Array.from({ length: NUM_CIRCLES }).map((_, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) circlesRef.current[i] = el;
            }}
            className="absolute top-0 left-0"
          />
        ))}
      </div>

      <FullWidth>
        <div
          ref={textFullWidthRef}
          className="absolute bottom-10 flex w-[70%] flex-col text-foreground"
        >
          <span className="font-geometric text-[100px] leading-[1.25] flex flex-col">
            <span> {t('title')} </span>
          </span>

          <span className="absolute top-full font-sans mt-2 max-w-2xl text-[21px] leading-[32px] tracking-[-0.03em] text-foreground">
            <div
              ref={availabilityRef}
              className="relative flex items-center gap-2 mb-3 opacity-0"
            >
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-positive"></span>
              </span>
              <span className="font-mono text-sm">
                Available for new projects
              </span>
            </div>

            <p
              ref={descriptionRef}
              className="tracking-[0] text-[21px] leading-[35px] opacity-0"
            >
              Studio Minsky builds the digital tools that drive
              business growth. From websites that turn visitors into
              customers, to custom software that streamlines your
              operations, every product is designed to increase your
              impact and efficiency.
            </p>

            <span ref={buttonsRef} className="flex gap-4 opacity-0">
              <Link
                href="/contact"
                className={clsx(
                  'cursor-pointer text-card z-99 max-w-[120px] mt-5 bg-background-inverted font-sans px-8 py-1 flex items-center justify-center rounded-full text-center',
                  'text-[0.875rem] leading-[1.25rem] font-medium opacity-100',
                  'text-[var(--ds-background-100)]'
                )}
                style={{ letterSpacing: 'initial' }}
              >
                <span>
                  <MessageCircleIcon className="mr-1 size-4 text-card" />
                </span>
                Contact
              </Link>

              <Link
                href="/contact"
                className={clsx(
                  'cursor-pointer max-w-[120px] z-99 mt-5 bg-transparent text-foreground border font-medium font-sans px-8 py-3 flex items-center justify-center rounded-full text-center',
                  'text-[0.875rem] leading-[1.25rem] font-medium opacity-100',
                  'text-[var(--ds-background-100)]'
                )}
                style={{ letterSpacing: 'initial' }}
              >
                Services
              </Link>
            </span>
          </span>
        </div>
      </FullWidth>
    </section>
  );
}
