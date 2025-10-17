export interface Project {
  id: string
  title: string
  description: string
  impact: string
  iconPath: string
  technologies: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
}

export interface PersonalInfo {
  name: string
  title: string
  avatar: string
  tagline: string
  bio?: string
  cvUrl?: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}
