import React, { useState } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";

import { supabase } from "../helper";

function AddFriend() {
  const [addingUsername, setAddingUsername] = useState("");

  const user = supabase.auth.user();

  const handleAddFriend = async (e) => {
    e.preventDefault();

    try {
      if (addingUsername == "") {
        alert("Please enter a username.");
      } else {
        const { data: userID, error: error1 } = await supabase
          .from("profiles")
          .select(`id`)
          .eq("username", addingUsername)
          .single();
        if (error1) {
          alert("No such username exists, please check again.");
        } else {
          const { data: friendsList } = await supabase
            .from("friends")
            .select(`friend_id`)
            .match({ user_id: user.id });
          const list = [];
          friendsList.map((friend) => list.push(friend.friend_id));

          if (list.includes(userID.id)) {
            alert(addingUsername + " has already been added as friend!");
          } else if (userID) {
            alert("valid user, adding friend...");

            const updates = { user_id: user.id, friend_id: userID.id };

            let { error, status } = await supabase
              .from("friends")
              .insert([{ ...updates }]);

            alert(
              "You have successsfully added " + addingUsername + " as a friend!"
            );

            if (error && status !== 406) {
              throw error;
            }
          }
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setAddingUsername("");
    }
  };

  return (
    <Container>
      <Stack
        component="form"
        onSubmit={handleAddFriend}
        margin="auto"
        spacing={2}
        direction="row"
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
          Add Friend
        </Button>
      </Stack>
    </Container>
  );
}

export default AddFriend;
