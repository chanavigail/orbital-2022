import { Box, Typography, Button, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { supabase } from "../../helper";
import "./CreatedInvitation.css";

function CreatedInvitation(props) {
  const [usernameData, setUsername] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = async () => {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      setUsername(data.username);
    }
  };

  let arr = props.accepted_people;
  /* thinking of adding ppl who accepted the invitation alr */
  const handleAcceptInvitation = async (e) => {
    e.preventDefault();
    arr.push(usernameData);

    const invitationData = {
      id: props.id,
      invitation_id: props.invitationNum,
      date: props.date,
      time: props.time,
      location: props.location,
      accepted_people: arr,
      username: props.name,
    };

    const { error } = await supabase
      .from("invitations")
      .upsert(invitationData, {
        returning: "minimal",
      });

    if (error) throw error;
    alert("You have accepted the invition!");
    window.location.reload(false);
  };

  let accepted_names = "accepted by:  ";
  arr.map(
    (nameOfPerson) => (accepted_names = accepted_names + nameOfPerson + ", ")
  );
  accepted_names = accepted_names.slice(0, accepted_names.length - 2);

  return (
    <Box
      sx={{
        display: "flex",
        height: 70,
        boxShadow: 2,
        justifyContent: "space-around",
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

      <Typography noWrap>{accepted_names}</Typography>
      <Button
        variant="contained"
        style={{ backgroundColor: "#ffb24d" }}
        onClick={handleAcceptInvitation}
      >
        Accept
      </Button>
    </Box>
  );
}

export default CreatedInvitation;
