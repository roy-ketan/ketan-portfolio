export const profile = {
  name: "Ketan Ratan Roy",
  firstName: "Ketan",
  initials: "KR",
  email: "ketanroy0866@gmail.com",
  resumeUrl: "/Ketan_Roy_Resume.pdf",
  // Drop a photo in /public and set this (e.g. "/me.jpg") to replace the initials card.
  photo: null as string | null,
};

export const socials = [
  { label: "GITHUB", href: "https://github.com/roy-ketan", color: "ink" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/ketan-roy/", color: "blue" },
  { label: "LEETCODE", href: "https://leetcode.com/u/ketanroy01/", color: "amber" },
  { label: "CODEFORCES", href: "https://codeforces.com/profile/jets_psd", color: "purple" },
  { label: "EMAIL", href: "mailto:ketanroy0866@gmail.com", color: "lime" },
] as const;

export type Work = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  aspect: string;
  bg: string;
  blurb: string;
  highlights: string[];
  more?: { heading: string; items: string[] };
  stack: string[];
};

// Order matters: even indexes fill the left column, odd the right.
export const works: Work[] = [
  {
    slug: "cloudcart",
    title: "CloudCart",
    tag: "CLOUD NATIVE",
    date: "Mar 2025",
    aspect: "16 / 9",
    bg: "#dfeaf6",
    blurb:
      "A production-grade, three-tier e-commerce platform: 8 microservices and 2 databases orchestrated on Amazon EKS.",
    highlights: [
      "Built and deployed a 3-tier e-commerce platform with 8 microservices and 2 databases on Amazon EKS, using Kubernetes for scalable orchestration.",
      "Containerized and automated deployments with Docker, Helm and eksctl, streamlining infrastructure setup and CI/CD workflows.",
      "Configured AWS ECR, IAM OIDC and the ALB Ingress Controller for secure image handling, high availability and zero-downtime updates.",
    ],
    stack: ["Kubernetes", "Amazon EKS", "Docker", "Helm", "eksctl", "AWS ECR", "IAM OIDC", "ALB Ingress"],
  },
  {
    slug: "drivecall-ai",
    title: "DriveCall AI",
    tag: "VOICE AI",
    date: "Mar 2024",
    aspect: "1 / 1",
    bg: "#22211f",
    blurb:
      "A real-time AI voice agent for automotive call centers that holds natural, human-like conversations.",
    highlights: [
      "Built a real-time voice agent handling 20+ concurrent sessions using LiveKit, OpenAI GPT-4 and Deepgram STT.",
      "Reached 95%+ speech detection accuracy with Silero VAD, supporting natural turn-taking and fewer interruptions.",
      "Implemented end-to-end TTS and STT pipelines with OpenAI and Deepgram, producing human-like responses in under 1.2 seconds.",
    ],
    stack: ["LiveKit", "OpenAI GPT-4", "Deepgram", "Silero VAD", "Python"],
  },
  {
    slug: "studylink",
    title: "StudyLink",
    tag: "EDTECH",
    date: "Oct 2024",
    aspect: "340 / 293",
    bg: "#dce2e1",
    blurb:
      "A student collaboration platform with a hands-free Air Canvas you draw on with gestures.",
    highlights: [
      "Led the design and deployment of StudyLink, letting students form study groups of up to 50 members, post academic questions and exchange video solutions.",
      "Developed a real-time drawing tool using OpenCV and MediaPipe hand-gesture recognition.",
      "Integrated the Air Canvas feature into the Django app for hands-free interaction on the platform.",
    ],
    stack: ["Django", "OpenCV", "MediaPipe", "Python"],
  },
  {
    slug: "dassault",
    title: "Rule Automation at Dassault",
    tag: "BACKEND",
    date: "2025 – now",
    aspect: "756 / 491",
    bg: "#0a5235",
    blurb:
      "Backend services at Dassault Systèmes that validate complex system constraints and keep data models consistent.",
    highlights: [
      "Designed and delivered scalable Python rule-automation services that validate complex system constraints, reducing manual verification and improving consistency across distributed environments.",
      "Developed backend business logic in Python with domain-specific languages that enforce system invariants, lowering error rates by 30%.",
      "Contributed to core C++ modules for structured data modeling and transformations, replacing deprecated APIs to improve performance, reliability and long-term stability.",
      "Implemented policy-based access control for object and attribute-level permissions, shipping security updates through Git-driven CI/CD pipelines.",
    ],
    more: {
      heading: "Before that, as an intern",
      items: [
        "Contributed to a real-time, low-latency, NLP-driven backend that executes structured commands from natural language input.",
        "Designed the command-processing pipeline with modern NLP techniques, reaching 97%+ intent accuracy.",
        "Integrated an EKL and Python-based API layer to execute system actions programmatically.",
        "Optimized speech-to-text components, cutting response time by 30% and enabling concurrent command execution.",
      ],
    },
    stack: ["Python", "C++", "DSLs", "EKL", "CI/CD", "Access control"],
  },
];

export type Row = { name: string; meta: string; href?: string };

export const lists: { id?: string; title: string; rows: Row[] }[] = [
  {
    id: "experience",
    title: "Experience",
    rows: [
      { name: "Dassault Systèmes", meta: "Software Engineer · 2025", href: "https://www.3ds.com/" },
      { name: "Dassault Systèmes", meta: "Software Engineer Intern · 2025", href: "https://www.3ds.com/" },
    ],
  },
  {
    title: "Education",
    rows: [
      { name: "NIT Rourkela", meta: "B.Tech · CGPA 8.22 · 2021–25", href: "https://nitrkl.ac.in/" },
      { name: "Balaji Convent Jr College", meta: "Class XII · 90.62% · 2020" },
    ],
  },
  {
    title: "Recognition",
    rows: [
      { name: "NorCalHacks", meta: "Winner · 350 teams worldwide" },
      { name: "MLH DragonHacks", meta: "Runner-up" },
      { name: "LeetCode Weekly", meta: "Top 4.3% worldwide", href: "https://leetcode.com/u/ketanroy01/" },
    ],
  },
  {
    title: "Toolbox",
    rows: [
      { name: "Languages", meta: "Python, C++, Go, Java, C" },
      { name: "Backend", meta: "Django REST, PostgreSQL, MySQL" },
      { name: "Infra", meta: "Kubernetes, Docker, AWS, Helm, Terraform, Jenkins" },
      { name: "Frontend", meta: "React, Next.js, TypeScript, Tailwind" },
    ],
  },
];
