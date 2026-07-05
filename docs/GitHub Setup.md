# VoiceOS - GitHub Setup & CI/CD Configuration

This document guide provides instructions for hosting the VoiceOS codebase on GitHub, managing Git rules, and setting up automated quality control.

---

## 1. Local Git Initialization

Since this repository starts as a local folder, initialize Git and connect it to your GitHub target repo:

```bash
# 1. Initialize git
git init

# 2. Add files to staging
git add .

# 3. Create initial commit
git commit -m "chore: initial release v1.0.0 (Public Beta)"

# 4. Create main branch and link to remote
git branch -M main
git remote add origin https://github.com/your-org/voice-os.git

# 5. Push code to GitHub
git push -u origin main
```

---

## 2. Ignored Files & Security Validation

The repository includes a production [.gitignore](file:///C:/Users/tcpwa/ProjectOS/.gitignore) designed to prevent credential leakages and unnecessary build bloat from entering version control.

Ensure the following files are **NEVER** pushed to GitHub:
*   `node_modules/` (compiled dependencies)
*   `.next/` & `out/` (Next.js build files)
*   `.env`, `.env.local`, `.env.development`, `.env.production` (live secrets and api paths)
*   `*.tsbuildinfo` (TypeScript caching)
*   `npm-debug.log*`, `yarn-error.log*` (system debug files)
*   `.vercel` (local Vercel deployments link)

Before doing your first push, verify untracked secrets are not staged:
```bash
git status
```
If an env file is showing under changes, remove it using:
```bash
git rm --cached .env.local
```

---

## 3. GitHub Actions Continuous Integration

We have configured a CI workflow under [.github/workflows/ci.yml](file:///C:/Users/tcpwa/ProjectOS/.github/workflows/ci.yml) that triggers on every pull request and push to the `main` branch.

The CI environment executes:
1.  **Strict Environment Build:** Runs `npm ci` to install exact dependency versions.
2.  **Lint Check:** Runs `npm run lint` to enforce formatting and import standards.
3.  **Type Check:** Runs `npm run type-check` to verify complete type safety.
4.  **Production Compilation:** Runs `npm run build` to confirm the application successfully builds for production.

All pull requests must pass this checklist before they can be merged.

---

## 4. Branch Protection Rules

To maintain codebase health, configure the following Branch Protection Rules on your GitHub repository settings:

1.  Navigate to **Settings** > **Branches** > **Add Branch Protection Rule**.
2.  Set **Branch pattern name** to `main`.
3.  Check **Require a pull request before merging**.
4.  Check **Require status checks to pass before merging** and search for:
    *   `validate` (the VoiceOS CI job name).
5.  Check **Require branches to be up to date before merging**.
6.  Click **Save Changes**.
