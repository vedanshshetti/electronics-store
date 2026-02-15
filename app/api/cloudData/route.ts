// app/api/cloudData/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { convertPrice } from '@/utils/convertCurrency'


// Using the service role key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  //const auth_header = req.headers.get("Authentication");
  const referer = req.headers.get("Referer");
  const locale= referer?.replace("http://", "").replace("https://", "").split("/")[1];
  // const auth_token =    (auth_header?.split(' ')[1]) ?? "therewasanerror___99";
  // const date= new Date();
  // const tokenMinute = parseInt(auth_token?.split("___")[1], 10);
  // const currentMinute = date.getUTCMinutes();
  // const minuteIsValid = Math.abs(currentMinute - tokenMinute) <= 1;
  
  // const requestIsUnauthorized = !auth_token?.includes(process.env.INTERNAL_API_KEY ?? "5639") || !minuteIsValid;

  // if(requestIsUnauthorized){
  //   return NextResponse.json({ data: null, error: "Unauthorized access was blocked. To access data, please refer to the official page instead." }, { status: 401 });
  // }
  // if(req.headers.get("Authorization")!==null){
  //   return NextResponse.json({ data: null, error: "Unauthorized access was blocked. Please do not try and hack us, you can see this data on our official page instead." }, { status: 401 })
  // }


  const { data, error } = await supabase
    .from('products') // contains all the data
    .select('name, price, category, img, reviews, id, id_public, brand, desc') // adjust values as needed
    .order('id', { ascending: true }) // Smallest IDs first
    //.ilike("name", `%${search}%`)
    //.ilike("category", `%${category}%`)
    //.ilike("brand", `%${brand}%`)


  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const curr= locale ?? "en-US"
    const modifiedData = data.map((i: any) => ({
      ...i,
      displayPrice: convertPrice(parseInt(i.price), curr),
    }));

      return NextResponse.json({ data: modifiedData }, { status: 200 })
};