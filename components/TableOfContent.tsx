'use client';

import { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (location.hash) {
      const hashId = location.hash.slice(1);
      if (ids.includes(hashId)) setActive(hashId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -70% 0px', threshold: [0, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });

    history.replaceState(null, '', `#${id}`);
    setActive(id);
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
                    'mt-0.5 h-5 w-1 rounded-full transition-colors',
                    isActive
                      ? 'bg-primary'
                      : 'bg-transparent group-hover:bg-border'
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
