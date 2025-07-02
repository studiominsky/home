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
import { GlobeIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

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
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <span
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
        </span>
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
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with
                            Radix UI and Tailwind CSS.
                          </p>
                        </span>
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
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                >
                  Docs
                </NavigationMenuLink>
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
                'cursor-pointer font-sans text-md font-medium px-6 py-2 flex items-center justify-center rounded-lg transition-colors text-center bg-primary text-primary-foreground hover:bg-primary/90'
              )}
            >
              Contact
            </Link>
          </div>
        </div>
      </FullWidth>
    </header>
  );
}
