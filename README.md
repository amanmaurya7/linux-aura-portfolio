# Linux Aura Portfolio - Aman Maurya

![Portfolio Preview]

## 🌐 [Live Demo: amanengineer.me](https://www.amanengineer.me/)

A modern, interactive portfolio website with a Linux terminal aesthetic, showcasing my projects, skills, and professional experience.

## ✨ Features

- **Interactive Terminal Experience**: Engage with a simulated Linux terminal that boots up on page load
- **Responsive Design**: Seamlessly adapts to all device sizes
- **Terminal-Inspired UI**: Custom design with typewriter effects and command-line interfaces
- **Dynamic Content Sections**:
  - Professional Profile
  - Work Experience
  - Projects Showcase
  - Technical Skills
  - Education Background
  - Awards & Achievements
  - Contact Information
- **Animated Components**: Smooth transitions and loading animations
- **Dark Theme**: Terminal-inspired color scheme for a unique visual experience

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: 
  - Tailwind CSS
  - ShadCN UI Components
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: CSS animations and Tailwind transitions
- **State Management**: React Hooks

## 🔧 Core Components

- `Terminal.tsx`: Creates the interactive terminal experience
- `TypingEffect.tsx`: Implements the typewriter animation effect
- `TerminalWindow.tsx`: Reusable component for terminal-style windows
- `CommandLine.tsx`: Handles command input simulation
- Various section components (Experience, Projects, Skills, etc.)

## 💻 Terminal Commands

The portfolio simulates various Linux commands to display information:
- `cat user_info.json`: Displays personal information
- `ls -l | grep "project_*"`: Lists projects
- `./list_skills.sh --format=detailed`: Shows technical skills
- And more...

## 🎨 Color Theme

The portfolio uses a custom terminal-inspired color scheme:
- Primary: Terminal Green (#00aeff)
- Background: Deep Dark (#0C0C0D)
- Text: Light Gray (#F8F8F2)
- Accents: Amber (#FFBF00), Purple (#9B30FF)
- UI Elements: Dark Gray (#282A36)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or bun

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/amanmaurya7/linux-aura-portfolio.git
   cd linux-aura-portfolio
   ```

2. Install dependencies:
   ```
   npm install
   # or
   bun install
   ```

3. Run development server:
   ```
   npm run dev
   # or
   bun dev
   ```

4. Build for production:
   ```
   npm run build
   # or
   bun run build
   ```

## 📝 Project Structure

```
├── public/            # Static assets
├── src/
│   ├── assets/        # Images and resources
│   ├── components/    # React components
│   │   ├── ui/        # ShadCN UI components
│   │   └── ...        # Custom components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.tsx       # Application entry point
├── index.html         # HTML template
└── ...config files
```

## 🔄 Deployment

The portfolio is currently deployed on [Vercel] and can be accessed at [amanengineer.me](https://www.amanengineer.me/).

## 🤝 Contact

Feel free to reach out if you have any questions or suggestions:

- Email: [amanmaurya.me@gmail.com](mailto:amanmaurya.me@gmail.com)
- LinkedIn: [linkedin.com/in/amanmaurya-me](https://www.linkedin.com/in/amanmaurya-me/)
- GitHub: [github.com/amanmaurya7](https://github.com/amanmaurya7)

---

© 2025 Aman Maurya. All rights reserved.

