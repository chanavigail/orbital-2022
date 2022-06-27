import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { supabase } from "../helper";

function FoodClique() {
  const [fcutownCapacity, setFCutownCapacity] = useState("");

  useEffect(() => {
    fetchCapacity();
  }, []);

  async function fetchCapacity() {
    const { data, error } = await supabase.from("locations").select();

    if (error) {
      alert(error.message);
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == "UTOWN FC") {
        setFCutownCapacity(data[i].current_vol);
      }
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <Stack alignItems="center">
        <img
          src={require("../../images/utownFC.jpg")}
          width="250"
          height="250"
        />
        <Typography variant="subtitle1" fontWeight="bold">
          Food Clique (UTOWN)
        </Typography>
      </Stack>

      <Stack spacing={3} justifyContent="center">
        <Typography variant="subtitle1">
          No. of People at Food Clique in UTOWN: {fcutownCapacity}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default FoodClique;
