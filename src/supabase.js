import { createClient } from '@supabase/supabase-js';

const url = process.env.VUE_APP_SUPABASE_URL;
const anonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;

const supabase = createClient(url, anonKey);

export default supabase;
