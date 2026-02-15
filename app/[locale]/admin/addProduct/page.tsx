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

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Audio & Soundgear',
    price: '',
    screenSize: '',
    img: '',
    dataStorageOptions: '',
    'chip/cpu': '',
    'reviews': '',
  });

  useEffect(() => {
    async function checkAdmin() {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const user = sessionData.session?.user;
        const accessToken = sessionData.session?.access_token;

        if (!user || !accessToken) {
          router.push('/en/admin/auth/login');
          return;
        }

        if (user.id !== ADMIN_UUID) {
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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error.message);
        setError('Logout failed');
        return;
      }
      router.push('/en/admin/auth/login');
    } catch (err) {
      console.error('Logout exception:', err);
      setError('Something went wrong during logout');
    }
  };

  const handleChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const sessionData = await supabase.auth.getSession();
      const token = sessionData.data.session?.access_token;

      const res=await fetch('/api/admin/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        console.log('✅ Product added:', data.message);
        setFormData({
          name: '',
          brand: '',
          category: 'Audio & Soundgear',
          price: '',
          screenSize: '',
          img: '',
          dataStorageOptions: '',
          'chip/cpu': '',
          'reviews': ''
        });
      } else {
        console.error('❌ Error:', data.error);
        setError(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setError('Failed to submit product');
    }
  };

  if (loading) return <div className="p-6 text-center">🔐 Verifying admin status...</div>;
  if (!isAdmin) return <div className="p-6 text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">🛠️ Add Product (Admin Panel)</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange('name')} />
        <Input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange('brand')} />
        <select
          name="category"
          className="w-full px-4 py-2 rounded border"
          value={formData.category}
          onChange={handleChange('category')}
        >
          <option value="Audio & Soundgear">Audio & Soundgear</option>
          <option value="Phones & Tablets">Phones & Tablets</option>
          <option value="Laptops & PCs">Laptops & PCs</option>
          <option value="Kitchen Accessories">Kitchen Accessories</option>
          <option value="TVs & Home Theatres">TVs & Home Theatres</option>
          <option value="Gaming & Acessories">Gaming & Acessories</option>
          <option value="AR & VR">AR & VR</option>
          <option value="Smartwatches & Trackers">Smartwatches & Trackers</option>
          <option value="Home Decor">Home Decor</option>
          <option value="Printers & Scanners">Printers & Scanners</option>
          <option value="Storage & Media">Storage & Media</option>
        </select>
        <Input name="price" type="number" step="0.01" placeholder="Price (€)" value={formData.price} onChange={handleChange('price')} />
        <Input name="screenSize" placeholder="Screen Size (optional)" value={formData.screenSize} onChange={handleChange('screenSize')} />
        <Input name="img" placeholder="Image (base64 or link)" value={formData.img} onChange={handleChange('img')} />
        <textarea name="dataStorageOptions" placeholder='Storage Options (e.g. ["256GB", "512GB"])' value={formData.dataStorageOptions} onChange={handleChange('dataStorageOptions')} />
        <Input name="chip/cpu" placeholder='Chip/CPU (e.g. "Apple M4 Max")' value={formData['chip/cpu']} onChange={handleChange('chip/cpu')} />
        <Input name="reviews" placeholder='Rating (out of 5 stars)' value={formData['reviews']} onChange={handleChange('reviews')} />
        <Button type="submit" className="mt-2 w-full">✅ Add Product</Button>
      </form>
      {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
      <hr className="my-6 border-gray-700" />
      <h2 className="text-lg font-semibold">🔧 Account</h2>
      <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-500 w-full mt-2">
        🔓 Log out (Admin)
      </Button>
    </div>
  );
}