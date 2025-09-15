'use client';

import React from 'react';
import FullWidth from './FullWidth';
import Logo from './Logo';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10">
      <FullWidth>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo className="w-44" />
            <p className="max-w-md text-md text-foreground/60">
              Studio Minsky — building thoughtful, fast, and
              accessible web experiences.
            </p>
            <a
              href="mailto:hello@studiominsky.com"
              className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              hello@studiominsky.com
            </a>
          </div>

          <nav className="grid grid-cols-2 gap-3 md:max-md:grid-cols-3 md:grid-cols-2">
            <Link
              href="/#services"
              className="text-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#projects"
              className="text-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#process"
              className="text-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Process
            </Link>
            <Link
              href="/#contact"
              className="text-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/terms-and-privacy"
              className="text-md text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms & Privacy
            </Link>
          </nav>

          <div className="flex flex-col items-start gap-3">
            <a
              href="https://www.linkedin.com/company/studiominsky"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" />
              </svg>
              <span className="text-md">LinkedIn</span>
            </a>
            <a
              href="https://github.com/studiominsky"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M16,2.345c7.735,0,14,6.265,14,14-.002,6.015-3.839,11.359-9.537,13.282-.7,.14-.963-.298-.963-.665,0-.473,.018-1.978,.018-3.85,0-1.312-.437-2.152-.945-2.59,3.115-.35,6.388-1.54,6.388-6.912,0-1.54-.543-2.783-1.435-3.762,.14-.35,.63-1.785-.14-3.71,0,0-1.173-.385-3.85,1.435-1.12-.315-2.31-.472-3.5-.472s-2.38,.157-3.5,.472c-2.677-1.802-3.85-1.435-3.85-1.435-.77,1.925-.28,3.36-.14,3.71-.892,.98-1.435,2.24-1.435,3.762,0,5.355,3.255,6.563,6.37,6.913-.403,.35-.77,.963-.893,1.872-.805,.368-2.818,.963-4.077-1.155-.263-.42-1.05-1.452-2.152-1.435-1.173,.018-.472,.665,.017,.927,.595,.332,1.277,1.575,1.435,1.978,.28,.787,1.19,2.293,4.707,1.645,0,1.173,.018,2.275,.018,2.607,0,.368-.263,.787-.963,.665-5.719-1.904-9.576-7.255-9.573-13.283,0-7.735,6.265-14,14-14Z" />
              </svg>
              <span className="text-md">GitHub</span>
            </a>
            <a
              href="https://x.com/studiominsky"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="X (Twitter)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z" />
              </svg>
              <span className="text-md">X</span>
            </a>
          </div>
        </div>
      </FullWidth>

      <div className="border-t border-border">
        <FullWidth>
          <div className="flex flex-col items-center justify-between gap-3 py-4 text-sm text-muted-foreground md:flex-row">
            <div className="flex items-center gap-4">
              <span>© {year} Studio Minsky</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">
                All rights reserved.
              </span>
            </div>
          </div>
        </FullWidth>
      </div>
    </footer>
  );
}
