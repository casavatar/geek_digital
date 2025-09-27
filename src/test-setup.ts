import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'

// Create a test i18n instance
const testI18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      header: {
        greeting: 'Hello, {name}!',
        downloadCv: 'Download CV',
        notifications: 'Notifications',
        settings: 'Settings'
      },
      sidebar: {
        brand: 'Data Portfolio',
        home: 'Home',
        analytics: 'Analytics',
        dataEngineer: 'Data Engineer',
        dashboards: 'Dashboards',
        reports: 'Reports',
        metrics: 'Metrics',
        pipelines: 'Pipelines',
        etlJobs: 'ETL Jobs',
        dataModels: 'Data Models'
      },
      home: {
        title: 'Data Engineer & Analyst',
        subtitle: 'Transforming data into actionable insights',
        bio: 'Passionate about building robust data pipelines and creating meaningful visualizations that drive business decisions.',
        skills: 'Skills',
        quickStats: 'Quick Stats',
        projectsCompleted: 'Projects Completed',
        dataProcessed: 'Data Processed',
        clientsServed: 'Clients Served',
        yearsExperience: 'Years Experience'
      },
      services: {
        title: 'What I Can Help You With',
        subtitle: 'Comprehensive data solutions tailored to your business needs',
        dataPipelines: {
          title: 'Data Pipeline Development',
          description: 'Build robust, scalable data pipelines that efficiently process and transform your data from source to destination.'
        },
        dashboardDesign: {
          title: 'Dashboard Design',
          description: 'Create interactive, user-friendly dashboards that provide real-time insights into your business metrics.'
        },
        etlAutomation: {
          title: 'ETL Automation',
          description: 'Automate your Extract, Transform, Load processes to ensure consistent and reliable data processing.'
        },
        dataVisualization: {
          title: 'Data Visualization',
          description: 'Transform complex datasets into clear, actionable visualizations that tell your data story.'
        },
        cloudMigration: {
          title: 'Cloud Migration',
          description: 'Seamlessly migrate your data infrastructure to cloud platforms for better scalability and cost efficiency.'
        },
        dataQuality: {
          title: 'Data Quality Assurance',
          description: 'Implement comprehensive data quality checks and validation processes to ensure data accuracy and reliability.'
        },
        cta: 'Ready to transform your data? Let\'s discuss your project!'
      },
      contact: {
        title: 'Let\'s Work Together',
        subtitle: 'Have a project in mind? I\'d love to hear about it. Send me a message and let\'s discuss how we can bring your data vision to life.',
        form: {
          name: 'Full Name',
          email: 'Email',
          message: 'Message',
          submit: 'Send Message',
          nameRequired: 'Name is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email',
          messageRequired: 'Message is required'
        },
        directContact: 'Or reach out directly:',
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub'
      },
      schedule: {
        title: 'Schedule a Meeting',
        subtitle: 'Book a time to discuss your project or opportunity.',
        loading: 'Loading calendar...',
        error: 'Unable to load calendar. Please contact me directly.',
        fallback: 'If the calendar doesn\'t load, please contact me directly via email or LinkedIn.'
      },
      analytics: {
        title: 'Analytics Dashboard',
        subtitle: 'Monitor and analyze your data performance metrics',
        totalUsers: 'Total Users',
        activeUsers: 'Active Users',
        conversionRate: 'Conversion Rate',
        revenue: 'Revenue',
        dataQuality: 'Data Quality',
        processingTime: 'Processing Time',
        errorRate: 'Error Rate',
        uptime: 'Uptime'
      },
      dataEngineer: {
        pipelines: {
          title: 'Data Pipelines',
          subtitle: 'Monitor and manage your data processing pipelines and workflows',
          newPipeline: 'New Pipeline',
          activePipelines: 'Active Pipelines',
          successRate: 'Success Rate',
          dataVolume: 'Data Volume',
          failedRuns: 'Failed Runs',
          recentRuns: 'Recent Pipeline Runs',
          recentRunsSubtitle: 'Monitor the latest pipeline executions and their status'
        },
        etlJobs: {
          title: 'ETL Jobs',
          subtitle: 'Manage your Extract, Transform, Load processes and workflows'
        },
        dataModels: {
          title: 'Data Models',
          subtitle: 'Design and manage your data models and schemas'
        }
      },
      common: {
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        cancel: 'Cancel',
        save: 'Save',
        edit: 'Edit',
        delete: 'Delete',
        view: 'View',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        sort: 'Sort',
        refresh: 'Refresh',
        export: 'Export',
        import: 'Import',
        download: 'Download',
        upload: 'Upload',
        close: 'Close',
        open: 'Open',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        confirm: 'Confirm'
      },
      notFound: {
        title: '404 - Page Not Found',
        message: 'Sorry, the page you are looking for doesn\'t exist.',
        description: 'The page you requested could not be found. It might have been moved, deleted, or you entered the wrong URL.',
        goHome: 'Go Home',
        goBack: 'Go Back'
      }
    }
  },
  legacy: false,
  globalInjection: true
})

// Configure Vue Test Utils to use the i18n plugin
config.global.plugins = [testI18n]
