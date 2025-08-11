import {createClient} from "@supabase/supabase-js";
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseserviceroll = process.env.SUPABASE_SERVICE_ROLL;

if (!supabaseUrl || !supabaseserviceroll) {
    throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseserviceroll);

export default supabase;
