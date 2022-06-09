import React, { useState } from "react";

import { supabase } from "../supabase";

export async function checkSignUp(username, password) {
    const [check, setCheck] = useState( -1 );
    const { count, error } = await supabase
        .from('users')
        .select('username', { count: 'exact', head: true })
        .eq("username", username)
        .then(c => {
            setCheck(c[0])
        })
        .catch(console.error);
    return check < 1;
}