import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pljzcqjtovintaoskpky.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsanpjcWp0b3ZpbnRhb3NrcGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0NDk3NzMsImV4cCI6MjAxNTAyNTc3M30.9aUXSDmPX3-oRLyHx2LrdPiU693n2wa73q2yXfwYW2A';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;