const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    div.textContent = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return div;
}

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    messageInput.value = '';
    addMessage(text, 'user');

    const loadingMsg = addMessage('...', 'bot loading');

    try {
        const response = await fetch(`/api/chat?message=${encodeURIComponent(text)}`);
        const data = await response.json();
        loadingMsg.remove();
        const reply = Array.isArray(data) ? data[0]?.text : (data.text || data.response || data.message);
        addMessage(reply || JSON.stringify(data), 'bot');
    } catch (error) {
        loadingMsg.remove();
        addMessage('Failed to connect.', 'bot');
    }
}

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

messageInput.focus();
