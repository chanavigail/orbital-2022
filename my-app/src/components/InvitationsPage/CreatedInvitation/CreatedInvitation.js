import { Box, Typography, Button, Stack, IconButton } from "@mui/material";
import React, { cloneElement, useEffect, useState } from "react";
import { supabase } from "../../helper";
import "./CreatedInvitation.css";
import OpenInFull from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

function CreatedInvitation(props) {
  const [usernameData, setUsername] = useState(null);
  const [expanded, setExpanded] = useState(false);
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
  const handleAcceptInvitation = async (e) => {
    e.preventDefault();

    if (arr.includes(usernameData)) {
      alert("You have already accepted this invitation!");
    } else if (usernameData == props.name) {
      alert("You cannot accept your own invitation!");
    } else {
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
    }
  };

  let accepted_names = "Accepted by:  ";
  arr.map(
    (nameOfPerson) => (accepted_names = accepted_names + nameOfPerson + ", ")
  );
  accepted_names = accepted_names.slice(0, accepted_names.length - 2);

  const handleLeaveInvitation = async (e) => {
    e.preventDefault();

    if (!arr.includes(usernameData)) {
      alert("You have not accepted this invitation!");
    } else if (usernameData == props.name) {
      alert("You cannot leave your own invitation!");
    } else {
      const index = arr.indexOf(usernameData);
      arr.splice(index, 1);

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
      alert("You have left the invition!");
    }
  };

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <>
      {expanded ? (
        <Box
          sx={{
            boxShadow: 2,
            alignItems: "center",
            padding: 1,
            bgcolor: "#faf2dc",
          }}
        >
          <Stack spacing={0}>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{ justifyContent: "right" }}
            >
              <CloseFullscreenIcon style={{ color: "#e0632d" }} />
            </IconButton>
            <Typography>Creator Username: {props.name}</Typography>
            <Typography>Location: {props.location}</Typography>
            <Typography>Date: {props.date} </Typography>
            <Typography>Time: {props.time}</Typography>
            <Typography noWrap>{accepted_names}</Typography>
          </Stack>
          <Stack direction="row" spacing={5} sx={{ justifyContent: "right" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ffb24d" }}
              onClick={handleAcceptInvitation}
            >
              Accept
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ffb24d" }}
              onClick={handleLeaveInvitation}
            >
              Leave
            </Button>
          </Stack>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              boxShadow: 2,
              padding: 1,
              bgcolor: "#faf2dc",
            }}
          >
            <Stack>
              <IconButton
                size="small"
                onClick={handleExpand}
                sx={{ justifyContent: "right", display: "inline-grid" }}
              >
                <OpenInFull style={{ color: "#e0632d" }} />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography>{props.name}</Typography>
                <Typography>{props.location}</Typography>
                <Stack alignItems="center">
                  <Typography>{props.date} </Typography>
                  <Typography>{props.time}</Typography>
                </Stack>

                <Button
                  variant="contained"
                  style={{ backgroundColor: "#ffb24d" }}
                  onClick={handleAcceptInvitation}
                >
                  Accept
                </Button>
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}

export default CreatedInvitation;
