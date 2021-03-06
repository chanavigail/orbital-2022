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
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const user = supabase.auth.user();

  async function fetchCurrentLocation() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, current_loc")
      .eq("id", user.id)
      .single();
    const loc = data.current_loc;

    if (error) {
      alert(error.message);
    }
    if (loc) {
      setCurrentLocation(loc);
    }
  }

  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  async function handleCheckIn() {
    const updates = {
      id: user.id,
      current_loc: enteredLocation,
      updated_at: new Date(),
    };

    if (currentLocation != "") {
      alert(
        "Please check out of " +
          currentLocation +
          " before checking in to new location."
      );
    } else {
      const { error1 } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal",
      });
      if (error1) throw error;
      alert("You have successsfully checked in to " + enteredLocation + "!");

      const func =
        "count_num_" + enteredLocation.toLocaleLowerCase().replace(/\s/g, "");
      const { data } = await supabase.rpc(func);

      const { error } = await supabase.from("locations").upsert({
        name: enteredLocation,
        current_vol: data,
      });
    }
  }

  async function handleCheckOut() {
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

    const func =
      "count_num_" + enteredLocation.toLocaleLowerCase().replace(/\s/g, "");
    const { data, error2 } = await supabase.rpc(func);

    const { error } = await supabase.from("locations").upsert({
      name: enteredLocation,
      current_vol: data,
    });
    window.location.reload(false);
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
                <MenuItem value="TEMBU DH">Tembusu DH</MenuItem>
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
