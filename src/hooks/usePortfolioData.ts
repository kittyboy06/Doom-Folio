import portfolioRawData from '../data/portfolio.json';
import { PortfolioData, ProjectItem, SkillCategory } from '../types/portfolio';

const portfolioData = portfolioRawData as unknown as PortfolioData;

export function usePortfolioData() {
  const getFeaturedProjects = (): ProjectItem[] => {
    // Top primary projects as identified in the creative brief
    const featuredIds = ['aether', 'signbridge-ai', 'aether-console', 'musubi', 'cipher-quest-os', 'kitchen-chaos', 'neurocart', 'arise-irl'];
    return portfolioData.projects.filter(p => featuredIds.includes(p.id));
  };

  const getAllProjects = (): ProjectItem[] => {
    return portfolioData.projects;
  };

  const getProjectById = (id: string): ProjectItem | undefined => {
    return portfolioData.projects.find(p => p.id === id);
  };

  const getSkills = (): SkillCategory[] => {
    return portfolioData.skills.categories;
  };

  return {
    data: portfolioData,
    hero: portfolioData.hero,
    about: portfolioData.about,
    achievements: portfolioData.achievements,
    skills: getSkills(),
    projects: getAllProjects(),
    featuredProjects: getFeaturedProjects(),
    timeline: portfolioData.timeline,
    certifications: portfolioData.certifications,
    contact: portfolioData.contact,
    footer: portfolioData.footer,
    getProjectById,
  };
}
