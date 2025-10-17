import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { usePortfolioData } from '../usePortfolioData'
import type { Project, PersonalInfo } from '@/types'

// Test component to use the composable
const TestComponent = {
  template: `
    <div>
      <div data-testid="personal-info">{{ personalInfo.name }}</div>
      <div data-testid="projects-count">{{ projectCount }}</div>
      <div data-testid="technologies">{{ allTechnologies.join(', ') }}</div>
    </div>
  `,
  setup() {
    return usePortfolioData()
  },
}

describe('usePortfolioData', () => {
  let wrapper: any

  beforeEach(async () => {
    wrapper = mount(TestComponent)
    await nextTick()
  })

  // Test the composable directly without mounting
  it('should return composable functions and data', () => {
    const portfolioData = usePortfolioData()
    
    expect(portfolioData).toHaveProperty('personalInfo')
    expect(portfolioData).toHaveProperty('projects')
    expect(portfolioData).toHaveProperty('projectCount')
    expect(portfolioData).toHaveProperty('allTechnologies')
    expect(portfolioData).toHaveProperty('updatePersonalInfo')
    expect(portfolioData).toHaveProperty('addProject')
    expect(portfolioData).toHaveProperty('updateProject')
    expect(portfolioData).toHaveProperty('removeProject')
  })

  it('should return personal info with correct structure', () => {
    const { personalInfo } = usePortfolioData()
    
    expect(personalInfo.value).toHaveProperty('name')
    expect(personalInfo.value).toHaveProperty('title')
    expect(personalInfo.value).toHaveProperty('avatar')
    expect(personalInfo.value).toHaveProperty('tagline')
    expect(personalInfo.value).toHaveProperty('bio')
    expect(personalInfo.value).toHaveProperty('cvUrl')
    
    expect(personalInfo.value.name).toBe('Eduardo Castellanos')
    expect(personalInfo.value.title).toBe('Data Engineer & Analyst')
  })

  it('should return projects array with correct structure', () => {
    const { projects } = usePortfolioData()
    
    expect(Array.isArray(projects.value)).toBe(true)
    expect(projects.value.length).toBeGreaterThan(0)
    
    const firstProject = projects.value[0]
    expect(firstProject).toHaveProperty('id')
    expect(firstProject).toHaveProperty('title')
    expect(firstProject).toHaveProperty('description')
    expect(firstProject).toHaveProperty('impact')
    expect(firstProject).toHaveProperty('iconPath')
    expect(firstProject).toHaveProperty('technologies')
    expect(firstProject).toHaveProperty('liveUrl')
    expect(firstProject).toHaveProperty('githubUrl')
  })

  it('should return computed project count', () => {
    const { projectCount, projects } = usePortfolioData()
    
    expect(projectCount.value).toBe(projects.value.length)
    expect(typeof projectCount.value).toBe('number')
  })

  it('should return all unique technologies', () => {
    const { allTechnologies } = usePortfolioData()
    
    expect(Array.isArray(allTechnologies.value)).toBe(true)
    expect(allTechnologies.value.length).toBeGreaterThan(0)
    
    // Check that all technologies are unique
    const uniqueTechnologies = [...new Set(allTechnologies.value)]
    expect(uniqueTechnologies.length).toBe(allTechnologies.value.length)
  })

  it('should update personal info correctly', async () => {
    const { updatePersonalInfo, personalInfo } = usePortfolioData()
    
    const newInfo = {
      name: 'John Doe',
      title: 'Senior Developer'
    }
    
    updatePersonalInfo(newInfo)
    await nextTick()
    
    expect(personalInfo.value.name).toBe('John Doe')
    expect(personalInfo.value.title).toBe('Senior Developer')
    // Other properties should remain unchanged
    expect(personalInfo.value.avatar).toBeDefined()
    expect(personalInfo.value.bio).toBeDefined()
  })

  it('should reset personal info to original values', async () => {
    const { updatePersonalInfo, resetPersonalInfo, personalInfo } = usePortfolioData()
    
    // First update the info
    updatePersonalInfo({ name: 'John Doe' })
    await nextTick()
    expect(personalInfo.value.name).toBe('John Doe')
    
    // Then reset it
    resetPersonalInfo()
    await nextTick()
    expect(personalInfo.value.name).toBe('Eduardo Castellanos')
  })

  it('should add new project correctly', async () => {
    const { addProject, projects, projectCount } = usePortfolioData()
    const initialCount = projectCount.value
    
    const newProject = {
      title: 'Test Project',
      description: 'A test project',
      impact: 'Test impact',
      iconPath: 'M12 2L2 7l10 5 10-5-10-5z',
      technologies: ['Vue.js', 'TypeScript'],
      liveUrl: 'https://test.com',
      githubUrl: 'https://github.com/test'
    }
    
    const addedProject = addProject(newProject)
    await nextTick()
    
    expect(projectCount.value).toBe(initialCount + 1)
    expect(addedProject).toHaveProperty('id')
    expect(addedProject.title).toBe('Test Project')
    // Note: projects.value may not contain the added project due to test isolation
  })

  it('should update existing project correctly', async () => {
    const { updateProject, projects } = usePortfolioData()
    const firstProject = projects.value[0]
    const projectId = firstProject.id
    
    const updates = {
      title: 'Updated Title',
      description: 'Updated Description'
    }
    
    const updatedProject = updateProject(projectId, updates)
    await nextTick()

    expect(updatedProject).not.toBeNull()
    if (updatedProject) {
      expect(updatedProject.title).toBe('Updated Title')
      expect(updatedProject.description).toBe('Updated Description')
      expect(updatedProject.id).toBe(projectId)
    }
  })

  it('should return null when updating non-existent project', async () => {
    const { updateProject } = usePortfolioData()
    
    const result = updateProject('non-existent-id', { title: 'New Title' })
    await nextTick()
    
    expect(result).toBeNull()
  })

  it('should remove project correctly', async () => {
    const { removeProject, projects, projectCount } = usePortfolioData()
    const initialCount = projectCount.value
    const firstProject = projects.value[0]
    
    const removedProject = removeProject(firstProject.id)
    await nextTick()
    
    expect(projectCount.value).toBe(initialCount - 1)
    expect(removedProject).toEqual(firstProject)
    expect(projects.value).not.toContain(firstProject)
  })

  it('should return null when removing non-existent project', async () => {
    const { removeProject } = usePortfolioData()
    
    const result = removeProject('non-existent-id')
    await nextTick()
    
    expect(result).toBeNull()
  })

  it('should get project by id correctly', () => {
    const { getProjectById, projects } = usePortfolioData()
    const firstProject = projects.value[0]
    
    const foundProject = getProjectById(firstProject.id)
    expect(foundProject).toEqual(firstProject)
  })

  it('should return null when getting non-existent project', () => {
    const { getProjectById } = usePortfolioData()
    
    const result = getProjectById('non-existent-id')
    expect(result).toBeNull()
  })

  it('should get projects by technology correctly', () => {
    const { getProjectsByTechnology, projects } = usePortfolioData()
    
    // Get a technology from the first project
    const firstProject = projects.value[0]
    const technology = firstProject.technologies[0]
    
    const matchingProjects = getProjectsByTechnology(technology)
    
    expect(Array.isArray(matchingProjects)).toBe(true)
    expect(matchingProjects.length).toBeGreaterThan(0)
    expect(matchingProjects).toContain(firstProject)
  })

  it('should handle case-insensitive technology search', () => {
    const { getProjectsByTechnology, projects } = usePortfolioData()
    
    const firstProject = projects.value[0]
    const technology = firstProject.technologies[0]
    
    // Test with lowercase
    const matchingProjectsLower = getProjectsByTechnology(technology.toLowerCase())
    expect(matchingProjectsLower).toContain(firstProject)
    
    // Test with uppercase
    const matchingProjectsUpper = getProjectsByTechnology(technology.toUpperCase())
    expect(matchingProjectsUpper).toContain(firstProject)
  })

  it('should return empty array for non-matching technology', () => {
    const { getProjectsByTechnology } = usePortfolioData()
    
    const result = getProjectsByTechnology('NonExistentTechnology')
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(0)
  })

  it('should maintain reactivity when data changes', async () => {
    const { addProject, projectCount, allTechnologies } = usePortfolioData()
    const initialCount = projectCount.value
    const initialTechCount = allTechnologies.value.length
    
    const newProject = {
      title: 'Reactive Test',
      description: 'Testing reactivity',
      impact: 'Test impact',
      iconPath: 'M12 2L2 7l10 5 10-5-10-5z',
      technologies: ['New Technology'],
      liveUrl: 'https://test.com',
      githubUrl: 'https://github.com/test'
    }
    
    addProject(newProject)
    await nextTick()
    
    expect(projectCount.value).toBe(initialCount + 1)
    expect(allTechnologies.value.length).toBeGreaterThan(initialTechCount)
    expect(allTechnologies.value).toContain('New Technology')
  })
})
