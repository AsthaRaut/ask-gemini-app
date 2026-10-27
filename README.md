# Ask Gemini 💬

A full-stack AI chatbot web app built with **Node.js**, **Express.js**, and the **Google Gemini API**. Ask any question and get an AI-powered response in a clean, modern chat interface — with full conversation memory, just like a real chatbot.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini%20API-8E75B2?style=flat&logo=google&logoColor=white)

---

## 📖 About the Project

This project simulates real-world full-stack development: a frontend that talks to a backend server, which securely communicates with an external AI API. It was built as a learning project to understand core backend concepts — Express routing, environment variables, middleware, and API integration.

**How it works:**
1. User types a question in the chat interface
2. The frontend sends the question (plus full conversation history) to the backend
3. The backend forwards the request to the Gemini API
4. Gemini generates a response, which flows back through the backend to the frontend
5. The response is displayed in the chat, formatted with markdown (bold, headings, lists)

All communication with the Gemini API happens **server-side only** — the API key is never exposed to the browser.

---

## ✨ Features

- Clean, modern, responsive chat UI with smooth animations
- Full conversation memory — Gemini remembers earlier messages in the session
- Markdown-formatted responses (bold keywords, headings, bullet points, code blocks)
- Secure backend API key handling via `.env`
- Loading states and error handling on both frontend and backend

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| AI | Google Gemini API |
| HTTP Client | Axios |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Markdown Rendering | marked.js |
| Config | dotenv |

---

## 📂 Project Structure

```
ask-gemini-app/
├── server.js          # Backend server & Gemini API logic
├── package.json        # Project metadata & dependencies
├── .env                 # API key (not committed to Git)
├── .gitignore
└── public/              # Frontend files
    ├── index.html
    ├── style.css
    └── script.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/ask-gemini-app.git
cd ask-gemini-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root folder and add your API key
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

4. Start the server
```bash
node server.js
```

5. Open your browser and visit
```
http://localhost:5000
```

---

## 🔒 Security Note

The `.env` file is excluded via `.gitignore` and should **never** be committed to version control. All Gemini API calls are made from the backend, keeping the API key hidden from the client.

---

## 📌 Future Improvements

- Persist chat history using a database
- Add user authentication
- Support for multiple chat sessions
- Dark/light theme toggle
