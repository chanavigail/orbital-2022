import { Stack, Typography } from "@mui/material";
import React from "react";

function Friends() {
  return (
    <Stack spacing={5} sx={{ ml: 2, mr: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Friends
      </Typography>
      <FriendList />
    </Stack>
  );
}

export default Friends;
