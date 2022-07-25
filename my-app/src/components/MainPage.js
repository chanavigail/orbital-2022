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
import { Link } from "react-router-dom";

function MainPage() {
  const [enteredLocation, setEnteredLocation] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const user = supabase.auth.user();

  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  async function handleCheckIn() {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, current_loc")
      .eq("id", user.id)
      .single();
    const loc = data.current_loc;

    const updates = {
      id: user.id,
      current_loc: enteredLocation,
      updated_at: new Date(),
    };
    console.log(loc == null);

    if (loc != null) {
      alert(
        "Please check out of " + loc + " before checking in to new location."
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
    const { data: data1, error: error3 } = await supabase
      .from("profiles")
      .select("id, current_loc")
      .eq("id", user.id)
      .single();
    const loc = data1.current_loc;

    const updates = {
      id: user.id,
      current_loc: null,
      updated_at: new Date(),
    };

    if (loc == null) {
      alert("You have not checked in to any location.");
    } else if (enteredLocation != loc) {
      alert(
        "You are not checked in to " +
          enteredLocation +
          ". Please check out of " +
          loc +
          " instead."
      );
    } else {
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
          <Link to={`/${"Log In"}`}>here</Link>
          &nbsp;to Log In or&nbsp;
          <Link to={`/${"Sign Up"}`}>here</Link>
          &nbsp;to Sign Up to use this service.
        </Typography>
      )}
    </Stack>
  );
}

export default MainPage;
