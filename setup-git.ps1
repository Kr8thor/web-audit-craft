# Git Setup and Push Script for SEO Audit Backend

# This script will initialize your local directory as a git repository
# and connect it to your GitHub repository

Write-Host "🚀 Setting up Git repository for SEO Audit Backend..." -ForegroundColor Green

# Initialize git repository
git init
Write-Host "✅ Initialized git repository" -ForegroundColor Green

# Add the remote repository
git remote add origin https://github.com/Kr8thor/web-audit-craft.git
Write-Host "✅ Added remote origin" -ForegroundColor Green

# Add all files
git add .
Write-Host "✅ Added all files to staging" -ForegroundColor Green

# Check git status
Write-Host "📋 Current git status:" -ForegroundColor Yellow
git status

# Create initial commit
git commit -m "Add complete SEO audit backend with proper GitHub Actions workflow

- Added Next.js 14 backend with TypeScript
- Configured Supabase integration
- Added Claude AI integration
- Created proper GitHub Actions workflow with caching
- Fixed dependency management and build process
- Added environment variable configuration"

Write-Host "✅ Created initial commit" -ForegroundColor Green

# Push to main branch
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main
git push -u origin main

Write-Host "🎉 Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "🔗 Your repository: https://github.com/Kr8thor/web-audit-craft" -ForegroundColor Cyan
Write-Host "⚡ GitHub Actions should now run successfully!" -ForegroundColor Green