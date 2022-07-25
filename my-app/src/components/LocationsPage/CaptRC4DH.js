import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { supabase } from "../helper";

function CaptRC4DH() {
  const [captCapacity, setCaptCapacity] = useState("");
  const [rc4Capacity, setRC4Capacity] = useState("");

  useEffect(() => {
    fetchCAPTCapacity();
  }, []);

  useEffect(() => {
    fetchRC4Capacity();
  }, []);

  async function fetchCAPTCapacity() {
    const { data, error } = await supabase.rpc("count_num_captdh");

    if (error) {
      alert(error.message);
    }
    if (data) {
      setCaptCapacity(data);
    }
  }

  async function fetchRC4Capacity() {
    const { data, error } = await supabase.rpc("count_num_rc4dh");

    if (error) {
      alert(error.message);
    }
    if (data) {
      setRC4Capacity(data);
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
          No. of People at CAPT side: {captCapacity ? captCapacity : 0}
        </Typography>
        <Typography variant="subtitle1">
          No. of People at RC4 side: {rc4Capacity ? rc4Capacity : 0}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default CaptRC4DH;
