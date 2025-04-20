// Bestand: /api/astro.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Alleen POST verzoeken zijn toegestaan' });
  }

  const { name, date, time, place } = req.body;

  const prompt = `Maak een korte geboortehoroscoop voor ${name}. Geboren op ${date} om ${time} in ${place}. Beschrijf vriendelijk de Zon, de Maan en de Ascendant.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json({ message: data.choices[0].message.content });
    } else {
      res.status(response.status).json({ error: data.error || 'Fout bij ophalen van data' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Serverfout', detail: error.message });
  }
}
