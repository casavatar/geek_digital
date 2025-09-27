import { ref, computed } from 'vue'
import type { Project, PersonalInfo } from '@/types'
import profileImage from '@/assets/profile.jpg'
import cvPdf from '@/assets/C.V. Eduardo C EN.pdf'

// Sample data - replace with your actual data
const personalInfo = ref<PersonalInfo>({
  name: 'Eduardo Castellanos',
  title: 'Data Engineer & Analyst',
  avatar: profileImage,
  tagline: 'Building innovative digital solutions that make a difference. Passionate about creating user-centered applications with modern technologies.',
  bio: 'Passionate data engineer with 10+ years of experience in building scalable data pipelines, implementing machine learning solutions, and creating actionable insights from complex datasets. Expert in Python, SQL, Apache Spark, and cloud platforms. Proven track record of delivering data-driven solutions that drive business growth and operational efficiency.',
  cvUrl: cvPdf
})

const projects = ref<Project[]>([
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    impact: 'Increased sales by 40%',
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>`,
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://geekdigital.site',
    githubUrl: 'https://github.com/casavatar'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team collaboration, and project tracking.',
    impact: 'Improved productivity by 60%',
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>`,
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    liveUrl: 'https://geekdigital.site',
    githubUrl: 'https://github.com/casavatar'
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard with location-based forecasts, interactive maps, and historical data visualization.',
    impact: 'Served 10K+ users',
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>`,
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'PWA'],
    liveUrl: 'https://geekdigital.site',
    githubUrl: 'https://github.com/casavatar'
  }
])

export function usePortfolioData() {
  // Personal Info Actions
  const updatePersonalInfo = (newInfo: Partial<PersonalInfo>) => {
    personalInfo.value = { ...personalInfo.value, ...newInfo }
  }

  const resetPersonalInfo = () => {
    // Reset to original data if needed
    personalInfo.value = {
      name: 'Eduardo Castellanos',
      title: 'Data Engineer & Analyst',
      avatar: profileImage,
      tagline: 'Building innovative digital solutions that make a difference. Passionate about creating user-centered applications with modern technologies.',
      bio: 'Passionate data engineer with 10+ years of experience in building scalable data pipelines, implementing machine learning solutions, and creating actionable insights from complex datasets. Expert in Python, SQL, Apache Spark, and cloud platforms. Proven track record of delivering data-driven solutions that drive business growth and operational efficiency.',
      cvUrl: cvPdf
    }
  }

  // Project Actions
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString() // Simple ID generation
    }
    projects.value.push(newProject)
    return newProject
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updates }
      return projects.value[index]
    }
    return null
  }

  const removeProject = (id: string) => {
    const index = projects.value.findIndex(p => p.id === id)
    if (index !== -1) {
      const removed = projects.value.splice(index, 1)[0]
      return removed
    }
    return null
  }

  const getProjectById = (id: string) => {
    return projects.value.find(p => p.id === id) || null
  }

  const getProjectsByTechnology = (technology: string) => {
    return projects.value.filter(p => 
      p.technologies.some(tech => 
        tech.toLowerCase().includes(technology.toLowerCase())
      )
    )
  }

  // Computed properties
  const projectCount = computed(() => projects.value.length)
  const allTechnologies = computed(() => {
    const techs = new Set<string>()
    projects.value.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech))
    })
    return Array.from(techs)
  })

  return {
    // State (readonly)
    personalInfo: computed(() => personalInfo.value),
    projects: computed(() => projects.value),
    
    // Computed
    projectCount,
    allTechnologies,
    
    // Personal Info Actions
    updatePersonalInfo,
    resetPersonalInfo,
    
    // Project Actions
    addProject,
    updateProject,
    removeProject,
    getProjectById,
    getProjectsByTechnology
  }
}
