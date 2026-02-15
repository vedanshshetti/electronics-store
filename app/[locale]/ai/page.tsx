'use client';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import ModelDropdown from './ModelDropdown';
import { useLocale } from '@/locales';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState<any[]>([]);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { locale } = useParams() as { locale: string };
  const translations: Record<string, any>= useLocale();
  const [model, setModel]= useState("google/gemma-3n-e4b-it:free");

  const askAI = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setAnswer('');

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `${query} ${context.length<1 ? "" : "Previous Chat Context: "+JSON.stringify(context)}`, model: model }),
      });

      const data = await res.json();
      setAnswer(data.answer || 'No response');
      setContext([...context, {
        previousQuery: query,
        answer: data.answer,
      }]);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setAnswer('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-0.5">{translations.ai.askAI[locale]}</h1>
      <p className='text-md font-semibold mb-4 text-red-600'>
        {translations.ai.updateInfo[locale]}
        </p>
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={translations.ai.questionPlaceholder[locale]}
        className="w-full max-w-xl p-3 border rounded mb-4"
        rows={4}
      />
      <ModelDropdown model={model} setModel={setModel}></ModelDropdown>
      <button
        onClick={askAI}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : translations.ai.ask[locale]}
      </button>
      {answer && (
        <div className="mt-6 w-full max-w-max mx-5 p-4 bg-white border rounded shadow">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </main>
  );
}