import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { supabase } from "../helper";

function CaptRC4DH() {
  const [captCapacity, setCaptCapacity] = useState("");
  const [rc4Capacity, setRC4Capacity] = useState("");

  useEffect(() => {
    fetchCapacity();
  }, []);

  async function fetchCapacity() {
    const { data, error } = await supabase.from("locations").select();

    if (error) {
      alert(error.message);
    }
    for (let i = 0; i < data.length; i++) {
      if (data.at(i).name == "CAPT DH") {
        setCaptCapacity(data.at(i).current_vol);
      }
      if (data.at(i).name == "RC4 DH") {
        setRC4Capacity(data.at(i).current_vol);
      }
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <Stack alignItems="center">
        <img
          src={require("../../images/captdh.jpeg")}
          width="250"
          height="250"
        />
        <Typography variant="subtitle1" fontWeight="bold">
          CAPT/RC4 Dining Hall
        </Typography>
      </Stack>

      <Stack spacing={3} justifyContent="center">
        <Typography variant="subtitle1">
          No. of People at CAPT side: {captCapacity}
        </Typography>
        <Typography variant="subtitle1">
          No. of People at RC4 side: {rc4Capacity}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default CaptRC4DH;
