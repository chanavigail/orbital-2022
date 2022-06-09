import React, { useState } from "react";

import { supabase } from "../supabase";

export async function checkSignUp(username, password) {
    const [check, setCheck] = useState( 0 );
    const { data, error } = await supabase
        .from('users')
        .select('username', { count: 'exact' })
        .eq("username", username)
        .then(users => {
            setCheck(users[0])
        })
        .catch(console.error);
    return check;
}