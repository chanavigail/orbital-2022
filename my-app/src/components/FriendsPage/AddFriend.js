import React, { useEffect } from "react";

import { supabase } from "../helper";

function AddFriend() {
    const [ adding, setAdding ] = React.useEffect("");

    return (
        <TextField
            id="friend-search"
            className="search"
            type="text"
            placeholder="input friend's username here"
            value={adding}
            onChange={(e) => setAdding(e.target.value)}
        />
    )
}

export default AddFriend;