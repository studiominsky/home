'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Check,
  Mail,
  User2,
  Building2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';
import { gsap } from 'gsap';

const SERVICES = [
  'Marketing Website',
  'Web App / SaaS',
  'eCommerce',
  'UI/UX Design',
  'Backend / API',
  'Something Else',
];

export default function ContactForm() {
  const basicsRefs = useRef<(HTMLElement | null)[]>([]);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);
  const doneRefs = useRef<(HTMLElement | null)[]>([]);
  const stepWrapRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [services, setServices] = useState<string[]>([]);
  const [honeypot, setHoneypot] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (v: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const basicsValid = name.trim().length >= 1 && isValidEmail(email);
  const projectValid = message.trim().length >= 1;

  useLayoutEffect(() => {
    const els =
      step === 1
        ? basicsRefs.current
        : step === 2
          ? projectRefs.current
          : doneRefs.current;

    const items = els.filter(Boolean) as HTMLElement[];
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y: 18 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, stepWrapRef);

    return () => ctx.revert();
  }, [step]);

  const animateSwap = (
    next: 1 | 2 | 3,
    opts?: { force?: boolean }
  ) => {
    const el = stepWrapRef.current;
    if (!el) return;
    if (sent && !opts?.force && next !== 3) return;

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

  const onNextBasics = (e: React.FormEvent) => {
    e.preventDefault();
    if (!basicsValid) return;
    animateSwap(2);
  };

  const onSubmitAll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!projectValid) {
      setError('Message is required.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          services,
          honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) {
        setError(
          data?.error || 'Something went wrong. Please try again.'
        );
        setLoading(false);
        return;
      }
      setSent(true);
      setLoading(false);
      animateSwap(3);
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setServices([]);
    setHoneypot('');
    setError(null);
    setLoading(false);
    setSent(false);
    animateSwap(1, { force: true });
  };

  const toggleService = (s: string) =>
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <div className="w-full">
      <div
        className="mt-8 flex items-center justify-center gap-5 md:gap-6"
        role="list"
        aria-label="Form steps"
      >
        <StepDot
          current={step}
          me={1}
          label="Basics"
          onClick={() => animateSwap(1)}
          sent={sent}
        />
        <div className="h-[3px] w-16 md:w-20 rounded-full bg-foreground/20" />
        <StepDot
          current={step}
          me={2}
          label="Project"
          onClick={() => animateSwap(2)}
          sent={sent}
        />
        <div className="h-[3px] w-16 md:w-20 rounded-full bg-foreground/20" />
        <StepDot current={step} me={3} label="Done" sent={sent} />
      </div>

      <div
        ref={stepWrapRef}
        className="mx-auto mt-8 w-full max-w-4xl text-left"
      >
        {step === 1 && (
          <form onSubmit={onNextBasics} className="space-y-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <UnderlinedField
                label="Your name"
                htmlFor="name"
                icon={<User2 className="h-5 w-5" />}
                ref={(el) => {
                  basicsRefs.current[0] = el;
                }}
              >
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className={inputCardClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={1}
                />
              </UnderlinedField>

              <UnderlinedField
                label="Email"
                htmlFor="email"
                icon={<Mail className="h-5 w-5" />}
                ref={(el) => {
                  basicsRefs.current[1] = el;
                }}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  className={inputCardClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </UnderlinedField>
            </div>

            <UnderlinedField
              label="Company (optional)"
              htmlFor="company"
              icon={<Building2 className="h-5 w-5" />}
              ref={(el) => {
                basicsRefs.current[2] = el;
              }}
            >
              <Input
                id="company"
                name="company"
                placeholder="Acme Inc."
                className={inputCardClass}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </UnderlinedField>

            <div
              className="flex flex-col items-end"
              ref={(el) => {
                basicsRefs.current[3] = el as HTMLDivElement;
              }}
            >
              <Button
                type="submit"
                size="lg"
                disabled={!basicsValid}
                className={clsx(
                  'cursor-pointer rounded-full px-20 flex items-center justify-center w-[150px] py-4',
                  'bg-foreground text-card hover:bg-foreground',
                  !basicsValid
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:opacity-90'
                )}
              >
                <span>Next</span>
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>

              {!basicsValid && (
                <p className="mt-3 text-sm text-foreground/70">
                  Enter your name and a valid email to continue.
                </p>
              )}
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={onSubmitAll} className="space-y-10">
            <div
              ref={(el) => {
                projectRefs.current[0] = el;
              }}
            >
              <Label className="text-sm uppercase tracking-[0.14em] text-foreground">
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
                        'relative overflow-hidden',
                        'flex items-center justify-between rounded-xl px-4 py-3 border transition-all outline-none',
                        'border-border text-foreground hover:border-primary'
                      )}
                    >
                      {active && (
                        <span
                          aria-hidden
                          className="pointer-events-none absolute left-1/2 -bottom-1/2 -z-10 h-[180%] w-[200%] -translate-x-1/2 rounded-full"
                          style={{
                            background: `rgba(var(--color-primary-rgb), 0.25)`,
                            borderTop:
                              '2px solid var(--color-primary)',
                          }}
                        />
                      )}

                      <span className="truncate">{s}</span>
                      <span
                        className={clsx(
                          'flex items-center justify-center size-6 rounded-full border transition-all',
                          active
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-inverted)]'
                            : 'border-border bg-transparent text-foreground'
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
                className={textareaCardClass}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </UnderlinedField>

            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                height: 0,
                width: 0,
                opacity: 0,
              }}
            />

            <div
              className="flex flex-col items-end gap-0"
              ref={(el) => {
                projectRefs.current[3 + SERVICES.length] = el;
              }}
            >
              <div className="flex items-center justify-between gap-3 w-full">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => animateSwap(1)}
                  className="rounded-full px-6 py-5 text-base bg-transparent hover:bg-foreground/20 text-foreground"
                >
                  <ArrowLeft className="mr-2 h-6 w-6" />
                  Back
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || !projectValid}
                  className="cursor-pointer rounded-full px-10 py-4 text-sm bg-foreground text-card hover:opacity-90 hover:bg-0 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending…' : 'Send message'}
                </Button>
              </div>

              {!projectValid && !loading && (
                <p className="mt-3 text-sm text-foreground/70">
                  Please enter a message to continue.
                </p>
              )}

              {error ? (
                <p className="mt-3 text-sm text-red-500">{error}</p>
              ) : null}
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
            <div className="relative mx-auto mb-6 h-24 w-24">
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/10" />
              <div className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-green-600 text-card">
                <Check className="h-10 w-10 mt-2" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold text-foreground">
              {sent ? 'Thank you!' : 'All set!'}
            </h3>
            <p className="mt-3 text-[15px] text-foreground/70">
              We’ll be in touch within 1–2 business days.
            </p>
            <div className="mt-8">
              <Button
                onClick={resetForm}
                variant="ghost"
                className="rounded-full cursor-pointer px-6 py-5 text-base bg-transparent hover:bg-foreground/10 text-foreground"
              >
                Send another
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepDot({
  current,
  me,
  label,
  onClick,
  sent,
}: {
  current: 1 | 2 | 3;
  me: 1 | 2 | 3;
  label: string;
  onClick?: () => void;
  sent?: boolean;
}) {
  const isFinalChecked = sent && me === 3;
  const state = isFinalChecked
    ? 'done'
    : current === me
      ? 'active'
      : current > me
        ? 'done'
        : 'idle';

  const base =
    'grid size-10 md:size-12 place-items-center rounded-full text-[12px] md:text-[13px] font-semibold transition-colors outline-none';
  const style =
    state === 'done'
      ? 'bg-foreground text-card focus-visible:ring-[var(--color-primary)] cursor-pointer'
      : state === 'active'
        ? 'bg-[var(--color-primary)] text-[var(--color-inverted)] ring-[color:rgba(var(--color-primary-rgb),0.55)]'
        : 'bg-foreground/10 text-foreground/70';

  const canClick = !sent && state === 'done' && onClick;
  const Tag: 'button' | 'div' = canClick ? 'button' : 'div';

  return (
    <div
      className="flex items-center gap-3 text-foreground"
      role="listitem"
    >
      <Tag
        type={canClick ? 'button' : undefined}
        className={`${base} ${style} ${canClick ? 'cursor-pointer' : 'cursor-default'}`}
        aria-current={state === 'active' ? 'step' : undefined}
        aria-label={`Step ${me}: ${label}`}
        aria-disabled={sent ? true : undefined}
        onClick={canClick ? onClick : undefined}
      >
        {state === 'done' ? (
          <Check className="h-4 w-4 md:h-5 md:w-5" />
        ) : (
          me
        )}
      </Tag>
      <span className="text-sm md text-foreground/70">{label}</span>
    </div>
  );
}

const inputCardClass = clsx(
  'w-full rounded-md px-4 py-3',
  'bg-card text-foreground placeholder:text-foreground/50',
  'border border-border hover:border-[var(--color-primary)]',
  'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-0 focus-visible:ring-offset-card'
);

const textareaCardClass = clsx(
  'w-full rounded-xl px-4 py-3',
  'bg-card text-foreground placeholder:text-foreground/50',
  'border border-border hover:border-[var(--color-primary)]',
  'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-0 focus-visible:ring-offset-card'
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
        className="mb-2 block text-sm md:text-base uppercase tracking-[0.14em] text-foreground"
      >
        {label}
      </Label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60">
            {icon}
          </span>
        ) : null}
        <div className={clsx(icon && 'pl-10')}>{children}</div>
      </div>
    </div>
  );
});
UnderlinedField.displayName = 'UnderlinedField';
