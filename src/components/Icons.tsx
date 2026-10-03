import {
  Award,
  Briefcase,
  Building2,
  Cloud,
  CodeXml,
  FileText,
  GraduationCap,
  Mail,
  Medal,
  School,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import * as si from "simple-icons";
import type { IconName } from "@/data/resume";

type SimpleIcon = { path: string; title: string };

function Brand({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d={icon.path} />
    </svg>
  );
}

// simple-icons no longer ships LinkedIn, so this is a plain generic mark.
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      <rect x="6" y="10" width="2.6" height="8" fill="var(--paper)" />
      <circle cx="7.3" cy="6.9" r="1.5" fill="var(--paper)" />
      <path
        d="M11 10h2.5v1.1c.5-.8 1.5-1.3 2.7-1.3 2 0 3 1.3 3 3.6V18h-2.6v-4.2c0-1.1-.4-1.8-1.4-1.8s-1.6.7-1.6 1.8V18H11z"
        fill="var(--paper)"
      />
    </svg>
  );
}

const lucide: Partial<Record<IconName, LucideIcon>> = {
  mail: Mail,
  resume: FileText,
  briefcase: Briefcase,
  code: CodeXml,
  trophy: Trophy,
  medal: Medal,
  award: Award,
  graduation: GraduationCap,
  school: School,
  building: Building2,
};

/** Icons used in profile, socials, timelines. */
export function Icon({ name, className = "size-4" }: { name: IconName; className?: string }) {
  if (name === "github") return <Brand icon={si.siGithub} className={className} />;
  if (name === "leetcode") return <Brand icon={si.siLeetcode} className={className} />;
  if (name === "codeforces") return <Brand icon={si.siCodeforces} className={className} />;
  if (name === "linkedin") return <LinkedInMark className={className} />;
  const L = lucide[name] ?? Briefcase;
  return <L className={className} strokeWidth={1.75} aria-hidden />;
}

/** Tech logos for stack chips, keyed by simple-icons slug ("cloud" is a generic stand-in for AWS). */
export function TechIcon({ slug, className = "size-3.5" }: { slug?: string; className?: string }) {
  if (!slug) return null;
  if (slug === "cloud") return <Cloud className={className} strokeWidth={1.75} aria-hidden />;
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof si;
  const icon = si[key] as SimpleIcon | undefined;
  return icon ? <Brand icon={icon} className={className} /> : null;
}
