'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ADMIN_UUID = process.env.NEXT_PUBLIC_ADMIN_UUID;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DeleteProductPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;
        const accessToken = sessionData.session?.access_token;

        if (!user || !accessToken || user.id !== ADMIN_UUID) {
          setError('Access denied: Not an admin');
          router.push('/en/admin/auth/login');
          return;
        }

        setToken(accessToken);
        setIsAdmin(true);
      } catch (err) {
        console.error('Auth check failed:', err);
        setError('Authentication error');
        router.push('/en/admin/auth/login');
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();
  }, [router]);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!productId) {
      setError('⚠️ Please enter a product ID');
      return;
    }

    try {
      const res = await fetch('/api/admin/delete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: productId })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        console.log('🗑️ Product deleted:', data.message);
        setProductId('');
      } else {
        console.error('❌ Delete error:', data.error);
        setError(data.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setError('Failed to delete product');
    }
  };

  if (loading) return <div className="p-6 text-center">🔐 Verifying admin status...</div>;
  if (!isAdmin) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">🗑️ Delete Product (Admin Panel)</h1>
      <form onSubmit={handleDelete} className="space-y-3">
        <Input
          name="productId"
          placeholder="Enter Product ID to delete"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <Button type="submit" className="mt-2 w-full">❌ Delete Product</Button>
      </form>
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
    </div>
  );
}