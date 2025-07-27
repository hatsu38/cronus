# CRONUS 🕰️

**A Beautiful, Multilingual Cron Expression Editor with Real-time Visualization**

[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

CRONUS is a powerful, user-friendly web application for creating, editing, and visualizing cron expressions. Whether you're a system administrator, developer, or anyone working with scheduled tasks, CRONUS makes cron expressions intuitive and accessible.

## ✨ Features

### 🌍 **Multilingual Support**
- **Japanese (日本語)** - Complete localization for Japanese users
- **English** - Full English language support
- Automatic language switching based on timezone selection

### 🌐 **Timezone-Aware**
- Support for multiple timezones including UTC, JST, EST, PST, and more
- Real-time conversion of execution times to selected timezone
- Intelligent timezone-language mapping

### 🎨 **Beautiful, Modern UI**
- Clean, gradient-based design with glassmorphism effects
- Responsive layout that works on desktop, tablet, and mobile
- Real-time visual feedback with color-coded validation
- Smooth animations and transitions

### ⚡ **Powerful Functionality**
- **Real-time validation** - Instant feedback on cron expression validity
- **Human-readable descriptions** - Converts complex cron syntax to natural language
- **Next execution preview** - Shows the next 3 scheduled execution times
- **Visual cron builder** - Interactive visualization of each cron field
- **Common expressions** - Pre-built templates for frequent use cases
- **URL sharing** - Share cron expressions via URL parameters

### 🛠️ **Developer-Friendly**
- Built with modern Next.js 15 and React 19
- Full TypeScript support for type safety
- Optimized with Turbopack for lightning-fast development
- Clean, maintainable code architecture

## 🚀 Quick Start

### Prerequisites
- Node.js 22+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/hatsu38/cronus.git
cd cronus

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📖 How to Use

### Basic Usage
1. Enter your cron expression in the input field
2. Select your preferred timezone
3. View the human-readable description and next execution times
4. Use the visual cron builder to understand each field

### Common Expressions
CRONUS includes pre-built templates for common scheduling patterns:
- Every minute: `* * * * *`
- Every hour: `0 * * * *`
- Daily at midnight: `0 0 * * *`
- Weekly on Sundays: `0 0 * * 0`
- Monthly on the 1st: `0 0 1 * *`
- And many more...

### URL Sharing
Share your cron expressions by copying the URL, which automatically includes:
- The cron expression
- Selected timezone
- All settings are preserved when the link is opened

## 🏗️ Project Structure

```
cronus/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # React components
│   │   └── CronEditor.tsx   # Main editor component
│   └── lib/                 # Utility libraries
│       ├── cron.ts          # Cron parsing and validation
│       ├── cronI18n.ts      # Internationalization for cron
│       └── i18n.ts          # i18next configuration
├── public/                  # Static assets
└── package.json
```

## 🛠️ Built With

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[i18next](https://www.i18next.com/)** - Internationalization framework
- **[cron-parser](https://github.com/harrisiirak/cron-parser)** - Cron expression parsing
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library

## 📱 Screenshots

### Desktop View
The main interface showcases a clean, modern design with real-time validation and timezone-aware execution times.

### Mobile Responsive
Fully responsive design that adapts beautifully to mobile devices while maintaining full functionality.

## 🌟 Use Cases

### For Developers
- **CI/CD Pipelines** - Schedule automated builds and deployments
- **Database Maintenance** - Set up regular backup and cleanup tasks
- **Monitoring** - Schedule health checks and system monitoring
- **Data Processing** - Automate ETL processes and data synchronization

### For System Administrators
- **Server Maintenance** - Schedule system updates and restarts
- **Log Rotation** - Automate log file management
- **Backup Systems** - Set up automated backup schedules
- **Resource Monitoring** - Schedule performance and resource checks

### For Content Managers
- **Content Publishing** - Schedule blog posts and content updates
- **Email Campaigns** - Automate newsletter and marketing emails
- **Social Media** - Schedule social media posts
- **Report Generation** - Automate regular reporting tasks

## 🔧 Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format:check # Check code formatting
npm run format:fix   # Fix code formatting
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **cron-parser** community for the excellent parsing library
- **Next.js** team for the amazing framework
- **Tailwind CSS** for the beautiful utility classes
- **i18next** for internationalization capabilities

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/hatsu38/cronus/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

### 🌐 Help with Internationalization

We're looking for contributors to help expand CRONUS to more languages! Currently supporting Japanese and English, we'd love to add support for:

- **Korean (한국어)**
- **Chinese Simplified (简体中文)**
- **Chinese Traditional (繁體中文)**
- **Spanish (Español)**
- **French (Français)**
- **German (Deutsch)**
- **Portuguese (Português)**
- **Russian (Русский)**
- **Italian (Italiano)**
- **Dutch (Nederlands)**

**How you can help:**
- Translate UI text and descriptions
- Review existing translations for accuracy
- Add timezone and date formatting for your locale
- Test the application with your language

If you're interested in helping with translations, please:
1. Open an issue mentioning the language you'd like to contribute
2. Check our [internationalization guide](src/lib/i18n.ts) for the translation structure
3. We'll provide you with the necessary translation keys and guidance

**Translation Contributors Welcome!** 🙏  
No programming experience required - just native language skills and attention to detail.

---

<div align="center">

**Made with ❤️ by [hatsu38](https://github.com/hatsu38)**

⭐ **Star this repository if you find it helpful!** ⭐

</div>
