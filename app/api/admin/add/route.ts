import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_UUID = process.env.NEXT_PUBLIC_ADMIN_UUID;

export async function POST(req: NextRequest) {
  //auth
  const authHeader = req.headers.get('Authorization') ?? '';
  const token = authHeader.replace('Bearer ', '');

  const map: Record<string, string> = {
    "Phones & Tablets": "phones&tablets",
    "Audio & Soundgear": "audio&soundgear",
    "Laptops & PCs": "laptops&pcs",
    "TVs & Home Theatres": "tvs&hometheatres",
    "Gaming & Acessories": "gaming&acessories",
    "AR & VR": "ar&vr",
    "Smartwatches & Trackers": "watches&trackers",
    "Home Decor": "home_decor",
    "Printers & Scanners": "printers&scanners",
    "Storage & Media": "storage&media",
    "Kitchen Accessories": "kitchen_accessories",
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user || user.id !== ADMIN_UUID) {
    return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 403 });
  }


//main logic


 const body=await req.json();
 const r= req.headers.get("Referer")
 if(r?.includes("addProduct")){
  try {
    const {
      name,
      brand,
      category = 'error',
      price,
      img,
      screenSize,
      dataStorageOptions,
      'chip/cpu': chipCpu,
      reviews
    } = body;

    // 🧩 Insert directly into Supabase 'products' table
    const { data, error } = await supabase.from('your_table').select('id').order('id', { ascending: false }).limit(1);
    const { error: insertError } = await supabase.from('products').insert([
      {
        name,
        brand,
        category: map[category],
        price: Number(price),
        img: img ?? null,
        screenSize,
        dataStorageOptions,
        'chip/cpu': chipCpu ?? null,
        reviews: parseInt(reviews)
      }
    ]);

    if (insertError) {
      console.error('🛑 Supabase insert error:', insertError.message);
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '✅ Product added to Supabase!' });
  } catch (err: any) {
    console.error('🚨 POST route error:', err.message);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
 }else if(r?.includes("addBulk")){
    try {
      body.forEach(async (product: any) => {
        const {
          name,
          brand,
          category,
          price,
          img,
          screenSize,
          dataStorageOptions,
          'chip/cpu': chipCpu,
          reviews
        } = product;
  // 🧩 Insert directly into Supabase 'products' table
  const { data, error } = await supabase.from('your_table').select('id').order('id', { ascending: false }).limit(1);
  const { error: insertError } = await supabase.from('products').insert([
    {
      name,
      brand,
      category: map[category],
      price: Number(price),
      img: img ?? null,
      screenSize,
      dataStorageOptions,
      'chip/cpu': chipCpu ?? null,
      reviews: parseInt(reviews)
    }
  ]);

  if (insertError) {
    console.error('🛑 Supabase insert error:', insertError.message);
    return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: '✅ Products added to Supabase!' });
      });
    } catch (err: any) {
      console.error('🚨 POST route error:', err.message);
      return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
 }
}