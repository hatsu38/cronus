# Code Style and Conventions for CRONUS

## Code Formatting (Prettier Configuration)
- **Print Width**: 80 characters
- **Tab Width**: 2 spaces
- **Semi-colons**: Required (semi: true)
- **Quotes**: Double quotes (singleQuote: false)
- **Trailing Commas**: All (trailingComma: "all")
- **Parser**: TypeScript
- **End of Line**: Auto

## ESLint Configuration
- Extends Next.js core web vitals
- Extends Next.js TypeScript configuration
- Extends Prettier configuration (prevents conflicts)
- Uses flat config format with @eslint/eslintrc compatibility layer

## TypeScript Configuration
- **Target**: ES2017
- **Strict Mode**: Enabled
- **Module Resolution**: Bundler
- **JSX**: Preserve (Next.js handles compilation)
- **Path Mapping**: `@/*` maps to `./src/*`
- **Incremental Compilation**: Enabled

## Coding Patterns Observed
- **Function Components**: Uses default exports for React components
- **Hooks Usage**: Extensive use of useState, useEffect, useTranslation, useRouter, useSearchParams
- **State Management**: Local component state with React hooks
- **Internationalization**: Uses react-i18next with t() function for translations
- **URL Management**: Uses Next.js router for URL parameter management
- **Comments**: Japanese comments in code alongside English variable names
- **File Organization**: Clear separation between components, lib utilities, and app structure
- **CSS Classes**: Tailwind utility classes with responsive design patterns
- **Error Handling**: Try-catch blocks for async operations like clipboard API

## File Structure Conventions
- `src/app/` - Next.js app router files (layout, page, globals.css)
- `src/components/` - React components
- `src/lib/` - Utility libraries and business logic
- `public/` - Static assets
- Root level - Configuration files

## Naming Conventions
- **Files**: PascalCase for components (CronEditor.tsx), camelCase for utilities (cron.ts, i18n.ts)
- **Functions**: camelCase (describeCronExpression, validateCronExpression)
- **Constants**: camelCase for objects (commonCronExpressions, timezoneLanguageMapping)
- **Types**: PascalCase interfaces (CronParts)
- **CSS Classes**: Tailwind utility classes

## Import Patterns
- External libraries imported first
- Next.js imports (Image, router hooks)
- Relative imports from lib utilities
- Local asset imports (images)