import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { supabase } from "./helper";

function MainPage() {
  const [enteredLocation, setEnteredLocation] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const user = supabase.auth.user();

  async function handleCheckIn() {
    const { data } = await supabase
      .from("locations")
      .select("name, current_vol")
      .match({ name: enteredLocation });

    const { error } = await supabase.from("locations").upsert({
      name: enteredLocation,
      current_vol: data.pop().current_vol + 1,
    });

    const updates = {
      id: user.id,
      current_loc: enteredLocation,
      updated_at: new Date(),
    };

    const { error1 } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });
    if (error1) throw error;
    alert("You have successsfully checked in to " + enteredLocation + "!");
  }

  async function handleCheckOut() {
    const { data } = await supabase
      .from("locations")
      .select("name, current_vol")
      .match({ name: enteredLocation });

    const { error } = await supabase.from("locations").upsert({
      name: enteredLocation,
      current_vol: data.pop().current_vol - 1,
    });

    const updates = {
      id: user.id,
      current_loc: null,
      updated_at: new Date(),
    };

    const { error1 } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });
    if (error1) throw error;
    alert("You have successsfully checked out of " + enteredLocation + "!");
  }

  return (
    <Stack spacing={2} sx={{ ml: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Check in/out
      </Typography>

      {session ? (
        <>
          <Box>
            <Typography variant="h5">
              Select location to check in/out of!
            </Typography>
          </Box>

          <Box>
            <Stack direction="row" spacing={2}>
              <Select
                sx={{ width: 250 }}
                value={enteredLocation}
                onChange={locationChangeHandler}
              >
                <MenuItem value="CAPT DH">CAPT DH</MenuItem>
                <MenuItem value="TEMBUSU DH">Tembusu DH</MenuItem>
                <MenuItem value="RC4 DH">RC4 DH</MenuItem>
                <MenuItem value="USP DH">USP DH</MenuItem>
                <MenuItem value="UTOWN FC">UTOWN Food Clique</MenuItem>
                <MenuItem value="UTOWN FF">UTOWN Fine Food</MenuItem>
              </Select>
              <Button
                style={{ backgroundColor: "#ffb24d", color: "black" }}
                sx={{ fontWeight: "fontWeightBold" }}
                variant="contained"
                type="submit"
                onClick={handleCheckIn}
              >
                Check in
              </Button>
              <Button
                style={{ backgroundColor: "#ffb24d", color: "black" }}
                sx={{ fontWeight: "fontWeightBold" }}
                variant="contained"
                type="submit"
                onClick={handleCheckOut}
              >
                Check out
              </Button>
            </Stack>
          </Box>
        </>
      ) : (
        <Typography variant="h6">
          You are currently not logged in, click&nbsp;
          <a href="http://localhost:3000/Log%20In">here</a>
          &nbsp;to Log In or&nbsp;
          <a href="http://localhost:3000/Sign%20Up">here</a>
          &nbsp;to Sign Up to use this service.
        </Typography>
      )}
    </Stack>
  );
}

export default MainPage;
