import { Box, Typography, Button, Stack } from "@mui/material";
import React from "react";
import "./CreatedInvitation.css";
import InvitationDate from "./InvitationDate";

function CreatedInvitation(props) {
  /* thinking of adding ppl who accepted the invitation alr */
  return (
    <>
      <Box
        sx={{
          display: "flex",
          height: 70,
          boxShadow: 2,
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          bgcolor: "#faf2dc",
        }}
      >
        <Typography>{props.name}</Typography>
        <Typography>{props.location}</Typography>
        <Stack alignItems="center">
          <Typography>{props.date} </Typography>
          <Typography>{props.time}</Typography>
        </Stack>
        <Button variant="contained" style={{ backgroundColor: "#ffb24d" }}>
          Accept
        </Button>
      </Box>
    </>
  );
}

export default CreatedInvitation;
