export interface NavItem {
  name: string
  label: string
  route: string
  icon: string
  children?: NavItem[]
  meta?: {
    requiresAuth?: boolean
    roles?: string[]
    hideFromNavigation?: boolean
    section?: string
  }
}

export const navItems: NavItem[] = [
  {
    name: 'home',
    label: 'Dashboard',
    route: '/',
    icon: 'home',
    meta: {
      requiresAuth: false,
      section: 'main'
    }
  },
  {
    name: 'analytics',
    label: 'Analytics',
    route: '/analytics',
    icon: 'chart-bar',
    meta: {
      requiresAuth: false,
      section: 'analytics'
    },
    children: [
      {
        name: 'analytics-dashboard',
        label: 'Dashboards',
        route: '/analytics/dashboard',
        icon: 'chart-bar',
        meta: {
          requiresAuth: false,
          section: 'analytics'
        }
      },
      {
        name: 'analytics-reports',
        label: 'Reports',
        route: '/analytics/reports',
        icon: 'document-text',
        meta: {
          requiresAuth: false,
          section: 'analytics'
        }
      },
      {
        name: 'analytics-metrics',
        label: 'Metrics',
        route: '/analytics/metrics',
        icon: 'chart-line',
        meta: {
          requiresAuth: false,
          section: 'analytics'
        }
      }
    ]
  },
  {
    name: 'data-engineer',
    label: 'Data Engineer',
    route: '/data-engineer',
    icon: 'cog',
    meta: {
      requiresAuth: false,
      section: 'data-engineer'
    },
    children: [
      {
        name: 'data-engineer-pipelines',
        label: 'Pipelines',
        route: '/data-engineer/pipelines',
        icon: 'lightning-bolt',
        meta: {
          requiresAuth: false,
          section: 'data-engineer'
        }
      },
      {
        name: 'data-engineer-etl-jobs',
        label: 'ETL Jobs',
        route: '/data-engineer/etl-jobs',
        icon: 'cog',
        meta: {
          requiresAuth: false,
          section: 'data-engineer'
        }
      },
      {
        name: 'data-engineer-data-models',
        label: 'Data Models',
        route: '/data-engineer/data-models',
        icon: 'cube',
        meta: {
          requiresAuth: false,
          section: 'data-engineer'
        }
      }
    ]
  }
]

// Utility functions for navigation
export const getNavItemByRoute = (route: string): NavItem | undefined => {
  const findInItems = (items: NavItem[]): NavItem | undefined => {
    for (const item of items) {
      if (item.route === route) {
        return item
      }
      if (item.children) {
        const found = findInItems(item.children)
        if (found) return found
      }
    }
    return undefined
  }
  return findInItems(navItems)
}

export const getNavItemsBySection = (section: string): NavItem[] => {
  return navItems.filter(item => item.meta?.section === section)
}

export const getMainNavItems = (): NavItem[] => {
  return navItems.filter(item => !item.meta?.hideFromNavigation)
}

export const getNavItemsForUser = (userRoles: string[] = []): NavItem[] => {
  const filterItems = (items: NavItem[]): NavItem[] => {
    return items.filter(item => {
      // Check if user has required roles
      if (item.meta?.roles && item.meta.roles.length > 0) {
        const hasRequiredRole = item.meta.roles.some(role => userRoles.includes(role))
        if (!hasRequiredRole) return false
      }
      
      // Filter children recursively
      if (item.children) {
        item.children = filterItems(item.children)
        // Remove parent if no children remain
        if (item.children.length === 0) return false
      }
      
      return true
    })
  }
  
  return filterItems(navItems)
}
