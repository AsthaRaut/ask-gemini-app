const form = document.getElementById("ask-form");
const input = document.getElementById("question-input");
const chatWindow = document.getElementById("chat-window");
const submitBtn = document.getElementById("submit-btn");
const btnText = submitBtn.querySelector(".btn-text");
const btnLoader = submitBtn.querySelector(".btn-loader");

// This array stores the ENTIRE conversation — every question and answer.
// Gemini needs this full history each time to understand context.
let chatHistory = [];

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const question = input.value.trim();
    if (!question) return;

    removeEmptyState();
    addMessageToUI("user", question);

    // Add the user's message to history in the format Gemini expects
    chatHistory.push({
        role: "user",
        parts: [{ text: question }],
    });

    input.value = "";
    setLoading(true);

    try {
        const res = await fetch("/api/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ history: chatHistory }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Something went wrong.");
        }

        addMessageToUI("bot", data.answer);

        // Add Gemini's reply to history too, so future questions have context
        chatHistory.push({
            role: "model",
            parts: [{ text: data.answer }],
        });

    } catch (err) {
        addMessageToUI("bot", `⚠️ ${err.message}`, true);
    } finally {
        setLoading(false);
    }
});

function addMessageToUI(sender, text, isError = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = `bubble ${isError ? "error-bubble" : ""}`;

    if (sender === "bot") {
        bubble.innerHTML = marked.parse(text);
    } else {
        bubble.textContent = text;
    }

    messageDiv.appendChild(bubble);
    chatWindow.appendChild(messageDiv);

    // Auto-scroll to the latest message
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeEmptyState() {
    const emptyState = chatWindow.querySelector(".empty-state");
    if (emptyState) emptyState.remove();
}

function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    btnText.classList.toggle("hidden", isLoading);
    btnLoader.classList.toggle("hidden", !isLoading);
}