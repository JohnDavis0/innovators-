import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wrevtysbflcqvgvmliaa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndyZXZ0eXNiZmxjcXZndm1saWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk0Njc3ODUsImV4cCI6MjAxNTA0Mzc4NX0.GJcajiylQpVxN7m04JD8G1r3oiSaXN8DSYcBy7NSZCM';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;