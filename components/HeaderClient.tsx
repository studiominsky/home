'use client';

import React, { useEffect, useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import clsx from 'clsx';
import FullWidth from './FullWidth';
import Logo from './Logo';
import { GlobeIcon, MessageCircleIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { ColorSelector } from './ColorSelector';
import type { BlogPostMeta } from '@/types/blog';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

const ContactForm = dynamic(() => import('./ContactForm'), {
  ssr: false,
});

type Props = {
  posts: BlogPostMeta[];
  latest: BlogPostMeta | null;
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string;
    subtitle?: string;
  }
>(({ className, title, subtitle, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || ''}
          ref={ref}
          className={clsx(
            'flex flex-col select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
            'transition-all duration-200 ease-out hover:bg-accent hover:shadow-md hover:scale-[1.02]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            className
          )}
          {...props}
        >
          <div className="text-md font-medium leading-none line-clamp-1">
            {title}
          </div>
          {subtitle ? (
            <p className="line-clamp-2 text-sm leading-snug text-foreground/60">
              {subtitle}
            </p>
          ) : null}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default function HeaderClient({ posts, latest }: Props) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const locales = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
  ];

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <header
      className={clsx(
        'bg-card border-border border-b fixed top-0 left-0 right-0 z-50 flex h-[70px] items-center'
      )}
    >
      <FullWidth>
        <div className="flex h-full w-full items-center justify-between gap-4">
          <Logo className="w-48" />

          <div className="flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/#services"
                    className={navigationMenuTriggerStyle()}
                  >
                    Services
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/#projects"
                    className={navigationMenuTriggerStyle()}
                  >
                    Projects
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/#process"
                    className={navigationMenuTriggerStyle()}
                  >
                    Process
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex gap-3 p-6 md:w-[520px] lg:w-[680px] lg:grid-cols-[.9fr,1fr]">
                      <li className="row-span-3">
                        {latest ? (
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/blog/${latest.slug}`}
                              className={clsx(
                                'group flex h-full w-full flex-col rounded-lg p-3',
                                'transition-all duration-200 ease-out hover:bg-accent hover:shadow-md hover:scale-[1.02]',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                              )}
                            >
                              <div className="text-sm text-muted-foreground">
                                Latest:
                              </div>
                              <h3 className="mt-1 line-clamp-2 text-md font-bold transition-colors group-hover:text-foreground">
                                {latest.title}
                              </h3>
                              <div className="relative mt-3 aspect-[16/10] w-full overflow-hidden rounded-md bg-muted">
                                {latest.coverImage ? (
                                  <Image
                                    src={latest.coverImage}
                                    alt={latest.title}
                                    fill
                                    sizes="(min-width: 1024px) 300px, 220px"
                                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                                    priority={false}
                                  />
                                ) : null}
                              </div>
                              {latest.description ? (
                                <p className="mt-3 line-clamp-3 text-sm leading-snug text-foreground/60">
                                  {latest.description}
                                </p>
                              ) : null}
                            </Link>
                          </NavigationMenuLink>
                        ) : (
                          <div className="p-3 text-sm leading-tight text-muted-foreground">
                            No posts yet.
                          </div>
                        )}
                      </li>
                      <div className="flex flex-col">
                        {posts.map((post) => (
                          <ListItem
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            title={post.title}
                            subtitle={post.description}
                          />
                        ))}
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu viewport={true}>
              <NavigationMenuList>
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
          </div>

          <div className="flex items-center gap-2">
            <NavigationMenu viewport={true}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    <GlobeIcon className="size-5" />
                    <span className="sr-only">Choose language</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {/* 4. This list is now generated dynamically */}
                    <ul className="w-[150px] gap-1 p-2">
                      {locales.map((lang) => (
                        <li
                          key={lang.code}
                          className={clsx(
                            'cursor-pointer rounded-md p-2 text-sm hover:bg-accent',
                            // Adds a style to indicate the currently active language
                            locale === lang.code &&
                              'font-bold bg-accent/50'
                          )}
                          onClick={() =>
                            handleLocaleChange(lang.code)
                          }
                        >
                          {lang.name}
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsContactOpen(true);
              }}
              className={clsx(
                'z-99 m-0 flex max-w-[120px] cursor-pointer items-center justify-center rounded-full bg-background-inverted px-5 py-3 text-center font-sans text-[0.875rem] font-medium leading-[1.25rem] opacity-100 text-card',
                'text-[var(--ds-background-100)]'
              )}
              style={{ letterSpacing: 'initial' }}
            >
              <span>
                <MessageCircleIcon className="mr-1 size-4 text-card" />
              </span>
              Contact
            </Link>
          </div>
        </div>
      </FullWidth>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent
          className={clsx(
            'p-0 md:p-12 sm:max-w-[760px]',
            'max-h-[min(90vh, 1000px)] overflow-y-auto'
          )}
        >
          <div className="flex items-center justify-center px-10 pt-10 md:px-0 md:pt-0">
            <DialogHeader>
              <DialogTitle className="font-geometric text-center text-[32px] md:text-[42px] leading-none">
                Tell us about your project.
              </DialogTitle>
              <DialogDescription className="pt-2 text-center text-base md:text-lg">
                Quick form. Two steps. We’ll reply within 1–2 business
                days.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6 pb-6 md:px-0 md:pb-0">
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
