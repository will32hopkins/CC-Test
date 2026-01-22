# n8n Chatbot Frontend

Ultra-minimalist chat interface for an n8n chatbot.

**Live URL:** https://cctest-one.vercel.app/

## Project Structure

```
├── public/
│   ├── index.html      # Chat page
│   ├── styles.css      # Minimalist styling
│   └── script.js       # Chat logic (calls /api/chat)
├── api/
│   └── chat.js         # Vercel serverless function (proxies to n8n)
└── vercel.json         # Vercel configuration
```

## How It Works

1. User sends a message via the chat interface
2. Frontend calls `/api/chat?message=...`
3. Serverless function forwards request to n8n webhook (URL stored in environment variable)
4. n8n processes the message and returns a response
5. Response displayed in chat

## Environment Variables

Set in Vercel dashboard:
- `N8N_WEBHOOK_URL` - Your n8n webhook endpoint

## Local Development

```bash
python -m http.server 8000
```
Then open http://localhost:8000

Note: API calls won't work locally without the n8n webhook configured.

## Deployment

- **Hosting:** Vercel
- **Repo:** https://github.com/will32hopkins/CC-Test.git
- Auto-deploys on push to main branch
