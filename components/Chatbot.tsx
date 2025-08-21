'use client';

import * as React from 'react';
import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ReactMarkdown from 'react-markdown'; // 1. Import ReactMarkdown
import {
  MessageSquare,
  X,
  SendHorizontal,
  Sparkles,
} from 'lucide-react';

type Msg = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 'greet',
      role: 'assistant',
      content:
        'Hi! I’m the Studio Minsky assistant. Ask me about our websites, web applications, or process.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isCollectingEmail, setIsCollectingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const backdrop = backdropRef.current;
    const fab = fabRef.current;
    if (!panel || !backdrop || !fab) return;

    gsap.set(panel, { transformOrigin: 'bottom right' });
    gsap.set(panel, { autoAlpha: 0, scale: 0.9, y: 20 });
    gsap.set(backdrop, { autoAlpha: 0 });
    gsap.set(fab.querySelector('.chat-icon-close'), {
      autoAlpha: 0,
      scale: 0.5,
      rotate: -90,
    });

    tl.current = gsap
      .timeline({
        paused: true,
        defaults: { ease: 'expo.out' },
      })
      .to(backdrop, { autoAlpha: 1, duration: 0.4 })
      .to(
        panel,
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
        },
        '-=0.3'
      )
      .to(
        fab.querySelector('.chat-icon-open'),
        { autoAlpha: 0, rotate: 45, duration: 0.3 },
        0
      )
      .to(
        fab.querySelector('.chat-icon-close'),
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.3 },
        0
      );
  }, []);

  useEffect(() => {
    if (open) {
      tl.current?.timeScale(1).play();
    } else {
      tl.current?.timeScale(1.5).reverse();
    }
  }, [open]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;

    const lastMessage = container.querySelector(
      '.chat-message:last-of-type'
    );
    if (lastMessage) {
      gsap.fromTo(
        lastMessage,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [messages]);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Msg = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(
            ({ role, content }) => ({
              role,
              content,
            })
          ),
        }),
      });

      if (!res.ok) throw new Error(await res.text());

      const data: { reply: string } = await res.json();
      let botContent = data.reply;

      if (botContent.includes('[ACTION:COLLECT_EMAIL]')) {
        botContent = botContent
          .replace('[ACTION:COLLECT_EMAIL]', '')
          .trim();
        setIsCollectingEmail(true);
      }

      const botMsg: Msg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: botContent,
      };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Sorry—something went wrong. Please try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    const email = emailInput.trim();
    if (!email) return;

    setLoading(true);
    setIsCollectingEmail(false);

    const chatHistory = messages
      .map(
        (m) =>
          `${m.role === 'user' ? 'Client' : 'Assistant'}: ${m.content}`
      )
      .join('\n');

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'AI Assistant',
          email: email,
          message: `Captured from chatbot conversation:\n\n---\n${chatHistory}`,
        }),
      });

      const confirmationMsg: Msg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          "Thanks! We've received your email and will be in touch shortly.",
      };
      setMessages((m) => [...m, confirmationMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: Msg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content:
          'Sorry, there was an issue submitting your email. Please use the main contact form.',
      };
      setMessages((m) => [...m, errorMsg]);
    } finally {
      setLoading(false);
      setEmailInput('');
    }
  }

  return (
    <>
      <button
        ref={fabRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="studio-minsky-chat"
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed cursor-pointer bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/40"
      >
        <MessageSquare className="chat-icon-open absolute h-6 w-6" />
        <X className="chat-icon-close absolute h-6 w-6" />
      </button>

      <div
        ref={backdropRef}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        style={{ visibility: 'hidden' }}
      />

      <div
        ref={panelRef}
        id="studio-minsky-chat"
        role="dialog"
        aria-label="Studio Minsky assistant"
        className="fixed bottom-24 right-5 z-50 flex w-[370px] max-w-[calc(100vw-40px)] origin-bottom-right flex-col rounded-2xl border border-border bg-card text-foreground shadow-2xl"
        style={{ visibility: 'hidden' }}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-positive" />
            </div>
            <div>
              <h3 className="font-semibold">Studio Minsky</h3>
              <p className="text-xs text-foreground/60">
                AI Assistant
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="rounded-full p-2 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div
          ref={messagesContainerRef}
          className="max-h-[50vh] flex-grow space-y-4 overflow-y-auto p-4"
        >
          {messages.map((m) => (
            <div
              key={m.id}
              className={`chat-message flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="mb-1.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`ai-chat max-w-[85%] gap-2 flex flex-col rounded-2xl px-3.5 py-2.5 text-sm ${m.role === 'user' ? 'rounded-br-lg bg-primary text-primary-foreground' : 'rounded-bl-lg bg-muted'}`}
              >
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && !isCollectingEmail && (
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Sparkles className="h-4 w-4 animate-pulse text-primary" />
              </div>
              <span>Thinking…</span>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 border-t border-border p-3">
          {isCollectingEmail ? (
            <form
              onSubmit={submitEmail}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email..."
                required
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Email Address"
              />
              <button
                type="submit"
                disabled={loading}
                aria-label="Submit email"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </form>
          ) : (
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                className="flex-1 rounded-lg border border-border bg-card px-4 py-2 text-sm placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity enabled:hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <SendHorizontal className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
