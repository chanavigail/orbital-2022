import React from "react";

import CaptRC4DH from "./CaptRC4DH";
import FineFood from "./FineFood";
import FoodClique from "./FoodClique";
import { Grid, Stack, Typography } from "@mui/material";
import USPTembu from "./USPTembu";

function Locations() {
  return (
    <Stack spacing={5} sx={{ ml: 2, mr: 2 }}>
      <Typography variant="h3" sx={{ mt: 10 }}>
        All Locations
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
      >
        <Grid item md={6}>
          <CaptRC4DH />
        </Grid>

        <Grid item md={6}>
          <FoodClique />
        </Grid>

        <Grid item md={6}>
          <USPTembu />
        </Grid>

        <Grid item md={6}>
          <FineFood />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default Locations;
