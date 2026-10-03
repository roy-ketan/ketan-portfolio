// Single source of truth for site content. Everything here comes from the resume
// or from Ketan's public GitHub repos.

export const profile = {
  firstName: "Ketan",
  name: "Ketan Ratan Roy",
  initials: "KR",
  role: "Software Engineer",
  email: "ketanroy0866@gmail.com",
  resumeUrl: "/Ketan_Roy_Resume.pdf",
  timezone: "Asia/Kolkata",
  tzLabel: "IST",
  leetcode: "ketanroy01",
  bio: "I like building the parts of a system that have to hold up: backend services, data models and the pipelines around them. At Dassault Systèmes I write Python rule-automation services and work on core C++ modules, after an internship building a low-latency, NLP-driven backend that turns spoken commands into system actions. Outside work I build cloud-native and real-time AI projects, from an 8-microservice store on Amazon EKS to a voice agent that answers in under 1.2 seconds.",
};

export const links = {
  github: "https://github.com/roy-ketan",
  linkedin: "https://linkedin.com/in/ketan-roy/",
  leetcode: "https://leetcode.com/u/ketanroy01/",
  codeforces: "https://codeforces.com/profile/jets_psd",
};

export type Experience = {
  id: string;
  emoji: string;
  company: string;
  title: string;
  team: string;
  period: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  skills: string[];
  illustration: "rules" | "voice";
  tags: [string, string];
};

export const experience: Experience[] = [
  {
    id: "dassault-swe",
    emoji: "🧩",
    company: "Dassault Systèmes",
    title: "Software Engineer",
    team: "Dassault Systèmes",
    period: "Jun 2025 to Present",
    current: true,
    summary:
      "Backend work in Python and C++: rule-automation services that validate complex system constraints, core data-modeling modules, and access control.",
    bullets: [
      "Designed and delivered scalable Python-based rule automation services to validate complex system constraints, reducing manual verification effort and improving consistency across distributed environments.",
      "Developed backend business logic in Python with domain-specific languages that enforce system invariants, improving validation correctness and lowering error rates by 30%.",
      "Contributed to core C++ modules for structured data modeling and transformations, upgrading legacy backend logic by replacing deprecated APIs for better performance, reliability and long-term stability.",
      "Implemented policy-based access control for object and attribute-level permissions, and integrated security updates into Git-driven CI/CD pipelines for consistent, version-controlled deployments.",
    ],
    skills: ["Python", "C++", "DSLs", "Access Control", "CI/CD", "Git"],
    illustration: "rules",
    tags: ["⚙️ RULE AUTOMATION · PYTHON", "BACKEND"],
  },
  {
    id: "dassault-intern",
    emoji: "🎙️",
    company: "Dassault Systèmes",
    title: "Software Engineer Intern",
    team: "Dassault Systèmes",
    period: "Jan 2025 to Jun 2025",
    summary:
      "A real-time, low-latency backend for hands-free work: natural language in, structured system actions out.",
    bullets: [
      "Contributed to a real-time, low-latency, NLP-driven backend system that enabled hands-free execution of structured commands through natural language input.",
      "Designed a command-processing pipeline using modern NLP techniques, achieving 97%+ intent accuracy.",
      "Integrated an EKL and Python-based API layer to execute system actions programmatically, enabling automated backend workflows.",
      "Optimized speech-to-text components to reduce response time by 30%, enabling low-latency, concurrent command execution.",
    ],
    skills: ["Python", "NLP", "EKL", "Speech-to-Text"],
    illustration: "voice",
    tags: ["🎙️ VOICE → INTENT → ACTION", "NLP"],
  },
];

export const skills: { emoji: string; title: string; items: string[] }[] = [
  { emoji: "⚡", title: "Languages", items: ["Python", "C++", "C", "Java", "Go"] },
  {
    emoji: "🎨",
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "HTML", "CSS", "Tailwind CSS", "Material UI"],
  },
  {
    emoji: "🧩",
    title: "Backend & Data",
    items: ["Django REST Framework", "REST APIs", "PostgreSQL", "MySQL"],
  },
  {
    emoji: "☁️",
    title: "Infra & DevOps",
    items: ["Linux", "Docker", "Kubernetes", "AWS", "Git", "Helm", "Jenkins", "Ansible", "eksctl", "Prometheus", "Terraform"],
  },
  {
    emoji: "🧠",
    title: "Core CS",
    items: ["DBMS", "OOP", "Computer Networks", "Operating Systems", "Distributed Systems", "System Design"],
  },
];

