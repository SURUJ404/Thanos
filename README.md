# THANOS

![Thanos](https://raw.githubusercontent.com/SURUJ404/Thanos/main/thanos.jpg)

> Live app: **https://thanos-theta.vercel.app** (root Next.js proxy → frontend app + backend API)

---

## Multi-Agent AI System + Prompt-to-Product Engine

THANOS is an advanced AI orchestration system that unifies multiple AI models into a single intelligent platform.

It is not just a chatbot — it is a Prompt-to-Application Generator powered by multiple AI agents.

---

## Repository Structure

```text
Thanos/
├── frontend/   # Vite + React SPA (the app UI)
│   ├── src/components/
│   ├── src/features/       # API calls (auth, chat, billing, agent)
│   ├── src/pages/
│   └── src/redux/          # user / conversation / message state
├── backend/    # Express microservices (deployed as serverless functions)
│   ├── api/                # Vercel serverless entries (gateway, auth, chat, agent, billing)
│   ├── gateway/            # API gateway (auth middleware + proxy)
│   ├── services/
│   │   ├── auth/           # Firebase auth + user model
│   │   ├── chat/           # conversations & messages
│   │   ├── agent/          # multi-agent LLM orchestrator
│   │   └── billing/        # Razorpay payments & credits
│   └── shared/redis/       # shared Redis client (serverless-safe)
└── app/        # root Next.js app — thin proxy (frontend + /api → backend)
```

## Deployment

- **Root app** — https://thanos-theta.vercel.app (project `thanos`)
- **Frontend SPA** — served by the root app via rewrite (project `thanos-frontend`)
- **Backend API** — https://thanos-backend.vercel.app (project `thanos-backend`)

Every push to `main` auto-deploys all three projects. All traffic is served through
https://thanos-theta.vercel.app: `/` renders the frontend app and `/api/*` is proxied
to the backend gateway.

## Local Development

```bash
# Backend microservices
cd backend
npm install
npm run dev

# Frontend SPA (set VITE_SERVER_URL=http://localhost:8000 in frontend/.env)
cd frontend
npm install
npm run dev
```

## Tech Stack

- **Frontend:** Vite, React, Redux Toolkit
- **Backend:** Node.js, Express, Redis, MongoDB
- **AI:** GPT, Claude, DeepSeek, Google Gemini, Tavily, Qdrant
- **Payments:** Razorpay
- **Auth:** Firebase
- **Deploy:** Vercel (serverless)
