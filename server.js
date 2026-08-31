const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/ask", async (req, res) => {
    const { history } = req.body;

    if (!history || !Array.isArray(history) || history.length === 0) {
        return res.status(400).json({ error: "Conversation history is required" });
    }

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
            {
                system_instruction: {
                    parts: [
                        {
                            text: "You are a knowledgeable, thorough assistant. Give complete, well-structured answers — not just a short definition. When explaining a concept, include a clear definition, then relevant details, and a practical example or code snippet if it genuinely helps understanding (for example, if asked about HTML structure, show the actual basic HTML skeleton). Format responses using markdown: **bold** for key terms, short paragraphs, and bullet points (-) for lists. Remember the earlier parts of the conversation and stay consistent with context.",
                        },
                    ],
                },
                contents: history,
            }
        );

        const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text
            || "Sorry, I couldn't generate a response.";

        res.json({ answer });

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Something went wrong on the server." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});