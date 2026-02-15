'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ADMIN_UUID = process.env.NEXT_PUBLIC_ADMIN_UUID;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function AdClickDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  // Auth
  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;

        if (!user || user.id !== ADMIN_UUID) {
          setError('Access denied: Not an admin');
          router.push('/en/admin/auth/login');
          return;
        }

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

  // Fetch clicks

  if (loading) return <div className="p-6 text-center">🔐 Verifying admin status...</div>;
  if (!isAdmin) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🛠️ Admin Dashboard</h1>

      <div className="flex justify-center gap-4">
        <Link target='_blank' href="/en-US/admin/addProduct" passHref>
          <Button variant="default">➕ Add Product</Button>
        </Link>
        <Link target='_blank' href="/en-US/admin/delete" passHref>
          <Button variant="destructive">🗑️ Delete</Button>
        </Link>
      </div>
    </div>
  );
}