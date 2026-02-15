import { NextResponse } from 'next/server';

const OPENROUTER_API_KEY = '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';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body?.query;

    if (!query || typeof query !== 'string') {
      console.error('Invalid query:', query);
      return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: body?.model ?? "google/gemini-2.0-flash-001",
        messages: [{ role: 'user', content: query }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter error:', errorData);
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || 'No response from model';

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Caught error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}