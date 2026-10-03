// Single source of truth for site content (all taken from the resume).
// In bullet text, **double asterisks** mark the bold keywords.

export const profile = {
  name: "Ketan Ratan Roy",
  initials: "KR",
  tagline: "Backend engineer, focused on systems that stay up",
  email: "ketanroy0866@gmail.com",
  resumeUrl: "/Ketan_Roy_Resume.pdf",
  github: "roy-ketan",
  // Drop a photo in /public and set this (e.g. "/me.jpg") to replace the initials avatar.
  photo: null as string | null,
};

export type IconName =
  | "github"
  | "linkedin"
  | "leetcode"
  | "codeforces"
  | "mail"
  | "resume"
  | "briefcase"
  | "code"
  | "trophy"
  | "medal"
  | "award"
  | "graduation"
  | "school"
  | "building";

export const overview: { icon: IconName; before?: string; label: string; href: string; after?: string }[] = [
  { icon: "briefcase", before: "Software Engineer", label: "@Dassault Systèmes", href: "https://www.3ds.com/" },
  { icon: "code", before: "Ex-Intern", label: "@Dassault Systèmes", href: "https://www.3ds.com/" },
  { icon: "trophy", before: "Winner", label: "@NorCalHacks", href: "https://norcalhacks.org/" },
  { icon: "medal", before: "Runner-up", label: "@MLH DragonHacks", href: "https://mlh.io/" },
  { icon: "leetcode", before: "Top 4.3%", label: "@LeetCode", href: "https://leetcode.com/u/ketanroy01/" },
  { icon: "graduation", label: "NIT Rkl'25", href: "https://nitrkl.ac.in/" },
];

