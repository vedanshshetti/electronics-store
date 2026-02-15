// app/api/signup/route.ts
export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await fetch("https://vaynixauth.vercel.app/v2/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include"
  });

  const cookie = backendRes.headers.get("set-cookie") || "";

  return new Response(await backendRes.text(), {
    status: backendRes.status,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie
    }
  });
}
