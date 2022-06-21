import { Box, Typography, Button, Stack } from "@mui/material";
import React from "react";
import "./CreatedInvitation.css";
import InvitationDate from "./InvitationDate";

function CreatedInvitation() {
  const date = new Date(2022, 5, 1);
  const time = "7pm";
  const CreatorName = "Name";
  const location = "CAPT DH";

  /* thinking of putting name of creator, location,
  date, time, and other ppl who accepted the invitation alr? + accept button */
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: 70,
          boxShadow: 2,
          margin: 2,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          bgcolor: "#faf2dc",
        }}
      >
        <Typography>{CreatorName}</Typography>
        <Typography>{location}</Typography>
        <InvitationDate date={date} />
        <Typography>{time}</Typography>
        <Button variant="contained" style={{ backgroundColor: "#ffb24d" }}>
          Accept
        </Button>
      </Box>
    </>
  );
}

export default CreatedInvitation;
