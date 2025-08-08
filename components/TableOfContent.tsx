'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

type Props = {
  headings: string[];
  title?: string;
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function TableOfContents({
  headings,
  title = 'On this page',
}: Props) {
  const [active, setActive] = useState<string | null>(null);
  const ids = useMemo(
    () => headings.map((h) => slugify(h)),
    [headings]
  );

  const elementsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const clickLockRef = useRef<number | null>(null);

  const pickCurrentId = () => {
    const els = elementsRef.current;
    if (!els.length) return null;

    const TOP_OFFSET = 100;
    let bestId: string | null = null;
    let bestDist = Infinity;

    for (const el of els) {
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top - TOP_OFFSET);
      if (dist < bestDist) {
        bestDist = dist;
        bestId = el.id;
      }
    }
    return bestId;
  };

  useEffect(() => {
    if (!ids.length) return;

    elementsRef.current = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (location.hash) {
      const hashId = location.hash.slice(1);
      if (ids.includes(hashId)) {
        setActive(hashId);
        clickLockRef.current = performance.now() + 600;
      }
    }

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (
          clickLockRef.current &&
          performance.now() < clickLockRef.current
        )
          return;

        const current = pickCurrentId();
        if (current && current !== active) setActive(current);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    clickLockRef.current = performance.now() + 700;
    setActive(id);

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });

    history.replaceState(null, '', `#${id}`);
    window.setTimeout(() => {
      if (
        clickLockRef.current &&
        performance.now() >= clickLockRef.current
      ) {
        clickLockRef.current = null;
      }
    }, 1500);
  };

  if (!headings?.length) return null;

  return (
    <aside
      className="hidden lg:block sticky top-[100px] self-start max-h-[70vh] overflow-auto pr-6"
      aria-label="Table of contents"
    >
      <h2 className="mb-3 text-start text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>

      <ol className="space-y-1">
        {headings.map((h, idx) => {
          const id = ids[idx];
          const isActive = active === id;

          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={handleClick(id)}
                className={clsx(
                  'group flex items-start gap-3 rounded-md px-2 py-2 transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'bg-muted/50 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                )}
              >
                <span
                  className={clsx(
                    'mt-1 h-2.5 w-2.5 rounded-full ring-1 transition-all',
                    isActive
                      ? 'bg-primary ring-primary/30'
                      : 'bg-transparent ring-border group-hover:bg-border'
                  )}
                  aria-hidden
                />
                <span
                  className={clsx(
                    'font-mono tabular-nums text-sm leading-5 w-6 text-right shrink-0',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {idx + 1}.
                </span>
                <span className="text-[0.95rem] leading-5">{h}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
