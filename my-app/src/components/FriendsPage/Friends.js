import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

import AddFriend from "./AddFriend";
import FriendList from "./FriendList";

function Friends() {
  return (
    <Stack spacing={5} sx={{ ml: 2, mr: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Friends
      </Typography>
      <AddFriend />
      {/* <FriendList /> */}
    </Stack>
  );
}

export default Friends;
