import React, { useState } from "react";

import { Button, MenuItem, Select, Typography } from "@mui/material";

import "./MainPage.css";
import { Container } from "@mui/system";

function MainPage() {
  const [enteredLocation, setEnteredLocation] = useState("");
  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  return (
    <div>
      <Typography variant="h3" sx={{ mt: 10 }}>
        Check in/out
      </Typography>
      <Typography sx={{ mt: 10, ml: 5 }}>
        Select location to check in/out of!
      </Typography>
      <Container sx={{ gap: 2 }}>
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
        <Button variant="contained" type="submit">
          Check in
        </Button>
        <Button variant="contained" type="submit">
          Check out
        </Button>
      </Container>
    </div>
  );
}

export default MainPage;
