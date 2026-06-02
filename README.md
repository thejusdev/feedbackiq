# FeedbackIQ

AI-powered feedback summarizer. Paste in customer feedback, get back sentiment, a satisfaction score, key themes, and a plain-English summary — all in seconds.

**Live demo → [feedbackiq-six.vercel.app](https://feedbackiq-six.vercel.app/)**

---

## What it does

Most teams collect feedback but never actually process it. FeedbackIQ sends your raw feedback to Groq's LLM API and returns:

- **Sentiment** — Positive / Negative / Mixed
- **Satisfaction Score** — out of 10
- **Summary** — a concise plain-English overview
- **Key Themes** — the recurring topics extracted from the feedback

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Vue 3, Vite, Axios |
| Backend | Node.js, Express.js |
| AI | Groq API (LLaMA 3) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
feedbackiq/
├── backend/        # Express.js API
│   ├── routes/
│   │   └── summarize.js
│   └── index.js
└── frontend/       # Vue 3 app
    └── src/
        ├── App.vue
        └── components/
            ├── FeedbackInput.vue
            └── ResultCard.vue
```

---

## Running locally

### Prerequisites
- Node.js v18+
- A [Groq API key](https://console.groq.com/keys)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```
GROQ_API_KEY=your_groq_api_key_here
PORT=3000
```

```bash
node index.js
```

Backend runs on `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## API

**POST** `/api/feedback/analyze`

Request:
```json
{
  "feedbacks": [
    "Great product, very easy to use.",
    "Shipping was slow but quality is good.",
    "Terrible experience, would not recommend."
  ]
}
```

Response:
```json
{
  "data": {
    "sentiment": "Mixed",
    "score": 6,
    "summary": "Customers appreciate product quality but have concerns about shipping speed and overall experience.",
    "key_themes": ["Product quality", "Shipping speed", "User experience"]
  }
}
```

---

## Author

Built by [Thejus](https://github.com/thejusdev)
