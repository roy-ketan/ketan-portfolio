import type { ReactNode } from "react";
import { Icons } from "@/components/icons";
import { House, Library } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";
import { Cpp } from "@/components/ui/svgs/cpp";
import { Java } from "@/components/ui/svgs/java";
import { Golang } from "@/components/ui/svgs/golang";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Kubernetes } from "@/components/ui/svgs/kubernetes";

type HackathonLink = { title: string; href: string; icon: ReactNode };

export const DATA = {
  name: "Ketan Ratan Roy - Software Engineer",
  initials: "KR",
  url: "https://ketan-portfolio.vercel.app",
  location: "India",
  locationLink: "https://www.google.com/maps/place/india",
  description:
    "Software engineer at Dassault Systèmes. I build backend services in Python and C++, cloud-native infrastructure and real-time voice AI.",
  summary:
    "I like building the parts of a system that have to hold up: backend services, data models and the pipelines around them. I work at Dassault Systèmes, where I write Python rule-automation services and contribute to core C++ modules, after [an internship building a low-latency, NLP-driven backend](/#work) that turns spoken commands into system actions. I [graduated from NIT Rourkela](/#education), [won NorCalHacks and placed second at MLH DragonHacks](/#hackathons), and have solved 500+ problems on LeetCode (top 4.3% in a weekly contest). Outside work I build [cloud-native and real-time AI projects](/#projects), from an 8-microservice store on Amazon EKS to a voice agent that answers in under 1.2 seconds. You can also [download my résumé](/Ketan_Roy_Resume.pdf).",
  avatarUrl: "/avatar.svg",
  ogImage: "/og_image.png",
  sections: {
    about: { order: 1, enabled: true, heading: "About" },
    work: { order: 2, enabled: true, heading: "Work Experience", presentLabel: "Present" },
    education: { order: 3, enabled: true, heading: "Education" },
    skills: { order: 4, enabled: true, heading: "Skills" },
    projects: {
      order: 5,
      enabled: true,
      label: "My Projects",
      heading: "Check out my latest work",
      text: "From a production-style Kubernetes e-commerce platform to a real-time AI voice agent, here are the projects I'm proudest of.",
    },
    hackathons: {
      order: 6,
      enabled: true,
      label: "Hackathons",
      heading: "I like building things",
      text: "I've taken part in {count} hackathons so far, where small teams build and ship a working product in a weekend. They taught me to scope hard, move fast and demo with confidence.",
    },
    photos: {
      order: 7,
      enabled: false,
      heading: "My Recent Travels",
    },
    contact: {
      order: 8,
      enabled: true,
      label: "Contact",
      heading: "Get in Touch",
      text: "Want to chat about a project, a role or just say hi? Email me and I'll get back to you as soon as I can.",
    },
  },
  photos: [] as { src: string; alt: string }[],
  skills: [
    { name: "Python", icon: Python },
    { name: "C++", icon: Cpp },
    { name: "Java", icon: Java },
    { name: "Go", icon: Golang },
    { name: "TypeScript", icon: Typescript },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Docker", icon: Docker },
    { name: "Kubernetes", icon: Kubernetes },
  ],
  navbar: [
    { href: "/", icon: House, label: "Home" },
    { href: "/blog", icon: Library, label: "Blog" },
  ],
  contact: {
    email: "ketanroy0866@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/roy-ketan",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/ketan-roy/",
        icon: Icons.linkedin,
        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/u/ketanroy01/",
        icon: Icons.leetcode,
        navbar: true,
      },
      Codeforces: {
        name: "Codeforces",
        url: "https://codeforces.com/profile/jets_psd",
        icon: Icons.codeforces,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:ketanroy0866@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Dassault Systèmes",
      href: "https://www.3ds.com",
      badges: [] as string[],
      location: "India",
      title: "Software Engineer",
      logoUrl: "https://www.google.com/s2/favicons?domain=3ds.com&sz=128",
      start: "June 2025",
      end: undefined,
      description:
        "Backend engineering in Python and C++. Designed and delivered scalable Python rule-automation services that validate complex system constraints, and wrote domain-specific-language business logic that enforces system invariants, lowering error rates by 30%. Contributed to core C++ modules for structured data modeling, replacing deprecated APIs in legacy backend logic for better performance and reliability. Implemented policy-based access control for object and attribute-level permissions and shipped security updates through Git-driven CI/CD pipelines.",
    },
    {
      company: "Dassault Systèmes",
      href: "https://www.3ds.com",
      badges: [] as string[],
      location: "India",
      title: "Software Engineer Intern",
      logoUrl: "https://www.google.com/s2/favicons?domain=3ds.com&sz=128",
      start: "January 2025",
      end: "June 2025",
      description:
        "Built a real-time, low-latency, NLP-driven backend for hands-free work: natural-language commands in, structured system actions out. Designed the command-processing pipeline with modern NLP techniques, reaching 97%+ intent accuracy, and integrated an EKL and Python API layer to execute actions programmatically. Optimized the speech-to-text components to cut response time by 30%, enabling low-latency, concurrent command execution.",
    },
  ],
  education: [
    {
      school: "National Institute of Technology, Rourkela",
      href: "https://www.nitrkl.ac.in",
      degree: "B.Tech, CGPA 8.22",
      logoUrl: "https://www.google.com/s2/favicons?domain=nitrkl.ac.in&sz=128",
      start: "2021",
      end: "2025",
    },
    {
      school: "Balaji Convent Jr College, Nagpur",
      href: "https://www.google.com/search?q=Balaji+Convent+Junior+College+Nagpur",
      degree: "Higher Secondary (Class XII), 90.62%",
      logoUrl: "https://avatar.vercel.sh/balaji-convent?size=40",
      start: "2019",
      end: "2020",
    },
  ],
  projects: [
    {
      title: "CloudCart",
      href: "https://github.com/roy-ketan/cloud-Native-ECommerce",
      dates: "March 2025",
      active: false,
      description:
        "Production-grade 3-tier e-commerce platform: 8 microservices and 2 databases on Amazon EKS, deployed with Docker, Helm and eksctl behind an ALB Ingress for zero-downtime updates.",
      technologies: ["Kubernetes", "AWS EKS", "Helm", "Docker"],
      links: [
        {
          type: "Source",
          href: "https://github.com/roy-ketan/cloud-Native-ECommerce",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "DriveCall AI",
      href: "https://github.com/roy-ketan/DriveCall-AI",
      dates: "March 2024",
      active: false,
      description:
        "Real-time AI voice agent for automotive call centers. Handles 20+ concurrent sessions with LiveKit, GPT-4 and Deepgram, with 95%+ speech detection and replies under 1.2 seconds.",
      technologies: ["Python", "LiveKit", "GPT-4", "Deepgram"],
      links: [
        {
          type: "Source",
          href: "https://github.com/roy-ketan/DriveCall-AI",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "StudyLink",
      href: "https://github.com/roy-ketan/StudyLink",
      dates: "October 2024",
      active: false,
      description:
        "Student collaboration platform with study groups of up to 50, Q&A and video solutions, plus an Air Canvas you draw on with hand gestures using OpenCV and MediaPipe.",
      technologies: ["Django", "OpenCV", "MediaPipe"],
      links: [
        {
          type: "Source",
          href: "https://github.com/roy-ketan/StudyLink",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "CareerFit",
      href: "https://github.com/roy-ketan/careerfit",
      dates: "October 2024",
      active: false,
      description:
        "Resume screening app: upload a resume and a TF-IDF + scikit-learn classifier predicts the job category it fits. Built with Streamlit and NLTK.",
      technologies: ["Python", "scikit-learn", "Streamlit", "NLP"],
      links: [
        {
          type: "Source",
          href: "https://github.com/roy-ketan/careerfit",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "PromptPic",
      href: "https://github.com/roy-ketan/PromptPic",
      dates: "September 2024",
      active: false,
      description:
        "Flask web app that turns a text prompt into a set of images using the OpenAI Images API.",
      technologies: ["Python", "Flask", "OpenAI"],
      links: [
        {
          type: "Source",
          href: "https://github.com/roy-ketan/PromptPic",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Events Project",
      href: "https://github.com/roy-ketan/Events_project",
      dates: "September 2024",
      active: false,
      description:
        "Full-stack app to create, view, edit and delete events on a personal calendar. Django REST backend with a React (Vite) frontend and protected routes.",
      technologies: ["Django REST", "React", "Vite"],
      links: [
        {
          type: "Source",
          href: "https://github.com/roy-ketan/Events_project",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "NorCalHacks",
      dates: "",
      location: "",
      description:
        "Won NorCalHacks, a hackathon themed around social good, against 350 teams worldwide.",
      image: "https://avatar.vercel.sh/norcalhacks?size=40",
      win: "Winner",
      links: [] as HackathonLink[],
    },
    {
      title: "MLH DragonHacks",
      dates: "",
      location: "",
      description: "Runner-up at DragonHacks, a Major League Hacking hackathon.",
      image: "https://avatar.vercel.sh/dragonhacks?size=40",
      win: "Runner-Up",
      links: [] as HackathonLink[],
    },
  ],
};
