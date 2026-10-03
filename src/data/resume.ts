export const profile = {
  name: "Ketan Ratan Roy",
  firstName: "Ketan",
  initials: "KR",
  role: "Software Engineer",
  company: "Dassault Systèmes",
  email: "ketanroy0866@gmail.com",
  resumeUrl: "/Ketan_Roy_Resume.pdf",
  summary:
    "Software engineer at Dassault Systèmes building backend systems in Python and C++, with a soft spot for cloud-native infrastructure and real-time AI.",
};

export const links = [
  { label: "GitHub", href: "https://github.com/roy-ketan" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ketan-roy/" },
  { label: "LeetCode", href: "https://leetcode.com/u/ketanroy01/" },
  { label: "Codeforces", href: "https://codeforces.com/profile/jets_psd" },
  { label: "Email", href: "mailto:ketanroy0866@gmail.com" },
];

export type Project = {
  title: string;
  tag: string;
  date: string;
  blurb: string;
  highlights: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    title: "CloudCart",
    tag: "KUBERNETES",
    date: "Mar 2025",
    blurb: "Cloud-native e-commerce platform running on Amazon EKS.",
    highlights: [
      "Production-grade 3-tier platform with 8 microservices and 2 databases on Amazon EKS.",
      "Containerized and automated deployments with Docker, Helm and eksctl.",
      "Secured image handling and zero-downtime updates via AWS ECR, IAM OIDC and ALB Ingress Controller.",
    ],
    stack: ["EKS", "Docker", "Helm", "eksctl", "AWS ECR", "ALB Ingress"],
  },
  {
    title: "StudyLink",
    tag: "CV / DJANGO",
    date: "Oct 2024",
    blurb: "Student collaboration platform with a hands-free Air Canvas.",
    highlights: [
      "Study groups of up to 50 members, academic Q&A and video solutions.",
      "Real-time drawing tool using OpenCV and MediaPipe hand-gesture recognition.",
      "Air Canvas integrated into a Django app for hands-free interaction.",
    ],
    stack: ["Django", "OpenCV", "MediaPipe", "Python"],
  },
  {
    title: "DriveCall AI",
    tag: "VOICE AI",
    date: "Mar 2024",
    blurb: "Real-time AI voice agent for automotive call centers.",
    highlights: [
      "Handles 20+ concurrent sessions with LiveKit, OpenAI GPT-4 and Deepgram STT.",
      "95%+ speech detection accuracy using Silero VAD for natural turn-taking.",
      "End-to-end TTS/STT pipeline with human-like responses under 1.2 seconds.",
    ],
    stack: ["LiveKit", "GPT-4", "Deepgram", "Silero VAD"],
  },
];

export type Role = {
  title: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    title: "Software Engineer",
    company: "Dassault Systèmes",
    period: "Jun 2025 – Present",
    bullets: [
      "Designed and delivered scalable Python rule-automation services that validate complex system constraints across distributed environments.",
      "Built backend business logic in Python with domain-specific languages enforcing system invariants, lowering error rates by 30%.",
      "Contributed to core C++ modules for structured data modeling and transformations, replacing deprecated APIs to improve performance and reliability.",
      "Implemented policy-based access control for object and attribute-level permissions, with security updates shipped through Git-driven CI/CD pipelines.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company: "Dassault Systèmes",
    period: "Jan – Jun 2025",
    bullets: [
      "Contributed to a real-time, low-latency, NLP-driven backend enabling hands-free execution of structured commands from natural language.",
      "Designed the command-processing pipeline with modern NLP techniques, reaching 97%+ intent accuracy.",
      "Integrated an EKL and Python-based API layer to execute system actions programmatically.",
      "Optimized speech-to-text components, cutting response time by 30% and enabling concurrent command execution.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["Python", "C++", "C", "Java", "Go"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Material UI"],
  },
  {
    group: "Backend",
    items: ["Django REST Framework", "REST APIs", "PostgreSQL", "MySQL"],
  },
  {
    group: "Infrastructure & DevOps",
    items: [
      "Linux (Ubuntu)",
      "Docker",
      "Kubernetes",
      "AWS",
      "Git",
      "Helm",
      "Jenkins",
      "Ansible",
      "eksctl",
      "Prometheus",
      "Terraform",
    ],
  },
  {
    group: "Core",
    items: [
      "DBMS",
      "OOPs",
      "Computer Networks",
      "Operating Systems",
      "Distributed Systems",
      "System Design",
    ],
  },
];

export const education = [
  {
    school: "National Institute of Technology, Rourkela",
    detail: "Bachelor of Technology (BTech)",
    period: "2021 – 2025",
    score: "CGPA 8.22",
  },
  {
    school: "Balaji Convent Jr College, Nagpur",
    detail: "Class XII",
    period: "2019 – 2020",
    score: "90.62%",
  },
];

export const achievements = [
  "Won the NorCalHacks Hackathon (social good theme), competing against 350 teams worldwide.",
  "Runner-Up at Major League Hacking (MLH) DragonHacks.",
  "Ranked in the top 4.3% worldwide in LeetCode Weekly Contests.",
];
