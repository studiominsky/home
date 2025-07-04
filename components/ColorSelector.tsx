'use client';

import { CheckIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '@/providers/theme-provider';

type ColorTheme = 'orange' | 'green' | 'blue' | 'purple';

const colors = [
  { name: 'orange', class: 'bg-[#f07d2b]' },
  { name: 'green', class: 'bg-[#90c360]' },
  { name: 'blue', class: 'bg-[#4994d5]' },
  { name: 'purple', class: 'bg-[#a956d5]' },
];

export function ColorSelector() {
  const { colorTheme, setColorTheme } = useTheme();

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
