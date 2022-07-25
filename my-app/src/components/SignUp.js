import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Auth from "../contexts/Auth";
import { supabase } from "./helper";

function SignUp() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Stack spacing={5} sx={{ ml: 2, mr: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Sign Up
      </Typography>
      {session ? (
        <Typography variant="h6" sx={{ mt: 10 }}>
          You are already logged in.
        </Typography>
      ) : (
        <Auth />
      )}
    </Stack>
  );
}

export default SignUp;
