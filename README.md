# SkillBridge AI Frontend

AI-Powered Learning & Career Platform — Frontend

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + DaisyUI 5
- **State:** TanStack React Query + React Context
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | `http://localhost:3000` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | - |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | GitHub OAuth Client ID | - |
| `NEXT_PUBLIC_FACEBOOK_APP_ID` | Facebook App ID | - |

## Deployment (Vercel)

1. Push to GitHub repository
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy

Build command: `npm run build`
Output directory: `.next`

## Folder Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Shared UI and layout components
│   ├── layout/       # Navbar, Footer
│   ├── sections/     # Newsletter, etc.
│   ├── theme/        # ThemeProvider, ThemeSwitcher
│   └── ui/           # Button, Card, Input, etc.
├── features/         # Feature-based modules
│   ├── auth/         # Authentication
│   ├── ai/           # AI tools
│   ├── blog/         # Blog system
│   ├── dashboard/    # Dashboard
│   ├── learning-path/ # Learning paths
│   └── profile/      # User profile
└── lib/              # Utilities (api client, cn)
```
