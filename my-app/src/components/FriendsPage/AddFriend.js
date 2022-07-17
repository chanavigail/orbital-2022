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
    const [ check, setCheck ] = useState(0);

    const getId = async  () => {
      const { data: getFriendId } = await supabase
        .from("profiles")
        .select("id")
        .match( {username: addingUsername} )
      alert(addingUsername)
      alert(getFriendId)
      if ( getFriendId != null ) {
        setFriendId(getFriendId[0].id);
        setCheck(1);
      }
    }

    const checker = async (e) => {
      e.preventDefault();
      getId();
      if (check === 0) {
        alert("No such user exists, please check again")
      } else {
        alert("valid user, adding friend...")
        handleAdd();
      }
    }

    const handleAdd = async (e) => {
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
            id="add-button"
          >
            Add
          </Button>
        </Box>
      </Container>
    )
}

export default AddFriend;