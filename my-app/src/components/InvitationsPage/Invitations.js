import React, { useEffect, useState } from "react";

import CreatedInvitation from "./CreatedInvitation/CreatedInvitation";
import NewInvitation from "./NewInvitation/NewInvitation";
import { Stack, Typography } from "@mui/material";
import { supabase } from "../helper";
import { Link } from "react-router-dom";

function Invitations() {
  const [invitations, setInvitations] = useState([]);
  const [session, setSession] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
      {session ? (
        <>
          <NewInvitation />

          <Stack spacing={2}>
            {invitations.map((invitation) => (
              <CreatedInvitation
                date={invitation.date}
                time={invitation.time}
                name={invitation.username}
                location={invitation.location}
                invitationNum={invitation.invitation_id}
                accepted_people={invitation.accepted_people}
                id={invitation.id}
              />
            ))}
          </Stack>
        </>
      ) : (
        <Typography variant="h6">
          You are currently not logged in, click&nbsp;
          <Link to={`/${"Log In"}`}>here</Link>
          &nbsp;to Log In or&nbsp;
          <Link to={`/${"Sign Up"}`}>here</Link>
          &nbsp;to Sign Up to use this service.
        </Typography>
      )}
    </Stack>
  );
}

export default Invitations;
