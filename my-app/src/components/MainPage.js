import React, { useState } from "react";

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
  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  async function handleCheckIn() {
    const { data } = await supabase
      .from("locations")
      .select("name, current_vol")
      .match({ name: enteredLocation });

    const { error } = await supabase.from("locations").upsert({
      name: enteredLocation,
      current_vol: data.pop().current_vol + 1,
    });
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
  }

  return (
    <Stack spacing={2} sx={{ ml: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Check in/out
      </Typography>

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
            <MenuItem value="captdh">CAPT DH</MenuItem>
            <MenuItem value="tembudh">Tembusu DH</MenuItem>
            <MenuItem value="rc4dh">RC4 DH</MenuItem>
            <MenuItem value="utownfc">UTOWN Food Clique</MenuItem>
            <MenuItem value="utownff">UTOWN Fine Food</MenuItem>
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
    </Stack>
  );
}

export default MainPage;
