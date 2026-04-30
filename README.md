# CV Analyzer

AI-powered CV analysis tool that helps job seekers optimize their resumes and recruiters evaluate candidates efficiently.

## Features

- **AI-Powered Analysis**: Uses OpenRouter AI to analyze CVs against job descriptions
- **Detailed Feedback**: Provides overall score, skills matching, experience analysis, strengths, weaknesses, and recommendations
- **PDF Support**: Upload and analyze PDF resumes
- **Visual Preview**: View CV alongside analysis results
- **History Tracking**: Keep track of past analyses
- **Usage Limits**: 3 analyses per day, 10 analyses stored in history

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions
- **Database**: PostgreSQL via Supabase
- **Auth**: Supabase Auth (Google OAuth)
- **AI**: OpenRouter API (Gemma model)
- **PDF Processing**: unpdf for text extraction, react-pdf for preview

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase project created
- OpenRouter API key

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

```bash
npm install
```

### Database Setup

Run the database migrations:

```sql
-- These migrations are applied via Supabase MCP
-- analyses table, storage buckets, and RLS policies
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Usage Limits

- **Daily Analysis Limit**: 3 CV analyses per user per day
- **History Storage**: Maximum 10 analyses stored per user
- When history limit is reached, users must delete old analyses to create new ones

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URIs:
   - Development: `http://localhost:3000/auth/callback`
   - Production: `https://cv-analyzer-theta-three.vercel.app/auth/callback`
4. Add `NEXT_PUBLIC_APP_URL` environment variable in production

## Project Structure

```
src/
├── app/
│   ├── analyze/          # CV analysis pages
│   ├── analyses/         # History page
│   ├── auth/             # Authentication
│   └── docs/             # Documentation
├── components/          # React components
├── lib/
│   ├── ai/              # AI integration
│   ├── supabase/        # Supabase client
│   └── pdf-to-image.ts  # PDF processing
└── hooks/               # Custom hooks
```

## License

MIT
