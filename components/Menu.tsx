'use client';

import * as React from 'react';
import * as MenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';

function Menu({
  className,
  children,
  viewport = true,
  transparent = false,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Root> & {
  viewport?: boolean;
  transparent?: boolean;
}) {
  const { style } = useHeaderStyle();

  return (
    <MenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'group/navigation-menu relative flex max-w-max items-center rounded-xl',
        !transparent && [
          'backdrop-blur-[14px] backdrop-saturate-[180%]',
          {
            'bg-grayscale-06/35': style === 'dark',
            'bg-[#e3e3e3]/50': style === 'light',
          },
        ],
        'overflow-visible',
        className
      )}
      {...props}
    >
      {children}

      {viewport && <MenuViewport />}
    </MenuPrimitive.Root>
  );
}

function MenuList({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.List>) {
  return (
    <MenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        'flex list-none items-center justify-center',
        className
      )}
      {...props}
    />
  );
}

function MenuItem({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Item>) {
  return (
    <MenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative ', className)}
      {...props}
    />
  );
}

const MenuTriggerStyle = cn(
  'group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium',
  'bg-transparent',
  'transition-colors duration-300 ease-out',
  'focus-visible:ring-2 focus-visible:ring-current/40 focus-visible:outline-none',
  'disabled:pointer-events-none disabled:opacity-50',
  'rounded-none first:rounded-l-xl last:rounded-r-xl'
);

function MenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Trigger>) {
  const { style } = useHeaderStyle();

  return (
    <MenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        'cursor-pointer  group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-md font-medium',
        'transition-[color,background,box-shadow,transform] duration-300 ease-out',
        'focus-visible:ring-2 focus-visible:ring-current/40 focus-visible:outline-none',
        'disabled:pointer-events-none disabled:opacity-50',
        'rounded-none first:rounded-l-xl last:rounded-r-xl',
        {
          'bg-transparent hover:bg-white/10': style === 'dark',
          'bg-transparent hover:bg-black/5': style === 'light',
        },
        className
      )}
      {...props}
    >
      {children}{' '}
      <ChevronDownIcon
        className="relative top-[1px] ml-1 size-3 transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </MenuPrimitive.Trigger>
  );
}

function MenuContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Content> & {
  children?: React.ReactNode;
}) {
  return (
    <MenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out',
        'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52',
        'data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52',
        'top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto',
        'bg-white text-black rounded-2xl overflow-hidden duration-200',
        '*:data-[slot=navigation-menu-link]:focus:ring-0 *:data-[slot=navigation-menu-link]:focus:outline-none',
        className
      )}
      {...props}
    >
      {children}
    </MenuPrimitive.Content>
  );
}

function MenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Viewport>) {
  const { style } = useHeaderStyle();

  return (
    <div
      className={cn(
        'absolute top-full left-0 isolate z-50 flex justify-center'
      )}
    >
      <MenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          'backdrop-blur-[14px] backdrop-saturate-[180%]',
          {
            'bg-[#86868637]/65': style === 'dark',
            'bg-white/80': style === 'light',
          },

          'origin-top-center data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
          'relative mt-1.5 overflow-hidden rounded-2xl',
          'h-[var(--radix-navigation-menu-viewport-height)] w-full md:w-[var(--radix-navigation-menu-viewport-width)]',
          className
        )}
        {...props}
      />
    </div>
  );
}

function MenuLink({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Link>) {
  const { style } = useHeaderStyle();
  return (
    <MenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        'cursor-pointer  flex flex-col gap-1 p-2 text-sm transition-all',
        'focus:bg-black/5 data-[active=true]:bg-black/8',

        {
          'bg-[#86868637]/65': style === 'dark',
          'bg-white/80': style === 'light',
        },
        'focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-none',
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

export {
  Menu,
  MenuList,
  MenuItem,
  MenuContent,
  MenuTrigger,
  MenuLink,
  MenuViewport,
  MenuTriggerStyle,
};
