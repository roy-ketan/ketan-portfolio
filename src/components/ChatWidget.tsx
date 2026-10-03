"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/resume";

type Msg = { from: "me" | "visitor"; text: string };

const STORE = "chat-history-v1";
const greeting: Msg = {
  from: "me",
  text: `Hey! 👋 I'm ${profile.firstName}. Leave a message and your email, it lands straight in my inbox and I'll reply there.`,
};

function load(): Msg[] {
  try {
    const raw = localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Msg[]) : [];
  } catch {
    return [];
  }
}

function save(msgs: Msg[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(msgs.slice(-30)));
  } catch {
    /* storage unavailable; history just won't persist */
  }
}

/** Floating "Chat with Ketan" button and panel. Messages are emailed via /api/contact. */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  // History is only rendered once the panel is opened, so reading storage here can't cause a hydration mismatch.
  const [msgs, setMsgs] = useState<Msg[]>(() => (typeof window === "undefined" ? [] : load()));
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const openedAt = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-chat", onOpen);
    return () => window.removeEventListener("open-chat", onOpen);
  }, []);

  useEffect(() => {
    if (open) openedAt.current = Date.now();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs, open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), message: body, website, elapsed: Date.now() - openedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Could not send that. Try email instead.");
        return;
      }
      const next: Msg[] = [
        ...msgs,
        { from: "visitor", text: body },
        { from: "me", text: `Got it, thanks! I'll reply to ${email.trim()} soon.` },
      ];
      setMsgs(next);
      save(next);
      setText("");
    } catch {
      setError("Network hiccup. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Chat with ${profile.firstName}`}
          className="btn-clay btn-green fixed bottom-5 right-5 z-[60] !gap-2.5 !py-2 !pl-2.5 !pr-5 shadow-xl max-sm:!p-1.5"
        >
          <span aria-hidden className="size-2.5 rounded-full border-2 border-[#5a3a1c] bg-[#fff8e2] max-sm:hidden" />
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-full border-2 border-[#5a3a1c] bg-gradient-to-br from-[#ffe89a] to-[#f6a623] font-display text-xs font-bold"
          >
            {profile.initials}
          </span>
          <span className="max-sm:hidden">Chat with {profile.firstName}</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={`Chat with ${profile.firstName}`}
          className="clay fixed bottom-5 right-5 z-[60] flex h-[min(520px,calc(100svh-6rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl"
        >
          <div className="flex items-center gap-3 border-b-2 border-edge bg-gradient-to-b from-[#a6e874] to-[#7ccf4a] px-4 py-3">
            <span className="flex size-9 items-center justify-center rounded-full border-2 border-[#5a3a1c] bg-gradient-to-br from-[#ffe89a] to-[#f6a623] font-display text-sm font-bold">
              {profile.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display font-bold leading-tight">{profile.name}</p>
              <p className="text-xs font-semibold text-ink/70">Replies by email</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="flex size-8 items-center justify-center rounded-full hover:bg-black/10"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto p-4">
            {[greeting, ...msgs].map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-2xl border-2 border-edge/70 px-3.5 py-2 text-[14px] leading-snug ${
                  m.from === "me" ? "rounded-bl-md bg-white" : "ml-auto rounded-br-md bg-[#d8efa6]"
                }`}
              >
                {m.text}
              </p>
            ))}
          </div>

          <form onSubmit={send} className="space-y-2 border-t-2 border-edge/40 p-3">
            {/* Honeypot: hidden from people, filled by bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              aria-hidden
            />
            <input
              type="email"
              required
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border-2 border-edge/60 bg-white px-3 py-2 text-sm outline-none focus:border-edge"
            />
            <div className="flex items-end gap-2">
              <textarea
                required
                rows={2}
                maxLength={2000}
                placeholder="Say hi…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[44px] flex-1 resize-none rounded-xl border-2 border-edge/60 bg-white px-3 py-2 text-sm outline-none focus:border-edge"
              />
              <button
                type="submit"
                disabled={sending}
                aria-label="Send message"
                className="btn-clay btn-green !p-2.5 disabled:opacity-60"
              >
                {sending ? <MessageCircle className="size-5 animate-pulse" aria-hidden /> : <Send className="size-5" aria-hidden />}
              </button>
            </div>
            {error && <p className="text-xs font-semibold text-[#c2410c]">{error}</p>}
          </form>
        </div>
      )}
    </>
  );
}
