"use client";

import { useState } from "react";
import {login} from "@/vaynix/"; // ✅ your login util

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    try {
      const res = await login({
        email,
        pass
      });

      if (res.error) {
        setError(res.error);
      } else {
        // ✅ redirect or show success
        window.localStorage.setItem("user", JSON.stringify(res.data))
        window.location.href = "/en-US"; 
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome back!</CardTitle>
          <CardDescription>
            Log in to continue using AI. <br />
           <small>If you already have a <strong>Vaynix</strong> account, you can sign in with it here.</small>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
            type="button"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </CardFooter>
        <Link className="ml-4" href="/en-US/signup">Dont have an account? Click here to signup.</Link>
      </Card>
    </div>
  );
}
