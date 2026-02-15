import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { convertPrice } from "@/utils/convertCurrency";

// 🔐 Server-side Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const locale = url.searchParams.get("locale") || "en";
    const id = url.pathname.split("/").pop();

    // 🧪 Validate UUID format
    const isValidUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id || "");
    if (!id || !isValidUUID) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 404 });
    }

    // 🎯 Query product by public ID
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id_public", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        ...data,
        image: data.img || "/placeholder.png",
        displayPrice: convertPrice(data.price, locale),
      },
    });
  } catch (err: any) {
    console.error("API /data/[id] error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}