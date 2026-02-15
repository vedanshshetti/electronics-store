'use client';

import { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import HCaptchaWithRef from './HCaptchaComponent';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_ID = process.env.NEXT_PUBLIC_ADMIN_UUID!;
const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY!;

type AuthMode = 'signIn' | 'magicLink' | null;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const captchaRef = useRef<{ resetCaptcha: () => void } | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingMode, setLoadingMode] = useState<AuthMode>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const redirectTo = (() => {
    const to = searchParams.get('to') ?? '/en/admin/dashboard';
    return to.startsWith('/') ? to : `/${to}`;
  })();

  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const resetCaptcha = () => {
    captchaRef.current?.resetCaptcha();
    setCaptchaToken('');
  };

  const validateCaptcha = () => {
    if (!captchaToken) {
      setErrorMessage('⚠️ Please complete the CAPTCHA');
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    if (!validateCaptcha()) return;

    setLoadingMode('signIn');
    setErrorMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: { captchaToken },
      });

      if (error || !data.session) throw error ?? new Error('Login failed');

      const user = data.session.user;
      if (user.id === ADMIN_ID) {
        showModal('Welcome Admin', `Signed in as ${user.email}`);
        router.push(redirectTo);
      } else {
        setErrorMessage('Access denied: Not an admin');
        await supabase.auth.signOut();
      }
    } catch (err) {
      setErrorMessage('Invalid credentials or network error');
      
    } finally {
      setLoadingMode(null);
      resetCaptcha();
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }
    if (!validateCaptcha()) return;

    setLoadingMode('magicLink');
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          captchaToken,
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/en/admin/dashboard`,
        },
      });

      if (error) throw error;
      showModal('Magic Link Sent', `Check your inbox for a login link to ${email}`);
    } catch {
      setErrorMessage('Failed to send magic link');
    } finally {
      setLoadingMode(null);
      resetCaptcha();
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 rounded-xl border border-neutral-800 bg-neutral-900/70 backdrop-blur shadow-lg space-y-4">
      <h2 className="text-2xl font-semibold text-center text-white">🔐 Admin Login</h2>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalBody>
            <p>{modalMessage}</p>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              OK
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {errorMessage && <div className="text-red-400 text-sm">{errorMessage}</div>}

      <div className="space-y-3">
        <Input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={!!loadingMode}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-400 outline-none focus:ring-2 ring-blue-500"
        />

        <Input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!!loadingMode}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-400 outline-none focus:ring-2 ring-blue-500"
        />
      </div>

      <div className="min-h-[92px]">
        <HCaptchaWithRef
          sitekey={HCAPTCHA_SITEKEY}
          onVerify={(token: string) => setCaptchaToken(token)}
          ref={captchaRef as any}
        />
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={handleSignIn}
          disabled={!!loadingMode}
          className="w-full inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingMode === 'signIn' ? 'Signing in…' : 'Sign in with Email'}
        </button>

        <button
          type="button"
          onClick={handleMagicLink}
          disabled={!!loadingMode}
          className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loadingMode === 'magicLink' ? 'Sending magic link…' : 'Send Magic Link'}
        </button>
      </div>
    </div>
  );
}