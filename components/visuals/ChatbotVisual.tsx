'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { Sparkles, Smile, Meh, Frown } from 'lucide-react';
import { gsap } from 'gsap';

const ChatbotVisual: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    gsap.fromTo(
      '.chat-message',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
        stagger: 0.5,
        delay: 0.1,
      }
    );
  }, []);

  const conversation = [
    { type: 'ai', text: 'Hello! How can I assist you today?' },
    { type: 'user', text: "I'd like to start a project." },
    {
      type: 'ai',
      text: 'Of course! What kind of project are you envisioning?',
      options: [
        'Web Application',
        'Website',
        'Chatbot',
        'Data Visualization',
      ],
    },
    { type: 'user', text: 'Web Application' },
    {
      type: 'ai',
      text: "Understood. We'll be in touch to discuss the details. Thank you!",
    },
    {
      type: 'ai',
      text: 'How was your experience with me?',
      feedback: true,
    },
  ];

  return (
    <div className="w-full h-full bg-card rounded-lg p-4 flex flex-col">
      <div className="flex-shrink-0 flex items-center gap-3 p-2">
        <div className="relative">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-positive rounded-full border-2 border-card" />
        </div>
        <div>
          <h5 className="font-semibold">AI Assistant</h5>
          <p className="text-xs text-foreground/60">Online</p>
        </div>
      </div>

      <div
        ref={chatRef}
        className="flex-grow p-2 sm:p-4 pt-4 sm:pt-7 flex flex-col gap-5 overflow-y-auto"
      >
        {conversation.map((msg, index) => (
          <div key={index} className="chat-message flex flex-col">
            {msg.type === 'user' && (
              <div className="p-3 bg-primary text-primary-foreground rounded-lg self-end max-w-[85%] text-sm">
                {msg.text}
              </div>
            )}
            {msg.type === 'ai' && (
              <div className="p-3 bg-muted rounded-lg self-start max-w-[85%] text-sm">
                {msg.text}
              </div>
            )}
            {msg.options && (
              <div className="flex gap-2 justify-start flex-wrap mt-2 self-start">
                {msg.options.map((option) => (
                  <div
                    key={option}
                    className="text-xs text-primary font-bold py-1 px-3 rounded-2xl bg-primary/20 border border-primary font-mono hover:bg-muted transition-colors cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
            {msg.feedback && (
              <div className="py-3 rounded-lg self-start text-sm">
                <div className="flex items-center justify-start gap-3">
                  <Frown className="w-6 h-6 text-foreground/40" />
                  <Meh className="w-6 h-6 text-foreground/40" />
                  <Smile className="w-6 h-6 text-primary fill-primary/20" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatbotVisual;
