'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import ContactForm from './ContactForm';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const t = useTranslations('Contact');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [headingRef.current, subRef.current, stepperRef.current],
        { opacity: 0, y: 30 }
      );
      gsap.to([headingRef.current, subRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
      });
      gsap.to(stepperRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.4,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 md:py-32 lg:py-40"
    >
      <Container>
        <div className="text-center">
          <h2
            ref={headingRef}
            className="font-geometric text-4xl sm:text-5xl md:text-6xl lg:text-[72px]"
          >
            {t('title')}
          </h2>
          <p
            ref={subRef}
            className="mx-auto max-w-3xl text-base sm:text-lg text-foreground/70"
          >
            {t('description')}
          </p>
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
