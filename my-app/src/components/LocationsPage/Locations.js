import React from "react";

import CaptDH from "./CaptDH";
import FineFood from "./FineFood";
import FoodClique from "./FoodClique";
import { Stack, Typography } from "@mui/material";

function Locations() {
  return (
    <Stack spacing={5} sx={{ ml: 2, mr: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        All Locations
      </Typography>
      <Stack>
        <CaptDH />
        <FineFood />
        <FoodClique />
      </Stack>
    </Stack>
  );
}

export default Locations;
