"use client";

import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-chat"))}
      className="btn-clay btn-yellow"
    >
      <MessageCircle className="size-4" aria-hidden /> Chat
    </button>
  );
}
