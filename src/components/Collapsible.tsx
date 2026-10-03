"use client";

import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

/**
 * A row whose header toggles a panel below it (the experience/project
 * pattern). The whole header is clickable and shows the paw cursor.
 */
export default function Collapsible({
  header,
  children,
  defaultOpen = false,
  className = "",
  headerClassName = "",
  label,
}: {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  headerClassName?: string;
  label: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const Chevron = open ? ChevronsDownUp : ChevronsUpDown;
  return (
    <div className={className}>
      <button
        type="button"
        data-cursor="paw"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${open ? "Collapse" : "Expand"} ${label}`}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-start gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-ink/30 ${headerClassName}`}
      >
        <span className="min-w-0 flex-1">{header}</span>
        <Chevron className="mt-1 size-4 shrink-0 text-muted" strokeWidth={1.75} aria-hidden />
      </button>
      <div
        id={id}
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden" inert={!open}>
          {children}
        </div>
      </div>
    </div>
  );
}
