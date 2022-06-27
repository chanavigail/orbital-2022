import React, { useEffect } from "react";

import { supabase } from "../helper";

function AddFriend() {
    const [ adding, setAdding ] = useEffect("");

    return (
        <TextField 
            className="friend-search"
            placeholder="input friend's username here"
        />
    )
}

export default AddFriend;