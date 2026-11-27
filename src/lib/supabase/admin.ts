import { createClient } from '@supabase/supabase-js';

/**
 * Cliente administrativo con SUPABASE_SERVICE_ROLE_KEY.
 * Usar exclusivamente en API Routes / Server Actions seguras.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase admin environment variables');
  }

  return createClient(new URL(url.trim()).origin, serviceKey.trim(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
