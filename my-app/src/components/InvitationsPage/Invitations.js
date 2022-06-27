import React, { useEffect, useState } from "react";

import CreatedInvitation from "./CreatedInvitation/CreatedInvitation";
import NewInvitation from "./NewInvitation/NewInvitation";
import { Stack, Typography } from "@mui/material";
import { supabase } from "../helper";

function Invitations() {
  const [invitations, setInvitations] = useState([]);
  const user = supabase.auth.user();

  useEffect(() => {
    fetchInvitations();
  }, []);

  async function fetchInvitations() {
    const { data, error } = await supabase.from("invitations").select();

    if (error) {
      alert(error.message);
    }
    if (data) {
      setInvitations(data);
    }
  }

  return (
    <Stack spacing={5} sx={{ ml: 2, mr: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Invitations
      </Typography>
      <NewInvitation />

      <Stack spacing={2}>
        {invitations.map((invitation) => (
          <CreatedInvitation
            date={invitation.date}
            time={invitation.time}
            name={invitation.username}
            location={invitation.location}
          />
        ))}
      </Stack>
    </Stack>
  );
}

export default Invitations;
