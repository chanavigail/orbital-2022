import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Stack, Typography } from "@mui/material";
import { supabase } from "../helper";

function USPTembu() {
  const [tembusuCapacity, setTembusuCapacity] = useState("");
  const [uspCapacity, setUspCapacity] = useState("");

  useEffect(() => {
    fetchUSPCapacity();
  }, []);

  useEffect(() => {
    fetchTembuCapacity();
  }, []);

  async function fetchUSPCapacity() {
    const { data, error } = await supabase.rpc("count_num_uspdh");

    if (error) {
      alert(error.message);
    }
    if (data) {
      setUspCapacity(data);
    }
  }

  async function fetchTembuCapacity() {
    const { data, error } = await supabase.rpc("count_num_tembudh");

    if (error) {
      alert(error.message);
    }
    if (data) {
      setTembusuCapacity(data);
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
          No. of People at USP side: {uspCapacity ? uspCapacity : 0}
        </Typography>
        <Typography variant="subtitle1">
          No. of People at Tembusu side: {tembusuCapacity ? tembusuCapacity : 0}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default USPTembu;
