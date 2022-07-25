import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { supabase } from "../helper";

function FineFood() {
  const [ffutownCapacity, setFFutownCapacity] = useState("");

  useEffect(() => {
    fetchCapacity();
  }, []);

  async function fetchCapacity() {
    const { data, error } = await supabase.rpc("count_num_utownff");

    if (error) {
      alert(error.message);
    }
    if (data) {
      setFFutownCapacity(data);
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <Stack alignItems="center">
        <img
          src={require("../../images/utownFF.jpg")}
          width="250"
          height="250"
        />
        <Typography variant="subtitle1" fontWeight="bold">
          Fine Food (UTOWN)
        </Typography>
      </Stack>

      <Stack spacing={3} justifyContent="center">
        <Typography variant="subtitle1">
          No. of People at Fine Food in UTOWN:{" "}
          {ffutownCapacity ? ffutownCapacity : 0}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default FineFood;
