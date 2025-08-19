# Contributing to Collect Exports for Bundle

Thank you for your interest in contributing to this project! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/collect-exports-for-bundle.git`
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes
6. **Test** your changes: `npm test`
7. **Commit** with conventional commits: `git commit -m "feat: add amazing feature"`
8. **Push** to your fork: `git push origin feature/amazing-feature`
9. **Create** a Pull Request

## 📋 Development Requirements

### Prerequisites
- Node.js >= 18.18
- npm >= 9.0.0

### Scripts
- `npm run build` - Build the project
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run typecheck` - Type check TypeScript
- `npm run docs` - Generate documentation

## 🧪 Testing

### Test Coverage Requirements
- **Statements**: ≥ 80%
- **Branches**: ≥ 80%
- **Functions**: ≥ 80%
- **Lines**: ≥ 80%

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📝 Code Style

### TypeScript
- Use TypeScript for all new code
- Follow strict TypeScript configuration
- Include proper JSDoc comments for public APIs

### ESLint
- All code must pass ESLint checks
- Run `npm run lint` before committing
- Use `npm run lint:fix` to auto-fix issues

### Conventional Commits
We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

## 🔒 Security

### Reporting Security Issues
- **DO NOT** create public issues for security vulnerabilities
- Email security issues to: [security@devlander.com](mailto:security@devlander.com)
- Include detailed reproduction steps
- We will respond within 48 hours

### Security Requirements
- No critical or high severity vulnerabilities in production dependencies
- Regular security audits with `npm audit`
- All dependencies must be from trusted sources

## 📦 Release Process

### Automated Releases
- Releases are automated using semantic-release
- Version bumping based on conventional commits
- Automatic changelog generation
- NPM publishing on main branch pushes

### Release Requirements
- All CI checks must pass
- Test coverage must meet thresholds
- Bundle sizes must be within limits
- No security vulnerabilities
- Documentation must be up to date

## 🐛 Bug Reports

### Before Submitting
1. Check existing issues
2. Search documentation
3. Try the latest version

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
A clear description of what you expected to happen.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 18.18.0]
- Package version: [e.g. 2.0.0-beta.1]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
A clear description of any alternative solutions.

**Additional context**
Add any other context or screenshots about the feature request.
```

## 📚 Documentation

### Documentation Standards
- All public APIs must be documented
- Include usage examples
- Keep README.md up to date
- Generate API documentation with TypeDoc

### Updating Documentation
1. Update source code comments
2. Regenerate docs: `npm run docs:build`
3. Test documentation locally: `npm run docs:serve`
4. Include in your PR

## 🔄 Dependency Updates

### Update Policy
- **Monthly**: Security updates
- **Quarterly**: Minor version updates
- **Major versions**: Require team review

### Updating Dependencies
1. Check for updates: `npm outdated`
2. Update dependencies: `npm update`
3. Test thoroughly
4. Submit PR with changelog

## 🏷️ Labels

We use the following labels for issues and PRs:

- `bug` - Something isn't working
- `documentation` - Improvements or additions to documentation
- `enhancement` - New feature or request
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority
- `priority: low` - Low priority
- `priority: medium` - Medium priority
- `question` - Further information is requested
- `wontfix` - This will not be worked on

## 📞 Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub discussions for questions and ideas
- **Email**: [support@devlander.com](mailto:support@devlander.com)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Collect Exports for Bundle! 🎉
