# Project Structure

```
seo-audit-backend/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   ├── me/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   └── audits/
│   │       ├── route.ts
│   │       └── [id]/
│   │           ├── route.ts
│   │           └── progress/
│   │               └── route.ts
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── supabase.ts
│   ├── audit-processor.ts
│   ├── claude.ts
│   └── rate-limit.ts
├── .env.local
├── .gitignore
├── middleware.ts
├── next.config.js
├── package.json
├── README.md
├── supabase-setup.sql
├── test-api.ps1
├── test-api.sh
└── tsconfig.json
```

## Key Files Explained

- **app/api/**: All API routes using Next.js App Router
- **lib/**: Core business logic and utilities
- **supabase.ts**: Supabase client configuration
- **audit-processor.ts**: SEO analysis and background processing
- **claude.ts**: AI integration for recommendations
- **rate-limit.ts**: Usage tracking and limits
- **middleware.ts**: Supabase auth middleware
- **supabase-setup.sql**: Database schema and RLS policies
