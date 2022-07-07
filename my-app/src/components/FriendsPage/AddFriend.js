import React, { useState } from "react";
import { 
  Box,
  Button,
  Container,
  TextField
} from "@mui/material";

import { supabase } from "../helper";

function AddFriend() {
    const [ loading, setLoading ] = useState(false);
    const [ addingUsername, setAddingUsername ] = useState("");
    const [ friendId, setFriendId ] = useState("");

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

    const checker = () => {
      getId();
      if (addingUsername.length === 0) {
        alert("No such username exists, please check again")
      } else {
        alert("valid user, adding friend...")
        handleAdd();
      }
    }

    const handleAdd = async (e) => {
        e.preventDefault();
    
        try {
          setLoading(true);
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
      <Container>
        <Box
            component="form"
            onSubmit={""}
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
            id="add-button"
          >
            Add
          </Button>
        </Box>
      </Container>
    )
}

export default AddFriend;