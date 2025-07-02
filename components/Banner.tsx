'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FullWidth from './FullWidth';

gsap.registerPlugin(ScrollTrigger);

const NUM_CIRCLES = 7;
const VB_WIDTH = 4893;
const VB_HEIGHT = 5099;
const INITIAL_CIRCLES = [
  { color: '#D3704A', xPct: 90, yPct: 20, sizeVw: 16, mapsTo: 0 },
  { color: '#B55DE4', xPct: 50, yPct: 25, sizeVw: 16, mapsTo: 3 },
  { color: '#D3704A', xPct: 15, yPct: 100, sizeVw: 8, mapsTo: -1 },
  { color: '#E4BF45', xPct: 70, yPct: 0, sizeVw: 8, mapsTo: 2 },
  { color: '#549ADB', xPct: 88, yPct: 55, sizeVw: 8, mapsTo: 1 },
  { color: '#83CC29', xPct: 0, yPct: 30, sizeVw: 8, mapsTo: -1 },
  { color: '#83CC29', xPct: 70, yPct: 75, sizeVw: 8, mapsTo: -1 },
];
const FINAL_SHAPES = [
  { x: 2666, y: 2481, width: 2031, height: 2131 },
  { x: 883, y: 3628, width: 1069, height: 1123 },
  { x: 2886, y: 347, width: 1069, height: 1123 },
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
  const pRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const FullWidth = mainRef.current!;

    const ctx = gsap.context(() => {
      const buildAnimation = () => {
        gsap.killTweensOf(circlesRef.current);
        if (textFullWidthRef.current) {
          gsap.killTweensOf(textFullWidthRef.current);
        }
        if (pRef.current) {
          gsap.killTweensOf(pRef.current);
        }

        tl.clear();

        const { width: Cw, height: Ch } =
          FullWidth.getBoundingClientRect();
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

          tl.to(
            textFullWidthRef.current,
            { y: -yTravelDistance, ease: 'power2.inOut' },
            0
          );
        }

        if (pRef.current) {
          gsap.set(pRef.current, { y: 15 });

          tl.to(
            pRef.current,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
            },
            0.2
          );
        }

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
            duration: 0.6,
            ease: 'power2.out',
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
          tl.to(
            el,
            {
              x: finalX,
              y: finalY,
              width: finalSize,
              height: finalSize,
              ease: 'power2.inOut',
              xPercent: -50,
              yPercent: -50,
            },
            0
          );
        });
        ScrollTrigger.refresh();
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: FullWidth,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 0.05,
        },
      });

      buildAnimation();

      const debouncedBuild = debounce(buildAnimation, 250);
      window.addEventListener('resize', debouncedBuild);
      return () => {
        window.removeEventListener('resize', debouncedBuild);
      };
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={mainRef}
      className="relative h-screen min-h-screen w-full overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" />
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

          <p
            ref={pRef}
            className="absolute top-full font-sans mt-6 max-w-2xl text-[21px] leading-[32px] tracking-[-0.03em] text-foreground"
            style={{ opacity: 0 }}
          >
            Studio Minsky builds the digital tools that drive business
            growth. From websites that turn visitors into customers,
            to custom software that streamlines your operations, every
            product is designed to increase your impact and
            efficiency. Automated chatbots engage your audience 24/7,
            while clear data visualizations empower you to make
            smarter, data-driven decisions.
          </p>
        </div>
      </FullWidth>
    </section>
  );
}
