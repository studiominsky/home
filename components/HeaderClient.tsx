'use client';

import React, { useEffect, useState } from 'react';
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

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, Link } from '@/i18n/navigation';
import MobileMenu from './MobileMenu';

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
            'transition-all duration-200 ease-out hover:bg-accent hover:scale-[1.02]',
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

  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();

  const locales = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
  ];

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
        'bg-background border-border border-b fixed top-0 left-0 right-0 z-30 flex h-[70px] items-center'
      )}
    >
      <FullWidth>
        <div className="flex h-full w-full items-center justify-between gap-4">
          <Logo className="w-48" />

          <div className="hidden lg:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/#services"
                    className={navigationMenuTriggerStyle()}
                  >
                    {t('services')}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/#projects"
                    className={navigationMenuTriggerStyle()}
                  >
                    {t('projects')}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/#process"
                    className={navigationMenuTriggerStyle()}
                  >
                    {t('process')}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {t('blog')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex gap-3 p-6 md:w-[520px] lg:w-[680px] lg:grid-cols-[.9fr,1fr]">
                      <li className="row-span-3">
                        {latest ? (
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/blog/${latest.slug}`}
                              className={clsx(
                                'group flex h-full w-full flex-col rounded-lg p-3',
                                'transition-all duration-200 ease-out hover:bg-accent hover:scale-[1.02]',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                              )}
                            >
                              <div className="text-sm text-muted-foreground">
                                {t('latest')}:
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
                            {t('noPostsYet')}
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
                    <div className="mt-auto relative bottom-10 right-5 flex justify-end">
                      <Link
                        href="/blog"
                        className={clsx(
                          'cursor-pointer text-card z-99 max-w-[230px] bg-background-inverted font-sans px-4 py-2 flex items-center justify-center rounded-full text-center',
                          'text-[0.875rem] leading-[1.25rem] font-medium opacity-100',
                          'text-[var(--ds-background-100)] transition-transform hover:scale-105'
                        )}
                        style={{
                          letterSpacing: 'initial',
                        }}
                      >
                        See all articles
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu viewport={true}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {t('settings')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4">
                      <li className="flex items-center justify-between p-2">
                        <span className="text-sm font-medium">
                          {t('theme')}
                        </span>
                        <ThemeToggle />
                      </li>
                      <li className="flex items-center justify-between p-2">
                        <span className="text-sm font-medium">
                          {t('color')}
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
            <div className="hidden lg:flex">
              <NavigationMenu viewport={true}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      <GlobeIcon className="size-5" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[150px] gap-1 p-2">
                        {locales.map((lang) => (
                          <li key={lang.code}>
                            <Link
                              href={pathname}
                              locale={lang.code}
                              className={clsx(
                                'block cursor-pointer rounded-md p-2 text-sm hover:bg-accent',
                                locale === lang.code &&
                                  'font-bold bg-accent/50'
                              )}
                            >
                              {lang.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <Link
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsContactOpen(true);
              }}
              className={clsx(
                'z-99 m-0 flex max-w-[120px] cursor-pointer items-center justify-center rounded-full bg-background-inverted px-5 py-3 text-center font-sans text-[0.875rem] font-medium leading-[1.25rem] opacity-100 text-card',
                'text-[var(--ds-background-100)] hidden lg:flex'
              )}
              style={{ letterSpacing: 'initial' }}
            >
              <span>
                <MessageCircleIcon className="mr-1 size-4 text-card" />
              </span>
              {t('contact')}
            </Link>
          </div>
          <MobileMenu onContactClick={() => setIsContactOpen(true)} />
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
                {t('dialogTitle')}
              </DialogTitle>
              <DialogDescription className="pt-2 text-center text-base md:text-lg">
                {t('dialogDescription')}
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