export const socials: { icon: IconName; label: string; href: string }[] = [
  { icon: "github", label: "GitHub", href: "https://github.com/roy-ketan" },
  { icon: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/ketan-roy/" },
  { icon: "leetcode", label: "LeetCode", href: "https://leetcode.com/u/ketanroy01/" },
  { icon: "codeforces", label: "Codeforces", href: "https://codeforces.com/profile/jets_psd" },
  { icon: "mail", label: "Email", href: "mailto:ketanroy0866@gmail.com" },
  { icon: "resume", label: "Resume", href: "/Ketan_Roy_Resume.pdf" },
];

export type Role = {
  title: string;
  type: string;
  period: string;
  icon: IconName;
  bullets: string[];
  skills: string[];
};

export const experience: {
  id: string;
  company: string;
  href: string;
  current: boolean;
  roles: Role[];
}[] = [
  {
    id: "dassault-systemes",
    company: "Dassault Systèmes",
    href: "https://www.3ds.com/",
    current: true,
    roles: [
      {
        title: "Software Engineer",
        type: "Full-time",
        period: "Jun 2025 — Present",
        icon: "code",
        bullets: [
          "Designed and delivered **scalable Python-based rule automation services** to validate complex system constraints, reducing manual verification effort and improving consistency across distributed environments.",
          "Developed **backend business logic** in Python with domain-specific languages that enforce system invariants, improving validation correctness and lowering error rates by **30%**.",
          "Contributed to **core C++ modules** for structured data modeling and transformations, upgrading legacy backend logic by replacing deprecated APIs for better performance, reliability and long-term stability.",
          "Implemented policy-based **access control systems** for object and attribute-level permissions, integrating security updates into Git-driven **CI/CD pipelines** for consistent, version-controlled deployments.",
        ],
        skills: ["Python", "C++", "DSLs", "Access Control", "CI/CD", "Git"],
      },
      {
        title: "Software Engineer Intern",
        type: "Internship",
        period: "Jan — Jun 2025",
        icon: "briefcase",
        bullets: [
          "Contributed to a **real-time, low-latency, NLP-driven backend system** enabling hands-free execution of structured commands through natural language input.",
          "Designed a **command-processing pipeline** using modern NLP techniques, achieving **97%+** intent accuracy.",
          "Integrated an **EKL and Python-based API** layer to execute system actions programmatically, enabling automated backend workflows.",
          "Optimized **speech-to-text** components to cut response time by **30%**, enabling low-latency, concurrent command execution.",
        ],
        skills: ["Python", "NLP", "EKL", "Speech-to-Text"],
      },
    ],
  },
];

export const projects: {
  id: string;
  name: string;
  subtitle: string;
  date: string;
  skills: string[];
  bullets: string[];
}[] = [
  {
    id: "cloudcart",
    name: "CloudCart",
    subtitle: "Cloud-native e-commerce on EKS",
    date: "Mar 2025",
    skills: ["Kubernetes", "Amazon EKS", "Docker", "Helm", "eksctl", "AWS"],
    bullets: [
      "Built and deployed a production-grade **3-tier** e-commerce platform with **8 microservices and 2 databases on Amazon EKS**, using Kubernetes for scalable orchestration.",
      "Containerized and automated deployments with **Docker, Helm and eksctl**, streamlining infrastructure setup and **CI/CD workflows**.",
      "Configured **AWS ECR, IAM OIDC and the ALB Ingress Controller** for secure image handling, high availability and zero-downtime updates.",
    ],
  },
  {
    id: "studylink",
    name: "StudyLink",
    subtitle: "Interactive student collaboration platform",
    date: "Oct 2024",
    skills: ["Django", "OpenCV", "MediaPipe", "Python"],
    bullets: [
      "Led the design and deployment of StudyLink, letting students form **study groups** of up to **50** members, post academic questions and exchange **video solutions**.",
      "Developed a real-time drawing tool using **OpenCV and MediaPipe** for **hand gesture** recognition.",
      "Integrated the **Air Canvas** feature into a **Django app** for hands-free interaction on the platform.",
    ],
  },
  {
    id: "drivecall-ai",
    name: "DriveCall AI",
    subtitle: "AI voice agent for automotive call centers",
    date: "Mar 2024",
    skills: ["LiveKit", "OpenAI GPT-4", "Deepgram", "Silero VAD", "Python"],
    bullets: [
      "Built a real-time AI voice agent handling **20+ concurrent sessions** using **LiveKit, OpenAI GPT-4 and Deepgram STT**.",
      "Achieved **95%+ speech detection accuracy** with Silero VAD, supporting natural turn-taking and fewer interruptions.",
      "Implemented end-to-end TTS and STT pipelines with OpenAI and Deepgram, producing human-like responses with **latency under 1.2 seconds**.",
    ],
  },
];

// `icon` is a simple-icons slug key (see components/Icons.tsx); omit for concept-only chips.
export const stack: { id: string; group: string; items: { name: string; icon?: string; href?: string }[] }[] = [
  {
    id: "languages",
    group: "Languages",
    items: [
      { name: "Python", icon: "python", href: "https://www.python.org" },
      { name: "C++", icon: "cplusplus", href: "https://isocpp.org" },
      { name: "C", icon: "c" },
      { name: "Java", icon: "openjdk", href: "https://openjdk.org" },
      { name: "Go", icon: "go", href: "https://go.dev" },
    ],
  },
  {
    id: "frontend",
    group: "Frontend",
    items: [
      { name: "React", icon: "react", href: "https://react.dev" },
      { name: "Next.js", icon: "nextdotjs", href: "https://nextjs.org" },
      { name: "TypeScript", icon: "typescript", href: "https://www.typescriptlang.org" },
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwindcss", href: "https://tailwindcss.com" },
      { name: "Material UI", icon: "mui", href: "https://mui.com" },
    ],
  },
  {
    id: "backend",
    group: "Backend",
    items: [
      { name: "Django REST", icon: "django", href: "https://www.django-rest-framework.org" },
      { name: "REST APIs" },
      { name: "PostgreSQL", icon: "postgresql", href: "https://www.postgresql.org" },
      { name: "MySQL", icon: "mysql", href: "https://www.mysql.com" },
    ],
  },
  {
    id: "devops",
    group: "Infra & DevOps",
    items: [
      { name: "Linux", icon: "ubuntu" },
      { name: "Docker", icon: "docker", href: "https://www.docker.com" },
      { name: "Kubernetes", icon: "kubernetes", href: "https://kubernetes.io" },
      { name: "AWS", icon: "cloud", href: "https://aws.amazon.com" },
      { name: "Git", icon: "git", href: "https://git-scm.com" },
      { name: "Helm", icon: "helm", href: "https://helm.sh" },
      { name: "Jenkins", icon: "jenkins", href: "https://www.jenkins.io" },
      { name: "Ansible", icon: "ansible", href: "https://www.ansible.com" },
      { name: "Prometheus", icon: "prometheus", href: "https://prometheus.io" },
      { name: "Terraform", icon: "terraform", href: "https://www.terraform.io" },
    ],
  },
  {
    id: "core",
    group: "Core",
    items: [
      { name: "DBMS" },
      { name: "OOP" },
      { name: "Computer Networks" },
      { name: "Operating Systems" },
      { name: "Distributed Systems" },
      { name: "System Design" },
    ],
  },
];

export const education = [
  {
    id: "nit-rourkela",
    school: "National Institute of Technology, Rourkela",
    href: "https://nitrkl.ac.in/",
    icon: "graduation" as IconName,
    period: ["2021", "2025"],
    degree: "B.Tech",
    score: "CGPA 8.22",
    skills: ["C++", "Python", "DBMS", "Operating Systems", "Computer Networks"],
  },
  {
    id: "balaji-convent",
    school: "Balaji Convent Jr College, Nagpur",
    icon: "school" as IconName,
    period: ["2019", "2020"],
    degree: "Class XII",
    score: "90.62%",
    skills: [] as string[],
  },
];

export const awards: { title: string; prize: string; category: string; icon: IconName; href?: string }[] = [
  {
    title: "NorCalHacks Hackathon",
    prize: "Winner — 350 teams worldwide",
    category: "Hackathon · Social good",
    icon: "trophy",
  },
  {
    title: "DragonHacks — Major League Hacking",
    prize: "Runner Up",
    category: "Hackathon",
    icon: "medal",
  },
  {
    title: "LeetCode Weekly Contest",
    prize: "Top 4.3% worldwide",
    category: "Competitive Programming",
    icon: "award",
    href: "https://leetcode.com/u/ketanroy01/",
  },
];
