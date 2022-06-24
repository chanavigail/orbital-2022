import { Stack, Typography } from "@mui/material";
import React from "react";

import Auth from "../contexts/Auth";

function SignUp() {
  return (
    <Stack spacing={5} sx={{ ml: 2, mr: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Sign Up
      </Typography>
      <Auth />
    </Stack>
  );
}

export default SignUp;
