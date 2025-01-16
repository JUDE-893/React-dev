import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://axudhzlpgiteizotiimm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dWRoemxwZ2l0ZWl6b3RpaW1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2ODcyOTUsImV4cCI6MjA1MjI2MzI5NX0.lPU8ZR_d4UXp90ZSj0Jz0saBVfdmufOG4FmFnJEc65w';
const supabase = createClient(supabaseUrl, supabaseKey)

export {supabase};
