'use client';

import { useEffect, useRef } from 'react';

type Props = {
  html: string;
  headings: string[];
};

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export default function PostContent({ html, headings }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const nodes = ref.current.querySelectorAll(
      'h1, h2, h3, h4, h5, h6'
    );
    nodes.forEach((node, i) => {
      const label =
        headings[i] || node.textContent || `section-${i + 1}`;
      const id = slugify(label);
      node.setAttribute('id', id);
      (node as HTMLElement).style.scrollMarginTop = '100px';
    });
  }, [html, headings]);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
