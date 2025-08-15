# CRONUS Project Overview

## Purpose
CRONUS is a beautiful, multilingual cron expression editor with real-time visualization. It's a Next.js web application that helps users create, edit, and visualize cron expressions with support for multiple languages (Japanese and English) and timezones.

## Key Features
- **Multilingual Support**: Japanese (日本語) and English with automatic language switching based on timezone selection
- **Timezone-Aware**: Support for multiple timezones with real-time conversion
- **Modern UI**: Clean, gradient-based design with glassmorphism effects and responsive layout
- **Real-time Validation**: Instant feedback on cron expression validity
- **Human-readable Descriptions**: Converts complex cron syntax to natural language
- **Next Execution Preview**: Shows the next 3 scheduled execution times
- **Visual Cron Builder**: Interactive visualization of each cron field
- **Common Expressions**: Pre-built templates for frequent use cases
- **URL Sharing**: Share cron expressions via URL parameters

## Target Users
- System administrators scheduling server maintenance, backups, log rotation
- Developers setting up CI/CD pipelines, database maintenance, monitoring
- Content managers scheduling publications, email campaigns, reports

## Tech Stack
- Next.js 15 with App Router and Turbopack
- React 19 with latest features
- TypeScript for type safety
- Tailwind CSS 4 for styling
- i18next for internationalization
- cron-parser for cron expression parsing
- date-fns for date utilities
- node-cron for cron validation

## Development Environment
- Node.js 22.11.0 (specified in .node-version)
- Uses npm as package manager
- ESLint for linting with Next.js and Prettier configurations
- Prettier for code formatting