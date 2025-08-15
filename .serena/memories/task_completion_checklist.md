# Task Completion Checklist for CRONUS

## Code Quality Checks
When completing any development task, run these commands in order:

### 1. Code Formatting Check
```bash
npm run format:check
```
If formatting issues are found, fix them with:
```bash
npm run format:fix
```

### 2. Linting Check
```bash
npm run lint
```
Fix any ESLint errors or warnings before completing the task.

### 3. Build Verification
```bash
npm run build
```
Ensure the project builds successfully without errors.

### 4. Development Server Test (Optional)
```bash
npm run dev
```
Test the changes in the development environment if needed.

## Testing Notes
- **No formal test suite**: The project currently does not have automated tests (no .test.* or .spec.* files found)
- **Manual testing recommended**: Test functionality manually in the browser
- **Key areas to test**:
  - Cron expression validation and parsing
  - Timezone changes and language switching
  - URL parameter functionality
  - Next execution time calculations
  - Responsive design on different screen sizes

## Git Workflow
- Follow conventional commit messages
- Ensure all changes are properly staged
- Consider creating feature branches for significant changes
- Test URL sharing functionality after making changes

## Deployment Considerations
- Project uses Next.js static export capabilities
- Check that all internationalization keys are properly defined
- Verify timezone data is correctly handled
- Test on different browsers if making significant UI changes