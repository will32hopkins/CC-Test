export default async function handler(req, res) {
    const { message } = req.query;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
        return res.status(500).json({ error: 'Webhook URL not configured' });
    }

    try {
        const response = await fetch(`${webhookUrl}?message=${encodeURIComponent(message)}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to chatbot' });
    }
}
