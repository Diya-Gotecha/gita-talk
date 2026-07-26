export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  try {
    const { messages, model, max_tokens, temperature } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: { message: "Server configuration error: Missing OPENROUTER_API_KEY environment variable." } });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://gitatalk.app',
        'X-Title': 'Gita Talk'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: max_tokens || 700,
        temperature: temperature || 0.72
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: { message: error.message } });
  }
}
