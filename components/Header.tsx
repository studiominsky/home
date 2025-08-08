'use client';

import React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import clsx from 'clsx';
import FullWidth from './FullWidth';
import Logo from './Logo';
import { GlobeIcon, MessageCircleIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ColorSelector } from './ColorSelector';

const navItems = [
  {
    title: 'Home',
    href: '/',
    description: 'Return to the homepage.',
  },
  {
    title: 'About',
    href: '/about',
    description: 'Learn more about our company.',
  },
  {
    title: 'Services',
    href: '/services',
    description: 'See what we have to offer.',
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch with us.',
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || ''}
          ref={ref}
          className={clsx(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function Header() {
  return (
    <header
      className={clsx(
        'bg-card border-border border-b fixed top-0 left-0 right-0 z-50 flex h-[70px] items-center'
      )}
    >
      <FullWidth>
        <div className="flex h-full w-full items-center justify-between gap-4">
          <Logo className="w-48" />

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components built with
                          Radix UI and Tailwind CSS.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    {navItems.map((item) => (
                      <ListItem
                        key={item.title}
                        href={item.href}
                        title={item.title}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>List</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <ListItem href="#" title="Components">
                      Browse all components in the library.
                    </ListItem>
                    <ListItem href="#" title="Documentation">
                      Learn how to use the library.
                    </ListItem>
                    <ListItem href="#" title="Blog">
                      Read our latest blog posts.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/docs"
                  className={navigationMenuTriggerStyle()}
                >
                  Docs
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  Settings
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <li className="flex items-center justify-between p-2">
                      <span className="text-sm font-medium">
                        Theme
                      </span>
                      <ThemeToggle />
                    </li>
                    <li className="flex items-center justify-between p-2">
                      <span className="text-sm font-medium">
                        Color
                      </span>

                      <ColorSelector />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <GlobeIcon className="size-5" />
                    <span className="sr-only">Choose language</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[150px] gap-1 p-2">
                      <li className="cursor-pointer rounded-md p-2 text-sm hover:bg-accent">
                        English
                      </li>
                      <li className="cursor-pointer rounded-md p-2 text-sm hover:bg-accent">
                        Español
                      </li>
                      <li className="cursor-pointer rounded-md p-2 text-sm hover:bg-accent">
                        Français
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/contact"
              className={clsx(
                'cursor-pointer text-card z-99 max-w-[120px] bg-background-inverted font-sans px-5 py-3 flex items-center justify-center rounded-full text-center',
                'text-[0.875rem] leading-[1.25rem] font-medium opacity-100',
                'text-[var(--ds-background-100)]'
              )}
              style={{
                letterSpacing: 'initial',
              }}
            >
              <span>
                <MessageCircleIcon className="mr-1 size-4 text-card" />
              </span>
              Contact
            </Link>
          </div>
        </div>
      </FullWidth>
    </header>
  );
}
