// lib/auth.ts

interface Default {
  email: string;
  pass: string;
  fullName: string;
  metadata: Record<string, any>;
}

const KEY =
  "f3c9a4b1e7d82c0f4a91d6e2b7f58c33d1e0a9f4c6b2d87e5f1c3a0d9b4e7621";

// ✅ SIGNUP (proxied)
export async function signup(user: Default) {
  const res = await fetch("/api/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key: KEY,
      email: user.email,
      fullName: user.fullName,
      pass: user.pass,
      metadata: user.metadata
    })
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { error: "Invalid JSON response from server" };
  }

  return data;
}

interface LoginPayload {
  email: string;
  pass: string;
}

// ✅ LOGIN (proxied)
export async function login(user: LoginPayload) {
  const res = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key: KEY,
      email: user.email,
      pass: user.pass
    })
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { error: "Invalid JSON response from server" };
  }

  return data;
}

// ✅ GET CURRENT USER (proxied)
export async function getMe() {
  const res = await fetch("/api/me", {
    method: "GET",
    credentials: "include"
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { error: "Invalid JSON response from server" };
  }

  return data;
}


// ✅ LOGIN WITH SESSION (proxied)
export async function loginWithSession(session: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      key: KEY,
      session
    })
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { error: "Invalid JSON response from server" };
  }

  return data;
}
