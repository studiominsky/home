'use client';

import React from 'react';
import Container from './Container';
import Link from 'next/link';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const navItems = [
  // This is for the first dropdown, keeping as is.
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

// Re-usable ListItem component for navigation dropdowns
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
      <NavigationMenuLink asChild>
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
      </NavigationMenuLink>
    </li>
  );
}

export default function Header() {
  return (
    <header className="fixed flex top-0 left-0 right-0 z-50 h-[80px] ">
      <Container>
        <div className="flex h-full items-center justify-between gap-4 w-full">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={140}
              height={40}
              className="inline-block"
            />
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with
                            Radix UI and Tailwind CSS.
                          </p>
                        </Link>
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
            </NavigationMenuList>
          </NavigationMenu>

          <div>
            <button className="px-6 py-2 bg-[#83cc29] flex items-center justify-center text-black text-sm rounded-lg hover:bg-green-700 transition-colors text-center">
              Contact
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}
