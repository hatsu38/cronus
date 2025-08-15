# CRONUS Codebase Structure

## Project Root Structure
```
cronus/
├── src/                     # Source code
├── public/                  # Static assets
├── .node-version           # Node.js version (22.11.0)
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── .prettier.json          # Prettier formatting rules
├── .prettierignore         # Files to ignore for Prettier
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── .gitignore              # Git ignore patterns
└── README.md               # Project documentation
```

## Source Code Structure (`src/`)
```
src/
├── app/                    # Next.js App Router
│   ├── favicon.ico         # Favicon
│   ├── globals.css         # Global CSS styles
│   ├── layout.tsx          # Root layout component
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── images/           # Component-specific images
│   │   └── logo.png      # CRONUS logo
│   └── CronEditor.tsx    # Main cron editor component
└── lib/                  # Utility libraries
    ├── cron.ts          # Cron parsing, validation, and utilities
    ├── cronI18n.ts      # Internationalized cron descriptions
    └── i18n.ts          # i18next configuration
```

## Key Files and Their Purposes

### Core Application Files
- **`src/app/page.tsx`**: Main landing page that renders the CronEditor component
- **`src/app/layout.tsx`**: Root layout with metadata, fonts, and global providers
- **`src/components/CronEditor.tsx`**: Main cron expression editor with UI and functionality

### Utility Libraries
- **`src/lib/cron.ts`**: Core cron functionality
  - `validateCronExpression()`: Validates cron expressions
  - `parseCronExpression()`: Parses cron expressions into parts
  - `describeCronExpression()`: Converts cron to human-readable description
  - `getNextExecutionTimes()`: Calculates next execution times
  - `commonCronExpressions`: Predefined common cron expressions
  - `timezoneLanguageMapping`: Maps timezones to languages

- **`src/lib/cronI18n.ts`**: Internationalized cron descriptions
  - Provides localized descriptions for cron expressions in Japanese and English

- **`src/lib/i18n.ts`**: i18next configuration
  - Sets up internationalization with Japanese and English translations
  - Contains translation resources for UI text

### Configuration Files
- **`next.config.ts`**: Next.js configuration (currently minimal)
- **`tsconfig.json`**: TypeScript compiler configuration with strict mode
- **`eslint.config.mjs`**: ESLint rules extending Next.js and Prettier configs
- **`.prettier.json`**: Code formatting rules
- **`package.json`**: Dependencies, devDependencies, and npm scripts

## Component Architecture
The application follows a simple, single-page architecture:
- Single main component (`CronEditor`) handles all functionality
- Uses Next.js App Router for routing and URL parameters
- State management through React hooks (useState, useEffect)
- Internationalization through react-i18next hooks