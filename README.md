# SEO Audit Backend

This is the backend API for the SEO Audit SaaS tool, built with Next.js 14 and Supabase.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://cehtwnfdqjehmztnnbch.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
CLAUDE_API_KEY=your-claude-api-key-here
```

### 3. Set up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the SQL to create the tables and policies

### 4. Run the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer {token}
```

#### Logout
```bash
POST /api/auth/logout
Authorization: Bearer {token}
```

### Audits

#### Create New Audit
```bash
POST /api/audits
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://example.com"
}
```

#### List User's Audits
```bash
GET /api/audits
Authorization: Bearer {token}
```

#### Get Specific Audit
```bash
GET /api/audits/{id}
Authorization: Bearer {token}
```

#### Get Audit Progress (SSE)
```bash
GET /api/audits/{id}/progress
Authorization: Bearer {token}
```

## Testing Commands

### Register a new user
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Create an audit (use token from login)
```bash
curl -X POST http://localhost:3000/api/audits \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

### Get audit results
```bash
curl -X GET http://localhost:3000/api/audits/AUDIT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Important Notes

### Frontend Integration

The frontend expects:
- Token to be stored in localStorage as 'seo_token'
- All API calls to include `Authorization: Bearer {token}` header
- Base URL from `NEXT_PUBLIC_API_URL` environment variable

### Supabase Authentication

This backend uses Supabase Auth instead of custom JWT:
- Tokens are Supabase access tokens
- User metadata includes the plan (free/pro/agency)
- Sessions are managed by Supabase

### Rate Limiting

- Free plan: 5 audits per day
- Pro plan: 100 audits per day
- Agency plan: 1000 audits per day

### Background Processing

Audits are processed asynchronously:
1. POST /api/audits returns immediately with auditId
2. Connect to /api/audits/{id}/progress for real-time updates
3. Processing includes: URL validation, page fetch, SEO analysis, AI recommendations
4. Final results are stored in the database

## Deployment

For production deployment:
1. Set all environment variables
2. Run `npm run build`
3. Deploy to Vercel, Railway, or any Node.js hosting
4. Ensure Supabase project is properly configured
