# Kingdom Wealth Builders — Backend API
## Node.js + Express Proxy Server

---

## What This Does

This server sits **between your React frontend and Anthropic's API**, keeping your secret key safe on the server. It also handles:

| Feature | Endpoint |
|---|---|
| User registration | `POST /auth/register` |
| User login | `POST /auth/login` |
| Current user | `GET /auth/me` |
| Save financial plan | `POST /plan` |
| Load financial plan | `GET /plan` |
| Save journal entry | `POST /journal` |
| List journal entries | `GET /journal` |
| AI Coach chat | `POST /ai/chat` |
| AI journal insight | `POST /ai/journal-insight` |
| AI spending analysis | `POST /ai/spending-analysis` |
| Weekly check-in email | `POST /checkin/send` |

---

## Quick Start (Local Development)

### 1. Install dependencies
```bash
cd kingdom-wealth-backend
npm install
```

### 2. Create your .env file
```bash
cp .env.example .env
```

Open `.env` and fill in:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
JWT_SECRET=run-this-to-generate: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Start the server
```bash
# Development (auto-restarts on file changes)
npm run dev

# Production
npm start
```

You should see:
```
👑  Kingdom Wealth Builders API
🚀  Server running on http://localhost:4000
🤖  AI Coach: Anthropic claude-sonnet-4-20250514
🔐  JWT auth enabled
🛡️   Rate limiting active (10 AI calls/min)
```

### 4. Connect your React frontend
Copy `api-client.js` into your React app's `src/` folder.

Add to your frontend `.env`:
```
VITE_API_URL=http://localhost:4000
```

Replace all `fetch("https://api.anthropic.com/...")` calls with the `api.*` methods from `api-client.js`.

---

## API Reference

### Auth

**Register**
```
POST /auth/register
Body: { name, email, password }
Returns: { token, user: { id, name, email } }
```

**Login**
```
POST /auth/login
Body: { email, password }
Returns: { token, user: { id, name, email } }
```

All protected routes require:
```
Authorization: Bearer <token>
```

---

### AI Coach

**Chat**
```
POST /ai/chat
Auth: required
Body: {
  messages: [{ role: "user"|"assistant", content: string }],
  context?: string   // optional extra financial context
}
Returns: { reply: string, usage: object }
```

**Journal Insight**
```
POST /ai/journal-insight
Auth: required
Body: { entry: string, mood: string, moodLabel: string }
Returns: { insight: string }
```

**Spending Analysis**
```
POST /ai/spending-analysis
Auth: required
Body: { spending: [{ cat, budget, actual, leak }] }
Returns: { analysis: string }
```

---

## Deployment (Production)

### Option A — Railway (Recommended, easiest)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Add environment variables in Railway dashboard
# Set PORT to 4000 (or Railway auto-assigns)
```

### Option B — Render
1. Push this folder to a GitHub repo
2. Create a new "Web Service" on render.com
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render dashboard

### Option C — Fly.io
```bash
brew install flyctl
fly auth login
fly launch
fly secrets set ANTHROPIC_API_KEY=sk-ant-...
fly secrets set JWT_SECRET=your-secret
fly deploy
```

---

## Upgrading to Supabase (Step 2)

Replace the in-memory `users` and `plans` Maps with Supabase:

```bash
npm install @supabase/supabase-js
```

```js
// Add to server.js
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Replace: users.set(email, user)
// With:    await supabase.from('users').insert(user)

// Replace: users.get(email)
// With:    const { data } = await supabase.from('users').select().eq('email', email).single()
```

---

## Adding Weekly Emails (Twilio SendGrid)

```bash
npm install @sendgrid/mail
```

```js
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// In /checkin/send route, replace console.log with:
await sgMail.send({
  to: user.email,
  from: 'coach@kingdomwealthbuilders.com',
  subject: '👑 Your Weekly Kingdom Wealth Check-In',
  text: message,
  html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
});
```

Schedule weekly sends with a cron job on Railway/Render or use n8n for automation.

---

## Security Checklist Before Going Live

- [ ] `ANTHROPIC_API_KEY` is in `.env`, not in code
- [ ] `.env` is in `.gitignore`
- [ ] `JWT_SECRET` is long (64+ chars) and random
- [ ] `ALLOWED_ORIGINS` is set to your real frontend domain only
- [ ] Rate limiting is active (already configured)
- [ ] HTTPS is enabled on your host (Railway/Render do this automatically)
- [ ] Swap in-memory store for Supabase database

---

## File Structure

```
kingdom-wealth-backend/
├── server.js          ← Main server (all routes)
├── package.json       ← Dependencies
├── .env.example       ← Environment variable template
├── .env               ← Your secrets (git-ignored)
├── api-client.js      ← Drop into your React src/ folder
└── README.md          ← This file
```
