import { Button, ButtonBase, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function CaptDH() {
  /*const { data } = await supabase
    .from("locations")
    .select("name, current_vol")
    .match({ name: "captdh" });
  const current_vol = data.pop().current_vol;*/

  return (
    <Container>
      <img
        src={require("../../images/captdh.jpeg")}
        width="250"
        height="250"
        alt="CAPT Dining Hall"
        id="captdh"
        onClick={toggleStatus}
      />
      <Typography id="captdh-status" className="status">
        There are currently <strong>0 people</strong> in CAPT DH
      </Typography>
    </Container>
  );
}

export default CaptDH;

function toggleStatus() {
  const box = document.getElementById("captdh-status");
  if (box.style.display === "none") {
    box.style.display = "block";
  } else {
    box.style.display = "none";
  }
}
