import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jeuesuvhtlfqygkozslr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpldWVzdXZodGxmcXlna296c2xyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTQ3NjkzMjgsImV4cCI6MTk3MDM0NTMyOH0.po8D4EmWkpkS_yvv9WRQo5-vnC-9ywEPdLFHgn3ez-4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// PROFILE -------------------------------------------------
export async function checkSignUp(username) {
    const { count, error: checkError } = await supabase
        .from('users')
        .select('username', { count: 'exact' })
        .eq("username", username);
    return count;
}

export async function dbSignUp(username, password) {
    await supabase.from("users").insert([
        { username: username, password: password }
    ]);
}