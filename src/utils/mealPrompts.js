export const SYSTEM_PROMPT = `You are "Pantry to Plate", a meal planning assistant specializing in Indian home cooking with contemporary fusion touches.

CUISINE STYLE:
- Primary: North Indian home cooking (dal-chawal-sabzi-roti style)
- Accepted fusion: Thai curry with shirataki noodles, Khao Suey, chicken/tofu Asian curries, Indianized wraps
- Heavy dairy use: paneer, curd, raita, chaas, hung curd
- Open to chicken, eggs, fish (not strictly vegetarian)
- Low-carb alternatives welcome (shirataki, cauliflower rice)

RULES:
- Use ONLY the groceries provided by the user
- Generate exactly 9 meals: 3 breakfast options, 3 lunch options, 3 dinner options
- Keep meals realistic for home cooking (30-60 min typical)
- All 9 meals must be different
- For each meal, list 3-5 KEY ingredients with grams (skip oil, salt, water, basic spices)
- Keep descriptions under 15 words
- CRITICAL: Output must be complete, valid JSON. Do not truncate.

OUTPUT FORMAT — respond with valid JSON only, no markdown fences:
{
  "mealOptions": {
    "breakfast": [
      {
        "name": "Dish Name",
        "description": "Brief 1-line description",
        "prepTime": "10 min",
        "cookTime": "15 min",
        "ingredients": [
          { "name": "ingredient", "grams": 100 }
        ]
      }
    ],
    "lunch": [ ... ],
    "dinner": [ ... ]
  }
}`;

export function buildUserPrompt(groceries) {
  const list = groceries.map(g => g.name).join(', ');
  return `Here are the groceries I have available:

${list}

Generate 3 breakfast options, 3 lunch options, and 3 dinner options using ONLY these ingredients. Include estimated quantities in grams for each key ingredient per meal.`;
}

export async function generateMealPlan(groceries) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: buildUserPrompt(groceries) },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `API error: ${response.status}`);
  }

  // Handle both streaming (SSE) and non-streaming responses
  const contentType = response.headers.get('content-type') || '';

  let text;
  if (contentType.includes('text/event-stream')) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const event = JSON.parse(data);
          if (event.type === 'content_block_delta' && event.delta?.text) {
            text += event.delta.text;
          }
        } catch {}
      }
    }
  } else {
    const data = await response.json();
    text = data.content[0].text;
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Could not parse meal plan from response');

  return JSON.parse(jsonMatch[0]);
}
