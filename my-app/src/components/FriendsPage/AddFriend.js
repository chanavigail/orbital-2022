import React, { useEffect } from "react";

import { supabase } from "../helper";

function AddFriend() {
    const [ loading, setLoading ] = React.useState(false);
    const [ addingUser, setAddingUsername ] = React.useEffect("");
    const [ friendId, setFriendId ] = React.useEffect("");
    const user = supabase.auth.user()

    async function getId() {
        const { data: getFriendId } = supabase
            .from("profiles")
            .select("id")
            .match( {username: addingUsername} )
        setFriendId(getFriendId);
    }

    const handleAdd = async (e) => {
        e.preventDefault();
    
        try {
          setLoading(true);
          const { error } = await supabase
            .from("friends")
            .upsert({
                user_id: user.id,
                friend_id: friendId
            })
          if (error) throw error;
          alert("You have successsfully added " + adding + " as friend!");
        } catch (error) {
          alert(error.error_description || error.message);
        } finally {
          setLoading(false);
        }
      };

    return (
        <Box
            component="form"
            onSubmit={handleAdd}
            margin="auto"
        >
                <TextField
                    id="friend-search"
                    className="search"
                    type="text"
                    placeholder="input friend's username here"
                    value={adding}
                    onChange={(e) => setAddingUsername(e.target.value)}
                />
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#ffb24d" }}
                    type="submit"
                />
        </Box>
    )
}

export default AddFriend;