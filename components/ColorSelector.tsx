'use client';

import { CheckIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '@/providers/theme-provider';
import { useEffect, useState } from 'react';

type ColorTheme = 'orange' | 'green' | 'blue' | 'purple';

const colors = [
  { name: 'orange', hex: '#D3704A', class: 'bg-[#D3704A]' },
  { name: 'green', hex: '#90C360', class: 'bg-[#90C360]' },
  { name: 'blue', hex: '#6090C3', class: 'bg-[#6090C3]' },
  { name: 'purple', hex: '#B55DE4', class: 'bg-[#B55DE4]' },
];

export function ColorSelector() {
  const { colorTheme, setColorTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color.name}
          title={
            color.name.charAt(0).toUpperCase() + color.name.slice(1)
          }
          onClick={() => setColorTheme(color.name as ColorTheme)}
          className={clsx(
            'flex size-5 items-center justify-center rounded-full border-2 transition-all',
            color.class,
            colorTheme === color.name
              ? 'border-primary'
              : 'border-transparent'
          )}
        >
          {colorTheme === color.name && (
            <CheckIcon className="size-4 text-white" />
          )}
          <span className="sr-only">{color.name}</span>
        </button>
      ))}
    </div>
  );
}
