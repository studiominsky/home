import * as React from 'react';
import * as MenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const glassPane =
  'bg-[#86868637]/65 backdrop-blur-[14px] backdrop-saturate-[180%] ring-transparent';

function Menu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <MenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'group/navigation-menu relative flex max-w-max flex-1 items-center justify-center rounded-xl',
        glassPane,
        className
      )}
      {...props}
    >
      {children}
      <MenuIndicator />
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
      className={cn('relative', className)}
      {...props}
    />
  );
}

const MenuTriggerStyle = cn(
  'group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium text-white',
  'bg-transparent',
  'transition-[color,background,box-shadow,transform] duration-300 ease-out',
  'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none',
  'disabled:pointer-events-none disabled:opacity-50',
  'rounded-none first:rounded-l-xl last:rounded-r-xl'
);

function MenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Trigger>) {
  return (
    <MenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(MenuTriggerStyle, className)}
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
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Content>) {
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
    />
  );
}

function MenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Viewport>) {
  return (
    <div
      className={cn(
        'absolute top-full left-0 isolate z-50 flex justify-center'
      )}
    >
      <MenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={cn(
          glassPane,
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
  return (
    <MenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        'flex flex-col gap-1 p-2 text-sm transition-all',
        'focus:bg-white/6 data-[active=true]:bg-white/8',
        'text-black',
        'focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none',
        "[&_svg:not([class*='text-'])]:text-white/70 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function MenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof MenuPrimitive.Indicator>) {
  return (
    <MenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={cn(
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        'data-[state=visible]:animate-in data-[state=hidden]:animate-out',
        'data-[state=hidden]:fade-out data-[state=visible]:fade-in',
        className
      )}
      {...props}
    >
      <div className="bg-white/15 ring-1 ring-inset ring-white/25 relative top-[60%] h-2 w-2 rotate-45" />
    </MenuPrimitive.Indicator>
  );
}

export {
  Menu,
  MenuList,
  MenuItem,
  MenuContent,
  MenuTrigger,
  MenuLink,
  MenuIndicator,
  MenuViewport,
  MenuTriggerStyle,
};
