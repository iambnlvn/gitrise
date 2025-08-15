import { User, Code, Settings, Zap } from "lucide-react";
import { Step, WizardData } from "./types";

export const STEPS: Step[] = [
  {
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: User,
    fields: ["fullName", "username", "bio", "location", "company", "website"],
  },
  {
    title: "Developer Profile",
    description: "Your technical background",
    icon: Code,
    fields: [
      "experienceLevel",
      "primaryRole",
      "programmingLanguages",
      "frameworks",
      "tools",
    ],
  },
  {
    title: "Interests & Goals",
    description: "What drives your development",
    icon: Zap,
    fields: ["interests", "primaryGoal", "projectTypes", "teamSize"],
  },
  {
    title: "Preferences",
    description: "Customize your experience",
    icon: Settings,
    fields: [
      "theme",
      "codeEditor",
      "workflowPreference",
      "collaborationStyle",
      "emailNotifications",
      "pushNotifications",
      "weeklyDigest",
      "securityAlerts",
    ],
  },
];

export const PROGRAMMING_LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "PHP",
  "Ruby",
  "Swift",
  "Kotlin",
  "Dart",
  "Scala",
  "R",
  "MATLAB",
];

export const FRAMEWORKS = [
  "React",
  "Vue.js",
  "Angular",
  "Next.js",
  "Nuxt.js",
  "Svelte",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "Laravel",
  "Ruby on Rails",
  "ASP.NET",
  "Flutter",
  "React Native",
  "Electron",
];

export const TOOLS = [
  "Git",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
  "Jenkins",
  "GitHub Actions",
  "Terraform",
  "Ansible",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "Elasticsearch",
  "Figma",
  "Sketch",
  "Postman",
  "Jira",
  "Slack",
  "Discord",
];

export const INTERESTS = [
  "Web Development",
  "Mobile Development",
  "DevOps",
  "Machine Learning",
  "AI",
  "Blockchain",
  "Game Development",
  "IoT",
  "Cybersecurity",
  "Data Science",
  "UI/UX Design",
  "Open Source",
  "Startups",
  "Enterprise",
  "Education",
];

export const PROJECT_TYPES = [
  "Web Apps",
  "Mobile Apps",
  "Desktop Apps",
  "APIs",
  "Libraries",
  "CLI Tools",
  "Games",
  "Data Analysis",
  "Machine Learning",
  "DevOps",
  "Security Tools",
  "Educational Content",
];

export const INITIAL_WIZARD_DATA: WizardData = {
  fullName: "",
  username: "",
  bio: "",
  location: "",
  company: "",
  website: "",
  experienceLevel: "",
  primaryRole: "",
  programmingLanguages: [],
  frameworks: [],
  tools: [],
  interests: [],
  theme: "system",
  codeEditor: "",
  workflowPreference: "",
  collaborationStyle: "",
  emailNotifications: true,
  pushNotifications: true,
  weeklyDigest: false,
  securityAlerts: true,
  primaryGoal: "",
  projectTypes: [],
  teamSize: "",
};

export const EXPERIENCE_LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
    desc: "0-2 years",
    icon: "🌱",
  },
  {
    value: "intermediate",
    label: "Intermediate",
    desc: "2-5 years",
    icon: "🚀",
  },
  {
    value: "senior",
    label: "Senior",
    desc: "5-10 years",
    icon: "⭐",
  },
  { value: "expert", label: "Expert", desc: "10+ years", icon: "👑" },
];

export const PRIMARY_ROLES = [
  { value: "frontend", label: "Frontend Developer", icon: "🎨" },
  { value: "backend", label: "Backend Developer", icon: "⚙️" },
  {
    value: "fullstack",
    label: "Full Stack Developer",
    icon: "🔧",
  },
  { value: "mobile", label: "Mobile Developer", icon: "📱" },
  { value: "devops", label: "DevOps Engineer", icon: "🚀" },
  { value: "data", label: "Data Scientist", icon: "📊" },
  { value: "ml", label: "ML Engineer", icon: "🤖" },
  { value: "security", label: "Security Engineer", icon: "🔒" },
  { value: "designer", label: "UI/UX Designer", icon: "✨" },
  { value: "manager", label: "Engineering Manager", icon: "👥" },
  { value: "student", label: "Student", icon: "🎓" },
  { value: "other", label: "Other", icon: "🌟" },
];

export const GOALS = [
  {
    value: "learning",
    label: "Learning & Skill Development",
    desc: "Expand your knowledge and master new technologies",
    icon: "📚",
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "career",
    label: "Career Advancement",
    desc: "Level up professionally and land better opportunities",
    icon: "📈",
    color: "from-green-500 to-emerald-500",
  },
  {
    value: "projects",
    label: "Building Personal Projects",
    desc: "Create amazing things and bring ideas to life",
    icon: "🛠️",
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "collaboration",
    label: "Team Collaboration",
    desc: "Work better with others and contribute to teams",
    icon: "🤝",
    color: "from-orange-500 to-red-500",
  },
  {
    value: "opensource",
    label: "Contributing to Open Source",
    desc: "Give back to the community and make an impact",
    icon: "🌍",
    color: "from-teal-500 to-blue-500",
  },
  {
    value: "business",
    label: "Building a Business/Startup",
    desc: "Entrepreneurial journey and creating value",
    icon: "🚀",
    color: "from-yellow-500 to-orange-500",
  },
];

export const TEAM_SIZES = [
  {
    value: "solo",
    label: "Solo Developer",
    desc: "I work best alone",
    icon: "🧑‍💻",
  },
  {
    value: "small",
    label: "Small Team (2-5 people)",
    desc: "Close-knit collaboration",
    icon: "👥",
  },
  {
    value: "medium",
    label: "Medium Team (6-15 people)",
    desc: "Balanced team dynamics",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    value: "large",
    label: "Large Team (16+ people)",
    desc: "Enterprise scale",
    icon: "🏢",
  },
  {
    value: "varies",
    label: "Varies by Project",
    desc: "Flexible approach",
    icon: "🔄",
  },
];
