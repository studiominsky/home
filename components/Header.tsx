'use client';

import React from 'react';
import FullWidth from './FullWidth';
import Link from 'next/link';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuLink,
  MenuList,
  MenuTrigger,
  MenuTriggerStyle,
} from '@/components/Menu';
import clsx from 'clsx';
import { useHeaderStyle } from '@/contexts/HeaderStyleContext';
import Logo from './Logo';
import { GlobeIcon } from 'lucide-react';

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

function ListItem({
  title,
  children,
  href,
}: React.ComponentPropsWithoutRef<'a'> & {
  title: string;
  href: string;
}) {
  return (
    <li>
      <MenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </MenuLink>
    </li>
  );
}

export default function Header() {
  const { style } = useHeaderStyle();

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 flex h-[80px] items-center transition-all duration-300',
        {
          'bg-transparent text-white': style === 'dark',
          'text-black': style === 'light',
        }
      )}
    >
      <FullWidth>
        <div className="flex h-full w-full items-center justify-between gap-4">
          <Logo className="w-48" />

          <Menu>
            <MenuList
              className={clsx({
                'text-white': style === 'dark',
                'text-neutral-700': style === 'light',
              })}
            >
              <MenuItem>
                <MenuTrigger>Home</MenuTrigger>
                <MenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <MenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with
                            Radix UI and Tailwind CSS.
                          </p>
                        </Link>
                      </MenuLink>
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
                </MenuContent>
              </MenuItem>

              <MenuItem>
                <MenuTrigger>List</MenuTrigger>
                <MenuContent>
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
                </MenuContent>
              </MenuItem>
              <MenuItem>
                <MenuLink className={MenuTriggerStyle}>Docs</MenuLink>
              </MenuItem>
            </MenuList>
          </Menu>

          <div className="flex items-center gap-4">
            <Menu transparent={true}>
              <MenuList>
                <MenuItem className="bg-transparent">
                  <MenuTrigger
                    className={clsx('bg-transparent h-10 w-10 p-0', {
                      'border-white/20 hover:bg-white/10':
                        style === 'dark',
                      'border-black/10 hover:bg-black/5':
                        style === 'light',
                    })}
                  >
                    <GlobeIcon className="size-5" />
                    <span className="sr-only">Choose language</span>
                  </MenuTrigger>
                  <MenuContent>
                    <ul className="w-[150px] gap-1 p-2">
                      <li className="cursor-pointer rounded-md p-2 text-sm hover:bg-neutral-100">
                        English
                      </li>
                      <li className="cursor-pointer rounded-md p-2 text-sm hover:bg-neutral-100">
                        Español
                      </li>
                      <li className="cursor-pointer rounded-md p-2 text-sm hover:bg-neutral-100">
                        Français
                      </li>
                    </ul>
                  </MenuContent>
                </MenuItem>
              </MenuList>
            </Menu>

            <button
              className={clsx(
                'cursor-pointer font-sans text-md font-medium px-6 py-2 flex items-center justify-center rounded-lg transition-colors text-center',
                {
                  'bg-[#83cc29] text-black hover:bg-[#7da251]':
                    style === 'light',
                  'bg-white text-black hover:bg-neutral-200':
                    style === 'dark',
                }
              )}
            >
              Contact
            </button>
          </div>
        </div>
      </FullWidth>
    </header>
  );
}
