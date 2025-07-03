'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FullWidth from './FullWidth';
import Link from 'next/link';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const NUM_CIRCLES = 7;
const VB_WIDTH = 4893;
const VB_HEIGHT = 5099;
const INITIAL_CIRCLES = [
  { color: '#D3704A', xPct: 90, yPct: 20, sizeVw: 16, mapsTo: 0 },
  { color: '#B55DE4', xPct: 50, yPct: 25, sizeVw: 16, mapsTo: 3 },
  { color: '#D3704A', xPct: 15, yPct: 100, sizeVw: 8, mapsTo: -1 },
  { color: '#E4BF45', xPct: 70, yPct: 0, sizeVw: 8, mapsTo: 2 },
  { color: '#6090C3', xPct: 88, yPct: 55, sizeVw: 8, mapsTo: 1 },
  { color: '#90C360', xPct: 0, yPct: 30, sizeVw: 8, mapsTo: -1 },
  { color: '#90C360', xPct: 70, yPct: 75, sizeVw: 8, mapsTo: -1 },
];
const FINAL_SHAPES = [
  { x: 2666, y: 2481, width: 2031, height: 2031 },
  { x: 883, y: 3628, width: 1069, height: 1069 },
  { x: 2886, y: 347, width: 1069, height: 1069 },
  { x: 196, y: 586, width: 2031, height: 2031 },
];
const debounce = (func: () => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  };
};

export default function Banner() {
  const mainRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLSpanElement[]>([]);
  const textFullWidthRef = useRef<HTMLDivElement>(null);
  const availabilityRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const component = mainRef.current!;

    const ctx = gsap.context(() => {
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
            background: def.color,
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

        if (childElements.every((el) => el)) {
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

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: 'top top',
          end: '+=60%',
          pin: true,
          scrub: 1.2,
          pinSpacing: true,
        },
      });

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
            <span>Digital products for </span>
            <span>today’s world.</span>
          </span>
          <span className="absolute top-full font-sans mt-2 max-w-2xl text-[21px] leading-[32px] tracking-[-0.03em] text-foreground">
            <div
              ref={availabilityRef}
              className="relative flex items-center gap-2 mb-3 opacity-0"
            >
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
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
                  'cursor-pointer z-99 max-w-[120px] mt-5 text-inverted bg-background-inverted font-sans text-sm font-medium px-8 py-3 flex items-center justify-center rounded-full text-center'
                )}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className={clsx(
                  'cursor-pointer max-w-[120px] z-99 mt-5 text-primary bg-primary-dimmed font-sans text-sm font-bold px-8 py-3 flex items-center justify-center rounded-full text-center'
                )}
              >
                Details
              </Link>
            </span>
          </span>
        </div>
      </FullWidth>
    </section>
  );
}
