import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jeuesuvhtlfqygkozslr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpldWVzdXZodGxmcXlna296c2xyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MzgzMzg1MiwiZXhwIjoxOTY5NDA5ODUyfQ._TetjrBWTHftA-lvx62gM51gEKM0e-CeZwgeEQi9dc4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
