'use client';

import { useTheme } from 'next-themes';
import Image, { type ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

interface ThemedImageProps extends Omit<ImageProps, 'src'> {
  srcLight: string;
  srcDark: string;
}

export function ThemedImage({
  srcLight,
  srcDark,
  ...props
}: ThemedImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Image src={srcLight} {...props} alt="Project Logo" />;
  }

  const src = resolvedTheme === 'dark' ? srcDark : srcLight;

  return <Image src={src} {...props} alt="Project Logo" />;
}
