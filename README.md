# SEO Audit SaaS - Web Audit Craft

A modern SEO Audit SaaS application with both frontend and backend components.

## 🏗️ Project Structure

This repository contains both the **frontend** (Vite + React) and **backend** (Next.js API routes):

```
web-audit-craft/
├── src/                    # Frontend (Vite + React)
│   ├── pages/             # Page components
│   ├── components/        # React components  
│   ├── contexts/          # React contexts
│   ├── lib/               # Utilities & API client
│   └── main.tsx           # Frontend entry point
├── app/                   # Backend API routes (Next.js)
├── lib/                   # Backend business logic
├── package.json           # Dependencies for both
├── tsconfig.json          # TypeScript config (Vite)
├── vite.config.ts         # Frontend build config
└── next.config.js         # Backend build config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- Claude API key

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup

Create `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://cehtwnfdqjehmztnnbch.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Claude AI
CLAUDE_API_KEY=sk-ant-api03-your-key-here

# App URLs  
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:5173
```

### 3. Database Setup
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cehtwnfdqjehmztnnbch)
2. Navigate to SQL Editor
3. Run the contents of `supabase-setup.sql`

### 4. Development

#### Start Backend API (Port 3000)
```bash
npm run api:dev
```

#### Start Frontend (Port 5173) 
```bash
npm run dev
```

Your app will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## 🔧 Configuration Fixed

### Issues Resolved
✅ **TypeScript Configuration**: Fixed path aliases from `@/*: ["./*"]` to `@/*: ["./src/*"]` for Vite compatibility  
✅ **React Query Provider**: Added QueryClientProvider to main.tsx for API state management  
✅ **Build Scripts**: Separated frontend (`dev`) and backend (`api:dev`) scripts  
✅ **Module Resolution**: Fixed import errors by updating tsconfig.json for Vite instead of Next.js  
✅ **Dependencies**: Added missing React Query devtools and proper ESLint configuration  

### Key Changes Made
1. **tsconfig.json**: Updated for Vite compatibility with correct path mapping
2. **main.tsx**: Added React Query provider and devtools
3. **package.json**: Updated scripts and added missing dependencies  
4. **tsconfig.node.json**: Added for proper Vite configuration
5. **.eslintrc.json**: Added React/TypeScript ESLint configuration

## 📡 API Integration

The frontend is configured to connect to your backend API:

### Authentication Flow
```javascript
// Token stored in localStorage as 'seo_token'
const token = localStorage.getItem('seo_token')

// API calls include Authorization header
fetch(`${API_URL}/api/audits`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

### Real-time Progress
```javascript
// SSE connection for audit progress  
const eventSource = new EventSource(
  `${API_URL}/api/audits/${auditId}/progress`,
  { headers: { 'Authorization': `Bearer ${token}` } }
)
```

## 🎯 Features

### Frontend Features
- 🔐 **Authentication**: Login/register with Supabase Auth
- 📊 **Dashboard**: URL input, progress tracking, recent audits
- 📈 **Real-time Updates**: Server-Sent Events for audit progress
- 📱 **Responsive Design**: Modern UI with Tailwind CSS
- 🎨 **Dark/Light Mode**: Theme switching support

### Backend Features  
- 🔍 **SEO Analysis**: Technical and on-page SEO analysis
- 🤖 **AI Recommendations**: Claude-powered suggestions
- 📊 **Usage Tracking**: Rate limiting by plan (Free/Pro/Agency)
- 🔐 **Secure API**: Supabase Auth integration
- ⚡ **Real-time**: SSE for progress updates

## 📋 Plan Limits

| Plan | Daily Audits | Features |
|------|-------------|----------|
| Free | 5 | Basic SEO analysis |
| Pro | 100 | Advanced features + AI recommendations |
| Agency | 1000 | White-label + bulk analysis |

## 🧪 Testing

### Test the API
```bash
# Test authentication and audit creation
./test-api.ps1  # Windows
./test-api.sh   # Mac/Linux
```

### Manual API Testing
```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Create audit (use token from registration)
curl -X POST http://localhost:3000/api/audits \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Vercel)
```bash
npm run api:build
vercel deploy --prod
```

### Environment Variables
Set all `.env.local` variables in your deployment platform:
- Vercel: Project Settings → Environment Variables
- Add each variable for Production environment

## 🔗 Integration with Lovable

If using Lovable for frontend development:

1. **Environment Variables** in Lovable:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://cehtwnfdqjehmztnnbch.supabase.co  
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. **Copy Components**: The `src/` directory components can be copied to Lovable
3. **API Integration**: Use the same API calls and authentication flow

## 🐛 Troubleshooting

### Common Issues

#### Module Resolution Errors
- ✅ **Fixed**: Path aliases now correctly point to `./src/*`
- If still seeing issues, restart your dev server

#### React Query Errors  
- ✅ **Fixed**: QueryClientProvider now properly wraps the app
- Ensure you're using the latest commit

#### Build Errors
- Run `npm run lint` to check for TypeScript errors
- Ensure all dependencies are installed: `npm install`

#### API Connection Issues
- Verify backend is running on port 3000: `npm run api:dev`
- Check CORS settings if frontend and backend are on different ports
- Ensure environment variables are correctly set

## 📚 Documentation

- [Project Instructions](PROJECT_INSTRUCTIONS.md) - Complete project documentation
- [Quick Reference](QUICK_REFERENCE.md) - API endpoints and examples  
- [Setup Guide](QUICK_START.md) - Step-by-step setup instructions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes to either `src/` (frontend) or `app/` (backend)
4. Commit changes: `git commit -m 'Add amazing feature'`
5. Push to branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

---

**Built with ❤️ using Vite, React, Next.js, Supabase, and Claude AI**