# Commit Guide

This guide outlines the commit message standards and the use of Git hooks in the `lsntr` repository.

## Commit Message Standard

We follow the **Conventional Commits** specification. This helps in generating changelogs and understanding the history of the project at a glance.

### Format
`type(scope): description`

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples
- `feat(client): add user profile page`
- `fix(server): resolve memory leak in upload handler`
- `docs: update readme with installation steps`
- `chore(deps): bump husky from 8.0.0 to 9.0.0`

---

## Pre-commit Hooks

This repository uses **Husky** and **lint-staged** to ensure code quality.

### How it works
Every time you run `git commit`, Husky triggers a pre-commit hook that runs `lint-staged`. 
`lint-staged` will:
1. Identify all staged files with `.ts`, `.tsx`, `.js`, or `.jsx` extensions.
2. Run `eslint --fix` on those files.
3. If errors are found that cannot be auto-fixed, the commit will be blocked.

### Benefits
- Prevents broken or poorly formatted code from entering the repository.
- Ensures a consistent coding style across the team.
- Reduces the need for manual code review for style issues.

### Bypassing Hooks
If absolutely necessary, you can bypass the hooks using the `--no-verify` flag:
`git commit -m "your message" --no-verify`
*Note: Use this sparingly and only for valid reasons (e.g., emergency fixes where linting is temporarily broken).*
