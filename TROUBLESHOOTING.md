# Quick Troubleshooting Guide

## If You Still Get Errors After Pushing:

### 1. Check GitHub Actions Logs
- Go to: https://github.com/Kr8thor/web-audit-craft/actions
- Click on the failed workflow
- Look for specific error messages

### 2. Common Issues & Solutions

#### "Cache Dependencies" Still Failing
```bash
# Make sure package-lock.json is committed:
git add package-lock.json
git commit -m "Add package-lock.json for proper caching"
git push
```

#### "Secrets Not Found" Errors
- Go to GitHub → Settings → Secrets and variables → Actions
- Verify all 4 secrets are set with correct names

#### "Build Failed" Errors
```bash
# Test locally first:
npm ci
npm run build
```

### 3. Emergency Simple Workflow
If the main workflow still fails, use this minimal version:

```yaml
name: Simple Build
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20.x
    - run: npm install
    - run: npm run build
```

Save this as `.github/workflows/simple.yml` and disable the main workflow.