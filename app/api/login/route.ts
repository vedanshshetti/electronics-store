import { NextResponse } from "next/server";

const getBody=async (req: Request)=>{
    return await req.json();
}

export async function POST(req: Request) {
  const body = await getBody(req);
  if(body=="xxx"){
    return NextResponse.json({error: "Bad Request"}, {
    status: 400
  });
  }

  const backendRes = await fetch("https://vaynixauth.vercel.app/v2/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include"
  });

  // Forward Set-Cookie header from backend
  const cookie = backendRes.headers.get("set-cookie") || "";

  // Read backend JSON once
  const data = await backendRes.json();

  const res = NextResponse.json(data, {
    status: backendRes.status
  });

  // Attach cookie to Next.js response
  if (cookie) {
    res.headers.set("Set-Cookie", cookie);
  }

  return res;
}
