import type { CSSProperties, ReactNode } from "react";

export const palette = {
  blue: { bg: "#8ccdff", edge: "#4696d3", fg: "#000", rot: "-1.5deg" },
  purple: { bg: "#d6a5db", edge: "#aa73b0", fg: "#000", rot: "1.7deg" },
  lime: { bg: "#d9f97d", edge: "#a7c94e", fg: "#000", rot: "-2deg" },
  amber: { bg: "#ffbb00", edge: "#c28f00", fg: "#000", rot: "1.4deg" },
  peach: { bg: "#ffc9a3", edge: "#d49a6b", fg: "#000", rot: "-1.2deg" },
  ink: { bg: "#181818", edge: "#000", fg: "#fff", rot: "1.5deg" },
} as const;

export type TagColor = keyof typeof palette;

type Props = {
  color: TagColor;
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** The sticker-style label used for nav and social links. Wrap in `.tag-link`. */
export default function Tag({ color, children, className = "", delay }: Props) {
  const c = palette[color];
  const style = {
    "--tag-bg": c.bg,
    "--tag-fg": c.fg,
    "--tag-edge": c.edge,
    "--tag-rot": c.rot,
    animationDelay: delay === undefined ? undefined : `${delay}ms`,
  } as CSSProperties;
  return (
    <span
      style={style}
      className={`tag ${delay === undefined ? "" : "tag-arrive"} max-[600px]:!h-[22.7px] max-[600px]:!text-[14.2px] ${className}`}
    >
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>
    </span>
  );
}
