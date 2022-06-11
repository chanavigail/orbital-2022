import React, { useState } from "react";

import { supabase } from "../supabase";

export async function checkSignUp(username, password) {
    const { count, error: checkError } = await supabase
        .from('users')
        .select('username', { count: 'exact' })
        .eq("username", username);
    return count;
}

export async function dbSignUp(username, password) {
    const { data, error: signUpError } = await supabase
      .from("users")
      .insert([
        { username: username, password: password, current_loc: null }
      ]);
}