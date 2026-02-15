'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ADMIN_UUID = process.env.NEXT_PUBLIC_ADMIN_UUID!;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AddBulkPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    async function checkAdmin() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      const accessToken = sessionData.session?.access_token;

      if (!user || !accessToken || user.id !== ADMIN_UUID) {
        router.push('/en/admin/auth/login');
        return;
      }

      setToken(accessToken);
      setIsAdmin(true);
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        setError('❌ Input must be a JSON array');
        return;
      }

      const res = await fetch('/api/admin/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResult(`✅ Uploaded all products`);
        setJsonInput('');
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch (err: any) {
      setError('❌ Invalid JSON or network error');
      console.error(err);
    }
  };

  if (loading) return <div className="p-6 text-center">🔐 Verifying admin status...</div>;
  if (!isAdmin) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">📦 Bulk Product Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full h-64 p-3 border rounded text-sm font-mono"
          placeholder='Paste JSON array here...'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />
        <Button type="submit" className="w-full">🚀 Upload Products</Button>
      </form>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {result && <div className="text-green-600 text-sm">{result}</div>}
    </div>
  );
}