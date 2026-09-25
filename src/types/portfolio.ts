export interface HeroInfo {
  name: string;
  tagline: string;
  roles: string[];
  github: string;
  linkedin: string;
  leetcode: string;
  email: string;
  resumeUrl: string;
}

export interface StatItem {
  label: string;
  value: string;
  icon: string;
}

export interface AboutInfo {
  bio: string;
  stats: StatItem[];
  leetcodeUrl: string;
}

export interface AchievementItem {
  title: string;
  year: string;
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  category: string;
  github: string;
  demo: string;
}

export interface TimelineItem {
  title: string;
  org: string;
  date: string;
  description: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
}

export interface FooterInfo {
  year: string;
  name: string;
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  hero: HeroInfo;
  about: AboutInfo;
  achievements: AchievementItem[];
  skills: {
    categories: SkillCategory[];
  };
  projects: ProjectItem[];
  timeline: TimelineItem[];
  certifications: CertificationItem[];
  contact: ContactInfo;
  footer: FooterInfo;
}
