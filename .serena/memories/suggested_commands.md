# Suggested Development Commands for CRONUS

## Development Commands
- `npm run dev` - Start development server with Turbopack (uses --turbopack flag)
- `npm run build` - Build for production
- `npm run start` - Start production server

## Code Quality Commands
- `npm run lint` - Run ESLint (using Next.js linter)
- `npm run format:check` - Check code formatting with Prettier
- `npm run format:fix` - Fix code formatting with Prettier

## Package Management
- `npm install` - Install dependencies
- `npm ci` - Clean install (for CI/CD)

## System Commands (Darwin/macOS)
- `ls` - List files and directories
- `find` - Search for files and directories
- `grep` - Search text patterns in files
- `git` - Git version control commands
- `cd` - Change directory
- `pwd` - Print working directory
- `cat` - Display file contents
- `head` / `tail` - Display beginning/end of files

## Node.js Version Management
- Check `.node-version` file for required Node.js version (22.11.0)
- Use `node --version` to check current version
- Use `nvm use` if using nvm for version management

## Port Information
- Development server runs on http://localhost:3000 by default