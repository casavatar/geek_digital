# Portfolio Website

A modern, responsive portfolio website built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- ⚡ Built with Vue 3 Composition API
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Mobile-first responsive design
- ♿ Accessibility features
- 🚀 Optimized for performance
- 🔧 Modular component structure

## Tech Stack

- **Frontend**: Vue 3, TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Testing**: Vitest
- **Linting**: ESLint, Prettier

## Project Structure

```text
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer)
│   ├── sections/        # Page sections (Hero, Projects)
│   └── ui/              # Reusable UI components (ProjectCard, Button)
├── composables/         # Vue composables for data management
├── types/               # TypeScript type definitions
├── assets/              # Static assets
└── main.ts              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.- Clone the repository:

```bash
git clone <your-repo-url>
cd portfolio-website
```

2.- Install dependencies:

```bash
npm install
```

3.- Start the development server:

```bash
npm run dev
```

4.- Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Customization

### Personal Information

Update your personal information in `src/composables/usePortfolioData.ts`:

```typescript
const personalInfo = ref<PersonalInfo>({
  name: 'Your Name',
  title: 'Your Title',
  avatar: 'path/to/your/avatar.jpg',
  tagline: 'Your tagline here',
  cvUrl: '/path/to/your/cv.pdf',
})
```

### Projects

Add or modify projects in the same file:

```typescript
const projects = ref<Project[]>([
  {
    id: 'unique-id',
    title: 'Project Title',
    description: 'Project description',
    impact: 'Impact metric',
    icon: '<svg>...</svg>',
    technologies: ['Vue.js', 'TypeScript'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
])
```

### Styling

The project uses Tailwind CSS with custom configuration. You can:

- Modify colors in `tailwind.config.js`
- Add custom components in `src/assets/main.css`
- Override default styles as needed

## Deployment

### Netlify

1.- Build the project:

```bash
npm run build
```

2.- Deploy the `dist` folder to Netlify

### Vercel

1.- Connect your repository to Vercel
2.- Vercel will automatically detect the Vue project and deploy it

### Manual Deployment

1.- Build the project:

```bash
npm run build
```

2.- Upload the contents of the `dist` folder to your web server

## Contributing

1.- Fork the repository
2.- Create a feature branch
3.- Make your changes
4.- Run tests and linting
5.- Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you have any questions or need help, please open an issue on GitHub.
