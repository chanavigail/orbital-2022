import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jeuesuvhtlfqygkozslr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpldWVzdXZodGxmcXlna296c2xyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM4MzM4NTIsImV4cCI6MTk2OTQwOTg1Mn0.uY1CBL2xI7dsbUpo2rBl5OBMmh_glwM3ZmtiiX0_d9A";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);