export type Project = {
  emoji: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  href: string;
};

export const projects: Project[] = [
  {
    emoji: "🛒",
    title: "CloudCart",
    date: "Mar 2025",
    description:
      "Production-grade 3-tier e-commerce platform: 8 microservices and 2 databases on Amazon EKS, deployed with Docker, Helm and eksctl behind an ALB Ingress for zero-downtime updates.",
    tags: ["Kubernetes", "AWS EKS", "Helm", "Docker"],
    href: "https://github.com/roy-ketan/cloud-Native-ECommerce",
  },
  {
    emoji: "📞",
    title: "DriveCall AI",
    date: "Mar 2024",
    description:
      "Real-time AI voice agent for automotive call centers. Handles 20+ concurrent sessions with LiveKit, GPT-4 and Deepgram, with 95%+ speech detection and replies under 1.2 seconds.",
    tags: ["Python", "LiveKit", "GPT-4", "Deepgram"],
    href: "https://github.com/roy-ketan/DriveCall-AI",
  },
  {
    emoji: "✍️",
    title: "StudyLink",
    date: "Oct 2024",
    description:
      "Student collaboration platform with study groups of up to 50, Q&A and video solutions, plus an Air Canvas you draw on with hand gestures (OpenCV + MediaPipe).",
    tags: ["Django", "OpenCV", "MediaPipe"],
    href: "https://github.com/roy-ketan/StudyLink",
  },
  {
    emoji: "📄",
    title: "CareerFit",
    date: "Oct 2024",
    description:
      "Resume screening app: upload a resume and a TF-IDF + scikit-learn classifier predicts the job category it fits. Built with Streamlit and NLTK.",
    tags: ["Python", "scikit-learn", "Streamlit", "NLP"],
    href: "https://github.com/roy-ketan/careerfit",
  },
  {
    emoji: "🖼️",
    title: "PromptPic",
    date: "Sep 2024",
    description:
      "Flask web app that turns a text prompt into a set of images using the OpenAI Images API.",
    tags: ["Python", "Flask", "OpenAI"],
    href: "https://github.com/roy-ketan/PromptPic",
  },
  {
    emoji: "📅",
    title: "Events Project",
    date: "Sep 2024",
    description:
      "Full-stack app to create, view, edit and delete events on a personal calendar. Django REST backend with a React (Vite) frontend and protected routes.",
    tags: ["Django REST", "React", "Vite"],
    href: "https://github.com/roy-ketan/Events_project",
  },
  {
    emoji: "📝",
    title: "BlogXPress",
    date: "Nov 2023",
    description:
      "Django blog with authentication, draft and published posts, and comments.",
    tags: ["Python", "Django"],
    href: "https://github.com/roy-ketan/Blog-Project",
  },
  {
    emoji: "🗺️",
    title: "TourismPlanner",
    date: "Jul 2024",
    description: "React app for browsing Indian tour destinations with descriptions and prices.",
    tags: ["React", "JavaScript"],
    href: "https://github.com/roy-ketan/TourismPlanner",
  },
];

export const education = [
  {
    emoji: "🎓",
    label: "NIT ROURKELA",
    degree: "B.Tech",
    school: "National Institute of Technology, Rourkela",
    period: "2021 to 2025",
    description:
      "Graduated with a CGPA of 8.22. Where the fundamentals came from: DBMS, OOP, operating systems, computer networks and distributed systems.",
  },
  {
    emoji: "📘",
    label: "CLASS XII",
    degree: "Higher Secondary (Class XII)",
    school: "Balaji Convent Jr College, Nagpur",
    period: "2019 to 2020",
    description: "Finished Class XII with 90.62%.",
  },
];

export const achievements = [
  {
    emoji: "🏆",
    title: "NorCalHacks · Winner",
    description: "Won the NorCalHacks hackathon, themed around social good, against 350 teams worldwide.",
  },
  {
    emoji: "🥈",
    title: "MLH DragonHacks · Runner-Up",
    description: "Runner-up at DragonHacks, a Major League Hacking hackathon.",
  },
  {
    emoji: "⚡",
    title: "LeetCode · Top 4.3%",
    description: "Placed in the top 4.3% worldwide in the LeetCode Weekly Contest.",
  },
];
