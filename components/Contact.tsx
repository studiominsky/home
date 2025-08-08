'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Container from './Container';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Check,
  Mail,
  User2,
  Building2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  'Marketing Website',
  'Web App / SaaS',
  'eCommerce',
  'UI/UX Design',
  'Backend / API',
  'Something Else',
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const stepWrapRef = useRef<HTMLDivElement>(null);

  const basicsRefs = useRef<(HTMLElement | null)[]>([]);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);
  const doneRefs = useRef<(HTMLElement | null)[]>([]);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });

      gsap.set(
        [headingRef.current, subRef.current, stepperRef.current],
        { opacity: 0, y: 30 }
      );
      gsap.set(stepWrapRef.current, { opacity: 0, y: 30 });

      tl.to([headingRef.current, subRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2,
      })
        .to(
          stepperRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .to(
          stepWrapRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const els =
      step === 1
        ? basicsRefs.current
        : step === 2
        ? projectRefs.current
        : doneRefs.current;

    const items = els.filter(Boolean);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 18 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.08,
      });
    }, stepWrapRef);

    return () => ctx.revert();
  }, [step]);

  const animateSwap = (next: 1 | 2 | 3) => {
    const el = stepWrapRef.current;
    if (!el) return;
    gsap.to(el, {
      opacity: 0,
      y: 10,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        setStep(next);
        gsap.fromTo(
          el,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }
        );
      },
    });
  };

  const toggleService = (s: string) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const onNextBasics = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    animateSwap(2);
  };

  const onSubmitAll = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    animateSwap(3);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-primary text-black"
    >
      <Container>
        <div className="py-32 md:py-40 text-center">
          <h2 ref={headingRef} className="font-geometric text-[72px]">
            Tell us about your project.
          </h2>
          <p
            ref={subRef}
            className="mx-auto max-w-3xl text-[20px] md:text-[22px] leading-[1.6] text-black/70"
          >
            Quick form. Two steps. We’ll reply within 1–2 business
            days.
          </p>
          <div
            ref={stepperRef}
            className="mt-10 flex items-center justify-center gap-5 md:gap-6"
          >
            <StepDot current={step} me={1} label="Basics" />
            <div className="h-[3px] w-16 md:w-20 bg-black/25 rounded-full" />
            <StepDot current={step} me={2} label="Project" />
            <div className="h-[3px] w-16 md:w-20 bg-black/25 rounded-full" />
            <StepDot current={step} me={3} label="Done" />
          </div>
          <div
            ref={stepWrapRef}
            className="mx-auto mt-12 w-full max-w-4xl text-left"
          >
            {step === 1 && (
              <form onSubmit={onNextBasics} className="space-y-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                  <UnderlinedField
                    label="Your name"
                    htmlFor="name"
                    icon={<User2 className="h-6 w-6" />}
                    ref={(el) => {
                      basicsRefs.current[0] = el;
                    }}
                  >
                    <Input
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      className={inputUnderlineClass}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </UnderlinedField>
                  <UnderlinedField
                    label="Email"
                    htmlFor="email"
                    icon={<Mail className="h-6 w-6" />}
                    ref={(el) => {
                      basicsRefs.current[1] = el;
                    }}
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      className={inputUnderlineClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </UnderlinedField>
                </div>
                <UnderlinedField
                  label="Company (optional)"
                  htmlFor="company"
                  icon={<Building2 className="h-6 w-6" />}
                  ref={(el) => {
                    basicsRefs.current[2] = el;
                  }}
                >
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Inc."
                    className={inputUnderlineClass}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </UnderlinedField>
                <div
                  className="flex items-center justify-end"
                  ref={(el) => {
                    basicsRefs.current[3] = el as HTMLDivElement;
                  }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full bg-black px-20 flex items-center justify-center max-w-[230px] py-6 text-base text-white hover:bg-black/90"
                  >
                    <span>Next</span>
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </div>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={onSubmitAll} className="space-y-12">
                <div
                  ref={(el) => {
                    projectRefs.current[0] = el;
                  }}
                >
                  <Label className="text-sm md:text-base uppercase tracking-[0.14em]">
                    What do you need? (select all that apply)
                  </Label>
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {SERVICES.map((s) => {
                      const active = services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          aria-pressed={active}
                          className={clsx(
                            'flex items-center justify-between rounded-full px-5 py-3 text-base',
                            'border-2 transition-all outline-none',
                            'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-primary',
                            active
                              ? 'border-black bg-black/10'
                              : 'border-black/40 hover:border-black/60'
                          )}
                        >
                          <span className="truncate">{s}</span>
                          <span
                            className={clsx(
                              'grid size-6 place-items-center rounded-full border transition-all',
                              active
                                ? 'border-black bg-black text-white'
                                : 'border-black/40 bg-transparent'
                            )}
                          >
                            {active ? (
                              <Check className="h-4 w-4" />
                            ) : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <UnderlinedField
                  label="Project brief"
                  htmlFor="message"
                  ref={(el) => {
                    projectRefs.current[1 + SERVICES.length] = el;
                  }}
                >
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Goals, timeline, references, success criteria…"
                    className={textareaUnderlineClass}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </UnderlinedField>
                <p
                  className="text-[15px] md:text-base text-black/70"
                  ref={(el) => {
                    projectRefs.current[2 + SERVICES.length] = el;
                  }}
                >
                  The more context you share, the faster we can
                  estimate accurately.
                </p>
                <div
                  className="flex items-center justify-between gap-3"
                  ref={(el) => {
                    projectRefs.current[3 + SERVICES.length] = el;
                  }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => animateSwap(1)}
                    className="rounded-full text-black hover:bg-black/10 px-6 py-5 text-base"
                  >
                    <ArrowLeft className="mr-2 h-6 w-6" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-full bg-black px-10 py-6 text-base md:text-lg text-white hover:bg-black/90"
                  >
                    Send message
                  </Button>
                </div>
              </form>
            )}
            {step === 3 && (
              <div
                className="py-16 text-center"
                ref={(el) => {
                  doneRefs.current[0] = el;
                }}
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-600/15 text-green-700">
                  <Check className="h-10 w-10" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {sent ? 'Thank you!' : 'All set!'}
                </h3>
                <p className="mt-3 text-[15px] md:text-base text-black/70">
                  We’ll be in touch within 1–2 business days.
                </p>
                <div className="mt-8">
                  <Button
                    onClick={() => animateSwap(1)}
                    variant="ghost"
                    className="rounded-full text-black hover:bg-black/10 px-6 py-5 text-base"
                  >
                    Send another
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StepDot({
  current,
  me,
  label,
}: {
  current: 1 | 2 | 3;
  me: 1 | 2 | 3;
  label: string;
}) {
  const state =
    current === me ? 'active' : current > me ? 'done' : 'idle';
  return (
    <div className="flex items-center gap-3 text-black">
      <div
        className={clsx(
          'grid size-10 md:size-12 place-items-center rounded-full text-[12px] md:text-[13px] font-semibold transition-colors',
          state === 'done'
            ? 'bg-black text-white'
            : state === 'active'
            ? 'bg-black/15 text-black'
            : 'bg-black/10 text-black/70'
        )}
      >
        {state === 'done' ? (
          <Check className="h-4 w-4 md:h-5 md:w-5" />
        ) : (
          me
        )}
      </div>
      <span className="text-sm md:text-base text-black/70">
        {label}
      </span>
    </div>
  );
}

const inputUnderlineClass = clsx(
  'bg-primary text-black placeholder:text-black/50',
  'border-0 border-b-2 border-b-black/40 rounded-none px-0 h-11',
  'caret-black selection:bg-black/10',
  'focus-visible:ring-0 focus:outline-none',
  'focus:border-b-black transition-[box-shadow,border-color]'
);
const textareaUnderlineClass = clsx(
  'bg-primary text-black placeholder:text-black/50',
  'border-0 border-b-2 border-b-black/40 rounded-none px-0 pt-2',
  'caret-black selection:bg-black/10',
  'focus-visible:ring-0 focus:outline-none',
  'focus:border-b-black transition-[box-shadow,border-color]'
);

const UnderlinedField = React.forwardRef<
  HTMLDivElement,
  {
    label: string;
    htmlFor: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
  }
>(({ label, htmlFor, children, icon }, ref) => {
  return (
    <div className="group/field" ref={ref}>
      <Label
        htmlFor={htmlFor}
        className="mb-3 block text-sm md:text-base uppercase tracking-[0.14em]"
      >
        {label}
      </Label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 text-black/60">
            {icon}
          </span>
        ) : null}
        <div className={clsx(icon && 'pl-9')}>{children}</div>
      </div>
    </div>
  );
});
UnderlinedField.displayName = 'UnderlinedField';
