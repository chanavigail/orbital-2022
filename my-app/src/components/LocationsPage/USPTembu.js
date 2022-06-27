import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { supabase } from "../helper";

function USPTembu() {
  const [tembusuCapacity, setTembusuCapacity] = useState("");
  const [uspCapacity, setUspCapacity] = useState("");

  useEffect(() => {
    fetchCapacity();
  }, []);

  async function fetchCapacity() {
    const { data, error } = await supabase.from("locations").select();

    if (error) {
      alert(error.message);
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == "TEMBUSU DH") {
        setTembusuCapacity(data[i].current_vol);
      }
      if (data[i].name == "USP DH") {
        setUspCapacity(data[i].current_vol);
      }
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <Stack alignItems="center">
        <img
          src={require("../../images/tembudh.jpg")}
          width="250"
          height="250"
        />
        <Typography variant="subtitle1" fontWeight="bold">
          USP/Tembusu Dining Hall
        </Typography>
      </Stack>

      <Stack spacing={3} justifyContent="center">
        <Typography variant="subtitle1">
          No. of People at USP side: {uspCapacity}
        </Typography>
        <Typography variant="subtitle1">
          No. of People at Tembusu side: {tembusuCapacity}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default USPTembu;
