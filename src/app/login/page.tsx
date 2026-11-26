'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { MonogramPn } from '@/components/brand/MonogramPn';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
        return;
      }

      router.push('/dashboard/agenda');
      router.refresh();
    } catch {
      setError('No se pudo iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-bone flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-ink/10 p-8 sm:p-10 shadow-sm space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <MonogramPn className="w-16 h-16" />
          </div>
          <h1 className="font-serif text-3xl text-slate-ink">
            Portal Clínico
          </h1>
          <p className="text-xs text-slate-ink/70">
            Dra. Perla Yareli Núñez García · Pediatra
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-ink/75 mb-1.5 ml-2">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              placeholder="perl.pediatra@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-bg-bone border border-slate-ink/10 text-sm text-slate-ink focus:outline-none focus:ring-2 focus:ring-primary-pink"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-ink/75 mb-1.5 ml-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-full bg-bg-bone border border-slate-ink/10 text-sm text-slate-ink focus:outline-none focus:ring-2 focus:ring-primary-pink"
            />
          </div>

          {error && <p className="text-xs text-red-700 px-2">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary-pink text-slate-ink font-medium text-sm shadow-sm hover:brightness-95 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Ingresando...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
