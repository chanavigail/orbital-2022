import React, { useEffect } from "react";
import { Box,
  Button,
  TextField
} from "@mui/material";

import { supabase } from "../helper";

function AddFriend() {
    const [ loading, setLoading ] = React.useState(false);
    const [ addingUsername, setAddingUsername ] = React.useEffect("");
    const [ friendId, setFriendId ] = React.useEffect("");

    const getId = () => {
        const { data: getFriendId } = supabase
            .from("profiles")
            .select("id")
            .match( {username: addingUsername} )
        if ( getFriendId ) {
          setFriendId(getFriendId);
        } else {
          setAddingUsername("")
        }
    }

    const checker = (e) => {
      getId();
      if (addingUsername.length === 0) {
        alert("No such username exists, please check again")
      } else {
        handleAdd();
      }
    }

    const handleAdd = async (e) => {
        e.preventDefault();
    
        try {
          setLoading(true);
          getId()
          const { error } = await supabase
            .from("friends")
            .upsert({
                user_id: supabase.auth.user().id,
                friend_id: friendId
            })
          if (error) throw error;
          alert("You have successsfully added " + addingUsername + " as a friend!");
        } catch (error) {
          alert(error.error_description || error.message);
        } finally {
          setLoading(false);
        }
      };

    return (
        <Box
            component="form"
            onSubmit={checker}
            margin="auto"
        >
                <TextField
                    id="friend-search"
                    className="search"
                    type="text"
                    placeholder="input friend's username here"
                    value={addingUsername}
                    onChange={(e) => setAddingUsername(e.target.value)}
                />
                <Button
                    variant="contained"
                    style={{ backgroundColor: "#ffb24d" }}
                    type="submit"
                >
                  Add
                </Button>
        </Box>
    )
}

export default AddFriend;