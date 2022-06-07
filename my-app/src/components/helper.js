import { supabase } from "../supabase";

export async function checkSignUp(username, password) {
    const { data, error } = await supabase
        .from("users")
        .select("username", { count: "exact" })
        .eq("username", username)
    const check = data < 1;
    return check;
}