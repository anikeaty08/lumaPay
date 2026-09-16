import { createClient } from '@supabase/supabase-js';
import { AppError } from '../errors/app-error.js';

export function createSupabaseClient() {
    const url = process.env.SUPABASE_URL?.trim();
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (!url || !serviceRoleKey) {
        throw new AppError(
            'DATABASE_CONFIGURATION_MISSING',
            'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.',
            500
        );
    }
    return createClient(url, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false }
    });
}
