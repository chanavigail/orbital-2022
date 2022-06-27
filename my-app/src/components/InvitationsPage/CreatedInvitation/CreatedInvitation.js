import { Box, Typography, Button } from "@mui/material";
import React from "react";
import "./CreatedInvitation.css";
import InvitationDate from "./InvitationDate";

function CreatedInvitation(props) {
  const date = new Date(2022, 5, 1);
  const time = props.time;
  const CreatorName = "Name";
  const location = "CAPT DH";

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
        <Typography>{props.date} </Typography>
        <Typography>{props.time}</Typography>
        <Button variant="contained" style={{ backgroundColor: "#ffb24d" }}>
          Accept
        </Button>
      </Box>
    </>
  );
}

export default CreatedInvitation;
